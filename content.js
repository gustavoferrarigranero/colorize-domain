const STORAGE_KEY = 'rules';

function normalizeDomain(domain) {
  return domain
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '')
    .trim()
    .toLowerCase();
}

function applyRules() {
  chrome.storage.sync.get(STORAGE_KEY).then(function(data) {
    document.querySelectorAll('[data-colorize]').forEach(function(el) {
      el.style.removeProperty('background-color');
      el.style.removeProperty('background');
      el.removeAttribute('data-colorize');
    });
    const rules = data[STORAGE_KEY] || [];
    const currentHost = window.location.hostname;
    const matched = rules.filter(function(r) {
      var nd = normalizeDomain(r.domain);
      var ch = normalizeDomain(currentHost);
      if (r.exact) return ch === nd;
      return ch === nd ||
        ch.endsWith('.' + nd) ||
        nd.endsWith('.' + ch);
    });
    for (var i = 0; i < matched.length; i++) {
      var els = document.querySelectorAll(matched[i].selector);
      els.forEach(function(el) {
        el.setAttribute('data-colorize', '');
        el.style.setProperty('background-color', matched[i].color, 'important');
        el.style.setProperty('background', matched[i].color, 'important');
      });
    }
  }).catch(function() {});
}

try { applyRules(); } catch (e) {}

var observer = new MutationObserver(function() { try { applyRules(); } catch (e) {} });
if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
} else {
  document.addEventListener('DOMContentLoaded', function() {
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

chrome.runtime.onMessage.addListener(function(msg) {
  if (msg.type === 'rules-updated') try { applyRules(); } catch (e) {}
});
