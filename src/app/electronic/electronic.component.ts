import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-electronic',
  templateUrl: './electronic.component.html',
  styleUrls: ['./electronic.component.css']
})
export class ElectronicComponent implements OnInit {

  constructor(private allshop:ShopService) { }
  electronics:any=[]; 
  ngOnInit(): void {
    this.allshop.geAllElectronics().subscribe({next:(data)=>{
      this.electronics = data; 
      console.log(this.electronics); 
    }})
  }

}
