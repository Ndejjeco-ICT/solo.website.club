import { commonEvents } from "ns/browser/common/events";
import { IIInsightsDataBundle } from "ns/browser/components/views/Insights/data-provider"
import { InsightViewNavigationEventListenerManager } from "ns/browser/components/views/Insights/view.insights"

export const readerViewEventManager = new commonEvents<any>();

export class readerViewManager {

    //element handles
    private _keyHolderHandle: HTMLDivElement | null = null;
    private _imageElement: HTMLImageElement | null = null;
    private _writerContent: HTMLDivElement | null = null;
    private _probQuestionArea:HTMLDivElement|null = null;

    private _cl1D: HTMLDivElement | null = null;
    private _cl2D: HTMLDivElement | null = null;
    private _cl3D: HTMLDivElement | null = null;
    private _cl4D: HTMLDivElement | null = null;
    private _cl5D: HTMLDivElement | null = null;
    private _cl6D: HTMLDivElement | null = null;


    private _infoArea: HTMLDivElement | null = null;

    /**
     *
     */
    constructor() {
        this.__initialize()
    }

    private __initialize() {
        this._attachElementHandles();
        this._registerForDataPackagesFromViewCards();
    }
    private _attachElementHandles() {
        this._keyHolderHandle = document.querySelector(".key-insight-tr")! as HTMLDivElement;
        this._imageElement = document.querySelector(".cl-image")! as HTMLImageElement;
        this._writerContent = document.querySelector(".writter-content-holder");
        this._probQuestionArea = document.querySelector(".porb-question-area")
        this._cl1D = document.querySelector(".central-content .cl1");
        this._cl2D = document.querySelector(".central-content .cl2");
        this._cl3D = document.querySelector(".central-content .cl3");
        this._cl4D = document.querySelector(".central-content .cl4");
        this._cl5D = document.querySelector(".central-content .cl5");
        this._cl6D = document.querySelector(".central-content .cl6");
        this._infoArea = document.querySelector(".cp-info-area ._info_areas")! as HTMLDivElement;


    }

    private async _attachDataPackageSourceLinks(_data: Array<{ label: string, link: string }>) {
        const _anchorElements: Array<HTMLAnchorElement> = [];
        _data.forEach((_v) => {
            let _createdElement = this._anchorTagForLinkSources(_v.link, _v.label);
            _anchorElements.push(_createdElement);
        });

        _anchorElements.forEach((_Q_) => {
            if (this._infoArea) {
                this._infoArea.appendChild(_Q_);
            }
        })
    }
    private _anchorTagForLinkSources(_link: string, _label: string) {
        const _t = document.createElement("a");
        _t.href = _link;
        _t.innerHTML = `#${_label}`;
        return _t
    }

    private _requestForViewNavigationOption() {
        InsightViewNavigationEventListenerManager.emit("request-navigation", "view-reader")
    }

    private _attachDataPackageToTheContent(_datapackage: IIInsightsDataBundle) {
       const __checkedData = _datapackage;
        this._imageElement!.src = __checkedData.imageSource;
        this._keyHolderHandle!.innerHTML = __checkedData.key;
        this._probQuestionArea!.innerHTML = __checkedData.moto;
        this._writerContent!.innerHTML = __checkedData.writer;
        this._cl1D!.innerHTML = __checkedData.cl1 == null ? "" : __checkedData.cl1;
        this._cl2D!.innerHTML = __checkedData.cl2 == null ? "" : __checkedData.cl2;
        this._cl3D!.innerHTML = __checkedData.cl3 == null ? "" : __checkedData.cl3;
        this._cl4D!.innerHTML = __checkedData.cl4 == null ? "" : __checkedData.cl4;
        this._cl5D!.innerHTML = __checkedData.cl5 == null ? "" : __checkedData.cl5;
        this._cl6D!.innerHTML = __checkedData.cl6 == null ? "" : __checkedData.cl6;
        this._attachDataPackageSourceLinks(__checkedData["links-sources"]);
    }

    private _registerForDataPackagesFromViewCards() {
        readerViewEventManager.addListener("data-package", this._listenerForDataPackagesForViewCards.bind(this));
    }
    private _listenerForDataPackagesForViewCards(_datapackage: IIInsightsDataBundle) {
        this._attachDataPackageToTheContent(_datapackage)
        this._requestForViewNavigationOption()
    }

    private _clearSourceLinks() {
        const _allLinkElements = this._infoArea!.querySelectorAll("a")! as NodeListOf<HTMLAnchorElement>
        _allLinkElements.forEach((_e_) => {
            _e_.remove();
        })
    }
    private async _clearReaderResources() {
        return new Promise<void>((c) => {
            this._writerContent!.innerHTML = "";
            this._cl1D!.innerHTML = "";
            this._cl2D!.innerHTML = "";
            this._cl3D!.innerHTML = "";
            this._cl4D!.innerHTML = "";
            this._cl5D!.innerHTML = ""
            this._cl6D!.innerHTML = ""
            this._keyHolderHandle!.innerHTML = "";
            this._imageElement!.src = "";
            this._clearSourceLinks()
            c()
        })


    }



}