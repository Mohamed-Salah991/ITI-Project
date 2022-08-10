import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomePadgeComponent } from './home-padge/home-padge.component';
import { ElectronicComponent } from './electronic/electronic.component';
import {HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ClothesComponent } from './clothes/clothes.component';
import { JewerlyComponent } from './jewerly/jewerly.component';
import { DetailsComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HomePadgeComponent,
    ElectronicComponent,
    ClothesComponent,
    JewerlyComponent,
    DetailsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule ,

    RouterModule.forRoot([
      {path:'Home',component:HomePadgeComponent},
      {path:'',redirectTo:'Home',pathMatch:'full'},
      {path:'Electronicss Department',component:ElectronicComponent},
      {path:'Clothes Department',component:ClothesComponent},
      {path:'Jewerly Department',component:JewerlyComponent}, 
      {path:'getSingleElectronics/:id',component:DetailsComponent},
      {path:'cart',component:CartComponent}
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
