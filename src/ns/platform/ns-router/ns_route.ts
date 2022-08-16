import { IWebComponents } from "ns/typings/schw";


class NavigationRoute extends HTMLElement implements IWebComponents {
    private __currentPathForRoute: string = window.location.pathname;
    constructor(){
        super();
    }

    connectedCallback() {
        this.initalizeRoute()
    };
    static observeredAttributes() {
        return ["path","key"]
    }
    set path(value: string) {
        if (value) {
            this.setAttribute("path",value)
        }
    }
    get path() {
        return this.getAttribute("path")!
    }
    set key(value: string) {
        if (value) {
            this.setAttribute("key",value)
        }
    }
    get key() {
        return this.getAttribute("path")!
    }

    static is(){
        return "ns-route"
    }
    initalizeRoute(){
        this.style.display = "none";
        this.checkForAvailability()
    }
    checkForAvailability() {
        if (this.__currentPathForRoute == this.path) {
            this.style.display = "block"
        } else if (this.__currentPathForRoute == "/" && this.path == "/home") {
            this.style.display = "block"
        }
    }


}
customElements.define(NavigationRoute.is(),NavigationRoute)