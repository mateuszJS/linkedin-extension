function storeOffers() {
  const { LINKEDIN_COMPANY_NAMES_SELECTOR, LINKEDIN_OFFER_TITLE_SELECTOR } =
    getConstants();

  const companiesNamesLinks = document.querySelectorAll(
    LINKEDIN_COMPANY_NAMES_SELECTOR
  );
  const offerTitles = document.querySelectorAll(LINKEDIN_OFFER_TITLE_SELECTOR);
  console.log("storeOffers");
  chrome.storage.local.get("offers", ({ offers }) => {
    console.log("offers", offers);
    console.log("companiesNamesLinks", companiesNamesLinks);
    const updatedOffers = [
      ...offers,
      ...Array.from(companiesNamesLinks).map((link, index) => {
        const title = offerTitles[index].innerText;
        console.log("title", title);
        return title + link.innerText;
      }),
    ];
    chrome.storage.local.set({
      offers: [...new Set(updatedOffers)],
    });

    grayOutVisited();
  });
}

function addSaveResultsButton() {
  const { LINKEDIN_OFFERS_LIST_SELECTOR, SAVE_COMPANIES_BUTTON_ID } =
    getConstants();
  const offersList = document.querySelector(LINKEDIN_OFFERS_LIST_SELECTOR);

  if (!offersList) return;

  const button = document.createElement("button");
  button.id = SAVE_COMPANIES_BUTTON_ID;

  const btnInnerImgs = [
    {
      url: "/images/linkedin_ext_btn_text.png",
      className: "text",
    },
    {
      url: "/images/linkedin_ext_dog_face.png",
      className: "dog-face",
    },
    {
      url: "/images/linkedin_ext_radar.png",
      className: "radar",
    },
  ];

  btnInnerImgs.forEach((img) => {
    const imgNode = document.createElement("img");
    imgNode.src = chrome.runtime.getURL(img.url);
    imgNode.classList.add(img.className);
    button.appendChild(imgNode);
  });

  button.addEventListener("click", () => {
    // TODO: show feedback that list is marked
    console.log("click");
    storeOffers();
  });
  offersList.parentElement.insertBefore(button, offersList.nextSibling);
}
