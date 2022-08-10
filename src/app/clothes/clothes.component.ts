import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css']
})
export class ClothesComponent implements OnInit {

  constructor(private allshop:ShopService) { }
  Clothes :any=[]; 
  ngOnInit(): void {
    this.allshop.geAllClothes().subscribe({next:(data)=>{
      this.Clothes = data; 
      console.log("DATA")
      console.log(this.Clothes);
    }})
  }

}
