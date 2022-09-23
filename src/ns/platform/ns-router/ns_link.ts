import { IWebComponents } from "ns/typings/schw";


class NavigationLink extends HTMLElement implements IWebComponents {
    private ___currentHref: string = ""
    constructor() {
        super();

    }
    static is() {
        return "ns-link"
    }
    connectedCallback() {
        this.intializeLinkElement()
    };
    preventDefaultPageLoad(classLabel: string) {
        let _currentLink = this.querySelector<HTMLAnchorElement>(`.${classLabel}`)!;
        _currentLink.addEventListener('click', (event) => {
            if (event.metaKey || event.ctrlKey) {
                return;
              }

            event.preventDefault();
            window.history.pushState({}, "", this.___currentHref);
            const navEvent = new PopStateEvent('popstate');
            window.dispatchEvent(navEvent);
        })
    }
    intializeLinkElement() {
        let initalContent = this.innerHTML;
        let className = this.getAttribute("classname")!;
        let href = this.getAttribute("href")!;

        this.innerHTML = `
        <div>
             <a href="${href}" class="${className}">${initalContent}</a>
        </div>
    `
        this.___currentHref = href;
        this.preventDefaultPageLoad(className)
    }

}
customElements.define(NavigationLink.is(), NavigationLink)