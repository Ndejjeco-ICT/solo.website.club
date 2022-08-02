import { IWebComponents } from "ns/typings/schw";


export class HomeView extends HTMLElement implements IWebComponents {

    constructor() {
        super();
        this.innerHTML = `
            <ns-x-banner></ns-x-banner>
            <ns-x-benefits></ns-x-benefits>
            <ns-x-pride></ns-x-pride>
            <ns-x-insights></ns-x-insights>
            <ns-x-edu></ns-x-edu>
            <ns-x-reviews></ns-x-reviews>
            <ns-x-mission></ns-x-mission>
            <ns-x-quote></ns-x-quote>
          

        `
    }
    connectedCallback() {

    };


}

customElements.define("ns-home-view", HomeView);