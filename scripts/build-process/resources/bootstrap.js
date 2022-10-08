//@ts-check
(function (globalThis, factory) {

    //@ts-ignore
    globalThis.NsBootstrap = factory()


})(this, function () {


    const partsStyleElement = document.createElement("style");
    partsStyleElement.className = "splashStyles";
    partsStyleElement.innerHTML = `
    *{
        margin : 0px;
        padding : 0px;
        box-sizing : border-box;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    }
    @keyframes partsTransformLoader {
        100%{
            transform: rotate(360deg);
        }
    }
    @keyframes greyChanger {
        0%{
            background-color : #080808;
        }
        100%{
            background-color: #242323;   
        }
    }
    `
    document.head.appendChild(partsStyleElement);




    const currentLocation = window.location.pathname

    function createPartssplashScreen() {
        const nsSplashComponent = document.createElement("div");
        nsSplashComponent.className = "parts-splash";
        nsSplashComponent.style.width = "100%"
        nsSplashComponent.style.height = "100vh";
        nsSplashComponent.style.position = "absolute";
        nsSplashComponent.style.top = "0px";
        nsSplashComponent.style.display = "flex";
        nsSplashComponent.style.alignItems = "center";
        nsSplashComponent.style.justifyContent = "center";


        const nsPictureLoaderArea = document.createElement("div");
        nsPictureLoaderArea.className = "ns-picture-loader"
        nsPictureLoaderArea.style.width = "100%"
        nsPictureLoaderArea.style.height = "100vh";
        nsPictureLoaderArea.style.position = "relative";
        nsPictureLoaderArea.style.display = "flex";
        nsPictureLoaderArea.style.alignItems = "center";
        nsPictureLoaderArea.style.justifyContent = "center";
        nsPictureLoaderArea.innerHTML = `
        <div class="ns-cl-wrapper">
        <div class="splash-image-resizable" style="margin-bottom:40px;">
            <picture class="image-content-control">
                <img src="../workbench/parts/splash.png" preload="true">
            </picture>
        </div>
        <div class="splash-image-minner-loader" style="display: flex;align-items: center;justify-content: center;">
            <div class="cl-loader" style="width: 40px;height:40px; border-radius: 50%; border: 3px solid transparent; border-top-color: #2b63fd; animation: partsTransformLoader .5s linear infinite;"></div>
        </div>
        <div class="cl-statement" style="position: absolute; left: 0px; bottom: 0px; color: #808080; width: 100%;height: 80px;display: flex;align-items: center;justify-content: center;">No Pain No Gains</div>
    </div>
    
    `
        nsSplashComponent.appendChild(nsPictureLoaderArea)
        document.body.appendChild(nsSplashComponent)

    }

    function destroySplashScreen() {
        const __mainDashBoard = document.querySelector(".parts-splash");
        const __loaderSpin = document.querySelector(".cl-loader");

        // @ts-ignore
        __mainDashBoard.style.display = "none";
        // @ts-ignore
        __loaderSpin.style.animation = "";
    }

    function createAndAddInitialRootElement() {
        document.body.insertAdjacentHTML("beforeend", `
            <ns-root></ns-root>
        `)
    };
    return {
        __PARTSSPLASHSCREEN__: createPartssplashScreen,
        __DESTROYSPLASHSCREEN__: destroySplashScreen,
        __CREATEINITIALROOT__: createAndAddInitialRootElement,
        __LOCATIONPATHNAME__: currentLocation
    }

})
