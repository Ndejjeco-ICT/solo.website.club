import { IWebComponents } from "ns/typings/schw";

const Template_ = document.createElement("template");
Template_.innerHTML = `
    <ns-x-welcomenote></ns-x-welcomenote>
    <ns-x-glance></ns-x-glance>
    <ns-x-xgoal></ns-x-xgoal>
    <ns-x-staffview></ns-x-staffview>
    <ns-x-corevalues></ns-x-corevalues>
    <ns-x-vidinterview></ns-x-vidinterview>
    <ns-x-history></ns-x-history>
`

export class AboutView extends HTMLElement implements IWebComponents {

    constructor() {
        super();
    }
    connectedCallback() {
        this.initializeAboutView()
    };
    initializeAboutView() {
        this.appendChild(Template_.content.cloneNode(true))
    }
}
