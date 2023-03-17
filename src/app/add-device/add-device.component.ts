import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../services/rest.service';
import { StateService } from '../services/state.service';


@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  adddevice: FormGroup;

  //API INTEGRATION


  constructor(public _state: StateService,
    public _rest: RestService, private router: Router, private route: ActivatedRoute) {

    this.adddevice = new FormGroup({
      name : new FormControl('' , Validators.required),
      user_id: new FormControl('' , Validators.required),
      type: new FormControl('' , Validators.required),
      lat: new FormControl('' , Validators.required),
      lng: new FormControl('' , Validators.required),
      sensor_gap: new FormControl('' , Validators.required),
      ac: new FormControl('' , Validators.required),
      hmin: new FormControl('' , Validators.required),
      hmax: new FormControl('' , Validators.required),
    })

   
  }
  

  isblank() {
    if (
      this.adddevice.value.name === "" ||
      this.adddevice.value.user_id === "" ||
      this.adddevice.value.type === "" ||
      this.adddevice.value.lat === "" ||
      this.adddevice.value.lng === "" ||
      this.adddevice.value.sensor_gap === "" ||
      this.adddevice.value.ac === "" ||
      this.adddevice.value.hmin === "" ||
      this.adddevice.value.hmax === ""
    ) {
      return true;
    }
    return false;
  }
  

  add() {
    alert('Device Added Successfully');
    if (!this.isblank()) {
      // ADD DATABASE FEILD
      this._rest.addDevices(this.adddevice.value).subscribe((res: any) => {
        if (res.success === true) {
          alert('Device Added Successfully');
          console.log(this.adddevice.value)
          this.adddevice.reset()
        }
      }), (err: any) => {
        alert(err);
      }
    }

  }


  ngOnInit(): void {

  }



  



}
//add() {
//     if (!this.isblank()) {
//       this._rest.add_new_brwhms_device(this.newTask.value).subscribe((res: any) => {
//         if (res.success === true) {
//           alert('new_brwhms Added Successfully');
//           // this._state.Getdevicebyid();
//           this.newTask.reset() //clear Form Value
//           this._state.getdivicebyid(this._state.sys_id);
//         }
//       }), (err: any) => {
//         alert(err);
//       }
//     }
//   }
