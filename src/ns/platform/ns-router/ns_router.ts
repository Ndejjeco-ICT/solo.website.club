import { ICommonEvents, commonEvents } from "ns/browser/common/events";
import { IWebComponents } from "ns/typings/schw";

interface IINavigationRoute {
    path: string;
    key: string;
}

export const NAVIGATION_ROUTE_EVENTS = {
    DID_NAVIGATE: "didNavigate"
}

export const NavigationInitialRouteEventManager = new commonEvents();

class NavigationRouter extends HTMLElement implements IWebComponents {

    private availableRouteElements: NodeListOf<HTMLDivElement> | null = null;
    private numberoFAllRouteElements: number = 0;
    private initialEnteredLocation: string = ""
    private presentedRoutes: Map<string, string> = new Map();

    private activePath: string = "";
    private activeKeyElement: HTMLDivElement | null = null;

    private locationPathEventManager: ICommonEvents<string> | null = null;

    constructor() {
        super();
    }
    static is(): string {
        return "ns-router"
    }
    private _this_() {
        return this
    }
    connectedCallback() {
        console.log("DidConnectNsRouterManager")
        this.initializeRouterNavigation()
    };

    initializeRouterNavigation() {
        this.getCurrentLocationPathName();
        this.getAllRouteElements();
        this.analyzeAndFetchAllRoutePathsAndLabelKeys();
        this.sequentiallyAssignRouteElementLocationPath()
        this.createEventLocationListenerManager();
        this.setCommonNavigationLocationPopStateListener();
    };

    /**
     * Create And Load Event Manager Later because its heavy
     */

    preloadNecessaryRouterDependencies() {
        if (this.locationPathEventManager == null) {
            this.locationPathEventManager = new commonEvents();
        }
    }
    /**
     * Get Inital Location Entered By the User in the Search Bar
     */
    getCurrentLocationPathName() {
        let locationLabel = window.location.pathname;
        console.log(locationLabel)
        this.initialEnteredLocation = locationLabel;
    }
    /**
     * Error Handlers;
     */
    throwErrorForAbsentKeyLabel(element: HTMLDivElement) {
        const _Error_ = new Error(`Key Label Not Found On Route:${element.textContent}, Please Label`);
        throw _Error_;
    }
    throwErrorForAbsentPathLabel(element: HTMLDivElement) {
        const _Error_ = new Error(`Path Label Not Found On Route:${element.textContent}, Please Label`);
        throw _Error_;
    }

    /**
     * Get All <Route> element tags 
     */
    getAllRouteElements() {
        const routeElements = document.querySelectorAll("ns-route")! as NodeListOf<HTMLDivElement>;
        if (routeElements.length > 0 && this.availableRouteElements == null) {
            this.availableRouteElements = routeElements;
            this.numberoFAllRouteElements = routeElements.length;
        }
    };

    /**
     * Fetch All keys and Paths From the accquired Routes
     */
    analyzeAndFetchAllRoutePathsAndLabelKeys() {
        if (this.numberoFAllRouteElements > 0 && this.availableRouteElements) {
            this.availableRouteElements.forEach((routeElement) => {
                let pathLabel = routeElement.getAttribute("path");
                let keyLabel = routeElement.getAttribute("key");
                let affirmedPath = "";
                let affirmedKey = ""
                if (pathLabel == null || pathLabel == "") {
                    this.throwErrorForAbsentPathLabel(routeElement)
                } else {
                    affirmedPath = pathLabel
                }
                if (keyLabel == null || keyLabel == "") {
                    this.throwErrorForAbsentKeyLabel(routeElement)
                } else {
                    affirmedKey = keyLabel
                }
                this.presentedRoutes.set(affirmedPath, affirmedKey)

            })
        }
    }

    /**
     * Helper in setting the Route Elememt
     * @param Key 
     * @param entryElement 
     */
    getAndSetRouteElementByKeyLabel(Key: string) {
        let locatedElement = this._this_().querySelector(`[key=${Key}]`)! as HTMLDivElement;
        
        return locatedElement
    }

    /**
     * Smooth fade In Animation For Entering Element 
     * @param element 
     */

