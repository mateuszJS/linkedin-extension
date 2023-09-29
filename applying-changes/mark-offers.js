function markNodeAsVisited(linkNode) {
  const { OFFER_MARKED_CLASS_NAME } = getConstants();
  linkNode.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
    OFFER_MARKED_CLASS_NAME
  );
}

function grayOutVisited() {
  const { LINKEDIN_COMPANY_NAMES_SELECTOR, LINKEDIN_OFFER_TITLE_SELECTOR } =
    getConstants();
  console.log("gray outing");
  chrome.storage.local.get("offers", ({ offers }) => {
    console.log("gray outing offers:", offers);
    const companiesNamesLinks = document.querySelectorAll(
      LINKEDIN_COMPANY_NAMES_SELECTOR
    );
    const visibleCompaniesNames = Array.from(companiesNamesLinks);

    const offerTitles = document.querySelectorAll(
      LINKEDIN_OFFER_TITLE_SELECTOR
    );

    visibleCompaniesNames.forEach((companyNameLink, index) => {
      const title = offerTitles[index].innerText;
      if (offers.includes(title + companyNameLink.innerText)) {
        markNodeAsVisited(companyNameLink);
      }
    });
  });

  // const paginationContainerNode = document.querySelector(
  //   '.artdeco-pagination__pages.artdeco-pagination__pages--number'
  // )

  // const grayOutNextPage  = () => {
  //   applyResults()
  //   paginationContainerNode.removeEventListener('click', grayOutNextPage)
  // }
  // paginationContainerNode.addEventListener('click', grayOutNextPage)
}

function addLoader() {
  const { SCANNING_LOADER_CLASS_NAME } = getConstants();

  const loaderNode = document.createElement("div");
  loaderNode.classList.add(SCANNING_LOADER_CLASS_NAME);

  loaderNode.innerHTML = `
    <div class="loader-dog">
      <img
        src="${chrome.runtime.getURL("/images/linkedin_ext_dog_face.png")}"
        class="dog-face"
      />
      <img
        src="${chrome.runtime.getURL("/images/linkedin_ext_radar.png")}"
        class="radar"
      />
    </div>
    <img
      src="${chrome.runtime.getURL("/images/linkedin_ext_scanning_label.png")}"
      class="label"
    />
  `;

  return loaderNode;
}

function scrollAndGrayOut() {
  const {
    LINKEDIN_SCROLLABLE_CONTAINER_SELECTOR,
    LINKEDIN_OFFERS_LIST_SELECTOR,
    ATTR_OFFERS_MARKED,
  } = getConstants();
  console.log("scrollAndGrayOut");
  const scrollableContainer = document.querySelector(
    LINKEDIN_SCROLLABLE_CONTAINER_SELECTOR
  );
  const listContainer = document.querySelector(LINKEDIN_OFFERS_LIST_SELECTOR);

  if (listContainer.children.length === 0) return;

  // We are modifying first child, because only children is list are rerendered by linkedin
  // list wrapper stays same
  listContainer.children[0].setAttribute(ATTR_OFFERS_MARKED, "true");

  const loaderNode = addLoader();
  scrollableContainer.parentElement.appendChild(loaderNode);

  const interval = setInterval(() => {
    scrollableContainer.scrollTop += scrollableContainer.offsetHeight;
    const areAllChildrenFilled = Array.from(listContainer.children).every(
      (child) => child.children.length > 0
    );

    if (areAllChildrenFilled) {
      clearInterval(interval);
      grayOutVisited();
      scrollableContainer.scrollTop = 0;
      loaderNode.remove();
    }
  }, scrollableContainer.offsetHeight / 2);
}

function markOffers() {
  const {
    LINKEDIN_SCROLLABLE_CONTAINER_SELECTOR,
    LINKEDIN_OFFERS_LIST_SELECTOR,
  } = getConstants();

  console.log("markOffers");

  const scrollableContainer = document.querySelector(
    LINKEDIN_SCROLLABLE_CONTAINER_SELECTOR
  );
  console.log("scrollableContainer", scrollableContainer);
  const listContainer = document.querySelector(LINKEDIN_OFFERS_LIST_SELECTOR);
  console.log("listContainer", listContainer);
  if (scrollableContainer && listContainer) {
    scrollAndGrayOut();
  }
}
