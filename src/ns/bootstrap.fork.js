(function () {
    
    function sdsds() {
        return /** @type {Promise<void>} */(new Promise((c, e) => {
            setTimeout(() => {
                c()
            },8000)
        }))
    }

    function _delayForLoadAndInitialReload() {
        window.addEventListener("popstate", (ev) => {

            ev.preventDefault();
            sdsds()
            console.log("Location Early pull")
        })
    }
    _delayForLoadAndInitialReload()
})();