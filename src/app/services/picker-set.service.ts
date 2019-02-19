import { Injectable } from '@angular/core';
import { RestService } from './rest.service'
import { PickerSet, PickerSetList } from '../models/picker-set.model';
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

  updatePickerSet(picker: PickerSetList) {
    return this.restService.post(Api_url.PICKER + picker_url.PICKER_UPDATE, picker, false);
  }

  removePickerSet(picker_id: string) {
    return this.restService.get(Api_url.PICKER + picker_url.PICKER_DELETE + '/' + picker_id, false);
  }
}
