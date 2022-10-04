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
                <div class="x-close-manager">&times;</div>
                <div class="xb-player-control-wrapper">
                    <div class="xb-video-ctrl-wrapper">
                        <div class="xb-icon-container">
                            <i class="fa-solid fa-play"></i>
                        </div>
                    </div>
                    <div class="xb-video-wrapper">
                        <video id="my-om-player" class="video-js sm2" controls>
                            <source src="./resources/videos/studentlifefinal.mp4" type="video/mp4">
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
    private __videoControlWrapper:HTMLDivElement|null = null;
    private _videoCancelControl:HTMLDivElement|null = null;
    private isPaused:boolean = false;


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
        this.attachVideoStopManager()
        this.attachEventListenerToVideoElement()


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
        this._videoElementHolder = this.querySelector(".xb-vid-interview #my-om-player");
        this.__videoControlWrapper  =this.querySelector(".xb-video-ctrl-wrapper");
        this._videoCancelControl = this.querySelector(".x-close-manager")
    };
    private _createPlayPauseEventListener(){
        if(this._videoElementLoader){
            addDisposableEventListener(this._videoElementLoader,"click",this._initializeVideoLoadAccquintance.bind(this))

        }
    }
    private attachVideoStopManager(){
        if(this._videoCancelControl){
            this._videoCancelControl.addEventListener("click",()=>{
                this._stopCurrentPlayback();
                this.__reApplystyling()
                this._hieorShowCloseMerchant(false)
                this.isPaused = false
            })
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
    private attachEventListenerForPauseAbility(){
        if(this.___videoRenderer__){
            this.___videoRenderer__.paused
        }
    }
    private attachEventListenerToVideoElement(){
        if(this.___videoRenderer__){
            this.___videoRenderer__.on("pause",()=>{
                this._stopCurrentPlayback();
                this.__reApplystyling()
                this._hieorShowCloseMerchant(false)
                this.isPaused = false
            })
        }
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
 
    private _hieorShowCloseMerchant(_show:boolean){
        if(_show){
            this._videoCancelControl!.style.display = "flex"
        }else{
            this._videoCancelControl!.style.display = "none"

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
            this._hieorShowCloseMerchant(true)

        }
    }
    private __reApplystyling(){
        if(this._videoElementLoader){
            this._videoElementLoader.innerHTML = `
            <i class="fa-solid fa-play"></i>
            `;
            this.__videoControlWrapper!.style.display = "flex"
            this._videoElementLoader.style.color = "#fff";
            this._videoElementLoader.style.borderColor = "#d4d4d4";
            this._videoElementLoader.style.animation = "";
            this._videoElementLoader.style.opacity = "1"
            this._videoElementLoader.style.backgroundColor = "#3b8af3"
            this._videoElementLoader.style.display = "flex";
            this._videoElementLoader.style.pointerEvents = "all"
            this._hieorShowCloseMerchant(true)

            
        }
    }
    /**
     * Hide LoadAnimation
     */
     private _disableLoadingAnimation(){
        if(this._videoElementLoader && this.__videoControlWrapper){
            this._videoElementLoader.style.animation = "";
            this._videoElementLoader.style.opacity = "0";
            this._videoElementLoader.style.display = "none"
            this.__videoControlWrapper.style.display = "none"
        }
    }
    _stopCurrentPlayback() {
        if (this.___videoRenderer__) {
            this.___videoRenderer__.pause()
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