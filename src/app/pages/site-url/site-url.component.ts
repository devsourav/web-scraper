import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { UrlExtensions } from '../../models/url-extention.model';
import { ScrapFormat, AttributeSet } from '../../models/scrap-format.model';
import { AttributeExtraction } from '../../models/attribute-extraction.model';
import { MatTableDataSource } from '@angular/material';
import { RestService } from '../../services/rest.service';
import { SnackMessageService } from '../../services/snack-message.service';
import { ApiUrlConstants } from '../../constants/api-url.constants';
import { COMMON_CONST } from '../../constants/common.constants';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-site-url',
  templateUrl: './site-url.component.html',
  styleUrls: ['./site-url.component.scss']
})
export class SiteUrlComponent implements OnInit {

  panelOpenState: boolean = false;
  isLinear: boolean = false;
  isAdvOption: boolean = false;
  isOptionSelected: boolean = false;
  isProcessing: boolean = false;
  isShowResult: boolean = false;
  isFileUploading: boolean = false;
  isPickerSaved: boolean = false;
  urlAdvOptions: FormGroup;
  urlFormGroup: FormGroup;
  attributeFormGroup: FormGroup;
  finalUrl: string = '';
  downloadFileUrl: string = '';
  selectedFileName: string = '';
  dataSource: any;
  fileList: FileList;
  scrapResult = {} as ScrapFormat;
  saveScrap
  locatorTypes: any[];
  displayedColumns: any[];
  attributesArray: string[] = [];
  extensions: UrlExtensions[] = [];
  attributesList: AttributeExtraction[] = [];
  attributeSource = new MatTableDataSource<AttributeExtraction>();

  Utils = {
    keys: Object.keys
  }

  constructor(private _formBuilder: FormBuilder,
    private restService: RestService,
    private sm: SnackMessageService) {
    this.scrapResult.result = false;
    this.dataSource = this.attributeSource;
    this.locatorTypes = COMMON_CONST.locatorTypes;
    this.displayedColumns = COMMON_CONST.attributeColumns;
  }

  ngOnInit() {
    this.scrapResult.url = '';
    this.scrapResult.html = ' ';
    this.scrapResult.attributeList = [];
    this.urlFormGroup = this._formBuilder.group({
      url: ['', Validators.required],
      fileName: ['']
    });
    this.attributeFormGroup = this._formBuilder.group(
      {
        attribute: [''],
        attributeLsit: [''],
        type: ['', Validators.required],
        locator: ['', Validators.required]
      }
    );
    this.urlAdvOptions = this._formBuilder.group(
      {
        type: ['', Validators.required],
        key: ['', Validators.required],
        value: ['', Validators.required],
        path: ['', Validators.required]
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.extensions, event.previousIndex, event.currentIndex);
    console.log(this.urlFormGroup.value);
    this.arrangeUrl();
  }

  toggleAdvOption(option: string) {
    this.isAdvOption = true;
    this.isOptionSelected = (option === 'true');
  }

  arrangeUrl() {
    let url = this.urlFormGroup.value.url;
    let setParam = true;
    this.extensions.forEach((option) => {
      if (option.type == 'path') {
        url += '/' + option.path;
        setParam = true;
      } else {
        if (setParam) {
          url += '?';
          setParam = false;
        } else {
          url += '&';
        }
        url += option.key + '=' + option.value;
      }
    });
    this.finalUrl = url;
  }

  fileSelect(file) {
    this.selectedFileName = file.target.value;
    this.fileList = file.target.files;
  }

  removeFile() {
    this.selectedFileName = '';
    this.fileList = {} as FileList;
    this.attributesArray = [];
    this.urlFormGroup.setValue({ url: this.urlFormGroup.value.url, fileName: '' })
  }

  stepControlNav(event: any) {
    console.log(event);
  }

  addExtension() {
    if (this.isAdvOption) {
      let obj = {} as UrlExtensions;
      if (this.isOptionSelected) {
        obj.type = 'path';
        obj.path = this.urlAdvOptions.value.path;
      } else {
        obj.type = 'param';
        obj.key = this.urlAdvOptions.value.key;
        obj.value = this.urlAdvOptions.value.value;
      }
      this.extensions.push(obj);
    }
    this.arrangeUrl();
  }

  removeExtension(index: number) {
    this.extensions.splice(index, 1);
    this.arrangeUrl();
  }

  addAttribute() {
    let obj = {} as AttributeExtraction;
    obj.type = this.attributeFormGroup.value.type;
    obj.locator = this.attributeFormGroup.value.locator;
    obj.attribute = this.attributesArray.length !== 0 ? this.attributeFormGroup.value.attributeLsit : this.attributeFormGroup.value.attribute;
    this.attributesList.push(obj);
    this.dataSource = new MatTableDataSource(this.attributesList);
    this.attributeFormGroup.reset('');
  }

  removeAttribute(index: number) {
    this.attributesList.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.attributesList);
  }

