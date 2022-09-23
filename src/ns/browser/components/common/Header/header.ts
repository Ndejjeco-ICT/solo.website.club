import { IWebComponents } from "ns/typings/schw";
import { addDisposableEventListener } from "ns/browser/common/domListener";
import { LinksManagerSystem } from "ns/platform/subTabOpener/linksManager";
import { NavigationInitialRouteEventManager,NAVIGATION_ROUTE_EVENTS } from "ns/platform/ns-router/ns_router";
// @ts-ignore
import Logo from "ns/assets/site_images/home_view/logo.png";


const Template_ = document.createElement('template');

Template_.innerHTML = `
<div class="wx-component-header-section">
    <div class="wx-header-component-area">
        <div class="wx-badge-wrapper">
            <div id="badge-icon">
                <picture>
                    <img loading="lazy" src="${Logo}"/>
                </picture>
            </div>
            <div class="badge-title">Ndejje Senior Secondary School</div>
        </div>
        <div class="wx-navigation-bar-half-area">
            <div class="navigation-bar-wrapper">
                <div class="main-navigation-bar">
                    <ul class="navigation-items">
                        <li id="Home-nav-control">
                            <ns-link className="active-link" href="./home">
                                Home
                            </ns-link>
                        </li>

                        <li id="about-nav-control">
                            <ns-link href="./aboutus" className="inactive-link">
                                About us
                            </ns-link>
                        </li>
                       
                        <li id="blog-nav-control">
                            <ns-link href="./blog" className="inactive-link">
                                Blog
                            </ns-link>
                        </li>
                        <li id="academics-nav-control">
                            <ns-link href="./academics" className="inactive-link">
                                Academics
                            </ns-link>
                            <li id="about-nav-control">
                                <ns-link href="./insights" className="inactive-link">
                                    Insights
                                </ns-link>
                            </li>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="accord-options">
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
    <div class="wx-bars">
        <i class="fa fa-bars"></i>
    </div>
</div>
`




export class HeaderComponent extends HTMLElement implements IWebComponents {

    /**
     * Get neccessary elements
     */

    //links
    private _homeNavControl: HTMLDivElement | null = null;
    private _blogNavControl: HTMLDivElement | null = null;
    private _aboutNavControl: HTMLDivElement | null = null;;
    private _academicsNavControl: HTMLDivElement | null = null;

    //control options
    //accordiaon options
    private facebookSourceLinkBtn: HTMLDivElement | null = null;
    private instagramSourceLinkBtn: HTMLDivElement | null = null;
    private twitterSourceLinkBtn: HTMLDivElement | null = null;



    //event listener bindings
    /**
     * Social Links event listeners
     */



    constructor() {
        super();
        this.appendChild(Template_.content.cloneNode(true))
    }
    connectedCallback() {
        this.initializeHeaderComponent();
    }
    initializeHeaderComponent() {
        this.attachNeccessaryElementHandles();
        this._attachSocialLinkksSystem();
        this.navigationInitialRouteListenerSubscriber()
    }

    attachNeccessaryElementHandles() {
        this._homeNavControl = this.getElement("Home-nav-control");
        this._blogNavControl = this.getElement("blog-nav-control");
        this._aboutNavControl = this.getElement("about-nav-control");
        this._academicsNavControl = this.getElement("academics-nav-control")
        this.facebookSourceLinkBtn = this.querySelector(".facebook-link");
        this.instagramSourceLinkBtn = this.querySelector(".instagram-link");
        this.twitterSourceLinkBtn = this.querySelector(".twitter-link");


    };

    _attachSocialLinkksSystem() {
        if (this.facebookSourceLinkBtn && this.instagramSourceLinkBtn && this.twitterSourceLinkBtn) {
            //click event listeners
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
    navigationInitialRouteListenerSubscriber() {
        NavigationInitialRouteEventManager.addListener(NAVIGATION_ROUTE_EVENTS.DID_NAVIGATE,this._listenerForNavigationRouteChange.bind(this))
    }


   

    _listenerForNavigationRouteChange(route: string) {
        this._removeAndReplaceActivityState(route)
    }



    _setActive(route: string) {
        switch (route) {
            case "aboutus":
                this._aboutNavControl!.querySelector("a")!.classList.add("active-link");
                break;

            case "home":
                this._homeNavControl!.querySelector("a")!.classList.add("active-link");
                break;

            case "academics":
                this._academicsNavControl!.querySelector("a")!.classList.add("active-link");
                break;

            case "blog":
                this._blogNavControl!.querySelector("a")!.classList.add("active-link");
                break;

            case "insights":
                break;
        }
    }
    _removeAndReplaceActivityState(newRoute: string) {
        const __activeRouteLink = this.querySelector(".active-link");
        __activeRouteLink!.classList.remove("active-link");

        this._setActive(newRoute)

    }



    getElement(_string: string): HTMLDivElement {
        return this.querySelector(`#${_string}`)! as HTMLDivElement
    }

}

customElements.define("ns-header", HeaderComponent);