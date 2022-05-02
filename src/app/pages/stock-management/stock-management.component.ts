import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { OperationType } from 'src/app/enums/operation-type';
import { CustomResponse } from 'src/app/models/custom-response';
import { PageableResponse } from 'src/app/models/pageable';
import { StockDTO } from 'src/app/models/stock';
import { StockRequest } from 'src/app/RequestObjects/StockRequest';
import { MessageToastService } from 'src/app/services/message-toast.service';
import { StockService } from 'src/app/services/stock.service';
import { AddStockComponent } from './add-stock/add-stock.component';

@Component({
  selector: 'app-stock-management',
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.scss'],
})
export class StockManagementComponent implements OnInit {
  stockPage: PageableResponse<StockDTO> | null = null;
  stockList: StockDTO[] = [];

  pageNumber: number = 1;
  pageSize: number = 10;

  totalElements: number = 0;

  constructor(
    // public
    public dialogService: DialogService,
    // private
    private title: Title,
    private stockService: StockService,
    private messageToastService: MessageToastService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Vega - stocks');
    this.getStockPage(this.pageNumber, this.pageSize);
  }

  getStockPage(page: number, size: number) {
    if (page && size) {
      const pageRequest = {
        pageRequest: {
          page: page,
          size: size,
        },
        deleted: false,
      } as StockRequest;

      this.stockService
        .get(pageRequest)
        .subscribe((res: CustomResponse<PageableResponse<StockDTO>>) => {
          if (res && res.data && res.data.content) {
            this.stockPage = res.data;
            this.stockList = this.stockPage.content;
            this.totalElements = res.data.totalElements;
            console.log(this.stockPage);
          }
        });
    }
  }

  AddStock() {
    const dynamicDialogRef = this.dialogService.open(AddStockComponent, {
      header: 'Add stock',
      closable: false,
      closeOnEscape: false,
      style: { 'max-width': '96%' },
      data: { operationType: OperationType.ADD },
    });

    dynamicDialogRef.onClose.subscribe((newStock: StockDTO) => {
      if (newStock) {
        this.stockList.unshift(newStock);
      }
    });
  }
}
