const toggleInput = document.getElementById("toggle");
const downloadBtn = document.getElementById("download");
const uploadBtn = document.getElementById("upload");

chrome.storage.local.get("isTurnOn", ({ isTurnOn }) => {
  if (isTurnOn) {
    toggleInput.checked = true;
  } else {
    toggleInput.checked = false;
  }
});

toggleInput.addEventListener("change", (event) => {
  chrome.storage.local.set({ isTurnOn: event.target.checked });
});

downloadBtn.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["download-company-names.js"],
  });
});

/*
1. Add event listener to search for mutations on react root of the app or on body
  remember about debouncing
2. Check if container with jobs list exists
3. If container isn't marked by us a transformed, then let's mark the offers and container
*/
console.log("=====", uploadBtn);
uploadBtn.addEventListener("change", function () {
  console.log("=====");
  if (this.files && this.files[0]) {
    const reader = new FileReader();
    console.log("upload");
    reader.onload = function () {
      console.log("file reader");
      // const { OFFERS_DIVIDER } = getConstants();
      const OFFERS_DIVIDER = '","';
      const offers = reader.result.slice(1, -1).split(OFFERS_DIVIDER);
      console.log("file reader", offers);
      chrome.storage.local.set({ offers }, () => window.location.reload());
    };
    reader.readAsText(this.files[0]);
  }
});
