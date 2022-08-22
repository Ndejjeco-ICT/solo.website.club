import { IWebComponents } from "ns/typings/schw";

const shadowRootTemplate = document.createElement("template");
shadowRootTemplate.innerHTML = ``


class CommentSection extends HTMLElement implements IWebComponents {
    private _textAreaEntryComponent: HTMLTemplateElement | null = null;
    private _submitEntry: HTMLDivElement | null = null;
    private _characterCounter: HTMLDivElement | null = null;
    private _maxCharacters: number = 257;

    constructor() {
        super();
        this.appendChild(shadowRootTemplate)
    }
    private _getShadowElement(e:string) {
        return this.querySelector(e);
    }
    private _connectRequiredElements() {
        this._textAreaEntryComponent = this._getShadowElement(".comment-textarea")! as HTMLTemplateElement;
        this._submitEntry = this._getShadowElement(".cl-submit")! as HTMLDivElement;
        this._characterCounter = this._getShadowElement(".cl-characters")! as HTMLDivElement;
    }
    connectedCallback() {
        this._connectRequiredElements()
    }
}