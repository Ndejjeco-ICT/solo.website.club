import { ICommonEvents, commonEvents } from "ns/common/events";
import { IWebComponents } from "ns/typings/schw";

interface IINavigationRoute {
    path: string;
    key: string;
}

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
        const routeElements = document.querySelectorAll("Route")! as NodeListOf<HTMLDivElement>;
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
                let pathLabel = this.getAttribute("path");
                let keyLabel = this.getAttribute("key");
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
    getAndSetRouteElementByKeyLabel(Key: string, entryElement: HTMLDivElement | null) {
        let locatedElement = this._this_().querySelector(`[${Key}]`)! as HTMLDivElement;
        entryElement = locatedElement;
        if (entryElement) {
            console.log('Inital Route Element located')
        }
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
            let getRequiredRouteElement: HTMLDivElement | null = null
            if (this.presentedRoutes.has(this.initialEnteredLocation)) {
                let routeKey = this.presentedRoutes.get(this.initialEnteredLocation)!;
                this.getAndSetRouteElementByKeyLabel(routeKey, getRequiredRouteElement);
                this.displayOrClearRouteElement(getRequiredRouteElement!, true)

                //Update Properties

                this.activeKeyElement = getRequiredRouteElement;
                this.activePath = this.initialEnteredLocation;
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
        let IncomingRouteElement = this._this_().querySelector(`[${Key}]`)! as HTMLDivElement;

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
            this.createRouteExchangeForNavigation(this.presentedRoutes.get(pathname)!, pathname)
        }
    }

    /**
     * Listen For the Push state
     */

    setCommonNavigationLocationPopStateListener() {
        window.addEventListener('popstate', () => {
            console.log("Location Changed");
            this.preEmitRequiredPathLocationLabel(window.location.pathname)
        });
    }



    preEmitRequiredPathLocationLabel(location: string) {
        if (this.locationPathEventManager) {
            this.locationPathEventManager.emit(location)
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