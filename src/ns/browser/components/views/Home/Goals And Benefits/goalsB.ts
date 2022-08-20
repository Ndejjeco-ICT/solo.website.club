import { IWebComponents } from "ns/typings/schw";
import { createViewLinkerManger } from "ns/platform/positionRenderer/view_linker";

//get image sources that will be preloaded via webpack;

//@ts-ignore
import clImageSource1 from "ns/assets/site_images/home_view/cr_effectivestudents/biology.jpg";
//@ts-ignore
import clImageSource2 from "ns/assets/site_images/home_view/cr_effectivestudents/debate.jpg";
//@ts-ignore
import clImageSource3 from "ns/assets/site_images/home_view/cr_effectivestudents/talent.jpg";


const Template_ = document.createElement("template");
Template_.innerHTML = `
<div class="ponaco-splitview-3">
    <div class="wx-component-3">
        <div class="split-view">
            <div class="ctr-component-container">
                <div class="ctr-component-wrapper rx-component">
                    <div class="conic-section-1">
                        <div class="ctx-pictures-wrapper">
                            <div class="ctx-pic-1 cn-pic-box">
                                <div class="cn-picture-container">
                                    <picture class="cn-image-1-container">
                                        <img loading="lazy" alt="">
                                    </picture>
                                </div>
                                <div class="cn-info-container">
                                    <div class="cn-info-wrapper">
                                        <div class="cn-short-title">Research And Study</div>
                                        <div class="cn-short-title-2">Biology & Chemistry</div>
                                    </div>
                                </div>
                            </div>

                            <div class="ctx-additive-pics">
                                <div class="ctx-pic-1 cn-pic-box">
                                    <div class="cn-picture-container">
                                        <picture class="cn-image-2-container">
                                            <img loading="lazy" alt="">
                                        </picture>
                                    </div>
                                    <div class="cn-info-container">
                                        <div class="cn-info-wrapper">
                                            <div class="cn-short-title">Discuss And Renew</div>
                                            <div class="cn-short-title-2">Debate</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="ctx-pic-1 cn-pic-box">
                                    <div class="cn-picture-container">
                                        <picture class="cn-image-3-container">
                                            <img loading="lazy" alt="">
                                        </picture>
                                    </div>
                                    <div class="cn-info-container">
                                        <div class="cn-info-wrapper">
                                            <div class="cn-short-title">Creative Talent</div>
                                            <div class="cn-short-title-2">Music And Drama</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="conic-section-2">
                        <div class="wrapper">
                            <div class="content-wrapper benefits-content-holder">
                                <div class="cr-title">Building Effective Students</div>
                                <div class="cr-description">
                                    Our faculty lead students to reach further, to achieve their goals and to effect
                                    change in the professions and passions they pursue.
                                </div>
                                <div class="cr-xmore" title="Read More Ndejje">
                                    <ns-link href="./insights" classname="cr-rd">Read More</ns-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
`

export class GoalsBenefitsComponent extends HTMLElement implements IWebComponents {

    private _contentDataElementHandle: HTMLDivElement | null;

    private clImage1ContainerHost: HTMLImageElement | null = null;
    private clImage2ContainerHost: HTMLImageElement | null = null;
    private clImage3ContainerHost: HTMLImageElement | null = null;

    constructor() {
        super();
        this._contentDataElementHandle = null;
        this.appendChild(Template_.content.cloneNode(true))
    };
    connectedCallback() {
        this.initializeComponent()
    };
    initializeComponent() {
        this._createElementHandles()
        this.__createAnimationFacilityFunction();
        this.loadAllComponentImages()
    }

    async preloadImageSourceForImageHosts() {
        return new Promise<void>((c) => {
            if (this.clImage1ContainerHost && this.clImage2ContainerHost && this.clImage3ContainerHost) {
                this.clImage1ContainerHost.src = clImageSource1;
                this.clImage2ContainerHost.src = clImageSource2;
                this.clImage3ContainerHost.src = clImageSource3;
                setTimeout(() => {
                    c();
                },300)
            }
        })
       
    }

    async displayContentImageHost() {
        if (this.clImage1ContainerHost && this.clImage2ContainerHost && this.clImage3ContainerHost) {
            this.clImage1ContainerHost.style.opacity = "1";
            this.clImage2ContainerHost.style.opacity = "1";
            this.clImage3ContainerHost.style.opacity = "1";
        }
    }

    loadAllComponentImages() {
        this.preloadImageSourceForImageHosts().then(() => {
            this.displayContentImageHost();
        })
    }




    _createElementHandles() {
        this._contentDataElementHandle = this.querySelector(".conic-section-2 .wrapper")
        //attach image host elements
        this.clImage1ContainerHost = this.querySelector(".cn-image-1-container img");
        this.clImage2ContainerHost = this.querySelector(".cn-image-2-container img");
        this.clImage3ContainerHost = this.querySelector(".cn-image-3-container img");

    }

    /**
 * Animations inset and outsets
 */

    __viewLinkAnimationInset() {
        if (this._contentDataElementHandle) {
            this._contentDataElementHandle.style.animation = "__GoalsAnimation__  .5s forwards"
        }
    }
    __viewLinkAnimationOutset() {
        if (this._contentDataElementHandle) {
            this._contentDataElementHandle.style.opacity = "0";
            this._contentDataElementHandle.style.transform = "translateX(-50px)";
        }
    }
    __createAnimationFacilityFunction() {
        if (this._contentDataElementHandle) {
            createViewLinkerManger({
                element: this._contentDataElementHandle,
                linkPosition: 78,
                LinkerCallbacks: {
                    inset: () => {
                        this.__viewLinkAnimationInset()
                    },
                    outset: () => {
                        this.__viewLinkAnimationOutset()
                    }
                }
            })
        }
    }






};

customElements.define("ns-x-benefits", GoalsBenefitsComponent)
