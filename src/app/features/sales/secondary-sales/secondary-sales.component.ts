import { Component, OnInit } from '@angular/core';
import { Sale, DateSale } from '../../../core/models/sale';
import { User } from '../../../core/models/user';
import { formatoFecha } from '../../../helpers/generateDateSale';
import { UserService } from '../../../core/services/user.service';
import { SalesService } from '../../../core/services/sales.service';
@Component({
    selector: 'app-secondary-sales',
    templateUrl: './secondary-sales.component.html',
    styleUrl: './secondary-sales.component.css',
    standalone: false
})
export class SecondarySalesComponent implements OnInit {
  sales: Sale[] = [];
  estados: { strName: string; id: number; }[] = [];
  usuarios: User[] = [];
  dateSearch: string = "";
  usuarioSeleccionado: string = "";
  searchTerm: string = "";
  estadoSeleccionado: number = 0;
  constructor(private saleService: SalesService, private userService: UserService) { }

  filtrarSales(): Sale[] {
    console.log(this.sales);
    console.log(this.usuarioSeleccionado);
    return this.sales.filter(sale =>
      (this.usuarioSeleccionado == '' || sale.DateSale.idUsuUsuario == this.usuarioSeleccionado) &&
      (this.dateSearch == "" || sale.DateSale.dtDate === this.dateSearch) &&
      (this.estadoSeleccionado == 0 || sale.DateSale.idVenCatState == this.estadoSeleccionado) &&
      (this.searchTerm == '' || sale.DateSale.strFolio.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }
  
  onStateChange(event: any) {
    this.estadoSeleccionado = event.target.value;
  }
  onUserChange(event: any) {
    console.log(event.target.value);
    this.usuarioSeleccionado = event.target.value;
  }
  onDateChange(event: any) {
    this.dateSearch = event.target.value;
  }

  ngOnInit(): void {
    this.getSales();
    this.saleService.getSaleStates().subscribe(
      (data: any) => {
        this.estados = data;
      }
    )
    this.userService.obtenerDatosUsuario().subscribe(
      (data: any) => {
        this.usuarios = data;
      })
  }

  getSales() {
    this.sales = [];
    this.saleService.getSaleData().subscribe(
      (data: any) => {
        this.sales = data
      }
    );
  }
  

  obtenerEstado(estadoId: number): String {
    const estado = this.estados.find((estado) => estado.id == estadoId);
    return estado ? estado.strName : '';
  }

}
