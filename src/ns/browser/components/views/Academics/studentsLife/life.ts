import { createViewLinkerManger } from "ns/platform/positionRenderer/view_linker";
import { IWebComponents } from "ns/typings/schw";
//@ts-ignore
import cl_imge1 from "ns/assets/site_images/academics_view/cr_life/sociallity.jpg";
//@ts-ignore
import cl_imge2 from "ns/assets/site_images/academics_view/cr_life/democracy.jpg";


const Template_ = document.createElement("template");
Template_.innerHTML = `
<div class="xb-life-component">
    <div class="xb-component-wrapper">
        <div class="xb-title-area-wrapper">
            <div class="xb-title-container">...Life of Students...</div>
        </div>
        <div class="xb-split-view">
            <div class="xb-split-view-wrapper">
                <div class="xb-split-view-1 split-component">
                    <div class="xb-split-component xb-picture-container xl-q">
                        <div class="image-container">
                            <picture class="image-host">
                                <img src="${cl_imge2}" loading="lazy">
                            </picture>
                        </div>
                    </div>
                    <div class="xb-split-component xb-content">
                        <div class="cr-line"></div>
                        <div class="split-wrapper">
                            The discipline and democracy of the Students continues to improve making Ndejje A Better Place.                        </div>
                    </div>
                </div>
                <div class="xb-split-view-2 split-component">
                    <div class="xb-split-component xb-content">
                        <div class="cr-line"></div>
                        <div class="split-wrapper">
                            Improving the confidence and social aspect of Students to make the better citizens in the future.
                        </div>
                    </div>
                    <div class="xb-split-component xb-picture-container xl-p">
                        <div class="image-container">
                            <picture class="image-host">
                                <img src="${cl_imge1}" loading="lazy">
                            </picture>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>
`;

export class Life extends HTMLElement implements IWebComponents {
  private _controlElement: HTMLDivElement | null = null;
  constructor() {
    super();
    this.appendChild(Template_.content.cloneNode(true));
  }

  connectedCallback() {
    this.initalizeComponent();
  }
  initalizeComponent() {
    this._createComponentAttachment();
    this._createAnimationFacility();
  }
  _createComponentAttachment() {
    this._controlElement = this.querySelector(".xb-life-component .xb-component-wrapper");
  }
  _viewInsetAnimation() {
    if (this._controlElement) {
      this._controlElement.style.animation = "__studentsLife__ 1.5s forwards";
    }
  }
  _viewOutsetAnimation() {
    if (this._controlElement) {
      this._controlElement.style.opacity = "0";
      this._controlElement.style.transform = "translateY(-100px)";
      this._controlElement.style.animation = "";
    }
  }

  _createAnimationFacility() {
    if (this._controlElement) {
      createViewLinkerManger({
        element: this._controlElement,
        linkPosition: 150,
        LinkerCallbacks: {
          inset: () => {
            this._viewInsetAnimation();
          },
          outset: () => {

          },
        },
      });
    }
  }
}

customElements.define("ns-x-life", Life);
