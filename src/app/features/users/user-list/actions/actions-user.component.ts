import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../../core/models/user';
import { UserService } from '../../../../core/services/user.service';
@Component({
    selector: 'app-actions-user',
    templateUrl: './actions-user.component.html',
    styleUrl: './actions-user.component.css',
    standalone: false
})
export class ActionsUserComponent implements OnInit {
  @Input() user!: User;
  @Output() usuarioCambio = new EventEmitter<void>();
  showModal : boolean = false;
  showPassword: boolean = false;

  estados: {id: string, strName: string }[] = [];
  tipos: {id: string, strName: string }[] = [];
  putUser: User = {
    id: '',
    email: "",
    idUsuCatEstadoFK: '',
    idUsuCatTipoUsuario: '',
    strPassword: "",
  };
  rPassword: string =""
  userOnSesion: string = localStorage.getItem('user')!

  showAlert: boolean = false;

  constructor(private userService: UserService) {}


  ngOnInit(): void {
    this.loadFilters()
  }
  toggleModal() {
    this.showModal = !this.showModal;
    this.putUser = {... this.user}
    this.showAlert = false;
  }

  deleteButton(id: String) {
    this.userService.eliminarUsuario(id.toString()).subscribe(
      res => {
        this.usuarioCambio.emit();
        setTimeout(() => this.showModal = false, 1500);
      },
      err => {
        this.showAlert = true;
      }
    );
  }

  updateButton(id: Number) {}

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  loadFilters(){
    this.userService.estados().subscribe(
      (data: []) => {
        this.estados = data;
      }
    )
    this.userService.tipos().subscribe(
      (data: []) => {
        this.tipos = data;
      }
    )
  }

  update(){
    this.userService.updateUsuario(this.putUser).subscribe(
      res => {
        this.usuarioCambio.emit();
      },
      err => {
      }
    );
  }

  setEstado(estado: string) {
    this.putUser.idUsuCatEstadoFK = estado;
  }
  setTipo(tipo: string) {
    this.putUser.idUsuCatTipoUsuario = tipo;
  }


}




