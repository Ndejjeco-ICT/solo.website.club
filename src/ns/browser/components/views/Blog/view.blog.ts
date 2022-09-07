import { IWebComponents } from "ns/typings/schw";
const Template_ = document.createElement("template");
Template_.innerHTML =  `
    <ns-x-blogcover></ns-x-blogcover>
    <ns-x-blogtrends></ns-x-blogtrends>
    <ns-x-articles></ns-x-articles>
    <ns-x-primearticle></ns-x-primearticle>
    <ns-x-caroselslider></ns-x-caroselslider>
    <ns-x-motto></ns-x-motto>
`

export class BlogView extends HTMLElement implements IWebComponents {

    constructor(){
        super()
    }

    connectedCallback() {
        this.initializeBlogView()

    }
    initializeBlogView() {
        this.appendChild(Template_.content.cloneNode(true))
    }
};


