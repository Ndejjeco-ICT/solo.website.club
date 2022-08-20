import { IWebComponents } from "ns/typings/schw";

export class DomModule extends HTMLElement implements IWebComponents {

    constructor() {
        super();
    };
    static is() {
        return "dom-module"
    }
    connectedCallback() {
        let key = this.getAttribute("ns-source")!
        console.log("dom-module connected",key)
    }

}
customElements.define(DomModule.is(), DomModule);