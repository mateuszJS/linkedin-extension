window[getConstants().OBSERVER_NAME].disconnect()

getCollectionOfChanges().forEach(change => {
  if (document.querySelector(change.selector)) {
    change.reverse()
  }
})
