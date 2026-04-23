import { Component } from '@angular/core';
import { Categoria, CategoriesService, Subcategoria } from '../../../../features/products/services/catalog/categories.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  standalone: false,
})
export class AddCategoriesComponent {

  newCategory: Categoria = {
    strName: '',
    strDescription: '',
  };

  categorias: {id: string, strName: string}[] = [];


  newSubcategory: Subcategoria = {
    strName: '',
    strDescription: '',
    idCatCategoria: "",
  };

  constructor(private categoriesService: CategoriesService) {}

  onCategoriaSeleccionada(categoria: string | number | null) {
    const categoriaSeleccionadaId = categoria !== null ? categoria.toString() : '0';
    this.newSubcategory.idCatCategoria = categoriaSeleccionadaId;
  }

  submitForm() {
    if (!this.newCategory.strName.trim()) {
      return;
    }

    this.categoriesService.crearCategoria(this.newCategory).subscribe({
      next: (res: any) => {
        this.newCategory = { strName: '', strDescription: '' }; // reset form
      },
      error: (err: any) => {
        console.error('Error al crear categoría:', err);
      }
    });
  }

  submitSubForm() {
    if (!this.newSubcategory.strName.trim() || !this.newSubcategory.idCatCategoria) {
      return;
    }

    this.categoriesService.crearSubcategoria(this.newSubcategory).subscribe({
      next: (res: any) => {
        this.newSubcategory = { strName: '', strDescription: '', idCatCategoria: "" }; // reset form
        this.onCategoriaSeleccionada(0);
      },
      error: (err: any) => {
        console.error('Error al crear subcategoría:', err);
      }
    });
  }

  obtenerCategorias() {
    this.categoriesService.obtenerCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data.map(c => ({ id: c.id!, strName: c.strName }));
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}
