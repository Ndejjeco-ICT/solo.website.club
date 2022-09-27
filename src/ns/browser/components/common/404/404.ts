import { IWebComponents } from "ns/typings/schw";


const Template_  = document.createElement("template");
Template_.innerHTML = `
<div class="_pagenotfound">
    <div class="wrapper">
        <div class="main-content-merger">
            <div class="_sl1">404</div>
            <div class="_sl2">"Oops", Page Not Found</div>
            <div class="_sl3">Let's Go Home</div>
        </div>
    </div>
</div>
`

export class _404_ extends HTMLElement implements IWebComponents {


    constructor(){
        super();
    }

    connectedCallback(): void {
        this.intializePageNotFoundView()
    }
    intializePageNotFoundView() {
        this.appendChild(Template_.content.cloneNode(true))

    }

}