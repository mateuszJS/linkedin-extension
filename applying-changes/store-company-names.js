function storeCompanyNames() {
  const { LINKEDIN_COMPANY_NAMES_SELECTOR } = getConstants()

  const companiesNamesLinks = document.querySelectorAll(LINKEDIN_COMPANY_NAMES_SELECTOR)
  chrome.storage.local.get('companyNames', ({ companyNames }) => {
    const updatedCompanyNames = [
      ...companyNames,
      ...Array.from(companiesNamesLinks).map(link => link.innerText),
    ]
    chrome.storage.local.set({
      companyNames: [...new Set(updatedCompanyNames)],
    });

    grayOutVisited()
  })
}

function addSaveResultsButton() {
  const { LINKEDIN_OFFERS_LIST_SELECTOR, SAVE_COMPANIES_BUTTON_ID } = getConstants()
  const offersList = document.querySelector(LINKEDIN_OFFERS_LIST_SELECTOR)

  if (!offersList) return

  const button = document.createElement('button')
  button.id = SAVE_COMPANIES_BUTTON_ID
  button.innerText = 'Save results'
  button.addEventListener('click', () => {
    button.innerText = 'Results saved!'
    storeCompanyNames()
  })
  offersList.parentElement.insertBefore(button, offersList.nextSibling)
}
