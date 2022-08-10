import { IWebComponents } from "ns/typings/schw";


class NavigationRoute extends HTMLElement implements IWebComponents {

    constructor(){
        super();
    }

    connectedCallback(){
        this.initalizeRoute()
    };

    static is(){
        return "ns-route"
    }
    initalizeRoute(){
        this.style.display = "none"
    }


}
customElements.define(NavigationRoute.is(),NavigationRoute)