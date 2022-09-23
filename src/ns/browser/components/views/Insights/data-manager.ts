import {IIInsightsViewCard} from "ns/browser/components/views/Insights/data-provider";
import  {InsightViewNavigationEventListenerManager} from "ns/browser/components/views/Insights/view.insights"
 


export class InsightsViewCardManager {


    private _insightCardElements:IIInsightsViewCard[];
    private _mainHandlerBaseElement:HTMLDivElement|null = null;

    /**
     *
     */
    constructor(insightCardElements:IIInsightsViewCard[]) {
        this._insightCardElements = insightCardElements;
        this.initialize()
    };

    private _registerForEventListenersForInsightsWebComponent(){
        InsightViewNavigationEventListenerManager.addListener("query-overload-request",this._listenForQueryOverloadRequests.bind(this))
    };
    private async _listenForQueryOverloadRequests(_query:string){
        this._insightCardElements.forEach((_rt)=>{
            
            if(_rt.queryKey() == _query){
                _rt.wishToView();
            }
        })
    }
    private initialize(){
        this._createHandleForBaseElement();
        this._preloadAllInsightCardData();
        this._registerForEventListenersForInsightsWebComponent();
    }
    private _createHandleForBaseElement(){
        let _dr = document.querySelector(".split-card-view")! as HTMLDivElement;
        this._mainHandlerBaseElement = _dr;
    }

    private __attachProcessedCard(_element:HTMLDivElement){
        if(this._mainHandlerBaseElement){
            this._mainHandlerBaseElement.appendChild(_element)
        }
    }

    private _preloadAllInsightCardData(){
        this._insightCardElements.forEach((_e_)=>{
            this.__attachProcessedCard(_e_.connectInsightCardElementtoDOM())
        })
    }

}