    fadeInEntranceForElement(element: HTMLDivElement) {
        if (element) {
            element.style.display = "block";
            element.style.animation = "NavigationAnimationFade 1.5s forwards";
        }
    }
    /**
     * Smooth fade Out Animation For Entering Element 
     * @param element 
     */

    fadeOutLeavingForElement(element: HTMLDivElement) {
        if (element) {
            element.style.animation = "NavigationAnimationFade2 1.5s forwards";
            element.style.animation = "";
            element.style.display = "none";

        }
    }


    /**
     * Display or clear Element
     * @param element 
     * @param willShow 
     */
    displayOrClearRouteElement(element: HTMLDivElement, willShow: boolean) {
        if (willShow) {
            this.fadeInEntranceForElement(element)
        } else {
            this.fadeOutLeavingForElement(element)
        }
    }

    /**
     * Check Through and display the initial Route according the set location
     */
    sequentiallyAssignRouteElementLocationPath() {
        if (this.initialEnteredLocation.charAt(0)) {
            if (this.initialEnteredLocation == "/") {
                let routeKey = this.presentedRoutes.get("/home")!;
                let __dueElement = this.getAndSetRouteElementByKeyLabel(routeKey);
                this.displayOrClearRouteElement(__dueElement!, true)

                //Update Properties

                this.activeKeyElement = __dueElement;
                this.activePath = this.initialEnteredLocation;
            NavigationInitialRouteEventManager.emit("didFindInitialRoute",routeKey)

            } else  if (this.presentedRoutes.has(this.initialEnteredLocation)) {
                let routeKey = this.presentedRoutes.get(this.initialEnteredLocation)!;
                let __dueElement = this.getAndSetRouteElementByKeyLabel(routeKey);
                this.displayOrClearRouteElement(__dueElement!, true)

                //Update Properties

                this.activeKeyElement = __dueElement;
                this.activePath = this.initialEnteredLocation;
            NavigationInitialRouteEventManager.emit("didFindInitialRoute",routeKey)
            }
            this.preloadNecessaryRouterDependencies();
        }
    };

    /**
     * Manage to exchange Routes between the active and inactive route
     * @param Key 
     * @param newPathName 
     */
    createRouteExchangeForNavigation(Key: string, newPathName: string) {
        let OutgoingElement = this.activeKeyElement;
        let IncomingRouteElement = this._this_().querySelector(`[key=${Key}]`)! as HTMLDivElement;

        this.displayOrClearRouteElement(OutgoingElement!, false);
        this.displayOrClearRouteElement(IncomingRouteElement, true);

        //Update Properties
        this.activeKeyElement = IncomingRouteElement;
        this.activePath = newPathName;


        OutgoingElement = null;
    }


    /**
     * Location PathName Listener
     * @param pathname 
     */
    overallLocationPathListenerForRoutes(pathname: string) {
        if (this.presentedRoutes.has(pathname)) {
            let presentRouteKey = this.presentedRoutes.get(pathname)!;
            NavigationInitialRouteEventManager.emit("didFindInitialRoute",presentRouteKey)
            this.createRouteExchangeForNavigation(presentRouteKey!, pathname)
        }
    }

    /**
     * Listen For the Push state
     */

    setCommonNavigationLocationPopStateListener() {
        window.addEventListener('popstate', () => {
            console.log("Location Changed");
            this.preEmitRequiredPathLocationLabel(window.location.pathname)
            let __requiredRoute__ = window.location.pathname.substring(1)
            NavigationInitialRouteEventManager.emit(NAVIGATION_ROUTE_EVENTS.DID_NAVIGATE,__requiredRoute__)
        });
    }



    preEmitRequiredPathLocationLabel(location: string) {
        if (this.locationPathEventManager) {
            this.locationPathEventManager.emit("didChangeLocationPathName",location)
        }
    }

    /**
     * Location Event Manager
     */
    createEventLocationListenerManager() {
        if (this.locationPathEventManager) {
            this.locationPathEventManager.addListener("didChangeLocationPathName", this.overallLocationPathListenerForRoutes.bind(this))
        }
    }







}

customElements.define(NavigationRouter.is(), NavigationRouter)