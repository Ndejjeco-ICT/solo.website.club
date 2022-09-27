// @ts-ignore
// @ts-ignore
import prefectorialBody from "ns/assets/site_images/home_view/cr_insights/prefects.jpg";
// @ts-ignore
// @ts-ignore
import interactclub from "ns/assets/site_images/home_view/cr_insights/interactclub.jpg";
// @ts-ignore
import juniorarchiever from "ns/assets/site_images/home_view/cr_insights/juniorachiver.jpg";
// @ts-ignore
import studentscouncil from "ns/assets/site_images/home_view/cr_insights/studentscouncil.jpg";
// @ts-ignore
import writers from "ns/assets/site_images/home_view/cr_insights/writers.jpg";
// @ts-ignore
import ictclub from "ns/assets/site_images/home_view/cr_insights/club.ict/clv.jpg";

import {readerViewEventManager} from "ns/browser/components/views/Insights/readerViewManager"


//scaled data map 

/**
 * create constant handle to card content manager
 */


export interface IInsightsMapedContent {
    key: string,
    data: {
        moto?: string,
        cl1?: string,
        cl2?: string,
        cl3?: string,
        cl4?: string,
        cl5?: string,
        cl6?: string,
        writer?: string,
        "links-sources" : Array<{label : string,link : string}>
    }
}
export interface IInsightsMapedData {
    "insights-data": IInsightsMapedContent[]
}

export interface IIInsightsViewCard {

    connectInsightCardElementtoDOM():HTMLDivElement;
    queryKey():string;
    wishToView():void;
} 


export interface IIInsightsDataBundle {
    moto: string,
    cl1: string,
    cl2: string,
    cl3: string,
    cl4: string,
    cl5: string,
    cl6: string,
    writer: string,
    key :string,
    imageSource:string,
    "links-sources" : Array<{label : string,link : string}>
}

export class InsightsViewCard  implements IIInsightsViewCard{

    private _cl1: string | null = null;
    private _cl2: string | null = null;
    private _cl3: string | null = null;
    private _cl4: string | null = null;
    private _cl5: string | null = null;
    private _cl6: string | null = null;
    private _moto: string|null = null;
    private _writer: string|null = null;
    private _linksSources:Array<{label : string,link : string}>|null = null;
    private _key: string = "";
    private _controlDivElement: HTMLDivElement | null = null;
    private _imageSource:string = "";
    private _mapedData: IInsightsMapedContent;
    private _insightLabelName:string = "";
    private _baseDivElement:HTMLDivElement|null = null;
    private _generatedDataPackage:IIInsightsDataBundle|null = null;

    constructor(_data: IInsightsMapedContent) {
        this._mapedData = _data;
        this._initialize()
    };

    private _initialize(){
        this._runSetupProcessEfficently()
    }

    private readAndAttachData() {
        if (this._mapedData != null) {

            this._key = this._mapedData.key;
            this._cl1 = this._mapedData.data.cl1 ?? null;
            this._cl2 = this._mapedData.data.cl2 ?? null;
            this._cl3 = this._mapedData.data.cl3 ?? null;
            this._cl4 = this._mapedData.data.cl4 ?? null;
            this._cl5 = this._mapedData.data.cl5 ?? null;
            this._cl6 = this._mapedData.data.cl5 ?? null;
            this._writer = this._mapedData.data.writer ?? null;
            this._moto = this._mapedData.data.moto ?? null;
            this._linksSources = this._mapedData.data["links-sources"]


        }
    };

    private formatMainKeyLabel(){
        if(this._key.charAt(0)) {
            let _formattedString = `@${this._key}`;
            this._insightLabelName = _formattedString;
        }
    }

    private _readAndFormatPropsedImageSourceFromKey() {
        if(this._key.charAt(0)){

            switch (this._key) {
                case "interact-club" :
                    this._imageSource = interactclub;
                break;

                case "junior-achievement":
                    this._imageSource = juniorarchiever;
                break;

                case   "students-council" :
                    this._imageSource = studentscouncil;
                break;

                case  "writers-club":
                    this._imageSource = writers;
                break;

                case "prefecture":
                    this._imageSource = prefectorialBody;
                break;

                case  "ict-club": 
                    this._imageSource = ictclub;
                break;
            }

        }

    };
    private prepareProsedCardTemplate(_imageLabel:string,_insightlabel:string) {
        let _cr = `
        <div class="card-wrapper">
            <div class="picture-container-wrapper">
                <picture>
                    <img loading="lazy"  src="${_imageLabel}">
                </picture>
            </div>
            <div class="cover-mask-container">
                <div class="content-wrapper">${_insightlabel}</div>
            </div>
        </div>
        `;
        return _cr;
    };

    private createContainingBaseAndAttachTemplateDivElement(template:string) {
        if(this._key.charAt(0)){
            let _mainclassList = ["card-component",this._key];
            let _xtr = document.createElement("div");
            _xtr.classList.add(..._mainclassList);
            _xtr.insertAdjacentHTML("afterbegin",template);
            this._baseDivElement = _xtr;
        }
    }

    private _generatedPrefedefinedTemplate(){
        let _tempate = this.prepareProsedCardTemplate(this._imageSource,this._insightLabelName);
        this.createContainingBaseAndAttachTemplateDivElement(_tempate)
    }

    private _generateQueryLink(query:string){
        let _fg = `${window.location.href}?query=${query}`;
        return _fg
    }

    private attachEventListenerForInsightCardElement(){
        if(this._baseDivElement){
            this._baseDivElement.addEventListener("click",()=>{
                window.location.href  = this._generateQueryLink(this._key)
                //Controlled Event Listener
            })
        }
    };

    private _runSetupProcessEfficently(){
        this.readAndAttachData();
        this.formatMainKeyLabel();
        this._readAndFormatPropsedImageSourceFromKey();
        this._generatedPrefedefinedTemplate();
        this.attachEventListenerForInsightCardElement();
    }
    public connectInsightCardElementtoDOM() {
        return this._baseDivElement!;

    }
    private _getDataBundle(){
        let _data:IIInsightsDataBundle = {
            cl1 : this._mapedData.data.cl1!,
            cl2 : this._mapedData.data.cl2!,
            cl3 : this._mapedData.data.cl3!,
            cl4 : this._mapedData.data.cl4!,
            cl5 : this._mapedData.data.cl5!,
            cl6 : this._mapedData.data.cl6!,
            imageSource : this._imageSource,
            key : this._key!,
            moto : this._mapedData.data.moto!,
            writer : this._mapedData.data.writer!,
            "links-sources" : this._mapedData.data["links-sources"]
        };
        return _data;
    }



    public queryKey(): string {
        return this._key!
    }
    public wishToView(): void {
        readerViewEventManager.emit("data-package",this._getDataBundle())
    }

}