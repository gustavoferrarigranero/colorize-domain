const STORAGE_KEY = 'rules';

function normalizeDomain(domain) {
  return domain
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '')
    .trim()
    .toLowerCase();
}

async function applyRules() {
  const result = await chrome.storage.sync.get(STORAGE_KEY);
  const rules = result[STORAGE_KEY] || [];
  const currentHost = window.location.hostname;

  const matched = rules.filter(r => {
    const nd = normalizeDomain(r.domain);
    return currentHost === nd ||
      currentHost.endsWith('.' + nd) ||
      nd.endsWith('.' + currentHost);
  });

  for (const rule of matched) {
    try {
      document.querySelectorAll(rule.selector).forEach(el => {
        el.style.setProperty('background-color', rule.color, 'important');
      });
    } catch (e) {
    }
  }
}

applyRules();

const observer = new MutationObserver(() => applyRules());
if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'rules-updated') {
    applyRules();
  }
});
