import { Route } from "ns/base/Router/Route";
import { commonEvents, globalEventEmitter, ICommonEvents, IGlobalEventEmitter } from "ns/common/events"
import { LifeCycleEvents, Lifecycle } from "ns/common/lifecycle"
/**
 * The Router enables navigation within Pages with the use html hashes
 * without the necessisity of actually reloading the page.
 */


/**
 * The Router consist of different lifecycles that takeplace
 * Initializing, Loading, Restored
 */



export type MainRoutes = "home" | "about" | "blog" | "academics" | "pagenotfound" | "insights";
type NavigationState = "towards" | "AwayFrom" | "static";


interface IRouteNavigationHookCallbackOptions {
    /**
     * The Data Recieved From The Navigation
     */
    data: any;
    /**
     * The Nature of Navigation.
     */
    navigationState: NavigationState;
}


/**
 * The Router Options and Parameters.
 */
interface IRouterOptions {




    /**
     * Enables users to Navigate within the Routes.
     * @param RouteId The RouteId Without a Hash
     * @param data Any Data To Send Across to the , to be navigated to Pag
     */
    NavigateToRoute(RouteId: MainRoutes, data: any): void;



    /**
     * Called when navigation to a route takeplaces
     */
    didNavigateToRouteEventManager: IGlobalEventEmitter<MainRoutes>;


};



/**
 * View manager
 */

class NSRouterView {


    constructor() { };
    protected getViewComponent(attribute: string) {
        let _component = document.querySelector(`[ns-view=${attribute}]`)! as HTMLDivElement;
        return _component;
    };


    private __navigationAnimationIntialize(component: HTMLDivElement) {
        if (component) {
            component.style.animation = "NavigationAnimationFade 1.5s forwards"
        }
    }
    private __navigationAnimationUNIntialize(component: HTMLDivElement) {
        if (component) {
            component.style.animation = "NavigationAnimationFade2 1.5s forwards"
            component.style.animation = ""

        }
    };

    private makeRouteFullCheckupAndDefault() {

        const _analogousElements = document.querySelectorAll("[ns-route=active]");

        if (_analogousElements && _analogousElements.length > 1) {
            console.log("---breaking elements detected");
        }
    }




    protected getActiveRouteComponent() {
        let _activeComponent = document.querySelector(`[ns-route=active]`)! as HTMLDivElement;
        return _activeComponent;
    };
    protected toggleRouteExchange(component: HTMLDivElement, initialLoad: boolean) {
        if (initialLoad) {

            component.setAttribute("ns-route", "active");
            this.__navigationAnimationIntialize(component);

            this.makeRouteFullCheckupAndDefault()
        } else {
            let activeRouteComponent = this.getActiveRouteComponent();
            if (activeRouteComponent) {

                this.__navigationAnimationUNIntialize(activeRouteComponent)
                activeRouteComponent.setAttribute("ns-route", "inactive");

                /**
                 * Required Navigation Animation
                 */



                component.setAttribute("ns-route", "active");
                this.__navigationAnimationIntialize(component);
                this.makeRouteFullCheckupAndDefault()

            } else {

                component.setAttribute("ns-route", "active");
                this.__navigationAnimationIntialize(component);

            }


        }
    }
};

export class NSRouter extends NSRouterView implements IRouterOptions {
    private RouterAndViewAttributeLocationStorage: Map<string, string>;
    private _nsRoutesArray: Route[];
    didNavigateToRouteEventManager: IGlobalEventEmitter<MainRoutes>


    constructor(Routes: Route[]) {
        super();
        this.RouterAndViewAttributeLocationStorage = new Map<string, string>();
        this._nsRoutesArray = Routes;
        this.didNavigateToRouteEventManager = new globalEventEmitter()
        this.registerForLifecyclEvents()

    };


    private _dispatchForEventForRouteChange(route: MainRoutes) {
        this.didNavigateToRouteEventManager.raiseEvent(route)
    }



    /**
     * Register for lifecycle events to enable the router to  start 
     * according to the lifecycle
     */

    private registerForLifecyclEvents() {
        LifeCycleEvents.onPhaseDidChange.subscribe(this._listenerForLifecyclEvents.bind(this));
    };

    /**
     * Initialize the router when the required 
     * phase as been reached
     * @param phase 
     */
    private _listenerForLifecyclEvents(phase: Lifecycle) {
        if (phase == Lifecycle.Restored) {
            this.nsRouteInitialization();
        }
        LifeCycleEvents.onPhaseDidChange.unsubscribe(this._listenerForLifecyclEvents.bind(this));


    }
    private nsRouteInitialization() {
        //record required routes
        this.storeRouteLocationsAndRequiredViewAttributes();
        this._loadContentOFPage();
        this._registerEventListenerForHashDidChange();
        LifeCycleEvents.phase = Lifecycle.Ready;


    }


    NavigateToRoute(RouteId: MainRoutes): void {
        if (this.isHashPresent(RouteId)) {
            this._setLocationHash(RouteId);
        } else {
            this._setLocationHash("pagenotfound")
        }
    };




    private _setLocationHash(routeid: MainRoutes) {
        window.location.hash = routeid;
    }

    private _registerEventListenerForHashDidChange() {
        window.addEventListener("hashchange", this.listenerForHashDidChange.bind(this));
    };
    //@ts-ignore
    private listenerForHashDidChange(ev: HashChangeEvent) {
        this._loadContentOFPage();
    }

    private _readCurrentAvailablHash() {
        let _hash = window.location.hash;
        return _hash.substring(1);
    };

    private _loadContentOFPage() {
        let _currentHashTitle = this._readCurrentAvailablHash();
        if (_currentHashTitle == "") {
            let _viewAttribute = this.getViewAttriubte("home");
            this.toggleRouteExchange(this.getViewComponent(_viewAttribute), true)
            this._dispatchForEventForRouteChange("home")
        } else {
            if (this.isHashPresent(_currentHashTitle)) {
                let _viewAttribute = this.getViewAttriubte(_currentHashTitle);
                this._dispatchForEventForRouteChange(_currentHashTitle! as unknown as MainRoutes)
                this.toggleRouteExchange(this.getViewComponent(_viewAttribute), false)

            } else {
                let _viewAttribute = this.getViewAttriubte("pagenotfound");
                this._dispatchForEventForRouteChange("pagenotfound");
                this.toggleRouteExchange(this.getViewComponent(_viewAttribute), false)

            }
        }


    }
    private getViewAttriubte(hashTitle: string) {
        let __hash__ = "/" + hashTitle;
        return this.RouterAndViewAttributeLocationStorage.get(__hash__)!;
    }
    private isHashPresent(hash: string) {
        let __hash__ = "/" + hash;
        if (this.RouterAndViewAttributeLocationStorage.has(__hash__)) {
            return true;
        } else {
            return false;
        }
    }

    private storeRouteLocationsAndRequiredViewAttributes() {
        for (let i = 0; i < this._nsRoutesArray.length; i++) {
            if (!this.RouterAndViewAttributeLocationStorage.has(this._nsRoutesArray[i].routeLocation)) {
                this.RouterAndViewAttributeLocationStorage.set(this._nsRoutesArray[i].routeLocation, this._nsRoutesArray[i].routeViewAttribute);
            }
        }
    }


};

