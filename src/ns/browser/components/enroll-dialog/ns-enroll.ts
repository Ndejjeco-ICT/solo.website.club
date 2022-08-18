import { IWebComponents } from "ns/typings/schw";

const Template_ = document.createElement("template");

Template_.innerHTML = `
<div class="enroll-dialog-main-wrapper">
    <div class="section-wrapper">
        <div class="sl-section-1">
            <div class="banner-image-area">
                <picture>
                    <img src="" loading="lazy"/>
                </picture>
            </div>
        </div>
        <div class="sl-section-2">
            <div class="form-section-wrapper">
                <div class="sl-1">
                    <div class="wrapper">
                        <div class="main-title">Which Level Would You Like to Join?.</div>
                        <div class="cl-wrapper">
                            <div class="cl-f5-wrapper">
                                <div class="io-wrapper">A-level 2023.</div>
                            </div>
                            <div class="cl-f5-wrapper">
                                <div class="io-wrapper">O-level 2023.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sl-2">
                    <div class="wrapper">
                        <div class="main-title-component">
                            <div class="tr-1">A-level Enrollment</div>
                            <div class="tr-2">Enrolling as student in Form 5 2023.</div>
                        </div>
                        <div class="main-form-component">
                            <div class="jl-main">
                                <form action="post" id="cr-form">
                                    <div class="main-name-entry-container">
                                        <div class="sl-label">Name</div>
                                        <input type="text" name="text-area" id="er-name" required="required">
                                    </div>
                                    <div class="main-school-entry-container">
                                        <div class="sl-label">Former School</div>
                                        <input type="text" name="text-area" id="er-school" required="required">
                                    </div>
                                    <div class="main-sex-entry-container">
                                        <div class="sl-label">Sex</div>
                                        <select name="" id="er-select" required="required">
                                            <option value="Male"></option>
                                            <option value="Female"></option>
                                        </select>
                                    </div>
                                    <div class="main-name-2-entry-container">
                                        <div class="sl-label">Parent's Name</div>
                                        <input type="text" name="text" id="er-name-2" required="required">
                                    </div>
                                    <div class="main-number-entry">
                                        <div class="sl-label">Parent's Phone</div>
                                        <input type="number" required="required" id="er-number-2">
                                    </div>
                                    <div class="main-description-container">
                                        <div class="sl-label">Why Ndejje</div>
                                        <textarea name="" id="cr-ndejje" cols="30" rows="10" required="required" ></textarea>
                                    </div>
                                    <div class="main-data-container">
                                        <div class="sl-label">Please Attach A copy of Your Results. (.pdf or .docx)</div>
                                        <input type="file" name="" id="cr-name">
                                    </div>
                                </form>
                                    <div class="main-data-continutit">
                                        <div class="sl-label">Continue</div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sl-3">
                    <div class="wrapper">
                        <div class="main-title">Almost Done!</div>
                        <div class="wrapper">
                            <div class="ql-email">
                                <div class="sl-label">Response Email.</div>
                                <div class="sl-label-2">We Will Get Back to you at this Email.</div>
                                <input type="email" name="" id="rp-email">
                            </div>
                            <div class="loader-area">
                                <div class="loader-component"></div>
                                <div class="loader-sucess"></div>
                                <div class="loader-failed"></div>
                            </div>
                        </div>
                        <div class="button-submit">
                            <div class="sl-label">Submit</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="u-l-section-wrapper">
                <div class="sl-wrapper">
                    <div class="tr-container">
                        <div class="tr-title">Sorry!</div>
                        <div class="tr-title-2">No Applications Available for O-level & A-level</div>
                        <div class="tr-title-3">Try Later!</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`

export class EnrollDialog extends HTMLElement implements IWebComponents {

    constructor() {
        super();
    }
    static is() {
        return "ns-enroll"
    }
    connectedCallback() {
        this.appendChild(Template_.content.cloneNode(true))
    }

}

customElements.define(EnrollDialog.is(),EnrollDialog)
