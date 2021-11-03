function getFileName() {
  const date = new Date()
  return `company_names_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.txt`
}

chrome.storage.local.get("companyNames", ({ companyNames }) => {
  const element = document.createElement('a')
  element.setAttribute('download', getFileName())

  const data = new Blob([`"${companyNames.join('","')}"`], {type: 'text/plain'})
  const url = window.URL.createObjectURL(data)
  element.setAttribute('href', url)

  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
})