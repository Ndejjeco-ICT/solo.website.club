import { IWebComponents } from "ns/typings/schw";
import { addDisposableEventListener } from "ns/browser/common/domListener";
import { LifeCycleEvents, Lifecycle } from "ns/browser/common/lifecycle";
import { LinksManagerSystem } from "ns/platform/subTabOpener/linksManager";


/**
 * The common footer of all hashed Pages that loads synchrously to the page workflow.
 */


const Template_ = document.createElement("template");
Template_.innerHTML = `
<div class="footer-main-outlet">
    <div class="footer-wrapper">
        <div class="section-1">
            <div class="text-container">
                <div class="cl-1">Joy And Pride</div>
                <div class="cl-2">"No Pains No Gains"</div>
            </div>
            <div class="tr-enroll-container">
                <div class="enroll-jk">Join Us!</div>
            </div>
        </div>

        <div class="line-divider"></div>

        
        <div class="section-2">
            <div class="main-wrappper">
                <div class="sl-1 slw">
                    <div class="title">Menu</div>
                    <div class="lm-content">
                        <div class="lse">Home</div>
                        <div class="lse">About us</div>
                        <div class="lse">Academics</div>
                        <div class="lse">Insights</div>
                        <div class="lse">Blog</div>
                    </div>
                    <div class="social-media">
                        <div class="control-options">
                            <div class="facebook-link" title="Join us On Facebook">
                                <i class="fa-brands fa-facebook"></i>
                            </div>
            
                            <div class="instagram-link" title="Follow us on Instagram">
                                <i class="fa-brands fa-instagram"></i>
                            </div>
            
                            <div class="twitter-link" title="Follow us on Twitter">
                                <i class="fa-brands fa-twitter"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sl-2 slw">
                    <div class="title">Support</div>
                    <div class="lm-content">
                        <div class="lse" title="+25772410852">Contact</div>
                        <div class="lse" title="ndejjes@gmail.com">Email</div>
                    </div>
                    <div class="ipl-lift"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="copyright-label">
        &copy; Copyright Ndejje S.S.S. All rights reserved
    </div>
</div>
`

export class FooterComponent extends HTMLElement implements IWebComponents {

    //accordiaon options
    private facebookSourceLinkBtn: HTMLDivElement | null = null;
    private instagramSourceLinkBtn: HTMLDivElement | null = null;
    private twitterSourceLinkBtn: HTMLDivElement | null = null;

    constructor() {
        super();
        this.appendChild(Template_.content.cloneNode(true))
    };
    connectedCallback() {
        this.initializeComponent()
    };
    /**
     * Initialize  the component once.
     */
    initializeComponent(){
        this.attachComponentDOMELements();
        this.addDisposableEventListenerMechanismToIcons()

        /**
         * The Lifecyle Line.. The Principle Line. for the footer.
         * Called when the whole website has been restored.
         */
        LifeCycleEvents.phase = Lifecycle.Restored;
    }
    /**
     * Attach DOM Elements.
     */
    attachComponentDOMELements(){
        this.facebookSourceLinkBtn = this.querySelector(".facebook-link");
        this.instagramSourceLinkBtn = this.querySelector(".instagram-link");
        this.twitterSourceLinkBtn = this.querySelector(".twitter-link");
    }
    addDisposableEventListenerMechanismToIcons() {
        if (this.facebookSourceLinkBtn && this.instagramSourceLinkBtn && this.twitterSourceLinkBtn) {
            addDisposableEventListener(this.facebookSourceLinkBtn, "click", this.navigateResourceLocationToFacebook.bind(this));
            addDisposableEventListener(this.instagramSourceLinkBtn, "click", this.navigateResourceLocationToInstagram.bind(this));
            addDisposableEventListener(this.twitterSourceLinkBtn, "click", this.navigateResourceLocationToTwitter.bind(this));
        }
    };
    navigateResourceLocationToFacebook() {
        LinksManagerSystem.LinkToFaceBook()
    }
    navigateResourceLocationToInstagram() {
        LinksManagerSystem.LinkToInstagram();
    }
    navigateResourceLocationToTwitter() {
        LinksManagerSystem.LinkToTwitter()
    }

}

customElements.define("ns-footer", FooterComponent);