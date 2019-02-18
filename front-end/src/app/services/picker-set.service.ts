import { Injectable } from '@angular/core';
import { RestService } from './rest.service'
import { PickerSet } from '../models/picker-set.model';
import { Api_url, picker_url } from '../constants/api-url.constants';

@Injectable({
  providedIn: 'root'
})
export class PickerSetService {

  constructor(private restService: RestService) { }

  //
  getAllPickerSet() {
    return this.restService.get(Api_url.PICKER + picker_url.PICKER_LIST, false);
  }

  addPickerSet(pickerSet: PickerSet) {
    return this.restService.post(Api_url.PICKER + picker_url.PICKER_ADD, pickerSet, false);
  }

  updatePickerSet(pickerSet: PickerSet) {
    return this.restService.post(Api_url.PICKER + picker_url.PICKER_UPDATE, pickerSet, false);    
  }

  removePickerSet(pickerSet: PickerSet) {
    return this.restService.post(Api_url.PICKER + picker_url.PICKER_DELETE, pickerSet, false);    
  }
}
