import { IWebComponents } from "ns/typings/schw";

const Template_ = document.createElement("template");
Template_.innerHTML = `
    <ns-x-acdmw></ns-x-acdmw>
    <ns-x-life></ns-x-life>
    <ns-x-community></ns-x-community>
    <ns-x-awards></ns-x-awards>
    <ns-x-voices></ns-x-voices>
    <ns-x-uniformdesign></ns-x-uniformdesign>
    <ns-x-news></ns-x-news>
    <ns-x-quotedos></ns-x-quotedos>
`

export class AcademicsView extends HTMLElement implements IWebComponents {

    constructor(){
        super()
    }

    connectedCallback(){
        this.initializeAcademicsView()
    }
    initializeAcademicsView() {
        this.appendChild(Template_.content.cloneNode(true))
    }
};

