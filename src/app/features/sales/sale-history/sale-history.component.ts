import { Component, OnInit } from '@angular/core';
import { Sale, DateSale } from '../../../core/models/sale';
import { User } from '../../../core/models/user';
import { formatoFecha } from '../../../shared/utils/generateDateSale';
import { UserService } from '../../users/services/user.service';
import { SalesService } from '../services/sales.service';
@Component({
    selector: 'app-sale-history',
    templateUrl: './sale-history.component.html',
    standalone: false
})
export class SaleHistoryComponent implements OnInit {
  sales: Sale[] = [];
  estados: { id: string; strName: string; }[] = [];
  usuarios: User[] = [];
  private _dateSearch: string = "";
  get dateSearch(): string { return this._dateSearch; }
  set dateSearch(val: string) { this._dateSearch = val; this.filtrarSales(); }

  private _usuarioSeleccionado: string = "0";
  get usuarioSeleccionado(): string { return this._usuarioSeleccionado; }
  set usuarioSeleccionado(val: string) { this._usuarioSeleccionado = val; this.filtrarSales(); }

  private _searchTerm: string = "";
  get searchTerm(): string { return this._searchTerm; }
  set searchTerm(val: string) { this._searchTerm = val; this.filtrarSales(); }

  private _estadoSeleccionado: string = "0";
  get estadoSeleccionado(): string { return this._estadoSeleccionado; }
  set estadoSeleccionado(val: string) { this._estadoSeleccionado = val; this.filtrarSales(); }

  constructor(private saleService: SalesService, private userService: UserService) { }

  filteredSales: Sale[] = [];

  filtrarSales() {
    this.filteredSales = this.sales.filter(sale => {
      const matchUsuario = !this._usuarioSeleccionado || this._usuarioSeleccionado == '0' || sale.DateSale.idUsuUsuario == this._usuarioSeleccionado;
      const matchFecha = !this._dateSearch || formatoFecha(sale.DateSale.dtDate) === this._dateSearch;
      const matchEstado = !this._estadoSeleccionado || this._estadoSeleccionado == '0' || sale.DateSale.idVenCatState.toString() == this._estadoSeleccionado;
      const matchFolio = !this._searchTerm || sale.DateSale.strFolio.toLowerCase().includes(this._searchTerm.toLowerCase());
      
      return matchUsuario && matchFecha && matchEstado && matchFolio;
    });
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


