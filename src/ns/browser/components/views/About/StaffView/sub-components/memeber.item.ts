import { IWebComponents } from "ns/typings/schw";

const Template_ = document.createElement("template");
Template_.innerHTML = `
<div class="xb-cl-memeber">
    <div class="xb-cl-wrapper">
        <div class="xb-picture-container">
            <div class="xb-picture-container-wrapper">
                <picture>
                    <img class="cl-image-host" loading="lazy"/>
                </picture>
            </div>
        </div>
        <div class="xb-content">
            <div class="xb-content-wrapper">
                <div class="xb-ct-1 xb-name xb-text"></div>
                <div class="xb-ct-2 xb-post xb-text"></div>
                <div class="xb-ct-3 xb-link xb-text"></div>
            </div>
        </div>
    </div>
</div>`


class MemberElement extends HTMLElement implements IWebComponents {

    private resourceLabelName:HTMLDivElement|null = null;
    private resourceLabelPost:HTMLDivElement|null = null;
    private resourceLabelLinkProvider: HTMLDivElement | null = null;
    private resourceImageHost: HTMLImageElement | null = null;

    constructor(){
        super();
        this.appendChild(Template_.content.cloneNode(true))
    }
    connectedCallback(){
        this.initializeComponent()
    }
    initializeComponent(){
        this.attachSourceElements()
        this.readAndAnalyzeDataAttributes();
    }
    attachSourceElements(){
        this.resourceLabelName = this.querySelector(".xb-name");
        this.resourceLabelPost = this.querySelector(".xb-post");
        this.resourceLabelLinkProvider = this.querySelector(".xb-link");
        this.resourceImageHost = this.querySelector(".cl-image-host")
    }
    connectDataEvenly(name:string,post:string,imageSource:string,_number:string){
        if(this.resourceLabelName && this.resourceLabelPost && this.resourceLabelLinkProvider && this.resourceImageHost){
            this.resourceLabelName.innerHTML = name;
            this.resourceLabelPost.innerHTML = post;
            this.resourceLabelLinkProvider.innerHTML = _number
            this.resourceImageHost.src = imageSource;
        }
    }
    readAndAnalyzeDataAttributes() {
        const labelName = this.getAttribute("id-name")!;
        const labelPost = this.getAttribute("id-post")!;
        const labelNumber = this.getAttribute("id-number")!;
        const labelImageSource = this.getAttribute("id-image-source")!;

        if(labelName && labelPost) {
            this.connectDataEvenly(labelName,labelPost,labelImageSource,labelNumber ?? "")
        }

    }
}

customElements.define("ns-x-member",MemberElement)