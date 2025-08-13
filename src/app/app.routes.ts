import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ProductComponent } from './component/product/product.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { IphoneComponent } from './component/iphone/iphone.component';
import { IpadComponent } from './component/ipad/ipad.component';
import { MacComponent } from './component/mac/mac.component';
import { CartComponent } from './component/cart/cart.component';
import { AboutComponent } from './component/about/about.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { EditProductComponent } from './component/edit-product/edit-product.component';




export const routes: Routes = [
    {path:"", redirectTo:"/home", pathMatch:"full"},
    {path: "home",component:HomeComponent},
    {path:"product", component: ProductComponent},
    {path:"iphone" , component: IphoneComponent},
    {path:"ipad" , component: IpadComponent},
    {path:"mac" , component: MacComponent},
    {path:"cart" , component:CartComponent },
    {path:"about", component: AboutComponent},
    { path: "cart", component: CartComponent },
    { path: 'product/:id', component: ProductDetailsComponent },
    { path: 'add-product', component: AddProductComponent },
    { path: 'edit-product/:id', component: EditProductComponent },

    {path:"**",component: NotFoundComponent}
];
