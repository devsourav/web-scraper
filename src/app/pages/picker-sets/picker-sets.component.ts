import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { COMMON_CONST } from '../../constants/common.constants';
import { PickerSet, PickerSetList } from '../../models/picker-set.model';
import { PickerSetService } from '../../services/picker-set.service';
import { SnackMessageService } from '../../services/snack-message.service';
import { PickerDialogComponent } from '../../components/material/picker-dialog/picker-dialog.component';

@Component({
  selector: 'app-picker-sets',
  templateUrl: './picker-sets.component.html',
  styleUrls: ['./picker-sets.component.scss']
})
export class PickerSetsComponent implements OnInit {

  isShowTable: boolean = false;
  searchPicker: string = '';
  editPickerSetIndex: number = -1;
  displayedColumns: string[];
  locatorTypes: any[];
  picker = {} as PickerSetList;
  pickerSetList: PickerSetList[] = [];
  pickerSetSource = new MatTableDataSource<PickerSetList>();

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
      } else {
        this.picker = {} as PickerSetList;
      }
      console.log('The dialog was closed ', result);
    });
  }

  getPickerSetList() {
    this.ps.getAllPickerSet().then(pickerSetList => {
      console.log(pickerSetList);
      this.isShowTable = true;
      this.pickerSetList = pickerSetList;
      this.pickerSetSource = new MatTableDataSource(this.pickerSetList);
    }).catch(err => {
      console.log(err);
      this.isShowTable = false;
    });
  }

  searchPickerList() {

  }

  addPickerSet(pickerSet: PickerSet) {
    if (pickerSet.p_list.length > 0) {
      let message: string;
      let _pickerSet = pickerSet;
      _pickerSet.p_length = pickerSet.p_list.length;
      _pickerSet.update_time = new Date();
      if (!pickerSet.isEdit) {
        // this.pickerSetList.push(_pickerSet);
        console.log(this.pickerSetList);
        this.ps.addPickerSet(_pickerSet).then(response => {
          console.log(response);
          this.getPickerSetList();
          message = 'Picker set added Successfully';
          this.sm.showSnackMessage(message, 'OK');
        }).catch(error => {
          console.log(error);
          message = 'Failed to add Picker set';
          this.sm.showSnackMessage(message, 'Try Again');
        });
      } else {
        // this.pickerSetList[this.editPickerSetIndex] = _pickerSet;
        this.picker.picker_set = _pickerSet;
        this.ps.updatePickerSet(this.picker).then(response => {
          console.log(response);
          this.getPickerSetList();
          message = 'Picker set updated Successfully';
          this.sm.showSnackMessage(message, 'OK');
        }).catch(error => {
          console.log(error);
          message = 'Failed to update Picker set';
          this.sm.showSnackMessage(message, 'Try Again');
        });
        message = 'Picker Set Updated Successfully';
      }
    }
  }

  editPickerSet(index: number, picker: PickerSetList) {
    console.log(picker);
    this.editPickerSetIndex = index;
    this.picker = picker;
    let pickerSet = this.pickerSetList[index].picker_set;
    this.openDialog(false, pickerSet);
  }

  removePickerSet(picker_id: string) {
    this.ps.removePickerSet(picker_id).then(response => {
      console.log(response);
      this.getPickerSetList();
      this.sm.showSnackMessage('Picker set removed Successfully', 'OK');
    }).catch(err => {
      console.log(err);
      this.sm.showSnackMessage('Failed to removed Picker set', 'Try Again');
    });
  }

}
