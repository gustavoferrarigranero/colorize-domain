const STORAGE_KEY = 'rules';

async function getRules() {
  const result = await chrome.storage.sync.get(STORAGE_KEY);
  return result[STORAGE_KEY] || [];
}

async function saveRules(rules) {
  await chrome.storage.sync.set({ [STORAGE_KEY]: rules });
  renderRules();
  chrome.runtime.sendMessage({ type: 'rules-updated' }).catch(() => {});
}

var editingIndex = null;

function createRuleEl(rule, index) {
  const div = document.createElement('div');
  div.className = 'rule';
  div.innerHTML = `
    <div class="swatch" style="background:${rule.color}"></div>
    <div class="info">
      <div class="domain">${escapeHtml(rule.domain)}${rule.exact ? ' <span class="exact-badge">s/ sub</span>' : ''}</div>
      <div class="selector">${escapeHtml(rule.selector)}</div>
    </div>
    <div class="rule-actions">
      <button class="btn-edit" data-index="${index}">Editar</button>
      <button class="btn-remove" data-index="${index}">Remover</button>
    </div>
  `;
  div.querySelector('.btn-remove').addEventListener('click', async () => {
    if (!confirm('Remover esta regra?')) return;
    if (editingIndex === index) clearForm();
    const rules = await getRules();
    rules.splice(index, 1);
    await saveRules(rules);
  });
  div.querySelector('.btn-edit').addEventListener('click', () => {
    editingIndex = index;
    document.getElementById('domain').value = rule.domain;
    document.getElementById('selector').value = rule.selector;
    document.getElementById('color').value = rule.color;
    document.getElementById('exactDomain').checked = rule.exact || false;
    document.getElementById('addBtn').textContent = 'Salvar';
    document.getElementById('cancelBtn').style.display = 'inline-block';
  });
  return div;
}

function normalizeDomain(domain) {
  return domain
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '')
    .trim()
    .toLowerCase();
}

function escapeHtml(str) {
  const el = document.createElement('span');
  el.textContent = str;
  return el.innerHTML;
}

async function renderRules() {
  const container = document.getElementById('rulesList');
  const rules = await getRules();
  if (rules.length === 0) {
    container.innerHTML = '<div class="empty"><div class="empty-icon">✦</div>Nenhuma regra configurada</div>';
    return;
  }
  container.innerHTML = '';
  rules.forEach((rule, i) => container.appendChild(createRuleEl(rule, i)));
}

function clearForm() {
  document.getElementById('domain').value = '';
  document.getElementById('selector').value = '';
  document.getElementById('color').value = '#1a7a2e';
  document.getElementById('exactDomain').checked = false;
  document.getElementById('addBtn').textContent = 'Adicionar regra';
  document.getElementById('cancelBtn').style.display = 'none';
  editingIndex = null;
}

document.getElementById('cancelBtn').addEventListener('click', clearForm);

// === Theme ===
var THEME_KEY = 'theme';

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  var resolved = theme === 'system' ? getSystemTheme() : theme;
  document.documentElement.setAttribute('data-theme', resolved);
  document.querySelectorAll('.theme-btn').forEach(function(b) {
    b.classList.toggle('active', b.getAttribute('data-theme-value') === theme);
  });
}

async function loadTheme() {
  var result = await chrome.storage.sync.get(THEME_KEY);
  var theme = result[THEME_KEY] || 'light';
  applyTheme(theme);
}

document.getElementById('settingsBtn').addEventListener('click', function() {
  document.getElementById('settingsPanel').classList.toggle('open');
});

document.querySelectorAll('.theme-btn').forEach(function(btn) {
  btn.addEventListener('click', async function() {
    var theme = this.getAttribute('data-theme-value');
    applyTheme(theme);
    await chrome.storage.sync.set({ [THEME_KEY]: theme });
  });
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
  chrome.storage.sync.get(THEME_KEY, function(result) {
    if ((result[THEME_KEY] || 'light') === 'system') {
      applyTheme('system');
    }
  });
});

loadTheme();

document.getElementById('addBtn').addEventListener('click', async () => {
  const domain = document.getElementById('domain').value.trim();
  const selector = document.getElementById('selector').value.trim();
  const color = document.getElementById('color').value;
  const exact = document.getElementById('exactDomain').checked;
  if (!domain || !selector) return;
  const rules = await getRules();
  const normalizedDomain = normalizeDomain(domain);
  if (editingIndex !== null) {
    rules[editingIndex] = { domain: normalizedDomain, selector, color, exact };
  } else {
    rules.push({ domain: normalizedDomain, selector, color, exact });
  }
  await saveRules(rules);
  clearForm();
});

renderRules();
