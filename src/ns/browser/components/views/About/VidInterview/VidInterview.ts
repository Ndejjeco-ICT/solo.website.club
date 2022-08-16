import { IWebComponents } from "ns/typings/schw";
import { createViewLinkerManger } from "ns/platform/positionRenderer/view_linker";
import { addDisposableEventListener } from "ns/browser/common/domListener";
import videojs, { VideoJsPlayer } from "video.js";


const Template_ = document.createElement("template");
Template_.innerHTML = `
<div class="xb-vid-interview">
    <div class="xb-grid-splitview">
        <div class="xb-split-view-1">
            <div class="xb-title-area">
                <div class="wrapper">Hear From Our Students.</div>
            </div>
        </div>
        <div class="xb-split-view-2">
            <div class="xb-content-wrapper">
                <div class="xb-player-control-wrapper">
                    <div class="xb-video-ctrl-wrapper">
                        <div class="xb-icon-container">
                            <i class="fa-solid fa-play"></i>
                        </div>
                    </div>
                    <div class="xb-video-wrapper">
                        <video id="my-om-player" class="video-js sm2" controls>
                            <source src="./videos/hm_interview.mp4" type="video/mp4">
                        </source>
                        </video>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

class VidInterview extends HTMLElement implements IWebComponents {

    
    private _videoContentTitle:HTMLDivElement|null = null;
    private _videoElementLoader:HTMLDivElement|null = null;
    private _videoElementHolder:HTMLVideoElement|null = null;
    private ___videoRenderer__: VideoJsPlayer | null = null;


    constructor(){
        super();
        this.appendChild(Template_.content.cloneNode(true))
    }
    connectedCallback(){
        this.initializeComponent()
    }
    initializeComponent(){
        this._createComponentAttachment()
        this.__createAnimationFacilityFunction();
        this._initializeVideoFunctionality()
    }
    private _initializeVideoFunctionality(){
        this.__createInitialSetupForVideoRenderer();
        this._createPlayPauseEventListener()


    }
    private __createInitialSetupForVideoRenderer() {
        this.__hideDefaultButton()
    }
    private __hideDefaultButton(){
          if (this.___videoRenderer__) {
            this.___videoRenderer__.bigPlayButton.disable()
            this.___videoRenderer__.bigPlayButton.hide()
            this.___videoRenderer__.bigPlayButton.off();
            this.___videoRenderer__.bigPlayButton.dispose();
        }
    }
    private _createComponentAttachment(){
        this.___videoRenderer__ = videojs('my-om-player')
        this._videoContentTitle = this.querySelector(".xb-vid-interview .xb-title-area");
        this._videoElementLoader = this.querySelector(".xb-vid-interview .xb-icon-container");
        this._videoElementHolder = this.querySelector(".xb-vid-interview #my-om-player")
    };
    private _createPlayPauseEventListener(){
        if(this._videoElementLoader){
            addDisposableEventListener(this._videoElementLoader,"click",this._initializeVideoLoadAccquintance.bind(this))

        }
    }
    /**
     * Display video element and auto start
     */
    private _initializeVideoLoadAccquintance(){
        this._createLoadingAnimation();
        this.__initializeVideoProcess().then(()=>{
            this.__loadCurrentVideo__()
        })
        
    }
    private __initializeVideoProcess(){
        return new Promise<void>((c)=>{
            setTimeout(()=>{
                this._disableLoadingAnimation();
                c()
            },2500)
        })
    }
    private __loadCurrentVideo__(){
        if(this.___videoRenderer__){
            this.___videoRenderer__.play();
        }
    }
 

    /**
     * Display load animation
     */
    private _createLoadingAnimation(){
        if(this._videoElementLoader){
            this._videoElementLoader.innerHTML = ""
            this._videoElementLoader.style.backgroundColor = "unset";
            this._videoElementLoader.style.color = "unset";
            this._videoElementLoader.style.borderColor = "#000";
            this._videoElementLoader.style.pointerEvents = "none"
            this._videoElementLoader.style.borderTopColor = "#3b8af3";
            this._videoElementLoader.style.animation = "rotate .5s linear infinite";
        }
    }
    /**
     * Hide LoadAnimation
     */
     private _disableLoadingAnimation(){
        if(this._videoElementLoader){
            this._videoElementLoader.style.animation = "";
            this._videoElementLoader.style.opacity = "0";
            this._videoElementLoader.style.display = "none"
        }
    }

    __createAnimationFacilityFunction() {
        if (this._videoContentTitle) {
            createViewLinkerManger({
                element : this._videoContentTitle,
                linkPosition : 150,
                LinkerCallbacks : {
                    inset  : ()=>{
                        this._videoContentTitle!.style.animation =" __ReviewsAnimation__ 1s forwards"
                    },
                    outset : () =>{
                         ///
                    }
                }
            })
        }
    }
}

customElements.define("ns-x-vidinterview",VidInterview)