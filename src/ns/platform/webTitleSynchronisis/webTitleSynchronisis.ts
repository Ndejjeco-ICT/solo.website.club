import {createInstance} from "ns/base/instanceCreators/instanceCreators"
import {NavigationInitialRouteEventManager} from "ns/platform/ns-router/ns_router"



/**
 * The Weblocator helps to update the Window title evenly as navigation occurs...
 */

const RouteTitleLayouts = {

    "Home-view" : {
        title : "Ndejje Senior Secondary School | Home"
    },
    "About-view" : {
        title : "Ndejje Senior Secondary School | About us",
    },
    "blog-view" : {
        title : "Ndejje Senior Secondary School | Blog",
    },
    "Academics-view" : {
        title : "Ndejje Senior Secondary School | Academics",
    },
    "Insights-view" : {
        title : "Ndejje Senior Secondary School | Insights",
    },
    "Not_Found" : {
        title : "Not Found",
    }
};

export class WebLocator {
    private __DOM__:Document = document;
    constructor() { 
        this._init()
    };
    private _init(){
        this._listenForLocationChanges()
    }


    private _listenForLocationChanges(){
        NavigationInitialRouteEventManager.emit("didNavigate",this._listenerForRoutes.bind(this))
        // WebMainInstance.FrameRouter.didNavigateToRouteEventManager.subscribe(this._listenerForRoutes.bind(this))
    }
    private _listenerForRoutes(route:string){
        console.log("listening from the didNavigate",route)
        switch (route) {
            case "aboutus":
                this.__DOM__.title = RouteTitleLayouts["About-view"].title          
            break;

            case "home":
                this.__DOM__.title = RouteTitleLayouts["Home-view"].title          
                
            break;

            case "academics":
                this.__DOM__.title = RouteTitleLayouts["Academics-view"].title          
                
            break;

            case "blog":
                this.__DOM__.title = RouteTitleLayouts["blog-view"].title          
                
            break;
            case "insights" : 
                this.__DOM__.title = RouteTitleLayouts["Insights-view"].title;
            break;
            case "Not_Found":
                this.__DOM__.title = RouteTitleLayouts["Not_Found"].title;

        }
    }
}


createInstance<any>(WebLocator);