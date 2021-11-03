function doChanges() {
  const { LINKEDIN_JOBS_PATH } = getConstants()

  if (!window.location.href.startsWith(LINKEDIN_JOBS_PATH)) return

  getCollectionOfChanges().forEach(change => {
    if (!document.querySelector(change.selector)) {
      change.apply()
    }
  })
}

if (!window[getConstants().OBSERVER_NAME]) {
  window[getConstants().OBSERVER_NAME] = new MutationObserver(debounce(doChanges, 1000))
}
