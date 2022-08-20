import { IWebComponents } from "ns/typings/schw";
import { HomeView } from "ns/browser/components/views/Home/view.home";;
import { AboutView } from "ns/browser/components/views/About/view.about";
import { AcademicsView } from "ns/browser/components/views/Academics/view.academics";
import { BlogView } from "ns/browser/components/views/Blog/view.blog";
import {NavigationInitialRouteEventManager} from "ns/platform/ns-router/ns_router"
import { dialogHost ,IIDialogHost} from "ns/dialogHostManager";
import { InsightsView } from "ns/browser/components/views/Insights/view.insights";

type Views = "aboutus" | "academics" | "home" | "blog" | "insights"

const Template_ = document.createElement("template");
Template_.innerHTML = `
<div class="ns-main-container" nature="static-preloading">
    <div class="ns-main-wrapper">
        <div class="ns-main-dependencies">
            <div class="ns-insights-dependencies" static="dependencies">
                <dom-module key="interact">
                    <template></template>
                </dom-module>
                <dom-module key="junior-achievement">
                    <template></template>
                </dom-module>
                <dom-module key="students-council">
                    <template></template>
                </dom-module>
                <dom-module key="prefectorial-body">
                    <template></template>
                </dom-module>
                <dom-module key="clubs-forum">
                    <template></template>
                </dom-module>
                <dom-module key="writers">
                    <template></template>
                </dom-module>
                <dom-module key="ict">
                    <template></template>
                </dom-module>
            </div>

        </div>
        <ns-header></ns-header>
        <div class="ns-page-container">
            <ns-router>
                <ns-route key="home" path="/home">
                    <ns-home-view></ns-home-view>
                </ns-route>
                <ns-route key="aboutus" path="/aboutus">
                    <ns-about-view></ns-about-view>
                </ns-route>
                <ns-route key="blog" path="/blog">
                    <ns-blog-view></ns-blog-view>
                </ns-route>
                <ns-route key="academics" path="/academics">
                    <ns-academics-views>
                        </ns-academics-view>
                </ns-route>
                <ns-route key="insights" path="/insights">
                    <ns-insights-view></ns-insights-view>
                </ns-route>
            </ns-router>
        </div>
        <ns-footer></ns-footer>
    </div>
    <div class="ns-sub-wrapper" is="inactive">
        <div class="dialog-host">
            <div class="staff-dialog-wrapper">
                <ns-enroll style="display: none;"></ns-enroll>
                <div class="loader">
                    <div class="title">Just A Moment!</div>
                    <div class="linear-loader">
                        <div class="ld1 ldr-1"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

`
interface IViewManager {
    [key:string] : VIEWSTATES
}

type VIEWSTATES = "ONLINE" | "OFFLINE"

const VIEWS_MANAGER:IViewManager = {
    "HOME_VIEW": "OFFLINE",
    "ABOUT_VIEW": "OFFLINE",
    "BLOG_VIEW": "OFFLINE",
    "ACADEMICS_VIEW": "OFFLINE",
    "INSIGHTS_VIEW":"OFFLINE"
}

export class DefaultRootControl extends HTMLElement implements IWebComponents {

    private _homeViewKey: string = "ns-home-view"
    private _aboutViewKey: string = "ns-about-view";
    private _academicsViewkey: string = "ns-academics-view";
    private _blogViewKey: string = "ns-blog-view";
    private _insightsViewKey: string = "ns-insights-view";
    private __dialogHost: IIDialogHost | null = null;

    constructor() {
        super()
        this.beforeInitialization()
    }
    static is() {
        return "ns-root"
    }

    connectedCallback() {
        console.log("didConnectDefaultRoot container")
        this.initializeDefaultRoot()
        this.initializeRuntimeDependencies()
    }
    beforeInitialization() {
        NavigationInitialRouteEventManager.addListener("didFindInitialRoute",this.listenerForNavigationRouteLocation.bind(this))
    }
    initializeDefaultRoot() {
        this.appendChild(Template_.content.cloneNode(true))
    }

    listenerForNavigationRouteLocation(args:string) {
        let __viewLabel__ = args! as Views;
        this.__DEFINECUSTOMVIEW__(__viewLabel__)
    }

    __CHECKVIEWSTATE(view:Views) {
        if (view == "home") {
            if (VIEWS_MANAGER["HOME_VIEW"] == "OFFLINE") {
                customElements.define(this._homeViewKey, HomeView)
                VIEWS_MANAGER["HOME_VIEW"] = "ONLINE"
            }
        }

        if (view == "aboutus") {
            if (VIEWS_MANAGER["ABOUT_VIEW"] == "OFFLINE") {
                customElements.define(this._aboutViewKey, AboutView);
                VIEWS_MANAGER["ABOUT_VIEW"] = "ONLINE"
            }
        }

        if (view == "academics") {
            if (VIEWS_MANAGER["ACADEMICS_VIEW"] == "OFFLINE") {
                customElements.define(this._academicsViewkey, AcademicsView);
                VIEWS_MANAGER["ACADEMICS_VIEW"] = "ONLINE"
            }
        }

        if (view == "blog") {
            if (VIEWS_MANAGER["BLOG_VIEW"] == "OFFLINE") {
                customElements.define(this._blogViewKey, BlogView);
                VIEWS_MANAGER["BLOG_VIEW"] = "ONLINE"
            }
        }
        if (view == "insights") {
            if (VIEWS_MANAGER["INSIGHTS-VIEW"] == "OFFLINE") {
                customElements.define(this._insightsViewKey, InsightsView);
                VIEWS_MANAGER["INSIGHTS-VIEW"] = "ONLINE"
            }
        }
    }

    __DEFINECUSTOMVIEW__(view: Views) {
        switch (view) {
            case "aboutus":
                this.__CHECKVIEWSTATE("aboutus")
                break;
            
            case "academics":
                this.__CHECKVIEWSTATE("academics")
                break;

            case "home":
                this.__CHECKVIEWSTATE("home")
                break;
            case "blog":
                this.__CHECKVIEWSTATE("blog")
                break;
            case "insights":
                this.__CHECKVIEWSTATE("insights")
        }
    }
    initializeRuntimeDependencies() {
        this.__dialogHost = new dialogHost({
            subscribers: [
                {
                    element: this.querySelector("ns-enroll")!,
                    key : "enroll"
                }
            ]
        });
        this.__dialogHost.initializeDialogHost()
    }

    initializeViewExplicity(views: Views) {
        this.__DEFINECUSTOMVIEW__(views);
    }

}
