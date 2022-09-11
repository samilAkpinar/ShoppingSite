import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BasketModel } from 'src/app/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  @Input() baskets:BasketModel[] = [];
  @Input() total:number = 0;

  constructor(
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
  }

  deleteProduct(basket:BasketModel){
    let index = this.baskets.indexOf(basket);
    this.baskets.splice(index,1);
    this.total = this.total - (basket.product.price * basket.quantity);
    this.toastrService.info(basket.product.name + " sepetinizden başarıyla silindi.")
  }

  calc(){
    this.total = 0;
    this.baskets.forEach(element => {
      this.total = this.total + (element.quantity * element.product.price)
    })
    return this.total;
  }

  changeData(basket:BasketModel){
    let quantity:number = parseInt((<HTMLInputElement>document.getElementById("basketQuantity-"+basket.product.name)).value);

    let index = this.baskets.indexOf(basket);
    this.baskets.splice(index,1);

    basket.quantity = quantity;
    this.baskets.push(basket);
    this.calc();
  }

  payment(event:any){
    if(this.total == event.total){
      let count = this.baskets.length;
      this.baskets.splice(0,count);
      this.toastrService.info("Ödeme Başarılı, Siparişiniz sevk aşamasına geçmiştir.")
    }
  }

}
