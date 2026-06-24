chrome.runtime.onInstalled.addListener(async () => {
  const result = await chrome.storage.sync.get('rules');
  if (!result.rules) {
    await chrome.storage.sync.set({ rules: [] });
  }
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'rules-updated') {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        if (tab.id) chrome.tabs.sendMessage(tab.id, { type: 'rules-updated' }).catch(() => {});
      });
    });
  }
});
