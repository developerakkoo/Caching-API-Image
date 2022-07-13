import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-home',
  templateUrl: './image-home.page.html',
  styleUrls: ['./image-home.page.scss'],
})
export class ImageHomePage implements OnInit {
  products = [];

  constructor(private http: HttpClient) { 
    this.loadProducts();
  }

  ngOnInit() {
  }

  loadProducts(){
    this.http.get<any[]>("http://localhost:8080/products").subscribe(res => {
      console.log(res);
      
      this.products = res['products'];
    })
  }

}
