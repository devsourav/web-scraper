import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { COMMON_CONST } from '../../constants/common.constants';
import { PickerSet } from '../../models/picker-set.model';
import { PickerSetService } from '../../services/picker-set.service';
import { SnackMessageService } from '../../services/snack-message.service';
import { PickerDialogComponent } from '../../components/material/picker-dialog/picker-dialog.component';

@Component({
  selector: 'app-picker-sets',
  templateUrl: './picker-sets.component.html',
  styleUrls: ['./picker-sets.component.scss']
})
export class PickerSetsComponent implements OnInit {

  searchPicker: string = '';
  editPickerSetIndex: number = -1;
  displayedColumns: string[];
  locatorTypes: any[];
  pickerSetList: PickerSet[] = [];
  pickerSetSource = new MatTableDataSource<PickerSet>();

  constructor(public dialog: MatDialog, private ps: PickerSetService, private sm: SnackMessageService) {
    this.displayedColumns = COMMON_CONST.PickerListColums;
    this.locatorTypes = COMMON_CONST.locatorTypes;
  }

  ngOnInit() {
    this.getPickerSetList();
  }

  openDialog(isCreate: boolean, pickerSet?: PickerSet): void {
    const dialogRef = this.dialog.open(PickerDialogComponent, {
      width: '70%',
      height: 'auto',
      disableClose: true,
      data: { pickerSet: pickerSet, isCreate: isCreate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addPickerSet(result as PickerSet);
      }
      console.log('The dialog was closed ', result);
    });
  }

  getPickerSetList() {
    this.ps.getAllPickerSet().then(pickerSetList => {
      console.log(pickerSetList);
    }).catch(err => {
      console.log(err);
    });
  }

  searchPickerList() {

  }

  addPickerSet(pickerSet: PickerSet) {
    if (pickerSet.p_list.length > 0) {
      let message: string = 'Picker Set Added Successfully';
      let _pickerSet = pickerSet;
      _pickerSet.p_length = pickerSet.p_list.length;
      _pickerSet.update_time = new Date();
      if (!pickerSet.isEdit) {
        this.pickerSetList.push(_pickerSet);
        console.log(this.pickerSetList);
      } else {
        this.pickerSetList[this.editPickerSetIndex] = _pickerSet;
        message = 'Picker Set Updated Successfully';
      }
      this.pickerSetSource = new MatTableDataSource(this.pickerSetList);
      this.sm.showSnackMessage(message, 'OK');
    }
  }

  editPickerSet(index: number) {
    this.editPickerSetIndex = index;
    let pickerSet = this.pickerSetList[index];
    this.openDialog(false, pickerSet);
  }

  removePickerSet(index: number) {

  }

}
