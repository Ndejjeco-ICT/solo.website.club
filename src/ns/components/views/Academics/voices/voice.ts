import { addDisposableEventListener } from "ns/common/domListener";
import { IWebComponents } from "ns/typings/schw";
import videojs, { VideoJsPlayer } from "video.js";

const Template_ = document.createElement("template")
Template_.innerHTML = `
<div class="xb-voices-component">
    <div class="xb-title-area-component">
        <div class="xb-title-area-container">
            Listen To The Big Voices Of Ndejje
        </div>
    </div>
    <div class="xb-wrapper">
        <div class="xb-split-view-container">
            <div class="xb-split-view-area">
                <div class="xb-split-component-1 str-comp">
                    <div class="wrapper t-content-1">
                        <div class="xb-picture-container">
                            <div class="cl-t-box">
                                <div class="cl-t-pic"></div>
                                <div class="cl-t-text">
                                    <div class="te-wrapper">#The HeadTeacher</div>
                                </div>
                            </div>
                        </div>
                        <div class="xb-description-container">Education is the passport to the future, for tomorrrow
                            belongs to those who prepare for it today</div>
                    </div>
                    <div class="wrapper t-content-2">
                        <div class="xb-picture-container">
                            <div class="cl-t-box">
                                <div class="cl-t-pic"></div>
                                <div class="cl-t-text">
                                    <div class="te-wrapper">#The Deputy HeadTeacher</div>
                                </div>
                            </div>
                        </div>
                        <div class="xb-description-container">Discipline is the bridge between goals and accomplishment.
                        </div>
                    </div>
                </div>
                <div class="xb-split-component-2 str-comp">
                    <div class="split-video-container">
                        <div class="video-labels">
                            <div class="vid-label-cl"></div>
                            <div class="vid-close-cl" title="Stop The Playback">&times;</div>
                        </div>
                        <div class="videx-x-conveyor">
                            <div class="video-icon-restart" title="Play">
                                <div class="icon-wrapper">
                                    <i class="fa-solid fa-play"></i>
                                </div>
                            </div>

                            <video src="" id="my-hr-player" class="video-js sm1" controls>
                                <source src="./videos/hm_interview.mp4" type="video/mp4">
                                </source>
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="common-change-controls">
        <div class="prev-ctrl vid-ctrl" title="Previous">&triangleleft;</div>
        <div class="next-ctrl vid-ctrl" title="Next">&triangleright;</div>
    </div>
</div>
`

interface IVideoSources {
    frameVideoHM: string;
    frameVideoDHM: string;
}

interface IVideoPresenterData {
    __HM__:string;
    __GR__:string;
}

type ScreenModes = "Video" | "Content";

type VideoStatePositions = "HR" | "GR";

class Voice extends HTMLElement implements IWebComponents {

    //@ts-ignore
    private __videoStatePosition: VideoStatePositions = "HR";

    private __videoManagerConveyor: HTMLDivElement | null = null;

    private ___videoRenderer__: VideoJsPlayer | null = null;

    private didDisplayPresenterLabel:boolean = false;

    private __videoPresenterData:IVideoPresenterData = {
        __GR__ : "Mr. Gitta Emmanuel: School Environment",
        __HM__ : "Canon Dr. Charles Kahigiriza"
    }

    //content managers
    //@ts-ignore

    private _headTeacherContentManger: HTMLDivElement | null = null;
    //@ts-ignore

    private _deputyHeadTeacherContentManager: HTMLDivElement | null = null;
    //@ts-ignore

    //controls
    private _preControl: HTMLDivElement | null = null;
    //@ts-ignore

    private _nexControl: HTMLDivElement | null = null;
    //@ts-ignore

    //contentHost
    private contentHost: HTMLDivElement | null = null;
    //@ts-ignore

    //view managers
    private contentViewManager: HTMLDivElement | null = null;
    //@ts-ignore

    private contentVideoManager: HTMLDivElement | null = null;

    private _videoControl: HTMLDivElement | null = null;


    private videoHostManager: HTMLDivElement | null = null;

    private _videoSourcesManager: IVideoSources = {
        frameVideoDHM: "./videos/gitta_interview.mp4",
        frameVideoHM: "./videos/hm_interview.mp4"
    };


    // @ts-ignore
    private _currentSourceVideo: string = this._videoSourcesManager.frameVideoHM;


