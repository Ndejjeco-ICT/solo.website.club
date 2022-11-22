import { dataBundle } from "./data";





class dataSeqencer {

    private _numberBlogItems:number;
    private _blogData:Array<any>;
    constructor(){
        this._numberBlogItems   = 0;
        this._blogData = []
        this.initalize();
    }



    private initalize(){
        this._readDataFromJSONFileSynchronously()
    }

    private _readDataFromJSONFileSynchronously(){
        const _data = dataBundle.blogdata;
        this._numberBlogItems = _data.length;
        this._blogData = _data;
    }

    private _signalCreationOfBlogComponents(){
        
    }



}