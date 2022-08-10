import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-jewerly',
  templateUrl: './jewerly.component.html',
  styleUrls: ['./jewerly.component.css']
})
export class JewerlyComponent implements OnInit {

  constructor(private allshop:ShopService) { }
  Phones:any=[]; 
  ngOnInit(): void {
    this.allshop.geAllPhones().subscribe({next:(data)=>{
      this.Phones = data; 
      console.log("DATA")
      console.log(this.Phones);
    }})
  }

}
