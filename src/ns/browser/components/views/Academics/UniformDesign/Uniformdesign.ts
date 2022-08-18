import {IWebComponents} from "ns/typings/schw"
const UnData = {


    "A-level" : {
        data : "Introducing our A-level Uniform, That Gadly brings out the HSC school level. Smartness is Key"
    },
    "O-level" : {
        data : "Introducing our O-level Uniform, That Gadly brings out the Ordinary school level. Smartness is Key"
    }


}
const Template_ = document.createElement("template");
Template_.innerHTML = `
<div class="xb-uniform-design-component">
    <div class="xhrt-wrapper">
        <div class="xb-title container">
            <div class="xb-title-area-wrapper">Elegance is not standing out, But Being Remembered</div>
            <div class="xb-sub-title-wrapper">Our Uniform design</div>
        </div>
        <div class="xb-wrapper">
            <div class="xb-main-container">
                <div class="xb-container-area">
                    <div class="xb-content-manager">
                        <div class="xb-split-view">
                            <div class="xb-split-view-1 view-area level-a">
                                <div class="xb-content-1 xb-pic xbr-content">
                                    <div class="xb-picture-container">
                                        <picture>
                                            <img loading="lazy" src/>
                                        </picture>
                                    </div>
                                </div>
                                <div class="xb-content-2 xbr-content xtr-info">
                                    <div class="wrapper">
                                        <div class="title-component">
                                            <div class="title-wrapper">A-Level </div>
                                        </div>
                                        <div class="content-container">
                                            <div class="content-wrapper">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="xb-split-view-2 view-area level-o">
                                <div class="xb-content-1 xbr-content xtr-info">
                                    <div class="wrapper">
                                        <div class="title-component">
                                            <div class="title-wrapper">O-Level </div>
                                        </div>
                                        <div class="content-container">
                                            <div class="content-wrapper">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="xb-content-2 xb-pic xbr-content">
                                    <div class="xb-picture-container">
                                        <picture>
                                            <img loading="lazy" src/>
                                        </picture>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`

class uniformdesign extends HTMLElement implements IWebComponents{
    private _levelADataHost:HTMLDivElement|null = null;
    private _levelODataHost:HTMLDivElement|null = null;
    constructor(){
        super()
        this.appendChild(Template_.content.cloneNode(true))
    }

    connectedCallback(){
        this.initializeComponent()
    }
    initializeComponent() {
        this.attachAllElements();
        this._initialilizeAndLoadData()
    }
    attachAllElements(){
        this._levelADataHost = this.querySelector(".level-a .content-container .content-wrapper");
        this._levelODataHost = this.querySelector(".level-o .content-container .content-wrapper")
    }

    _initialilizeAndLoadData(){
        if(this._levelADataHost && this._levelODataHost){
            this._levelADataHost.innerHTML = UnData["A-level"].data;
            this._levelODataHost.innerHTML  = UnData["O-level"].data
        }
    }

}
customElements.define("ns-x-uniformdesign",uniformdesign)