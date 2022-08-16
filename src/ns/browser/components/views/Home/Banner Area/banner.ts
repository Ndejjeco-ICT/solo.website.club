import { IWebComponents } from "ns/typings/schw";
import { createViewLinkerManger } from "ns/platform/positionRenderer/view_linker";


const template_ = document.createElement("template");

template_.innerHTML = `
<div class="ponaco-splitview-1">
    <div class="ponaco-control-wrapper">
        <div class="banner-image-container">
            <picture draggable="false" class="cn-picture-container">
                <img src="./resources/site-images/home-view/cr-banner/banner001.jpg" alt="" loading="lazy">
            </picture>
        </div>
        <div class="wx-component-user-section">
            <div class="welcome-note-section">
                <div class="note-1">Ndejje Senior Secondary School</div>
                <div class="note-2">Sharing And Educating Humanity.</div>
                <ns-enroll-button></ns-enroll-button>
            </div>
        </div>
    </div>
</div>
`


export class BannerAreaComponent extends HTMLElement implements IWebComponents {

    private _commonWelcomeComponentSection: HTMLDivElement | null;

    constructor() {
        super();
        this._commonWelcomeComponentSection = null;
        this.appendChild(template_.content.cloneNode(true));
    };
    connectedCallback() {
        this.initializeComponent();
    };

    static is() {
        return "ns-x-banner"
    }

    //Intialize component
    initializeComponent() {
        this.__createComponentAttachment();

    }
    __createComponentAttachment() {
        this._commonWelcomeComponentSection = this.querySelector(".welcome-note-section");
    };
    /**
     * Animations inset and outsets
     */

    __viewLinkAnimationInset() {
        if (this._commonWelcomeComponentSection) {
            this._commonWelcomeComponentSection.style.animation = "__bannerAnimation__  1s forwards"
        }
    }
    __viewLinkAnimationOutset() {
        if (this._commonWelcomeComponentSection) {
            this._commonWelcomeComponentSection.style.opacity = "0";
            this._commonWelcomeComponentSection.style.transform = "translateX(-50px)";
            this._commonWelcomeComponentSection.style.animation = ""
        }
    }

    /**
     * Create Animation Bed
     */

    __createAnimationFacilityFunction() {
        if (this._commonWelcomeComponentSection) {
            createViewLinkerManger({
                element: this._commonWelcomeComponentSection,
                linkPosition: 150,
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



}

customElements.define(BannerAreaComponent.is(), BannerAreaComponent)