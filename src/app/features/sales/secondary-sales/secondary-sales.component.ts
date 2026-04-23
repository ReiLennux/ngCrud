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
  estados: { id: string; strName: string; }[] = [];
  usuarios: User[] = [];
  dateSearch: string = "";
  usuarioSeleccionado: string = "";
  searchTerm: string = "";
  estadoSeleccionado: string = "";
  constructor(private saleService: SalesService, private userService: UserService) { }

  filtrarSales(): Sale[] {
    return this.sales.filter(sale =>
      (this.usuarioSeleccionado == '' || sale.DateSale.idUsuUsuario == this.usuarioSeleccionado) &&
      (this.dateSearch == "" || sale.DateSale.dtDate === this.dateSearch) &&
      (this.estadoSeleccionado == "" || sale.DateSale.idVenCatState.toString() == this.estadoSeleccionado) &&
      (this.searchTerm == '' || sale.DateSale.strFolio.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }
  
  onStateChange(event: Event) {
    const element = event.target as HTMLSelectElement;
    this.estadoSeleccionado = element.value;
  }
  onUserChange(event: Event) {
    const element = event.target as HTMLSelectElement;
    this.usuarioSeleccionado = element.value;
  }
  onDateChange(event: Event) {
    const element = event.target as HTMLInputElement;
    this.dateSearch = element.value;
  }

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
      }
    })
  }

  getSales() {
    this.sales = [];
    this.saleService.getSaleData().subscribe({
      next: (data: Sale[]) => {
        this.sales = data
      }
    });
  }
  

  obtenerEstado(estadoId: number | string): String {
    const estado = this.estados.find((estado) => estado.id == estadoId.toString());
    return estado ? estado.strName : '';
  }

}
