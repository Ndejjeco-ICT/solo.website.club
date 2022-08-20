import { commonEvents } from "ns/browser/common/events"

interface IIDialogSubscribers {
    element: HTMLDivElement;
    key: string;
}

interface IIDialogHostOptions {

    subscribers: IIDialogSubscribers[];

}
export interface IIDialogHost {
    invokeDialogEventManager(key: string): void;
    closeDialog(): Promise<void>;
    initializeDialogHost(): void;

}
export const dialogHostEventManager = new commonEvents<string>()
export class dialogHost implements IIDialogHost {

    private isVisible: boolean = false;
    private _subscribers: IIDialogSubscribers[];
    private _subscribersMap: Map<string, HTMLDivElement> = new Map();
    private _dialogHostElement: HTMLDivElement;
    private _dialogHostLoader: HTMLDivElement;
    private _currentVisibleElement: HTMLDivElement | null = null;


    constructor(options: IIDialogHostOptions) {
        this._dialogHostElement = document.querySelector(".dialog-host")!
        this._dialogHostLoader = document.querySelector(".dialog-host .staff-dialog-wrapper .loader")!
        this._subscribers = options.subscribers;
    };
    private _showLoaderArea() {
        this._dialogHostLoader.style.display = "flex"
    }
    private _hideLoaderArea() {
        this._dialogHostLoader.style.display = "none"


    }
    private __addControlListeners() {
        window.addEventListener("keyup", (ev) => {
            if (ev.key == "Escape") {
                if (this.isVisible) {
                    this.closeDialog();
                }
            }
        })
    }
    initializeDialogHost(): void {
        this._init()
    }
    private _init() {
        this._resolveSubscribers()
        this.__listenerRequestEvents()
        this.__addControlListeners()
    }
    closeDialog(): Promise<void> {
        return new Promise<void>((c) => {
            if (this.isVisible) {
                this._dialogHostElement.style.opacity = "0";
                setTimeout(() => {
                    this._dialogHostElement.style.display = "none";
    
                }, 500)
                this.hideCurrentVisibleElement()
                this.isVisible = false;
            }
            c()
        })
    }
    private _resolveSubscribers() {
        this._subscribers.forEach((v) => {
            if (!this._subscribersMap.has(v.key)) {
                this._subscribersMap.set(v.key, v.element)
            }
        })
    }
    private _checkWhetherDialogIsVisible() {
        return this.isVisible ? true : false;
    }
    private hideCurrentVisibleElement() {
        if (this._currentVisibleElement) {
            this._currentVisibleElement.style.display = "none";
            this._currentVisibleElement = null;
        }
    }

    private generateVisibleElement(key: string) {
        if (this._subscribersMap.has(key)) {
            if (this._checkWhetherDialogIsVisible()) {
                if (this._currentVisibleElement == null) {
                    let _asertedElement = this._subscribersMap.get(key)!;
                    _asertedElement.style.display = "block";
                    this._currentVisibleElement = _asertedElement;
                }

            }
        }
    }

    __listenerRequestEvents() {
        dialogHostEventManager.addListener("close-dialog", this.closeDialog.bind(this))
        dialogHostEventManager.addListener("invoke-dialog", this.invokeDialogEventManager.bind(this))
    }

    invokeDialogEventManager(key: string) {
        if (!this.isVisible) {
            this._dialogHostElement.style.display = "flex"
            setTimeout(() => {
                this._dialogHostElement.style.opacity = "1";

            }, 500)
            this.isVisible = true;
            this._showLoaderArea();
            setTimeout(() => {
                this._hideLoaderArea();
                this.generateVisibleElement(key)
            }, 2500)
        }
    }

}