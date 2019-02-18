import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiUrlConstants } from '../../constants/api-url.constants';
import { COMMON_CONST } from '../../constants/common.constants';
import { FileService } from '../../services/file.service';
import { SnackMessageService } from '../../services/snack-message.service';
import { FileInfo } from '../../models/file.model';

@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.scss']
})
export class SpreadsheetComponent implements OnInit {

  searchExcel: string = '';
  selectedFileName: string = '';
  fileList: FileList;
  isFileUploading: boolean = false;
  displayedColumns: string[];
  fileUploadForm: FormGroup;
  fileInfoList: FileInfo[];
  tempFileInfoList: FileInfo[];

  constructor(private _formBuilder: FormBuilder,
    private fileService: FileService,
    private sm: SnackMessageService) { }

  ngOnInit() {
    this.displayedColumns = COMMON_CONST.excelListColums;
    this.fileUploadForm = this._formBuilder.group({
      fileName: ['']
    });
    console.log(ApiUrlConstants.EXCEL_LISTS);
    this.fileService.getExcelList().then((response) => {
      this.tempFileInfoList = response as FileInfo[];
      this.fileInfoList = this.tempFileInfoList.slice();
      console.log(this.fileInfoList);
    }).catch((err) => {
      console.log(err);
    });
  }

  searchExcelList() {
    if (this.searchExcel != '') {
      this.fileInfoList = this.tempFileInfoList.filter(file => {
        return file.fileName.match(this.searchExcel.toLowerCase().trim());
      });
    } else {
      this.fileInfoList = this.tempFileInfoList.slice();
    }
  }

  fileSelect(file) {
    this.selectedFileName = file.target.value;
    this.fileList = file.target.files;
  }

  removeFile() {
    this.selectedFileName = '';
    this.fileList = {} as FileList;
    this.fileUploadForm.setValue({ fileName: '' })
  }

  uploadFile() {
    this.isFileUploading = true;
    this.fileService.uploadExcelFile(ApiUrlConstants.EXCEL_UPLOAD, this.fileList).then((response) => {
      console.log(response);
      this.isFileUploading = false;
      let payload = response.payload;
      console.log(payload);
      this.sm.showSnackMessage('File successfully Uploaded', 'OK');
    }).catch((err) => {
      console.log(err);
      this.isFileUploading = false;
      this.sm.showSnackMessage('Failed to Upload file', 'Try Again');
    });
  }

}