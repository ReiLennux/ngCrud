import { FileService } from './../../../core/services/file.service';
import { CategoriesService, Categoria, Subcategoria } from '../../catalogs/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { product } from '../../../core/models/product';
import { ProductsService } from '../services/products.service';
import { AlertService } from '../../../core/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    standalone: false
})
export class ProductFormComponent implements OnInit {
  isEditMode: boolean = false;
  productId: string | null = null;

  newProducto: product = {
    id: '',
    strName: '',
    strDescription: '',
    idCatSubcategoria: '',
    idCatCategoria: '',
    decMinimum: 0,
    decMaximum: 0,
    decStock: 0,
    decCost: 0,
    decPrice: 0,
    strImage: ''
  };

  selectedFile: File | undefined;
  categorias: { id: string, strName: string }[] = [];
  subcategorias: { id: string, strName: string }[] = [];
  
  // These bound to the selects and kept in sync with newProducto
  categoriaSeleccionadoId: string = '';
  subcategoriaSeleccionadoId: string = '';

  isLoading: boolean = false;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private fileService: FileService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.productId;

    // Load categories first, then load product (for edit mode)
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesService.obtenerCategorias().subscribe({
      next: (cats: Categoria[]) => {
        this.categorias = cats.map(c => ({ id: c.id!, strName: c.strName }));
        this.categoriesService.obtenerTodasSubCategorias().subscribe({
          next: (subs: Subcategoria[]) => {
            this.subcategorias = subs.map(s => ({ id: s.id!, strName: s.strName }));
            // Now that options are loaded, load the product to edit (if applicable)
            if (this.isEditMode && this.productId) {
              this.loadProductoParaEditar(this.productId);
            }
          }
        });
      }
    });
  }

  loadProductoParaEditar(id: string) {
    this.productsService.obtenerProductoPorId(id).subscribe({
      next: (producto: product) => {
        this.newProducto = { ...producto };
        // Defer assignment by one tick so Angular renders the <option> elements
        // before trying to set the selected value on the <select>
        setTimeout(() => {
          this.categoriaSeleccionadoId = producto.idCatCategoria?.toString() ?? '';
          this.subcategoriaSeleccionadoId = producto.idCatSubcategoria?.toString() ?? '';
        }, 0);
      },
      error: (err: any) => {
        console.error(err);
        this.alertService.error('No se pudo cargar el producto');
      }
    });
  }

  // Keep newProducto in sync when the selects change
  onCategoriaChange(value: string | number) {
    this.categoriaSeleccionadoId = value?.toString() ?? '';
    this.newProducto.idCatCategoria = this.categoriaSeleccionadoId;
  }

  onSubcategoriaChange(value: string | number) {
    this.subcategoriaSeleccionadoId = value?.toString() ?? '';
    this.newProducto.idCatSubcategoria = this.subcategoriaSeleccionadoId;
  }

  async submitForm() {
    // Ensure IDs are synced before saving
    this.newProducto.idCatCategoria = this.categoriaSeleccionadoId;
    this.newProducto.idCatSubcategoria = this.subcategoriaSeleccionadoId;

    this.isLoading = true;
    try {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('upload_preset', 'mypreset');
        const res = await this.fileService.uploadFile(formData, 'mypreset');
        if (res) {
          this.newProducto.strImage = res.url;
        }
      }

      const operation$ = this.isEditMode
        ? this.productsService.editarProducto(this.newProducto)
        : this.productsService.agregarProducto(this.newProducto);

      operation$.subscribe({
        next: () => {
          const msg = this.isEditMode ? 'Producto actualizado correctamente' : 'Producto guardado correctamente';
          this.alertService.success(msg);
          this.router.navigate(['/products']);
        },
        error: (err: any) => {
          console.error(err);
          this.alertService.error('Error al guardar el producto');
          this.isLoading = false;
        }
      });

    } catch (err) {
      console.error(err);
      this.alertService.error('Error al subir la imagen');
      this.isLoading = false;
    }
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFile = fileList[0];
    }
  }
}
