import { Component, OnInit, Inject, Output, EventEmitter, } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { COMMON_CONST } from '../../../constants/common.constants';
import { AttributeExtraction } from '../../../models/attribute-extraction.model';
import { PickerSet } from '../../../models/picker-set.model';

@Component({
  selector: 'app-picker-dialog',
  templateUrl: './picker-dialog.component.html',
  styleUrls: ['./picker-dialog.component.scss']
})
export class PickerDialogComponent implements OnInit {
  @Output('pickerSetOpt') pickerSetOpt = new EventEmitter<PickerSet>();
  dataSource: any;
  locatorTypes: any[];
  attributeColumns: string[];
  pickerSet = {} as PickerSet;
  pickerAttributes: AttributeExtraction[] = [];
  attributeSource = new MatTableDataSource<AttributeExtraction>();
  picker = {} as AttributeExtraction;

  constructor(
    public dialogRef: MatDialogRef<PickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.dataSource = this.attributeSource;
    this.pickerSet.p_name = '';
    this.pickerSet.isVerified = false;
    this.pickerSet.p_list = this.pickerAttributes;
    // this.attributeData.emit();
  }

  ngOnInit() {
    this.locatorTypes = COMMON_CONST.locatorTypes;
    this.attributeColumns = COMMON_CONST.attributeColumns;
    console.log(this.data);
    if (!this.data.isCreate) {
      this.pickerSet = this.data.pickerSet;
      this.pickerAttributes = this.pickerSet.p_list;
      this.dataSource = new MatTableDataSource(this.pickerAttributes);
    }
    this.pickerSet.isEdit = !this.data.isCreate;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectedType(typeId: string) {
    this.picker.type = typeId;
  }

  addAttribute() {
    let _picker = {} as AttributeExtraction;
    _picker.attribute = this.picker.attribute;
    _picker.locator = this.picker.locator;
    _picker.type = this.picker.type;
    _picker.isEdit = false;
    this.pickerAttributes.push(_picker);
    this.dataSource = new MatTableDataSource(this.pickerAttributes);
  }

  toggleEdit(index: number) {
    this.pickerAttributes[index].isEdit = !this.pickerAttributes[index].isEdit;
  }

  removeAttribute(index: number) {
    this.pickerAttributes.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.pickerAttributes);
  }

  clearAllAttribute() {
    this.pickerAttributes = [];
  }

}

export interface DialogData {
  pickerSet?: PickerSet
  isCreate: boolean;
}