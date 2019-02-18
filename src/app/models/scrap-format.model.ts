import { AttributeExtraction } from "./attribute-extraction.model";

export interface ScrapFormat {
    id?: string;
    url: string;
    html?: string;
    result?: boolean;
    isFileAttach?: boolean;
    fileName?: string;
    isFileUpdate?: boolean;
    attributeList?: AttributeSet[];
    pickerSetList?: AttributeExtraction[];
}

export interface AttributeSet {
    ['string']: string;
}
