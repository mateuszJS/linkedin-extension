const ALLOWED_URL = "https://www.linkedin.com";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ offers: [], isTurnOn: false });
});

async function applyChanges() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // TODO: that's weird that we have to check it,
  // if we have permissions only to run extension on linkedin side
  if (!tab.url.startsWith(ALLOWED_URL)) return;

  chrome.storage.local.get("isTurnOn", ({ isTurnOn }) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: [
        "get-constants.js",
        "debounce.js",
        "applying-changes/add-styles.js",
        "applying-changes/mark-offers.js",
        "applying-changes/store-company-names.js",
        "observer/get-collection-of-changes.js",
        "observer/observer.js",
        isTurnOn ? "observer/start-observe.js" : "observer/stop-observe.js",
      ],
    });
  });
}

chrome.tabs.onUpdated.addListener(applyChanges);
chrome.tabs.onActivated.addListener(applyChanges);

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === "isTurnOn") {
      applyChanges();
    }
  }
});
