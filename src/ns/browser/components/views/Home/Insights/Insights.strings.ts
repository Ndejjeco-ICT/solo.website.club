//insghts main page images

// @ts-ignore
import prefectorialBody from "ns/assets/site_images/home_view/cr_insights/becky.jpg";
// @ts-ignore
import clubforum from "ns/assets/site_images/home_view/cr_insights/clubforum100.jpg";
// @ts-ignore
import interactclub from "ns/assets/site_images/home_view/cr_insights/interactclub.jpg";
// @ts-ignore
import juniorarchiever from "ns/assets/site_images/home_view/cr_insights/juniorachiver.jpg";
// @ts-ignore
import studentscouncil from "ns/assets/site_images/home_view/cr_insights/studentscouncil.jpg";
// @ts-ignore
import writers from "ns/assets/site_images/home_view/cr_insights/redcross.jpg";
// @ts-ignore



const ImageSocketBreaker = [studentscouncil,prefectorialBody,interactclub,writers,juniorarchiever,clubforum]

export interface IInsightsString {
    title: string,
    key: string,
    mainDescription: string
    shortDescription: string,
    query: string,
}



export const InsightsStrings: IInsightsString[] = [


    {
        title: "The Student's Council 2021-2022",
        mainDescription: "To prepare and produce disciplined, patriotic and self reliant citizens for National Development.",
        shortDescription: "The struggle for liberation",
        query: "students-council",
        key: "cg-3"
    },
    {
        title: "The Prefectorial Body 2021-2022",
        mainDescription: "Refined by fire and only those built on Christ as foundation will stand",
        shortDescription: "Refine for Excellence",
        query: "prefectorial-body",
        key: "cg-6"
    },
    {
        title: "Interact Club 2021-2022",
        mainDescription: "Serving others beyond self, from an idea introduced during a fellowship, ideas exchanged and ideas turned to reality",
        shortDescription: "Service above self.",
        query: "intercat-club",
        key: "cg-1"
    },
    {
        title: "Genuine Writers 2021-2022",
        mainDescription: "Bringing information and all you need to know close to you.",
        shortDescription: "From Ink Came Power",
        query: "writers-club",
        key: "cg-4"
    },
    {
        title: "Junior Achievement Club 2021-2022",
        mainDescription: "Developing business skills in young people. and strengthening the existing and coming generation.",
        shortDescription: "Business and Skills. ",
        query: "junior-achievement",
        key: "cg-2"

    },

    {
        title: "Clubs Forum 2021-2022",
        mainDescription: "",
        shortDescription: "With Great Power Comes Great Responsiblity.",
        query: "clubs-forum",
        key: "cg-5"
    }
]


export class InsightsLoader {

    private _insightsContainer: HTMLDivElement;

    constructor(element: HTMLDivElement) {
        this._insightsContainer = element;
        this._initInsights(InsightsStrings)
    };

    private _initInsights(insightsDatabase: IInsightsString[]) {
        insightsDatabase.forEach((_data,index) => {
            this._createTemplateBasis(_data,ImageSocketBreaker[index])
        });

    }

    private _createTemplateBasis(__element: IInsightsString,imageSource:string) {
        const _srTemplate = `
        <div class="card-x-component ${__element.key}">
        <div class="card-content">
            <div class="card-content-wrapper">
                <div class="card-content-image">
                    <picture class="pcturie-image-container">
                        <img loading="lazy" src= "${imageSource}"/>
                    </picture>
                </div>
                <div class="card-content-info">
                    <div class="x-title-1 ctrinfo">
                        <div class="wrapper">
                            ${__element.shortDescription}
                        </div>
                    </div>
                    <div class="x-title-2 ctrinfo">
                        <div class="wrapper">
                            ${__element.mainDescription}
                        </div>
                    </div>
                    <div class="x-title-btn">
                        <ns-link href= "./insights=query?=${__element.query}">
                            <div class="x-btn-wrapper ctrinfo">
                                    <div class="sl-button">&RightArrow;</div>
                                    <div class="sl-text">Read More From ${__element.title}.</div>
                            </div>
                        </ns-link>
                    </div>
                </div>
            </div>
        </div>
        </div>
        `;

        //attach main element
        this._insightsContainer.insertAdjacentHTML("afterbegin", _srTemplate);

    }

}