import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../auth.service';
import { SettingService } from '../setting.service';
import { UpdateAkun} from './update-akun';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  firstName:string ='';
  lastName:string='';
  email:string='';
  username:string='';
  role:string='';
  lock:boolean=true;
  password:string='';
  updateAkunObject:UpdateAkun={} as UpdateAkun;
  constructor(private authService:AuthService, private router:Router, private settingService:SettingService) { }

  toggleGembok(){
    this.lock=!this.lock;
    this.password='';
  }

  updateAkun(){
    this.updateAkunObject.firstName=this.firstName;
    this.updateAkunObject.lastName=this.lastName;
    this.updateAkunObject.password=this.password;
    this.settingService.updateAkun(this.updateAkunObject).subscribe(data=>{this.authService.setFirstName(data.firstName);
                                                                           this.authService.setLastName(data.lastName);
                                                                            window.location.reload();});
  }

  batal(){
    this.router.navigateByUrl("/parkir");
  }

  ngOnInit(): void {
    this.authService.getAkun().subscribe(data=>{console.log(data);
                                                this.firstName=data.firstName;
                                                this.lastName=data.lastName;
                                                this.email=data.email;
                                                this.role=data.role;
                                                this.username=data.username;});
  }

}
