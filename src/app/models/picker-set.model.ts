import { AttributeExtraction } from './attribute-extraction.model';

export interface PickerSet {
    p_name: string;
    p_length?: number;
    isVerified?: boolean;
    isEdit?: boolean;
    update_time?: Date;
    p_list?: AttributeExtraction[];
}

export interface PickerSetList {
    _id:string;
    __v: number;
    picker_set: PickerSet;
}