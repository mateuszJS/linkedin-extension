function getCollectionOfChanges() {
  const { STYLES_ID, ATTR_OFFERS_MARKED, SAVE_COMPANIES_BUTTON_ID } =
    getConstants();

  return [
    {
      selector: `#${STYLES_ID}`,
      apply: addStyles,
      reverse: () => console.log("remove styles"),
    },
    {
      selector: `[${ATTR_OFFERS_MARKED}]`,
      apply: markOffers,
      reverse: () => console.log("unmark offers"),
    },
    {
      selector: `#${SAVE_COMPANIES_BUTTON_ID}`,
      apply: addSaveResultsButton,
      reverse: () => console.log("remove save button"),
    },
  ];
}
