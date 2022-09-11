import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BasketModel } from 'src/app/models/basket';
import { ProductModel } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products:ProductModel[] = [
    {name:"Peynir",price:26.61,imageUrl:"https://www.peynircibaba.com/image/catalog/urunler/1008.jpg"},
    {name:"Zeytin",price:132.50,imageUrl:"https://cdn.dsmcdn.com/mnresize/500/-/ty278/product/media/images/20211222/9/14930386/17329977/2/2_org.jpg"},
    {name:"Tereyağ",price:60,imageUrl:"https://cdn.cimri.io/market/260x260/sutas-225-gr-yayik-tereyag-_78408.jpg"},
    {name:"Lavaş",price:26.50,imageUrl:"https://migros-dali-storage-prod.global.ssl.fastly.net/sanalmarket/product/05051773/05051773-2e6f99-1650x1650.jpg"},
    {name:"Süt",price:10.99,imageUrl:"https://migros-dali-storage-prod.global.ssl.fastly.net/sanalmarket/product/11013025/11013025-cf97ab-1650x1650.jpg"}
  ]

  baskets:BasketModel[] = [];
  @Output() myEvent:EventEmitter<any> = new EventEmitter(); //bu değer ile ust kısma veri gönderilir. //basket değerini event ile gönderme;
  @Output() total:number=0;

  constructor(
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
  }

  addBasket(product:ProductModel){
  console.log()
   let basketModel = new BasketModel();
   basketModel.product = product;
   basketModel.quantity = parseInt((<HTMLInputElement>document.getElementById("quantity-"+product.name)).value);
   (<HTMLInputElement>document.getElementById("quantity-"+product.name)).value = "1";
   this.baskets.push(basketModel);
   //this.total = this.total + (basketModel.quantity * product.price);
   this.myEvent.emit({data:this.baskets}); //prodcuttan ürün gönderilir. homeda yakalanır.
   this.toastrService.success(product.name +" sepete başarıyla eklendi.")
  }

}
