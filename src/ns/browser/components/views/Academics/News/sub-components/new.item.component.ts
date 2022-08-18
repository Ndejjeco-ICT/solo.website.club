import {IWebComponents} from "ns/typings/schw";

const Template_ = document.createElement("template");
Template_.innerHTML = `
<div class="xb-news-item-component">
    <div class="xb-holder-wrapper">
        <div class="image-holder">
            <picture>
                <img loading="lazy" src/>
            </picture>
        </div>
        <div class="xb-content-holder">
            <div class="xb-title">
                <div class="xb-title-wrapper"></div>
            </div>
            <div class="xb-content-host">
                <div class="xb-content-host-wrapper"></div>
            </div>
        </div>
    </div>
</div>

`;


export class NewsItem extends HTMLElement implements IWebComponents {
    private _pictureManager:HTMLImageElement|null = null;
    private _contentTitle:HTMLDivElement|null = null;
    private _contentDataHost:HTMLDivElement|null = null;

    private _providedTitle:string = "";
    private _providedData:string = "";
    private _providerPictureSrc:string = "";
    constructor() {
        super();
        this.appendChild(Template_.content.cloneNode(true))
    }

    connectedCallback() {
        this.initializeComponent();
    }
    initializeComponent() {
        this.attachElements();
        this.setAndAnalyzeDataAttributes();
        this._setContentDataEvenly()

    };
    private attachElements() {
        this._contentTitle = this.querySelector(".xb-title-wrapper");
        this._contentDataHost = this.querySelector(".xb-content-host-wrapper");
        this._pictureManager = this.querySelector(".xb-holder-wrapper")
    }

    get picturesrc():string {
        return this.getAttribute("picturesrc")!
    }
    set picturesrc(value:string){
        if(value){
            this.setAttribute("picturesrc",value)
        }else{
            this.removeAttribute("pcituresrc")
        }
    }
    get labeltitle():string {
        return this.getAttribute("title")!
    }
    set labeltitle(value:string){
        if(value){
            this.setAttribute("labeltitle",value)
        }else{
            this.removeAttribute("labeltitle")
        }
    }
    get data():string {
        return this.getAttribute('data')!
    }
    set data(value:string){
        if(value){
            this.setAttribute("data",value);
        }else{
            this.removeAttribute("data")
        }
    }

    private _setContentDataEvenly(){
        if(this._contentTitle && this._contentDataHost && this._pictureManager){
            this._contentTitle.innerHTML = this._providedTitle;
            this._contentDataHost.innerHTML = this._providedData;
            this._pictureManager.src = ""
        }
    }

    setAndAnalyzeDataAttributes(){
        const dataAttribute = this.getAttribute("data")!;
        const labelAttribute = this.getAttribute("labeltitle");
        // const pictureSourceLabel = this.getAttribute("picturesrc")

        if(dataAttribute && labelAttribute ) {
            this._providedTitle = labelAttribute;
            this._providedData  = dataAttribute;
            // this._providerPictureSrc = pictureSourceLabel;

        }


    }
};


customElements.define("ns-x-newsitem",NewsItem)