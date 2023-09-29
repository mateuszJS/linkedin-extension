function getFileName() {
  const date = new Date();
  return `company_names_${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}.txt`;
}

chrome.storage.local.get("offers", ({ offers }) => {
  const element = document.createElement("a");
  element.setAttribute("download", getFileName());

  const { OFFERS_DIVIDER } = getConstants();
  const data = new Blob([`"${offers.join(OFFERS_DIVIDER)}"`], {
    type: "text/plain",
  });
  const url = window.URL.createObjectURL(data);
  element.setAttribute("href", url);

  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
});
