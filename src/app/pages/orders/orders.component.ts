import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { OperationType } from 'src/app/enums/operation-type';
import { CustomResponse } from 'src/app/models/custom-response';
import { OrderDTO } from 'src/app/models/order';
import { PageableResponse } from 'src/app/models/pageable';
import { SimpleListActionsConfig } from 'src/app/models/simple-list-actions-config';
import { SimpleListColumn } from 'src/app/models/simple-list-column';
import { PageRequest } from 'src/app/RequestObjects/pageRequest';
import { MessageToastService } from 'src/app/services/message-toast.service';
import { OrderService } from 'src/app/services/order.service';
import { AddOrderComponent } from './add-order/add-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orderPage: PageableResponse<OrderDTO> | null = null;
  ordersList: OrderDTO[] = [];

  pageNumber: number = 1;
  pageSize: number = 10;

  totalElements: number = 0;

  // Lists' buttons config
  listActionsConfig: SimpleListActionsConfig | null = null;
  expandedListActionsConfig: SimpleListActionsConfig | null = null;

  // Lists' columns and config

  listFilterFields: string[] = ['id', 'name', 'flatTags'];

  listColumnsOrders: SimpleListColumn[] = [
    {
      field: 'none',
      header: '',
    },
    {
      field: 'reference',
      header: 'Reference',
    },
    {
      field: 'customerCompleteName',
      header: 'Customer',
    },
    {
      field: 'totalAmount',
      header: 'Amount',
    },
    {
      field: 'isPaid',
      header: 'Paid',
    },
    {
      field: 'isShipped',
      header: 'Shipped',
    },
    {
      field: 'isCancelled',
      header: 'Cancelled',
    },
    {
      field: 'actions',
      header: 'Actions',
    },
  ];

  expendedListColumns: SimpleListColumn[] = [
    {
      field: 'id',
      header: 'ID',
    },
    {
      field: 'name',
      header: 'Nom',
    },
    {
      field: 'deleted',
      header: 'Statut',
    },
    {
      field: 'actions',
      header: 'Actions',
    },
  ];

  constructor(
    // public
    public dialogService: DialogService,
    // private
    private title: Title,
    private orderService: OrderService,
    private messageToastService: MessageToastService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Vega - orders');
    this.getOrderPage(this.pageNumber, this.pageSize);
  }

  getOrderPage(page: number, size: number) {
    if (page && size) {
      const pageRequest = {
        pageRequest: {
          page: page,
          size: size,
        },
        deleted: false,
      } as PageRequest;

      this.orderService
        .get(pageRequest)
        .subscribe((res: CustomResponse<PageableResponse<OrderDTO>>) => {
          if (res && res.data && res.data.content) {
            this.orderPage = res.data;
            this.ordersList = this.orderPage.content;
            this.totalElements = res.data.totalElements;
          }
        });
    }
  }

  AddOrder() {
    console.log('called');

    const dynamicDialogRef = this.dialogService.open(AddOrderComponent, {
      header: 'Add order',
      closable: false,
      closeOnEscape: false,
      style: { 'max-width': '96%' },
      data: { operationType: OperationType.ADD },
    });

    dynamicDialogRef.onClose.subscribe((newOrder: OrderDTO) => {
      if (newOrder) {
        this.ordersList.unshift(newOrder);
      }
    });
  }
}
