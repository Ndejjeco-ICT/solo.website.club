import {IWebComponents} from "ns/typings/schw";



const Template_ = document.createElement("template");
Template_.innerHTML = `

<div class="xb-culture-component">
    <div class="xb-title-area-wrapper">
        <div class="xb-title-container">...Life And Culture...</div>
        <div class="xb-title-minor-container">If we are to preserve culture we must continue to create it.</div>
    </div>
    <div class="xb-component-wrapper">
        <div class="xb-components-item-wrapper">
        <div class="xb-sub-image-component cl1"></div>
        <div class="xb-sub-image-component cl2"></div>
        <div class="xb-sub-image-component cl3"></div>
        <div class="xb-sub-image-component cl4"></div>
        <div class="xb-sub-image-component cl5"></div>
        <div class="xb-sub-image-component cl6"></div>
        <div class="xb-sub-image-component cl7"></div>
        <div class="xb-sub-image-component cl8"></div>
        <div class="xb-sub-image-component cl9"></div>
        <div class="xb-sub-image-component cl10"></div>
        <div class="xb-sub-image-component cl11"></div>
        <div class="xb-sub-image-component cl12"></div>
          
        </div>
    </div>
</div>
`;




export class CultureGallery extends HTMLElement implements IWebComponents {
    private _titleAreaWrapper:HTMLDivElement|null = null;
    constructor() {
        super();
        this.appendChild(Template_.content.cloneNode(true))
    }


    initializeComponent(){
        this.createComponentAttachment();
    }
    createComponentAttachment(){
        this._titleAreaWrapper = this.querySelector(".xb-culture-component .xb-title-area-wrapper")
    }

    _viewInsetAnimation(){
        this._titleAreaWrapper!.style.animation = "__studentsLife__  1.5s forwards"
    }
    _createAnimationFacility(){
        if(this._titleAreaWrapper){
            
        }
    }

    connectedCallback() {
        this.initializeComponent()
    }
};


customElements.define("ns-x-culture",CultureGallery)