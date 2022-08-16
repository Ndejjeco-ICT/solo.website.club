/**
 * news item data;
 */



export interface INewsData {

    title : string;
    content : string;
    pictureSource:string;

}


const newsDataPackage:INewsData[] = [


     {
        title :  "New Education System",
        content : "Since this year,2022 The Government has introduced the new education ciruculum",
        pictureSource : ""
     },
     {
        pictureSource : "",
        title : "Covid 19 Pandemic",
        content : "Due the devastating occurrence of the worldwide panademic that lead to the closure of schools for about 2 years"
     },
     {
        pictureSource : "",
        title : "Sports World",
        content : " Uganda will field five sports disciplines of Athletics, Basketball (3×3), Table Tennis, Badminton and Swimming at the 2022 ISF World School"
     }
];


export class NewsItemComponentLoader {

   private _newItemsHost:HTMLDivElement

   constructor(_e_:HTMLDivElement) {
      this._newItemsHost = _e_; 
      this._init()
   };
   private _init(){
      this._createElements()
   };
   private _createElements(){
      newsDataPackage.forEach((e)=>{
         const _commonTemplate = `
         <ns-x-newsitem labeltitle="${e.title}" data="${e.content}" picturesrc="${e.pictureSource}"></ns-x-newsitem>
         `
         this._newItemsHost.insertAdjacentHTML("afterbegin",_commonTemplate)
      })
   }



};

