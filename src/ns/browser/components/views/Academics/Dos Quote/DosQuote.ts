import {IWebComponents} from "ns/typings/schw";

const Template_ = document.createElement("template");
Template_.innerHTML = `
<div class="xb-d-component">
    <div class="xb-wrapper">
        <div class="xb-text-1">
            <div class="wrapper">
            But by the grace of God I am what I am, and his grace to me was not without effect.
            </div>
        </div>
        <div class="xb-text-2">1 Corinthians 15:10</div>
    </div>
</div>
`;


export class Dos extends HTMLElement implements IWebComponents {
    constructor() {
        super();
        this.appendChild(Template_.content.cloneNode(true))
    }

    connectedCallback() {

    }
};


customElements.define("ns-x-quotedos",Dos)