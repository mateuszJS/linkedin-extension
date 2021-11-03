function markNodeAsVisited(linkNode) {
  const { OFFER_MARKED_CLASS_NAME } = getConstants()
  linkNode
    .parentElement
    .parentElement
    .parentElement
    .parentElement
    .parentElement
    .classList.add(OFFER_MARKED_CLASS_NAME)
}

function grayOutVisited() {
  const { LINKEDIN_COMPANY_NAMES_SELECTOR } = getConstants()
  chrome.storage.local.get('companyNames', ({ companyNames }) => {
    const companiesNamesLinks = document.querySelectorAll(LINKEDIN_COMPANY_NAMES_SELECTOR)
    const visibleCompaniesNames = Array.from(companiesNamesLinks)

    visibleCompaniesNames.forEach(companyNameLink => {
      if (companyNames.includes(companyNameLink.innerText)) {
        markNodeAsVisited(companyNameLink)
      }
    })
  })

  
  // const paginationContainerNode = document.querySelector(
  //   '.artdeco-pagination__pages.artdeco-pagination__pages--number'
  // )
    
  // const grayOutNextPage  = () => {
  //   applyResults()
  //   paginationContainerNode.removeEventListener('click', grayOutNextPage)
  // }
  // paginationContainerNode.addEventListener('click', grayOutNextPage)
}


function scrollAndGrayOut() {
  const {
    LINKEDIN_SCROLLABLE_CONTAINER_SELECTOR,
    LINKEDIN_OFFERS_LIST_SELECTOR,
    OFFERS_LIST_MARKED_ATTR,
  } = getConstants()

  const scrollableContainer = document.querySelector(LINKEDIN_SCROLLABLE_CONTAINER_SELECTOR)
  const listContainer = document.querySelector(LINKEDIN_OFFERS_LIST_SELECTOR)

  if (listContainer.children.length === 0) return

  // We are modifying first child, because only children is list are rerendered by linkedin
  // list wrapper stays same
  listContainer.children[0].setAttribute(OFFERS_LIST_MARKED_ATTR, true)

  const interval = setInterval(
    () => {
      scrollableContainer.scrollTop += scrollableContainer.offsetHeight
      const areAllChildrenFilled = Array.from(listContainer.children)
        .every(child => child.children.length > 0)

      if (areAllChildrenFilled) {
        clearInterval(interval)
        grayOutVisited()
        scrollableContainer.scrollTop = 0
      }
    },
    scrollableContainer.offsetHeight / 2
  )
}

function markOffers() {
  const {
    LINKEDIN_SCROLLABLE_CONTAINER_SELECTOR,
    LINKEDIN_OFFERS_LIST_SELECTOR,
  } = getConstants()

  const scrollableContainer = document.querySelector(LINKEDIN_SCROLLABLE_CONTAINER_SELECTOR)
  const listContainer = document.querySelector(LINKEDIN_OFFERS_LIST_SELECTOR)
  if (scrollableContainer && listContainer) {
    scrollAndGrayOut()
  }
}
