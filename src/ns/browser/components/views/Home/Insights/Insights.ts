import { IWebComponents } from "ns/typings/schw";
import { createViewLinkerManger } from "ns/platform/positionRenderer/view_linker";
import { InsightsLoader } from "ns/browser/components/views/Home/Insights/Insights.strings";

//Image Sources for the initial Page Insights;






const Template_ = document.createElement("template");
Template_.innerHTML = `
<div class="ponaco-splitview-5">
    <div class="wx-insights-component">
        <div class="main-wrapper">
            <div class="content-title">
                <div class="content-title-wrapper">
                    Uniqueness of Ndejje S.S.S
                </div>
                <div class="content-sub-title-wrapper">
                    Get to Know About the good things about Ndejje.
                </div>
            </div>
            <div class="cards-container">
                <div class="card-wrapper-1">
                    <div class="card-wrapper-2">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


`

export class InsightsComponent extends HTMLElement implements IWebComponents {

    private _cardElementHandlers: NodeListOf<HTMLDivElement> | null;

    private _cardWrapper:HTMLDivElement|null = null;

    //hovered elements
  

    constructor() {
        super();
        this.appendChild(Template_.content.cloneNode(true))
        this._cardElementHandlers = null;
    }
    connectedCallback() {
        this.initializeComponent()
    }

    initializeComponent() {
        this._preloadInsightElements()
        this._createComponentAttachments();
        this._createAnimationFacilityFunction();
    }
    _preloadInsightElements(){
        this._cardWrapper = this.querySelector(".card-wrapper-2");

        if(this._cardWrapper){
            new InsightsLoader(this._cardWrapper)
        }
    }
    _createComponentAttachments() {
        this._cardElementHandlers = this.querySelectorAll<HTMLDivElement>(".card-x-component");
    };




    _createAnimationFacilityFunction() {
    if (this._cardElementHandlers) {
            this._cardElementHandlers.forEach((_cardElement) => {

                createViewLinkerManger({
                    element: _cardElement,
                    linkPosition: 250,
                    LinkerCallbacks: {
                        inset: () => {
                            _cardElement.style.animation = "__uniqueCardAnimation__ 1s forwards"
                        },
                        outset: () => {
                            // _cardElement.style.opacity = "0";
                            // _cardElement.style.transform = "translateY(-50px)"
                            // _cardElement.style.animation = ""
                        }
                    }
                })



            });
        }
    }


}


customElements.define("ns-x-insights", InsightsComponent);