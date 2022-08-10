import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts:any[]=[]; 
  total:any = 0 ; 
  constructor() { }

  ngOnInit(): void { 
    this.getCarProductd(); 
  }

  getCarProductd(){
    if('cart' in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!); 
    }
    console.log(this.cartProducts); 
    this.getCartTotal(); 
  }
  addAmount(index:number){
    this.cartProducts[index].Quantity++; 
    localStorage.setItem("cart",JSON.stringify(this.cartProducts)); 
    this.getCartTotal(); 
  }
  minsAmount(index:number){
    if(this.cartProducts[index].Quantity > 1){
      this.cartProducts[index].Quantity--; 
      localStorage.setItem("cart",JSON.stringify(this.cartProducts)); 
      this.getCartTotal(); 

    }

  }
  getCartTotal(){
    this.total=0 ; 
    for(let x in this.cartProducts){
      this.total += this.cartProducts[x].Price *this.cartProducts[x].Quantity ; 
    }
  }


}
