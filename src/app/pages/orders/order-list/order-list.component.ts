import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderDTO } from 'src/app/models/order';
import { PageableResponse } from 'src/app/models/pageable';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  @Input() totalElements: number | null = null;
  @Input() ordersList: OrderDTO[] = [];

  @Output() loadingChanged: EventEmitter<boolean> = new EventEmitter();
  @Output() pageChanged: EventEmitter<{ page: number; size: number }> =
    new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
