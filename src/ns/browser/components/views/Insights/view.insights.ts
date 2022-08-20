import { addDisposableEventListener } from "ns/browser/common/domListener";
import { IWebComponents } from "ns/typings/schw";

const Template_ = document.createElement("template")
Template_.innerHTML = `
<div class="insights-control-template">
    <div class="wrapper">
        <div class="controls-container">
            <div class="back">
                <i class="fa fa-back"></i>
            </div>
        </div>
        <div class="main-wrapper">
            <div class="control-title-area">
                <div class="image-banner-component">
                    <picture>
                        <img loading="lazy" src="">
                    </picture>
                </div>
                <div class="cr-title">#Insights</div>
            </div>
            <div class="control-components-wrapper">
                <div class="cr-component">
                    <div class="wrapper">
                        <div class="image-container">
                            <picture>
                                <img loading="lazy" src="" alt="">
                            </picture>
                        </div>
                        <div class="centrum-title">Interact Club</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

`;

export class InsightsView extends HTMLElement implements IWebComponents {

    private _closeControlManager:HTMLDivElement|null = null;

    constructor(){
        super();
        this.appendChild(Template_.content.cloneNode(true))
    }
    connectedCallback(){
        console.log("Insights component connected")
    }

    initializeComponent(){
        this.attachElements();
        this.attachEventListeners();
    }
    attachElements() {
        this._closeControlManager  = this.querySelector(".cl-close-ctrl");
    }

    attachEventListeners(){
        if(this._closeControlManager){
            addDisposableEventListener(this._closeControlManager,"click",this.navigateBackToBasePage.bind(this))
        }
    }

    navigateBackToBasePage(){
        history.back()
    }

}

customElements.define("ns-insights-view",InsightsView)