import { createViewLinkerManger } from "ns/platform/positionRenderer/view_linker";
import {IWebComponents} from "ns/typings/schw";

const __dataContainer = [
    {
        icon : "trophy",
        data : "Namutegere Elisha, Emerged the Best in UACE 2018 in the whole country"
    },
    {
        icon : "crown",
        data : "Matsiko Brought Joy and Pride to the school after Emmerging the best in Math contest."
    },
    {
        icon : "medal",
        data : "Amupaire Terisah Hannah emerged the Best student in Essay Writing in Nation Wide."
    }
]

const Template_ = document.createElement("template");
Template_.innerHTML = `
<div class="xb-awards-component">
    <div class="xb-title-area-component">
        <div class="xb-title-container">Awards</div>
    </div>
    <div class="xb-wrapper">
        <div class="xb-main-container">
                  
        </div>
    </div>
</div>
`;


export class Awards extends HTMLElement implements IWebComponents {
    private _itm1:NodeListOf<HTMLDivElement>|null = null;
    private _awardsContainer:HTMLDivElement|null = null;

    constructor() {
        super();
        this.appendChild(Template_.content.cloneNode(true));
    }


    connectedCallback() {
        this._initializeComponent();
    }

    private _loadAwardItemComponents(){
        if(this._awardsContainer){
            __dataContainer.forEach((_d)=>{
                const _E_ = `
                    <div class="xb-award-item">
                    <div class="xb-wrapper-container">
                        <div class="xb-icon-container">
                            <div class="xb-icon-container-wrapper">
                                <i class="fa-solid fa-${_d.icon}"></i>
                            </div>
                        </div>
                        <div class="xb-content-section">
                            <div class="xb-content-section-wrapper">${_d.data}</div>
                        </div>
                    </div>
                </div>
                `
                this._awardsContainer!.insertAdjacentHTML("afterbegin",_E_)
            })
        }
  
    }

    private _initializeComponent() {
        this._createComponentAttachment();
        this._loadAwardItemComponents()
    }

    private _createComponentAttachment() {
        this._itm1 = this.querySelectorAll(".xb-awards-component .xb-wrapper .xb-main-container ns-x-awarditem");
        this._awardsContainer = this.querySelector(".xb-main-container")

    }

    _viewLinkerAnimationInset(e:HTMLDivElement) {
        if(this._itm1) {
           e.style.animation = "welcomeNoteAnimation_1 2s forwards"
        }
    }

    __viewLinkerAnimationOutset() {
        if (this._itm1) {
        //   this._itm1.style.opacity ="0";
        //   this._itm1.style.transform ="translateX(-100px)";
        //   this._itm1.style.animation ="";
        }
    }

    _createAnimationHolder() {
        if(this._itm1) {
            this._itm1.forEach((e)=> {
                createViewLinkerManger({
                    element: e,
                    linkPosition: 150,
                    LinkerCallbacks: {
                        inset: () => {
                            this._viewLinkerAnimationInset(e);
                        },
                        outset: () => {
                            // this.__viewLinkerAnimationOutset();
                        }
                    }
                });
            })
        }
    }

};


customElements.define("ns-x-awards",Awards)