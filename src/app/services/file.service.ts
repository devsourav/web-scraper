import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { ApiUrlConstants } from '../constants/api-url.constants';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private rest: RestService) { }

  getExcelFile() {

  }

  getExcelList() {
    return this.rest.get(ApiUrlConstants.EXCEL_LISTS, false);
  }

  uploadExcelFile(url: string, fileList: any) {
    if (fileList && fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadExcelFile', file, file.name);
      return this.rest.post(url, formData, true);
    } else {
      return null;
    }
  }

}
