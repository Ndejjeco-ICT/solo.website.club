import { addDisposableEventListener } from "ns/common/domListener";
import { IWebComponents } from "ns/typings/schw";

const Template_ = document.createElement("template")
Template_.innerHTML = `
<div class="insights-view-container">
    <div class="cl-wrapper">
        <div class="cl-control-header-section">
            <div class="cl-page-controls">
                <div class="cl-close-ctrl" title="Go back to HomePage">
                    <div class="icon-wrapper">
                        &times;
                    </div>
                </div>
                <div class="cl-title">Ndejje Senior Secondary School | Interact Club</div>
            </div>
            <div class="cl-common-content-image">
                <div class="cl-cl-wrapper">
                    <div class="cl-content-text">Interact Club</div>
                </div>
                <div class="cl-boundary-container">
                    <div class="cl-half-boundary-image"></div>
                </div>
            </div>
        </div>

        <div class="cl-main-content">
            <div class="cl-main-content-wrapper">
                <div class="cl-header-content-manager">
                    <div class="cl-half-1">
                        <div class="cl-i"></div>
                        <div class="cl-i-2">@Interact_club</div>
                    </div>
                    <div class="cl-half-2">
                        <div class="cl-common-link">
                            <div class="cl-icon-wrapper">
                                <i class="fa-brands fa-twitter"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!--startup image-->
                <div class="cl-content-image-1">
                    <div class="cl-image"></div>
                </div>
                <!--Startup content-->
                <div class="cl-content-1">
                    <span class="clp">
                        <span>I</span>nteract members, interact, rotaracters,Rotarians. Rotary, rotary is a voluntary, non profit,
                        non-governmental, academic automous, devout in providing self education, knowledge and
                        humanitarian
                        aid. Having such a powerful mentor(The rotary), as interacters we are able to give joy to
                        people,
                        add a smile on their faith through simple tools like helping people, fighting hunger by feeding
                        the
                        hungry amongst others
                    </span>
                </div>

                <!--Club Motto-->
                <div class="cl-content-section-2">
                    <div class="cl-text-wrapper">...Service Above Self...</div>
                </div>
                <!--Club Image-->
                <div class="cl-content-section-2-image">
                    <div class="image-wrapper"></div>
                </div>
                <!--Club content-->
                <div class="cl-content-2">
                    <span class="clp-2">
                        One may ask, WHAT IS INTERACT? Its really simple. Interact is meeting amazing people. Interact
                        is
                        wealth. Interact is wealth. Interact is family make a difference with both local and global
                        initiatives. Being under rotary we have a great national impact not forgetting being a no limit.
                        Organization having a diverse base of people providing further services.
                        Serving other s beyond self, from an idea introduced during a fellowship, ideas exchanged and
                        ideas
                        turned to reality.
                    </span>
                </div>

            </div>


        </div>
    </div>
</div>
`;

class InsightsView extends HTMLElement implements IWebComponents {

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