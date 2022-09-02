import { createInstance } from "ns/base/instanceCreators/instanceCreators";
import { MainData,IIData } from "ns/browser/components/views/Home/dom-modules/insights/strings";



class preloadModulesLoader {

    constructor() {
        this.initializeTemplateModulesLoader()
    }
    initializeTemplateModulesLoader() {
        this.preloadNecessaryControlDependicies()
    }

    private getTemplate(key: string):HTMLTemplateElement {
        const _ = document.querySelector(`dom-module[key="${key}"] template`)! as HTMLTemplateElement;
        return _;
    }

    private templateDependencies(data: IIData[]) {
        
        data.forEach((templateControl) => {
            const _templateHolder = this.getTemplate(templateControl.template_module.key);
            _templateHolder.innerHTML = templateControl.template_module.template;    
        })
    
    }
    
    
    async  preloadNecessaryControlDependicies() {
        return new Promise<void>((c) => {
            this.templateDependencies(MainData);
            c()
        });
    }


}


createInstance<any>(preloadModulesLoader)