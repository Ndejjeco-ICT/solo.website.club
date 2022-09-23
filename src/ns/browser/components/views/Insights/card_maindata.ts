// @ts-ignore
import {ejsStrings} from "ns/browser/components/views/Insights/strings"
import { IInsightsMapedData } from "ns/browser/components/views/Insights/data-provider";
import { InsightsViewCard } from "ns/browser/components/views/Insights/data-provider";
import { InsightsViewCardManager } from "ns/browser/components/views/Insights/data-manager";




export class CardMainDataManagementSystem {

    private _insightViewCards:InsightsViewCard[] = [];
    private _insightCardManager:InsightsViewCardManager|null = null;
    constructor(){
        this._initialize()
    }
    private _initialize(){
        this._readCommonJSONData()
        this._LoadInsightsCardViewsWithinManager()
    };

    private _readCommonJSONData(){
        let __json = JSON.parse(JSON.stringify(ejsStrings))! as unknown as IInsightsMapedData;
        __json["insights-data"].forEach((_dataBaseContent)=>{
            this._insightViewCards.push(
                new InsightsViewCard(_dataBaseContent)
            )
        })
    }

    private async  _LoadInsightsCardViewsWithinManager(){
        if(this._insightCardManager == null && this._insightViewCards.length  > 0){
            this._insightCardManager = new InsightsViewCardManager(this._insightViewCards)
        }
    }
}
