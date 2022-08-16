import { IWebComponents } from "ns/typings/schw";
const Template_ = document.createElement("template");
Template_.innerHTML =  `
    <ns-x-titleholder></ns-x-titleholder>
    <ns-x-blogtrends></ns-x-blogtrends>
    <ns-x-articlesection></ns-x-articlesection>
    <ns-x-blogsection3></ns-x-blogsection3>
    <ns-x-caroselslider></ns-x-caroselslider>
    <ns-x-blogsection2></ns-x-blogsection2>
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


