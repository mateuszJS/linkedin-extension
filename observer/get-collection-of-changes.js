function getCollectionOfChanges() {
  const {
    STYLES_ID,
    OFFERS_LIST_MARKED_ATTR,
    SAVE_COMPANIES_BUTTON_ID,
  } = getConstants()

  return [
    {
      selector: `#${STYLES_ID}`,
      apply: addStyles,
      reverse: () => console.log('remove styles')
    },
    {
      selector: `[${OFFERS_LIST_MARKED_ATTR}]`,
      apply: markOffers,
      reverse: () => console.log('unmark offers'),
    },
    {
      selector: `#${SAVE_COMPANIES_BUTTON_ID}`,
      apply: addSaveResultsButton,
      reverse: () => console.log('remove save button')
    },
  ]
}