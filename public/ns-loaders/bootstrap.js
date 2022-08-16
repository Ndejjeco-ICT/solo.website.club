//@ts-check
(function (globalThis, factory) {

    //@ts-ignore
    globalThis.NsBootstrap = factory()


})(this, function () {


    const partsStyleElement = document.createElement("style");
    partsStyleElement.innerHTML = `
    *{
        margin : 0px;
        padding : 0px;
        box-sizing : border-box;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    }
    @keyframes partsLoader {
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
    document.head.appendChild(partsStyleElement)


    const currentLocation = window.location.pathname

    function createPartssplashScreen() {
        document.body.style.backgroundColor = "#ececec";

        const partsSplash = document.createElement("div");
        partsSplash.className = "parts-splash"
        partsSplash.style.width = "100%"
        partsSplash.style.height = "100vh";
        partsSplash.style.position = "absolute";
        partsSplash.style.top = "0px";


        const mainDashBoard = document.createElement("div");
        mainDashBoard.style.position = "absolute"
        mainDashBoard.style.top = "0px";
        mainDashBoard.className = "parts-dashboard";
        mainDashBoard.style.width = "100%";
        mainDashBoard.style.height = "100px";
        mainDashBoard.style.backgroundColor = "#080808";
        mainDashBoard.style.animation = "greyChanger 3s linear infinite"
        mainDashBoard.style.zIndex = "100000"


        const loaderDashBoard = document.createElement("div");
        loaderDashBoard.style.zIndex = "13"
        loaderDashBoard.className = "parts-loaderdashboard";
        loaderDashBoard.style.position = "absolute"
        loaderDashBoard.style.top = "0px";
        loaderDashBoard.style.width = "100%"
        loaderDashBoard.style.height = "100%";
        loaderDashBoard.style.display = "flex"
        loaderDashBoard.style.alignItems = "center";
        loaderDashBoard.style.justifyContent = "center";

        const loaderCover = document.createElement("div");
        loaderCover.style.width = "250px"
        loaderCover.style.height = "250px"

        const openText = document.createElement("div");
        openText.innerHTML = "Just A Moment!"
        openText.style.color = "#5743c9"
        openText.style.height = "50px";
        openText.style.width = "100%"
        openText.style.display = "flex"
        openText.style.alignItems = "center";
        openText.style.justifyContent = "center";
        openText.style.fontSize = "17pt"
        openText.style.marginTop = "10px"



        const loaderElementWrapper = document.createElement("div");
        loaderElementWrapper.style.width = "250px";
        loaderElementWrapper.style.display = "flex"
        loaderElementWrapper.style.alignItems = "center";
        loaderElementWrapper.style.justifyContent = "center";



        const loaderElement = document.createElement("div");
        loaderElement.className = "parts-loader"
        loaderElement.style.width = "150px";
        loaderElement.style.height = "150px";
        loaderElement.style.border = "6px solid #ececec";
        loaderElement.style.borderTopColor = "#5743c9";
        loaderElement.style.borderRadius = "50%"
        loaderElement.style.animation = "partsLoader .6s linear infinite"

        loaderElementWrapper.appendChild(loaderElement)


        loaderCover.appendChild(loaderElementWrapper)
        loaderCover.appendChild(openText)

        loaderDashBoard.appendChild(loaderCover);
        partsSplash.appendChild(mainDashBoard);
        partsSplash.appendChild(loaderDashBoard);
        document.body.appendChild(partsSplash)

    }

    function destroySplashScreen() {
        const __mainDashBoard = document.querySelector(".parts-splash");
        const __loaderSpin = document.querySelector(".parts-loader");

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
