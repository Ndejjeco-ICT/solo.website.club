import {IWebComponents} from "ns/typings/schw";
import  {NewsItemComponentLoader} from "ns/components/views/Academics/News/data/data"

const Template_ = document.createElement("template");
Template_.innerHTML = `

<div class="xb-news-component">
    <div class="xb-title-area-container">
        <div class="xb-title-area">Latest News in Academics</div>
    </div>
    <div class="xb-wrapper">
        <div class="xb-wrapper-container">
            <div class="xb-split-view">
            </div>
        </div>
    </div>
</div>

`;


export class NewsControl extends HTMLElement implements IWebComponents {
    private _newItemElementHost:HTMLDivElement|null = null;
    constructor() {
        super();
        this.appendChild(Template_.content.cloneNode(true))
    }

    connectedCallback() {
        this.initializeComponent()
    }
    initializeComponent(){
        this.attachElements();
        this.loadNewsItemComponents()
    }
    attachElements(){
        this._newItemElementHost = this.querySelector(".xb-split-view");
    };
    loadNewsItemComponents(){
        if(this._newItemElementHost){
            new NewsItemComponentLoader(this._newItemElementHost);
        }
    }
};


customElements.define("ns-x-news",NewsControl)