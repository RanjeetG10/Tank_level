import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../services/rest.service';
import { StateService } from '../services/state.service';


@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements  OnInit {
  newTask: FormGroup | undefined;

constructor(public _state: StateService,
  public _rest: RestService, private router: Router, private route: ActivatedRoute){

    this.newTask = new FormGroup({
      name: new FormControl('', Validators.required),
     org_name: new FormControl('', Validators.required),
     type_of_device: new FormControl('', Validators.required),
     uuid: new FormControl('', Validators.required),
     lat: new FormControl('', Validators.required),
     lng: new FormControl('', Validators.required),
     SG: new FormControl('', Validators.required),
     AC: new FormControl('', Validators.required),
     hmin: new FormControl('', Validators.required),
     hmax: new FormControl('', Validators.required),




    });


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
