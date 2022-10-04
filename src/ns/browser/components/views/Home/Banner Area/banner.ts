import { IWebComponents } from "ns/typings/schw";
import { createViewLinkerManger } from "ns/platform/positionRenderer/view_linker";
//@ts-ignore
import bannerImageElement from "@image/home_view/cr_banner/banner001.jpg";

const template_ = document.createElement("template");

template_.innerHTML = `
<div class="ponaco-splitview-1">
    <div class="ponaco-control-wrapper">
        <div class="banner-image-container">
            <figure draggable="false" class="cn-picture-container">
                <img class="banner-image-host" alt="" loading="lazy">
            </figure>
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
    private bannerImageHost: HTMLImageElement | null = null;
    private bannerControlWrapper: HTMLDivElement | null = null;
    private mainSplitView: HTMLDivElement | null = null;

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

    async removeImageMask() {
        if (this.mainSplitView && this.bannerControlWrapper) {
            // this.mainSplitView.style.backgroundColor = "unset";
            this.bannerControlWrapper.style.opacity = "1";
        }
    }

    async loadBannerImageForMainComponent() {
        return new Promise<void>((c) => {
            if (this.bannerImageHost) {
                this.bannerImageHost.src = bannerImageElement;
                setTimeout(() => {
                    c()
                },1500)
            }
        })
      
    }

    //Intialize component
    initializeComponent() {
        this.__createComponentAttachment();
        this.loadBannerImageForMainComponent().then(() => {
            this.removeImageMask();
            this.__createAnimationFacilityFunction();
        });


    }
    __createComponentAttachment() {
        this.mainSplitView = this.querySelector(".ponaco-splitview-1");
        this.bannerControlWrapper = this.querySelector(".ponaco-control-wrapper")
        this.bannerImageHost = this.querySelector(".banner-image-host")
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