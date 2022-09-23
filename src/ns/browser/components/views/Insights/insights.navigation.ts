import { createInstance } from "ns/base/instanceCreators/instanceCreators";
import { InsightViewNavigationEventListenerManager } from "ns/browser/components/views/Insights/view.insights"

/**
 * Insights navigation mechanism is the facility that enables navigaton between the readerview and the mainView
 * but one should watch out, for the fact that someone may enter a universal link , linking directly to a particular 
 * insight that is found on the readers view,
 * 
 * Mode of action:
 * when there is an (entered or by the ns-link) link in the search bar is for insights then lets goto the insights page
 * when we are at the insights page let interpret the entered url
 * contact the InsightsnavigationManagement to read the search parameters
 * when it reads the search parameters then the insights navigatin management can interpret the required 
 * Page to be shown, because the insightViewCards Are already preloaded
 * 
 * Mode Of action at Link entry;
 * the navigationManagement system spoofs an event to the available insightViewCard thats required --> validation test if it actually exists--> 404,
 * the available insightViewcard sends back a return message(data-package) to the InsightViewCardManager
 * then the InsightViewcardManager requests navigation ---$$$--- invokes the ContentDisplayManager
 * the navigationManagementSystem will ensure that is invokes navigation between the two views 
 * and then leave the rest to the contentDisplayManager
 */


export class InsightsNavigationManagment {

    private _mainView: HTMLDivElement | null = null;
    private _readersView: HTMLDivElement | null = null;

    private _mainViewIsVisible: boolean = false;
    private _readersViewIsVisible: boolean = false;


    constructor() {

        this._initializeNavigationManagementSystem();
    }
    private _createHandlesToTheAvialableViews() {
        if (this._mainView == null && this._readersView == null) {
            this._mainView = document.querySelector(".split-view-1")! as HTMLDivElement;
            this._readersView = document.querySelector(".split-view-2")! as HTMLDivElement;
        }
    }

    private _hideView(_views: "mainView" | "readersView"){
        if(_views == "mainView"){
            if(this._mainView){
                this._mainView.style.opacity = "0";
                this._mainView.style.display = "none";
            }
        }else{
            if(this._readersView){
                this._readersView.style.opacity = "0";
                this._readersView.style.display = "none";
            }
        }

    }
    private displayView(_views: "mainView" | "readersView") {
        if (_views == "mainView") {
            if (this._mainView) {
                if (this._readersViewIsVisible) {
                    this._hideView("readersView")
                    this._mainView.style.display = "block"
                    this._mainView.style.opacity = "1";
                    this._mainViewIsVisible = true;
                    this._readersViewIsVisible = false;
                }else{
                    this._mainView.style.display = "block"
                    this._mainView.style.opacity = "1";
                    this._mainViewIsVisible = true;
                }
            }
        } else {
            if (this._readersView) {
                if(this._mainViewIsVisible){
                    this._hideView("mainView")
                    this._readersView.style.display = "block"
                    this._readersView.style.opacity = "1";
                    this._readersViewIsVisible = true;
                    this._mainViewIsVisible = false;
                }else{
                    this._readersView.style.display = "block"
                    this._readersView.style.opacity = "1";
                    this._readersViewIsVisible = true;
                }
             
            }
        }
    }

    private _initializeNavigationManagementSystem() {
        this._createHandlesToTheAvialableViews();
        this._registerForEventListenersForInsightsWebComponent()
    }

    private _registerForEventListenersForInsightsWebComponent() {
        InsightViewNavigationEventListenerManager.addListener("request-navigation", this._listenerForNavigationRequests.bind(this))
    };
    private _listenerForNavigationRequests(_messagebundle: string) {
        console.log("calling for message bundles")
        if (_messagebundle == "no-query") {
            this.displayView("mainView");
        } else if (_messagebundle == "view-reader") {
            this.displayView("readersView")
        }
    }

}