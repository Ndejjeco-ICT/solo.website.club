import { IWebComponents } from "ns/typings/schw";
import { InsightsNavigationManagment } from "ns/browser/components/views/Insights/insights.navigation";
import {commonEvents} from "ns/browser/common/events";
import { createInstance } from "ns/base/instanceCreators/instanceCreators";
import { CardMainDataManagementSystem } from "ns/browser/components/views/Insights/card_maindata";
import  {readerViewManager} from 'ns/browser/components/views/Insights/readerViewManager'
import { addDisposableEventListener } from "ns/browser/common/domListener";
import { NavigationInitialRouteEventManager,NAVIGATION_ROUTE_EVENTS } from "ns/platform/ns-router/ns_router";

// @ts-ignore

const Template_ = document.createElement("template");
Template_.innerHTML = `
<div class="insights-view-container">
    <div class="common-wrapper">
        <div class="split-view-area">
            <div class="split-view-1 view-split">
                <div class="control-header-component">
                    <div class="title-wrapper">
                        <div class="common-control-title-wrapper">
                            <div class="descript-content-title">
                                <span class="common-title">Ndejje Insights</span>
                                <div class="tr-title">Get to Know.... @Ndejje</div>
                            </div>
                        </div>
                    </div>
                    <div class="date-wrapper">
                        <span class="date-updater">12/09.2020</span>
                    </div>
                </div>
                <div class="insight-card-area">
                    <div class="card-wrapper">
                        <div class="split-card-view">
                        </div>
                    </div>
                </div>
            </div>
            <div class="split-view-2 view-split">
                <div class="main-area-wrapper">
                    <div class="content-wrapper">
                        <div class="navigaton-area">
                            <div class="back-navigation-btn" title="Go Back To Insights">
                                <i class="fas fa-arrow-left"></i>
                            </div>
                            <div class="title-area">Insights</div>
                        </div>
                        <div class="main-content-section">
                            <div class="cover-mask-content-area">
                                <div class="picture-container">
                                    <figure>
                                        <img class="cl-image" loading="lazy" src="">
                                    </figure>
                                    <div class="designer-ders">
                                        <div class="der-1 bm"></div>
                                        <div class="der-1 cm" ></div>
                                    </div>
                                </div>
                                <div class="key-insight-tr"></div>
                            </div>
                            <div class="sub-section-content-area">
                                <div class="text-main-wrapper">
                                    <div class="porb-question-area"></div>
                                    <div class="prob-header-area">
                                        <div class="prop-header-wrapper">
                                            <div class="cp-picture-content-area">
                                                <div class="writter-content-holder"></div>
                                            </div>
                                            <div class="cp-info-area">
                                                <div class="_info_areas">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="central-content">
                                        <div class="content cl1"></div>
                                        <div class="content cl2"></div>
                                        <div class="content cl3"></div>
                                        <div class="content cl4"></div>
                                        <div class="content cl5"></div>
                                        <div class="content cl6"></div>
                                    </div>
                                    <div class="header-hub">No Pains No Gains</div>
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

type queriesThatArePresent = "interact-club"|"junior-achievement"|"students-council"|"prefecture"|"ict-club"| "writers-club"
export const InsightViewNavigationEventListenerManager = new commonEvents<any>()

export class InsightViewContolComponent extends HTMLElement implements IWebComponents {

    private _readerViewBackBtn:HTMLDivElement|null = null;
    constructor(){
        super();
        this.beforeIntialization();
    }
    connectedCallback(){
        this.intiaitlizeInsightsView();
        this.intializeInsightsViewCardNavigationSystem();
        this.initializeReaderViewNavigationSystem();
        this.__attachDomDepedencyControls()
    }
    private beforeIntialization(){
        this.registerForDidChangeRoute()
    }
    private __attachDomDepedencyControls(){
        this._readerViewBackBtn = this.querySelector(".back-navigation-btn");
        this._removableEventListenerToBackBtn()
    }
    private _removableEventListenerToBackBtn(){
        if(this._readerViewBackBtn){
            addDisposableEventListener(this._readerViewBackBtn,"click",()=>{
                history.back();
            })
        }
    }
    async attachSideChainReaderInsightsViewSystem(){
        return new Promise<void>((c)=>{
            createInstance<any>(CardMainDataManagementSystem);
            c()
        })
    }
    
    private registerForDidChangeRoute(){
       window.addEventListener("popstate",()=>{
        
            this._listenerForRouteChange()
       })

    }
    private _listenerForRouteChange(){
        this.carryOutARebuffCheckForRoute()
    }

    private async carryOutARebuffCheckForRoute(){
        return new Promise<void>((c)=>{
            const _currentlyEnteredLocation  = window.location.href;
            const _searcParameterSeparator  = new URLSearchParams(_currentlyEnteredLocation);
    
            
    
            if(_searcParameterSeparator.has("query")){
                console.log("entries exist")
                //send message query to the insight view card
                let __availedQuery = _searcParameterSeparator.get("query")!
    
    
                /**
                 * must check if  the requested query exists
                 */
                InsightViewNavigationEventListenerManager.emit("query-overload-request",__availedQuery)
    
            }
            c()
        })
    }

    intializeInsightsViewCardNavigationSystem(){
        this.attachSideChainReaderInsightsViewSystem().then(()=>{
            createInstance<any>(InsightsNavigationManagment)
            this.checkAndConfirmTheUrlLinkForTheInsights()
        })
        
    }
    initializeReaderViewNavigationSystem(){
        createInstance<any>(readerViewManager)
    }
   
     checkAndConfirmTheUrlLinkForTheInsights() {
        const _currentlyEnteredLocation  = window.location;

        if(_currentlyEnteredLocation.search.match(/\?query=(interact-club|junior-achievement|students-council|prefecture|ict-club|writers-club)/)){
            console.log("entries exist")
            //send message query to the insight view card
            const __query = new URL(_currentlyEnteredLocation.href)
            let _q = __query.searchParams.get("query")
            console.log(_q)

            /**
             * must check if  the requested query exists
             */
            InsightViewNavigationEventListenerManager.emit("query-overload-request",_q)


        }else {

            InsightViewNavigationEventListenerManager.emit("request-navigation","no-query")
        }
    }
    intiaitlizeInsightsView(){
        this.appendChild(Template_.content.cloneNode(true))
    }

}


