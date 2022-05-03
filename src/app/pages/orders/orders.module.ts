import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrdersComponent } from './orders.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [OrderListComponent, OrdersComponent],
  imports: [CommonModule, OrdersRoutingModule, SharedModule],
})
export class OrdersModule {}
