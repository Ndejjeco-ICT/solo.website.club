/**
 * The Media Scroll Manager
 */


 import { addDisposableEventListener} from "ns/browser/common/domListener";
 import { IGlobalEventEmitter, globalEventEmitter } from "ns/browser/common/events";
 import {createInstance } from "ns/base/instanceCreators/instanceCreators";
 
 export interface IMediaScreenDimensions {
     width: number,
     height: number;
 }
 export interface IMediaScrollPositions {
     X:number,
     Y:number
 }
 
 interface IMediaScreenManager{
     mediaWindowScreenDidResize: IGlobalEventEmitter<IMediaScreenDimensions>;
     mediaWindowScreenDidScroll:IGlobalEventEmitter<IMediaScrollPositions>;
 }
 
 
 export class MediaScreenManager implements IMediaScreenManager {
 
     public mediaWindowScreenDidResize: IGlobalEventEmitter<IMediaScreenDimensions>;
     public mediaWindowScreenDidScroll:IGlobalEventEmitter<IMediaScrollPositions>;
 
     constructor() { 
         this.mediaWindowScreenDidResize = new globalEventEmitter<IMediaScreenDimensions>();
         this.mediaWindowScreenDidScroll = new globalEventEmitter<IMediaScrollPositions>();
         this._registerEventListenerForScreenChange();
     };
 
     private _registerEventListenerForScreenChange() {
         addDisposableEventListener(window,"scroll",()=>{
             const positions:IMediaScrollPositions = {
                 X : window.scrollX,
                 Y : window.scrollY
             }
             setTimeout(()=>{
                 this.mediaWindowScreenDidScroll.raiseEvent(positions)
             },9)
         })
         addDisposableEventListener(window, "resize", () => {
             const dimensions: IMediaScreenDimensions = {
                 width: window.innerWidth,
                 height: window.innerHeight,
             }
             //throttle event to prevent lagging of website;
             setTimeout(() => {
                 this.mediaWindowScreenDidResize.raiseEvent(dimensions); 
             },9)
         })
     };
 
 };
 
 export const MediaScreenManagerControl = createInstance<IMediaScreenManager>(MediaScreenManager);