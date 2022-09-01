import { IWebComponents } from "ns/typings/schw";
import anime from "animejs";
import { createViewLinkerManger } from "ns/platform/positionRenderer/view_linker";
//@ts-ignore
import glanceBannerImage from "ns/assets/site_images/aboutsus_view/cr_banner_flow/reflection.jpg"

const Template_ = document.createElement("template");
Template_.innerHTML = `
<div class="xb-glance-component">
    <div class="xb-wrapper">
        <div class="tr-split-view">
            <div class="tr-view-1">
                <div class="tr-view-1-wrapper">
                    <div class="tr-data-cpr">
                        <div class="cpr-wrapper">
                            <div class="cl-title">
                                <div class="cl-title-wrapper cln-1"></div>
                            </div>
                            <div class="cl-figure">
                                <div class="cl-figure-wrapper">The Year Ndejje was Established</div>
                            </div>
                        </div>
                    </div>
                    <div class="tr-data-cpr">
                        <div class="cpr-wrapper">
                            <div class="cl-title">
                                <div class="cl-title-wrapper cln-2"></div>
                            </div>
                            <div class="cl-figure">
                                <div class="cl-figure-wrapper">A Large Number of Staff Members</div>
                            </div>
                        </div>
                    </div>
                    <div class="tr-data-cpr">
                        <div class="cpr-wrapper">
                            <div class="cl-title">
                                <div class="cl-title-wrapper cln-3"></div>
                            </div>
                            <div class="cl-figure">
                                <div class="cl-figure-wrapper">And A Vast Number of Students</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="tr-view-2">
                <div class="tr-view-2-wrapper">
                    <div class="cl-title-area">Ndejje At A Glance</div>
                    <div class="cl-picture-container">
                        <picture>
                            <img src="${glanceBannerImage}" loading="lazy">
                        </picture>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

class Glance extends HTMLElement implements IWebComponents {

    private _xrNm1:HTMLDivElement|null = null;
    private _xrNm2:HTMLDivElement|null = null;
    private _xrNm3:HTMLDivElement|null = null;
    private _pictureComponent: HTMLDivElement | null = null;
    private didRunAnimation: boolean = false;

    constructor(){
        super();
        this.appendChild(Template_.content.cloneNode(true))
    }
    connectedCallback(){
        this.initializeComponent()
    }
    private initializeComponent(){
        this.__createComponentAttachment();
        this.__createAnimationFacilityFunction()
    };

    private __createComponentAttachment(){
        this._xrNm1 = this.querySelector(".xb-glance-component .xb-wrapper .tr-split-view .tr-view-1 .tr-view-1-wrapper .cln-1");
        this._xrNm2 = this.querySelector(".xb-glance-component .xb-wrapper .tr-split-view .tr-view-1 .tr-view-1-wrapper .cln-2");
        this._xrNm3 = this.querySelector(".xb-glance-component .xb-wrapper .tr-split-view .tr-view-1 .tr-view-1-wrapper .cln-3");
        this._pictureComponent = this.querySelector(".xb-glance-component .xb-wrapper .tr-split-view .cl-picture-container")
    };

    private async __viewInsetAnimation1():Promise<void>{
        if(this._xrNm1 && this._xrNm2 && this._xrNm3){
            const __numericalConstants = {
                __xr1 : 0,
                __xr2 : 0,
                __xr3 : 0
            };
    
            anime({
                targets : __numericalConstants,
                __xr1 : 1963,
                easing : 'linear',
                round : 1,
                duration : 2000,
                update : ()=>{
                    this._xrNm1!.innerHTML = `${__numericalConstants.__xr1}`
                }
            })
            anime({
                targets : __numericalConstants,
                __xr2 : 162,
                easing : 'linear',
                round : 1,
                duration : 2000,
                update : ()=>{
                    this._xrNm2!.innerHTML = `${__numericalConstants.__xr2}`
                }
            })
            anime({
                targets : __numericalConstants,
                __xr3 : 2100,
                easing : 'linear',
                round : 1,
                duration : 2000,
                update : ()=>{
                    this._xrNm3!.innerHTML = `${__numericalConstants.__xr3}`
                }
            })
        }
       
    }


    private _viewPictureComponentInset() {
        if(this._pictureComponent){
            this._pictureComponent.style.animation = "_resize 2s forwards"
        }
    }

    private __createAnimationFacilityFunction(){
        if(this._pictureComponent){
            createViewLinkerManger({
                element : this._pictureComponent,
                linkPosition : 150,
                LinkerCallbacks : {
                    inset: () => {
                        if (!this.didRunAnimation) {
                            this.__viewInsetAnimation1();
                            this._viewPictureComponentInset()
                            this.didRunAnimation = true;
                        }
                      
                    },
                    outset: ()=>{
                        
                    }
                }
            })
        }
    }


}

customElements.define("ns-x-glance",Glance)