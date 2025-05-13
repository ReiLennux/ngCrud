import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../../services/sales.service';
import { Sale, DateSale } from '../../../models/sale';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { formatoFecha } from '../../../helpers/generateDateSale';
@Component({
    selector: 'app-secondary-sales',
    templateUrl: './secondary-sales.component.html',
    styleUrl: './secondary-sales.component.css',
    standalone: false
})
export class SecondarySalesComponent implements OnInit {
  sales: DateSale[] = [];
  estados: { strName: string; id: number; }[] = [];
  usuarios: User[] = [];
  dateSearch: string = "";
  usuarioSeleccionado: string = "";
  searchTerm: string = "";
  estadoSeleccionado: number = 0;
  constructor(private saleService: SalesService, private userService: UserService) { }

  filtrarSales(): DateSale[] {
    return this.sales.filter(sale =>
      (this.usuarioSeleccionado == '' || sale.idUsuUsuario == this.usuarioSeleccionado) &&
      (this.dateSearch == "" || sale.dtDate === this.dateSearch) &&
      (this.estadoSeleccionado == 0 || sale.idVenCatState == this.estadoSeleccionado) &&
      (this.searchTerm == '' || sale.strFolio.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }
  
  onStateChange(event: any) {
    this.estadoSeleccionado = event.target.value;
  }
  onUserChange(event: any) {
    this.usuarioSeleccionado = event.target.value;
  }
  onDateChange(event: any) {
    this.dateSearch = event.target.value;
  }

  ngOnInit(): void {
    this.getSales();
    this.saleService.obtenerEstados().subscribe(
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
    this.saleService.obtenerDataSale().subscribe(
      (data: any) => {
        this.sales = data.map((sale: any) => ({
          ...sale,
          dtDate: formatoFecha(sale.dtDate)
        }));
      }
    );
  }
  

  obtenerEstado(estadoId: number): String {
    const estado = this.estados.find((estado) => estado.id === estadoId);
    return estado ? estado.strName : '';
  }

  obtenerNombreUsuario(id: string): String {
    const usuario = this.usuarios.find((usuario) => usuario.id === id);
    return usuario ? usuario.strName : '';
  }

}
