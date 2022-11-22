import { IWebComponents } from "ns/typings/schw";

const templateBlogViewCard_ = document.createElement("template")
const templateBlogView = document.createElement("template");

templateBlogViewCard_.innerHTML  = `
<div class="cl-bogarticlecomponent">
    <div class="main-wrapper">
        <div class="picture-main-wrapper">
            <div class="picture-main-container"></div>
        </div>
        <div class="reader-content-provider">
            <div class="reader-content-wrapper">
                <div class="main-title-content"></div>
                <div class="sub-title-content"></div>
            </div>
        </div>
    </div>
</div>
`;

templateBlogView.innerHTML  = `
<div class="blog-main-wrapper">
    <div class="main-wrapper">
        <div class="content-title-provider">
            <div class="sl1">Good company, good welcome, can make good people.-</div>
        </div>
        <div class="blog-article-view">
            <div class="wrapper">
                <ns-blogview-card></ns-blogview-card>
                <ns-blogview-card></ns-blogview-card>
                <ns-blogview-card></ns-blogview-card>
                <ns-blogview-card></ns-blogview-card>
                <ns-blogview-card></ns-blogview-card>
                <ns-blogview-card></ns-blogview-card>
            </div>
        </div>
    </div>
</div>

`

export class BlogViewCard extends HTMLElement implements IWebComponents {
    /**
     *
     */
    constructor() {
        super();
    }
    connectedCallback(): void {
        this.intializeBlogViewCard()
    }
    intializeBlogViewCard(){
        this.appendChild(templateBlogViewCard_.content.cloneNode(true))

    }
    
}

customElements.define("ns-blogview-card",BlogViewCard)


export class BlogView extends HTMLElement implements IWebComponents {
    constructor(){
        super()
    }
    connectedCallback(): void {
        this.intializeBlogViewParentComponent()
    }
    intializeBlogViewParentComponent(){
        this.appendChild(templateBlogView.content.cloneNode(true))
    }

}