    //controls-x-lable
    private _videoLabelxControl: HTMLDivElement | null = null;
    private _videoClosexControl: HTMLDivElement | null = null;

    private _videoScreenModes: ScreenModes = "Content";


    constructor() {
        super();
        this.appendChild(Template_.content.cloneNode(true))
    }
    connectedCallback() {
        //@ts-ignore
        //@ts-ignore
        this.initializeComponent()
    }
    initializeComponent() {
        this.attachElements();
        this._createVideoPlatformInitialization();
        this.__createEventListenersForContentExchangeAction();
        this.__createEventListenersForScreenModeAndLabelExchange()
    }
    attachElements() {
        this.___videoRenderer__ = videojs('my-hr-player')
        this._headTeacherContentManger = this.querySelector(".xb-voices-component .xb-wrapper .xb-split-view-area .t-content-1");
        this._deputyHeadTeacherContentManager = this.querySelector(".xb-voices-component .xb-wrapper .xb-split-view-area .t-content-2");

        this._preControl = this.querySelector(".xb-voices-component .common-change-controls .prev-ctrl")
        this._nexControl = this.querySelector(".xb-voices-component .common-change-controls .next-ctrl")

        this.contentHost = this.querySelector(".xb-split-view-area");

        this.contentViewManager = this.querySelector(".xb-split-view-area .xb-split-component-1");
        this.contentVideoManager = this.querySelector(".xb-split-view-area .xb-split-component-2 .split-video-container");

        this._videoControl = this.querySelector(".xb-split-view-area .xb-split-component-2 .video-icon-restart");

        this.__videoManagerConveyor = this.querySelector(".xb-split-view-area .xb-split-component-2 .videx-x-conveyor")

        this.videoHostManager = this.querySelector(".xb-split-view-area .xb-split-component-2 .split-video-container .sm1");

        this._videoClosexControl = this.querySelector(".xb-split-view-area .xb-split-component-2 .video-labels .vid-close-cl");
        this._videoLabelxControl = this.querySelector(".xb-split-view-area .xb-split-component-2 .video-labels .vid-label-cl");
    }

    __createInitialSetupForVideoRenderer() {
        this.__hideDefaultButton()
    }
    _createVideoPlatformInitialization() {
        if (this._videoControl) {
            this.__createInitialSetupForVideoRenderer()
            addDisposableEventListener(this._videoControl, "click", this._initalizeVideoPlayerProcess.bind(this))
        }
    };
    ___loadCurrentVideo__() {
        if (this.___videoRenderer__) {
            this.___videoRenderer__.play();
            this._videoScreenModes = "Video"
            this._hideOrShowLabelControl(true)
        }
    }
    __hideDefaultButton() {
        if (this.___videoRenderer__) {
            this.___videoRenderer__.bigPlayButton.disable()
            this.___videoRenderer__.bigPlayButton.hide()
            this.___videoRenderer__.bigPlayButton.off();
            this.___videoRenderer__.bigPlayButton.dispose();
        }
    }
    _startMainPlayback() {
        this._initializeVideoEndProcess().then(() => {
            this.___loadCurrentVideo__()
        })
    }
    _initializeVideoEndProcess() {
        return new Promise<void>((c) => {
            if (this._videoControl) {
                setTimeout(() => {
                    this._disableLoadingAnimation();
                    c()
                }, 2500)
            }
        })
    }

    _prepareMainLayout() {
        if (this.contentViewManager && this.contentHost && this.contentVideoManager && this.videoHostManager && this.__videoManagerConveyor) {
            this.contentHost.style.display = "block"
            this.contentViewManager.style.opacity = "0";
            this.contentViewManager.style.display = "none";
            this.contentVideoManager.style.position = "relative";
            this.contentVideoManager.style.right = "0px";
            this.__videoManagerConveyor.style.width = "100%"
            this.videoHostManager.style.display = "block"
        }
    }
    _createVideoLoadingAnimation() {
        if (this._videoControl) {
            this._videoControl.innerHTML = ""
            this._videoControl.style.backgroundColor = "unset";
            this._videoControl.style.color = "unset";
            this._videoControl.style.borderColor = "#00000000";
            this._videoControl.style.borderTopColor = "#3b8af3";
            this._videoControl.style.animation = "rotate .5s linear infinite";
        }
    }
    _disableLoadingAnimation() {
        if (this._videoControl) {
            this._videoControl.style.animation = "";
            this._videoControl.style.opacity = "0";
            this._videoControl.style.display = "none"
        }
    }
    //--principle
    __createEventListenersForContentExchangeAction() {
        if (this._preControl && this._nexControl) {
            addDisposableEventListener(this._preControl, "click", this.__contentDataExchangeForPreviousAction.bind(this))
            addDisposableEventListener(this._nexControl, "click", this.__contentDataExchangeForNextAction.bind(this))
        }
    }
    __createEventListenersForScreenModeAndLabelExchange() {
        if (this._videoClosexControl && this._videoLabelxControl) {

            addDisposableEventListener(this._videoClosexControl, "click", this._reTransformBackLayoutBackToContentLayout.bind(this))
        }
    };