  setAttributesType(): AttributeSet[] {
    let attributeArray: AttributeSet[] = [];
    this.attributesList.forEach((attributeSet) => {
      let attributeFormat = {} as AttributeSet;
      attributeFormat[attributeSet.attribute] = '';
      switch (attributeSet.type) {
        case '0': attributeFormat[attributeSet.attribute] = '#'; break;
        case '1': attributeFormat[attributeSet.attribute] = '.'; break;
      }
      attributeFormat[attributeSet.attribute] += attributeSet.locator;
      attributeArray.push(attributeFormat);
    });
    return attributeArray;
  }

  selectAttribute(event) {
    console.log(event);
  }

  uploadFile() {
    if (this.fileList && this.fileList.length > 0) {
      let file: File = this.fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadSampleFile', file, file.name);
      this.isFileUploading = true;
      this.restService.post(ApiUrlConstants.SAMPLE_FILE, formData, true).then((response) => {
        console.log(response);
        this.isFileUploading = false;
        let payload = response.payload;
        this.attributesArray = payload;
        this.sm.showSnackMessage('File successfully Uploaded', 'OK');
      }).catch((err) => {
        console.log(err);
        this.isFileUploading = false;
        this.sm.showSnackMessage('Failed to Upload file', 'Try Again');
      });
    }
  }

  downloadFile() {
    this.downloadFileUrl = environment.BASE_URL + ApiUrlConstants.SAMPLE_FILE_DOWNLOAD + '/?fileName=' + this.scrapResult.fileName;
    // if (this.scrapResult.result) {
    //   this.restService.getFile(ApiUrlConstants.SAMPLE_FILE_DOWNLOAD + '/?fileName='+ this.scrapResult.fileName).then((response) => {
    //     console.log(response);
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // }
  }

  processUrl() {
    this.isProcessing = true;
    let obj = {} as ScrapFormat;
    obj.url = this.finalUrl.match(this.urlFormGroup.value.url) ? this.finalUrl : this.urlFormGroup.value.url;
    obj.attributeList = this.setAttributesType();
    let url = ApiUrlConstants.SAMPLE_URL;
    if (this.attributesArray.length > 0) {
      obj.isFileAttach = true;
      obj.fileName = this.fileList[0].name;
    } else {
      obj.isFileAttach = false;
    }
    this.sm.showSnackMessage('Processing....', '.');
    this.restService.post(url, obj, false).then((response) => {
      let _scrapResult = response as ScrapFormat;
      this.scrapResult = _scrapResult;
      this.isProcessing = false;
      this.isShowResult = true;
      this.isPickerSaved = false;
      // this.getScrenshot();
      console.log(this.scrapResult);
    }).catch((err) => {
      console.log(err);
      this.isShowResult = true;
      this.isProcessing = false;
    });
  }

  savePicker() {
    if (!this.isPickerSaved) {
      let pickerSet = {} as ScrapFormat;
      pickerSet.pickerSetList = this.attributesList;
      pickerSet.url = this.finalUrl.match(this.urlFormGroup.value.url) ? this.finalUrl : this.urlFormGroup.value.url;
      this.restService.post(ApiUrlConstants.PICKER_SAVE, JSON.stringify(pickerSet), false).then((response) => {
        this.isPickerSaved = true;
        console.log(response);
        this.sm.showSnackMessage('Picker set saved successful', 'OK');
      }).catch((err) => {
        console.log(err);
        this.sm.showSnackMessage('Failed to save picker set', 'Try Again');
      });
    } else {
      this.sm.showSnackMessage('Picker set already saved', 'Done');
    }
  }

  getScrenshot() {
    this.restService.get(ApiUrlConstants.SCREENSHOT, true).then((response) => {
      console.log(response);
    });
  }

}