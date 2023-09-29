function addStyles() {
  const styleNode = document.createElement("style");
  const {
    OFFER_MARKED_CLASS_NAME,
    SAVE_COMPANIES_BUTTON_ID,
    STYLES_ID,
    SCANNING_LOADER_CLASS_NAME,
  } = getConstants();

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
      position: relative;
      background: url("${chrome.runtime.getURL(
        "/images/linkedin_ext_btn_background.png"
      )}");
      width: 100%;
      padding-top: 42%;
      background-size: cover;
      background-position: center;
    }
    #${SAVE_COMPANIES_BUTTON_ID} img {
      position: absolute;
    }
    #${SAVE_COMPANIES_BUTTON_ID} .text {
      width: 44%;
      top: 30%;
      left: 19.5%;
      transition: filter 0.2s ease;
    }
    #${SAVE_COMPANIES_BUTTON_ID} .dog-face {
      width: 21%;
      bottom: 12%;
      right: 0%;
    }
    #${SAVE_COMPANIES_BUTTON_ID} .radar {
      width: 18%;
      bottom: 52.5%;
      right: 5%;
      transform-origin: 56% 88%;
      transform: rotate(0deg);
      transition: transform 0.3s ease;
    }

    #${SAVE_COMPANIES_BUTTON_ID}:hover .radar {
      transform: rotate(-13deg);
    }

    #${SAVE_COMPANIES_BUTTON_ID}:hover .text {
      filter: drop-shadow(0 0 3px rgba(255, 255, 255, 1.1));
    }
    .${SCANNING_LOADER_CLASS_NAME} {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0.7);
    }

    .${SCANNING_LOADER_CLASS_NAME} .label {
      margin: 0 40px;
      align-self: stretch;
      background: none;
    }

    .${SCANNING_LOADER_CLASS_NAME} .loader-dog {
      max-width: 160px;
      position: relative;
    }

    .${SCANNING_LOADER_CLASS_NAME} .dog-face {
      width: 100%;
      transform: scale(-1, 1) translate(18px, 0px);
    }

    .${SCANNING_LOADER_CLASS_NAME} .radar {
      position: absolute;
      width: 77%;
      left: 14%;
      top: -44%;
      transform-origin: 55% 85%;

      animation-name: radar-move;
      animation-duration: 2s;
      animation-iteration-count: infinite;
    }

    @keyframes radar-move {
      0%   {transform: rotate(45deg);}
      50%   {transform: rotate(-15deg);}
      100%   {transform: rotate(45deg);}
    }

    .scaffold-layout__list {
      position: relative;
    }
  `;
  styleNode.id = STYLES_ID;
  styleNode.appendChild(document.createTextNode(css));
  document.head.appendChild(styleNode);
}
