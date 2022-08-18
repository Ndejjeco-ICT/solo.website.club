import { IWebComponents } from "ns/typings/schw";
import { createViewLinkerManger } from "ns/platform/positionRenderer/view_linker";

//@ts-ignore
import aboutBannerImage from "ns/assets/site_images/aboutsus_view/cr_banner_flow/crac02.jpg"

const Template_ = document.createElement("template");
Template_.innerHTML = `
<div class="xb-about-component">
    <div class="control-wrapper">
        <div class="xb-wrapper-2">
            <div class="banner-wrapper">
                <picture>
                    <img loading="lazy" src="${aboutBannerImage}" />
                </picture>
            </div>
        </div>
        <div class="xb-wrapper">
            <div class="tl-x-o-text">A Reflection of the Purpose and Personality of Ndejje.</div>
            <div class="xl-sub-content">...About us...</div>
        </div>
    </div>
</div>
`;

class WelcomeNote extends HTMLElement implements IWebComponents {
  private _contentHandler: HTMLDivElement | null = null;

  constructor() {
    super();
    this.appendChild(Template_.content.cloneNode(true));
  }
  connectedCallback() {
      this._initializeComponent()
  }
  private _initializeComponent() {
    this.__createComponentAttachment();
    this.__createAnimatiomFacilityFunction()
  }
  __createComponentAttachment() {
    this._contentHandler = this.querySelector(".xb-about-component .xb-wrapper");
  }
  __viewLinkAnimationInset() {
    if (this._contentHandler) {
      this._contentHandler.style.animation ="welcomeNoteAnimation_1 1.5s forwards";
    }
  }
  __viewLinkeAnimationOutset() {
    if (this._contentHandler) {
      this._contentHandler.style.opacity ="0";
      this._contentHandler.style.transform ="translateX(-100px)";
      this._contentHandler.style.animation ="";
    }
  }


  __createAnimatiomFacilityFunction(){
      if(this._contentHandler){
          createViewLinkerManger({
              element : this._contentHandler,
              linkPosition : 150,
              LinkerCallbacks : {
                  inset : ()=>{
                    this.__viewLinkAnimationInset()
                  },
                  outset : ()=>{
                    this.__viewLinkeAnimationOutset()
                  }
              }
          });
      }
  }
}

customElements.define("ns-x-welcomenote", WelcomeNote);
