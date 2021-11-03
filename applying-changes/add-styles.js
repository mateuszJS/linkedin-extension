function addStyles() {
  const styleNode = document.createElement('style')
  const {
    OFFER_MARKED_CLASS_NAME,
    SAVE_COMPANIES_BUTTON_ID,
    STYLES_ID,
  } = getConstants()

  const css = `
    .${OFFER_MARKED_CLASS_NAME} {
      position: relative;
      height: 36px;
      overflow: hidden;
    }
    .${OFFER_MARKED_CLASS_NAME}:after {
      position: absolute;
      content: "";
      display: block;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%);
    }
    .${OFFER_MARKED_CLASS_NAME} > * {
      opacity: 0.35;
    }
    #${SAVE_COMPANIES_BUTTON_ID} {
      padding: 20px;
      font-size: 20px;
      font-weight: 300;
      color: #333;
      -webkit-box-shadow: inset 0px 0px 24px -6px rgb(66 68 90);
      -moz-box-shadow: inset 0px 0px 24px -6px rgba(66, 68, 90, 1);
      box-shadow: inset 0px 0px 20px -11px rgb(0 0 0);
      transform: scale(1);
      transition: 0.3s ease transform;
    }
    #${SAVE_COMPANIES_BUTTON_ID}:hover {
      transform: scale(1.1);
    }
  `
  styleNode.id = STYLES_ID
  styleNode.appendChild(document.createTextNode(css));
  document.head.appendChild(styleNode)
}