    __displayPresenterCommonLabel(data:string){
        if(this._videoLabelxControl) {
            this._videoLabelxControl.style.display = "flex";
            this._videoLabelxControl.innerHTML = data;
            this._videoLabelxControl.style.animation = "__CommonLabel__ 1s forwards"
        }
    }
    _hidePresenterCommonLabel(){
        if(this._videoLabelxControl && this.didDisplayPresenterLabel){
            this._videoLabelxControl.style.animation = "";
            this._videoLabelxControl.style.display = "none";
        }

    }
    _gracefullyShowVideoPresenterLabel(presenterKey:"HM"|"GR"){
        if(this._videoLabelxControl) {
            if(presenterKey == "GR") {
                this.__displayPresenterCommonLabel(this.__videoPresenterData.__GR__)
                this.didDisplayPresenterLabel = true;
            }else{
                this.__displayPresenterCommonLabel(this.__videoPresenterData.__HM__)
                this.didDisplayPresenterLabel = true;
            }
        }

    }

    _hideOrShowLabelControl(show: boolean) {
        if (show) {
            if (this._videoClosexControl && this._videoLabelxControl) {
                this._videoClosexControl.style.display = "flex";
               this._gracefullyShowVideoPresenterLabel(this.__videoStatePosition == "GR" ? "GR" : "HM")
            }
        }else {
            if (this._videoClosexControl && this._videoLabelxControl) {
                this._videoClosexControl.style.display = "none";
               this._hidePresenterCommonLabel()
            }
        }
    }



    _reTransformBackLayoutBackToContentLayout() {
        if (this.contentViewManager && this.contentHost && this.contentVideoManager && this.videoHostManager && this.__videoManagerConveyor) {
            this.contentHost.style.display = "grid"
            this.contentHost.style.gridTemplateColumns = "1fr 1fr";
            this.contentViewManager.style.display = "block";
            this.contentViewManager.style.opacity = "1";
            this.contentVideoManager.style.position = "absolute";
            this.contentVideoManager.style.right = "150px";
            this.__videoManagerConveyor.style.width = "300px"
            this.videoHostManager.style.display = "none"
        }
        if (this._videoControl) {
            this._videoControl.insertAdjacentHTML("afterbegin", `
            <div class="icon-wrapper">
                <i class="fa-solid fa-play"></i>
            </div>
            `)
            this._videoControl.style.backgroundColor = "#3b8af3";
            this._videoControl.style.color = "#fff";
            this._videoControl.style.borderColor = "#00000000";
            this._videoControl.style.pointerEvents = ""
            this._videoControl.style.border = "6px solid rgb(32, 32, 32)";
            this._videoControl.style.animation = "";
            this._videoControl.style.display = "flex";
            this._videoControl.style.opacity = "1";
        }
        this._videoScreenModes = "Content"
        this._hideOrShowLabelControl(false)
        this._stopCurrentPlayback()

    }

    _stopCurrentPlayback() {
        if (this.___videoRenderer__) {
            this.___videoRenderer__.pause()
        }
    }


    //data exchange actions
    __contentDataExchangeForPreviousAction() {
        if (this._videoScreenModes == "Content") {
            this.__initializeExchangeServiceForContent()
        } else {
            this.__initializeExchangeServiceForVideAndContent()
        }
    }
    __contentDataExchangeForNextAction() {
        if (this._videoScreenModes == "Content") {
            this.__initializeExchangeServiceForContent()
        } else {
            this.__initializeExchangeServiceForVideAndContent()
        }
    }

