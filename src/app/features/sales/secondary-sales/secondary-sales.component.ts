import { Component, OnInit } from '@angular/core';
import { Sale, DateSale } from '../../../core/models/sale';
import { User } from '../../../core/models/user';
import { formatoFecha } from '../../../shared/utils/generateDateSale';
import { UserService } from '../../users/services/user.service';
import { SalesService } from '../services/sales.service';
@Component({
    selector: 'app-secondary-sales',
    templateUrl: './secondary-sales.component.html',
    standalone: false
})
export class SecondarySalesComponent implements OnInit {
  sales: Sale[] = [];
  estados: { id: string; strName: string; }[] = [];
  usuarios: User[] = [];
  dateSearch: string = "";
  usuarioSeleccionado: string = "";
  searchTerm: string = "";
  estadoSeleccionado: string = "";
  constructor(private saleService: SalesService, private userService: UserService) { }

  filteredSales: Sale[] = [];

  filtrarSales() {
    this.filteredSales = this.sales.filter(sale =>
      (this.usuarioSeleccionado == '' || sale.DateSale.idUsuUsuario == this.usuarioSeleccionado) &&
      (this.dateSearch == "" || sale.DateSale.dtDate === this.dateSearch) &&
      (this.estadoSeleccionado == "" || sale.DateSale.idVenCatState.toString() == this.estadoSeleccionado) &&
      (this.searchTerm == '' || sale.DateSale.strFolio.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }
  
  mappedUsuarios: { id: string; strName: string }[] = [];

  ngOnInit(): void {
    this.getSales();
    this.saleService.getSaleStates().subscribe({
      next: (data: { id: string; strName: string }[]) => {
        this.estados = data;
      }
    })
    this.userService.obtenerDatosUsuario().subscribe({
      next: (data: User[]) => {
        this.usuarios = data;
        this.mappedUsuarios = data.map(u => ({ id: u.email, strName: u.email }));
      }
    })
  }

  getSales() {
    this.sales = [];
    this.saleService.getSaleData().subscribe({
      next: (data: Sale[]) => {
        this.sales = data;
        this.filtrarSales();
      }
    });
  }
  

  obtenerEstado(estadoId: number | string): String {
    const estado = this.estados.find((estado) => estado.id == estadoId.toString());
    return estado ? estado.strName : '';
  }

}


