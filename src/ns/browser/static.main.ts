import { createInstance } from "ns/base/instanceCreators/instanceCreators";
import { DefaultRootControl } from "ns/browser/components/root/root";

class STATIC_WEB_OVERALL_LOADER {

    constructor() {
        this.registerForPolyFillsEvent()
    };
    private registerForPolyFillsEvent() {
        document.addEventListener("WebComponentsReady", () => {
            this.defineCommonRootElement();
            this.destroySplashScreen();
            this.registerCommonRootElement();
            
        });
    }
    private defineCommonRootElement() {
        //@ts-ignore
        window.NsBootstrap.__CREATEINITIALROOT__()
    }
    private registerCommonRootElement() {
        customElements.define(DefaultRootControl.is(), DefaultRootControl);
    };
    private destroySplashScreen() {
        //@ts-ignore
        window.NsBootstrap. __DESTROYSPLASHSCREEN__()
    }

}

createInstance<any>(STATIC_WEB_OVERALL_LOADER)