    //----

    __initializeExchangeServiceForVideAndContent() {
        if (this.__videoStatePosition == "HR") {
            this.__createContentAndVideoClearProcessFor("GR")

        } else {
            this.__createContentAndVideoClearProcessFor("HM");

        }

    }

    __initializeExchangeServiceForContent() {
        if (this.__videoStatePosition == "HR") {
            this.__createContentClearProcessFor("GR")

        } else {
            this.__createContentClearProcessFor("HM");

        }

    }


    //@ts-ignore
    private _setCurrentVideoSource(sourcePlay: "HM" | "GR") {
        if (this.___videoRenderer__) {
            if (sourcePlay == "HM") {
                this.___videoRenderer__.src(this._videoSourcesManager.frameVideoHM)
            } else {
                this.___videoRenderer__.src(this._videoSourcesManager.frameVideoDHM)
            }
        }

    }

    //@ts-ignore

    private _setCurrentVideoSourceAndStartPreload(sourcePlay: "HM" | "GR") {
        if (this.___videoRenderer__) {
            if (sourcePlay == "HM") {
                this.___videoRenderer__.src(this._videoSourcesManager.frameVideoHM);
                this.___videoRenderer__.play()
            } else {
                this.___videoRenderer__.src(this._videoSourcesManager.frameVideoDHM)
                this.___videoRenderer__.play()
            }
        }

    }


    //process headmaster content removal
    private __createContentClearProcessFor(sourcePlay: "HM" | "GR") {
        if (sourcePlay == "GR") {
            if (this._headTeacherContentManger && this._deputyHeadTeacherContentManager) {
                this._headTeacherContentManger.style.opacity = "0"
                this._headTeacherContentManger.style.display = "none"

                this._deputyHeadTeacherContentManager.style.display = "block";
                this._deputyHeadTeacherContentManager.style.opacity = "1";

                this._setCurrentVideoSource("GR");
                this._currentSourceVideo = this._videoSourcesManager.frameVideoDHM;
                this.__videoStatePosition = "GR"
            }
        } else {
            if (this._deputyHeadTeacherContentManager && this._headTeacherContentManger) {
                this._deputyHeadTeacherContentManager.style.opacity = "0";
                this._deputyHeadTeacherContentManager.style.display = "none";

                this._headTeacherContentManger.style.display = "block"
                this._headTeacherContentManger.style.opacity = "1"

                this._setCurrentVideoSource("HM");
                this._currentSourceVideo = this._videoSourcesManager.frameVideoHM;
                this.__videoStatePosition = "HR"
            }
        }

    }

    //process headmaster content and video removal

    private __createContentAndVideoClearProcessFor(sourcePlay: "HM" | "GR") {
        if (sourcePlay == "GR") {
            if (this._headTeacherContentManger && this._deputyHeadTeacherContentManager) {
                this._hidePresenterCommonLabel();
                this._headTeacherContentManger.style.display = "none"
                this._deputyHeadTeacherContentManager.style.display = "block";
                this._deputyHeadTeacherContentManager.style.opacity = "1";

                this._setCurrentVideoSourceAndStartPreload("GR")
                this._currentSourceVideo = this._videoSourcesManager.frameVideoDHM
                this.__videoStatePosition = "GR"
                this._gracefullyShowVideoPresenterLabel(this.__videoStatePosition == "GR" ? "GR" : "HM")
                


            }
        } else {
            if (this._deputyHeadTeacherContentManager && this._headTeacherContentManger) {
                this._hidePresenterCommonLabel();
                this._deputyHeadTeacherContentManager.style.display = "none";
                this._headTeacherContentManger.style.display = "block"
                this._headTeacherContentManger.style.opacity = "1"
                this._setCurrentVideoSourceAndStartPreload("HM");
                this._currentSourceVideo = this._videoSourcesManager.frameVideoHM;
                this._gracefullyShowVideoPresenterLabel(this.__videoStatePosition == "GR" ? "GR" : "HM")
                this.__videoStatePosition = "HR"
            }
        }

    }


    _initalizeVideoPlayerProcess() {
        this._createVideoLoadingAnimation();
        this._prepareMainLayout();
        this._startMainPlayback()

    }

}

customElements.define("ns-x-voices", Voice)