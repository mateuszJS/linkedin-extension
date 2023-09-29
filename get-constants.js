function getConstants() {
  const ID_PREFIX = "cntvhg3c37nx2mz"; // just random to make sure other styles won't affect it

  return {
    STYLES_ID: `${ID_PREFIX}-styles`,
    OBSERVER_NAME: `${ID_PREFIX}-observer`,
    OFFER_MARKED_CLASS_NAME: `${ID_PREFIX}-offer-marked`,
    SAVE_COMPANIES_BUTTON_ID: `${ID_PREFIX}-save-companies-button`,
    SCANNING_LOADER_CLASS_NAME: `${ID_PREFIX}-scanning-loader`,
    ATTR_OFFERS_MARKED: `${ID_PREFIX}-offers-marked`,

    LINKEDIN_SCROLLABLE_CONTAINER_SELECTOR: ".jobs-search-results-list",
    LINKEDIN_OFFERS_LIST_SELECTOR: ".scaffold-layout__list-container",
    LINKEDIN_COMPANY_NAMES_SELECTOR: ".job-card-container__primary-description",
    LINKEDIN_OFFER_TITLE_SELECTOR: ".job-card-list__title",

    LINKEDIN_JOBS_PATH: "https://www.linkedin.com/jobs",

    OFFERS_DIVIDER: '","',
  };
}

// TODO: add error messages when any of the selectors doesn't work!!

// TODO: add a special label, when you applied for a company, but not with this job title
