import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { base } from '../../utils/enviroment';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];
  searchForm = new FormControl();
  resultSearch: Product[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  get displayedProducts(): Product[] {
    return this.resultSearch.length !== 0 ? this.resultSearch : this.products;
  }
  ngOnInit() {
    console.log('home reloading...');
    this.getProducts(this.currentPage, this.itemsPerPage);
    this.getCategory();
    this.search();
  }

  search() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) => this.productService.searchProduct(query)),
      )
      .subscribe((result) => {
        this.resultSearch = result;
        this.resultSearch.forEach(
          (product) =>
            (product.url = `${base.basePath}/products/img/${product.thumbnail}`),
        );
      });
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      complete: () => {},
      error: (error) => {
        console.error(error);
      },
    });
  }

  getProducts(pages: number, limit: number) {
    this.productService.getProducts(pages - 1, limit).subscribe({
      next: (response: any) => {
        response.products.forEach((product: Product) => {
          // const thumbnailParts = product.thumbnail.split('_');
          // const lastPart = thumbnailParts[thumbnailParts.length - 1]; // output: a1.0.jpg
          product.url = `${base.basePath}/products/img/${product.thumbnail}`;
        });
        this.products = response.products;
        this.totalPages = response.total_pages;
        // this.visiblePages = this.generateVisblePageArray(
        //   this.currentPage,
        //   this.totalPages,
        // );
      },
      complete: () => {},
      error: (error) => {
        console.error(error);
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getProducts(this.currentPage, this.itemsPerPage);
  }

  generateVisblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisblePage = 5;
    const haftVisblePage = Math.floor(maxVisblePage / 2);

    let strartPage = Math.max(currentPage - haftVisblePage, 1);
    let endPage = Math.min(strartPage + maxVisblePage - 1, totalPages);

    if (endPage - strartPage + 1 < maxVisblePage) {
      strartPage = Math.max(endPage - maxVisblePage + 1, 1);
    }

    return new Array(endPage - strartPage + 1)
      .fill(0)
      .map((_, index) => strartPage + index);
  }
}
