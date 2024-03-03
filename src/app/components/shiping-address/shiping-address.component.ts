import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from 'src/app/services/orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shiping-address',
  templateUrl: './shiping-address.component.html',
  styleUrls: ['./shiping-address.component.scss'],
})
export class ShipingAddressComponent {
  cartId: string = '';
  shippingForm: FormGroup = new FormGroup({
    details: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125]{1}[0-9]{8}$/),
    ]),
    city: new FormControl('', [Validators.required]),
  });
  constructor(
    private _OrdersService: OrdersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.cartId = params['id'];
    });
  }

  confirmPayment(shippingForm: FormGroup) {
    this._OrdersService.checkOut(this.cartId, shippingForm.value).subscribe({
      next: (response) => {
        console.log(response);
        window.location.href = response.session.url;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
