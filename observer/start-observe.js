doChanges() // to call it when we switching between tabs

window[getConstants().OBSERVER_NAME].observe(
  document.body,
  { childList: true, subtree: true },
)
