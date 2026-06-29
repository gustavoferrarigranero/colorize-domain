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

function createRuleEl(rule, index) {
  const div = document.createElement('div');
  div.className = 'rule';
  div.innerHTML = `
    <div class="swatch" style="background:${rule.color}"></div>
    <div class="info">
      <div class="domain">${escapeHtml(rule.domain)}${rule.exact ? ' <span class="exact-badge">exato</span>' : ''}</div>
      <div class="selector">${escapeHtml(rule.selector)}</div>
    </div>
    <button class="btn-remove" data-index="${index}">Remover</button>
  `;
  div.querySelector('.btn-remove').addEventListener('click', async () => {
    const rules = await getRules();
    rules.splice(index, 1);
    await saveRules(rules);
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

document.getElementById('addBtn').addEventListener('click', async () => {
  const domain = document.getElementById('domain').value.trim();
  const selector = document.getElementById('selector').value.trim();
  const color = document.getElementById('color').value;
  const exact = document.getElementById('exactDomain').checked;
  if (!domain || !selector) return;
  const rules = await getRules();
  const normalizedDomain = normalizeDomain(domain);
  rules.push({ domain: normalizedDomain, selector, color, exact });
  await saveRules(rules);
  document.getElementById('domain').value = '';
  document.getElementById('selector').value = '';
  document.getElementById('exactDomain').checked = false;
});

renderRules();
