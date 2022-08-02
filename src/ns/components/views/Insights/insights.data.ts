
interface IInsightsData {
    dataSections : {

        section1 : {
            sectionTitle:string,
            contentTitle : string,
            sectionImageSource:string,
            boundaryImageSource:string,
        },
        section2 : {
            mainContentHandle: string,
            mainContentHandleImageSource:string,
            twitterLinkSource:string,
        },
        section3 : {
            startupImageSource:string
            startupContentData:string
        },
        section4 : {
            interactiveMotto:string,
            interactiveImageSource:string,
        },
        section5 : {
            lastContentData:string
        }

    }
};


type InsightsDataLayout =  { 
    __insight__ :{
        __insightKey : string,
        __data : IInsightsData
    }
}

const InsightsMainData:InsightsDataLayout[] = [

    {
        __insight__ : {
            __insightKey : "interact",
            __data : {
                dataSections : {
                    section1 : {
                        sectionTitle : "Interact Club",
                        contentTitle : "Interact Club",
                        sectionImageSource : "./"
                    }
                }
            }
        }
    }
]