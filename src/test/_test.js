/**
 * Search Parameters test.
 */

(function(){


    const _searchParameters = new URL("https://www.ndejjesss.com/insights?query=interact-club")
   const ty =  _searchParameters.searchParams.get("query")

    console.log(ty)

})();