import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ShopService } from '../shop.service';

@Component({
  selector: 'app-home-padge',
  templateUrl: './home-padge.component.html',
  styleUrls: ['./home-padge.component.css']
})
export class HomePadgeComponent implements OnInit {
shoparr:any=[]
electronics:any=[]; 
Clothes :any=[]; 
Phones:any=[]; 
cartProducts:any[]=[]; 
  constructor(private route:ActivatedRoute,private allshop:ShopService) { }

  ngOnInit(): void {

this.allshop.geElectronics().subscribe({next:(data)=>{
  this.electronics = data; 
}})

this.allshop.geClothes().subscribe({next:(data)=>{
  this.Clothes = data; 
}})

this.allshop.gePhones().subscribe({next:(data)=>{
  this.Phones = data; 
}})
}

addToCart(product:any){
  console.log("ADD To Cart "); 
  console.log(product);
  product.Quantity = 1 ; 
  console.log(product); 
  if('cart' in localStorage){
    this.cartProducts = JSON.parse(localStorage.getItem("cart")!); 
    let exist = this.cartProducts.find(item =>item.ProductID == product.ProductID); 
    if(exist){
      alert("Product is already in your cart"); 
    }
    else{
      this.cartProducts.push(product); 
      localStorage.setItem("cart",JSON.stringify(this.cartProducts)); 
    }
  }
  else {
    this.cartProducts.push(product); 
    localStorage.setItem("cart",JSON.stringify(this.cartProducts)); 
  }
}
}


