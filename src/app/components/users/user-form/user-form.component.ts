import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  tipos: { id: Number, strName: string }[] = [];
  user: {
    strName: string;
    strPassword: string;
    idUsuCatTipoUsuario: number;
  } = { strName: '', strPassword: '', idUsuCatTipoUsuario: 0 };

  rPassword:String = "";
  comparePassword: boolean = true;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.tipos().subscribe(
      (data: any) => {
        this.tipos = data;
      }
    );
  }

  checkPasswordMatch() {
    this.comparePassword = this.user.strPassword === this.rPassword;
  }
  
  submitForm(form: any) {

    if (this.comparePassword){
      this.userService.crearUsuario(form.value).subscribe(
        res => this.user = {strName: '', strPassword: '', idUsuCatTipoUsuario: 0},
        err => console.error(err)
      );
    }else {
      console.log('no coincide')
    }
    
  }
}
