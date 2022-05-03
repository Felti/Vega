import { Component, Input, OnInit } from '@angular/core';
import { StockDTO } from 'src/app/models/stock';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss'],
})
export class StockCardComponent implements OnInit {
  @Input() stock: StockDTO | null = null;

  status: string | null = null;

  totalRevenu: number = 0;
  totalCost: number = 0;
  netRevenu: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.setStockStatus();
    if (this.stock) {
      this.calculateNetRevenu();
    }
  }

  calculateRevenue(stock: StockDTO) {
    if (stock.initialQuantity && stock.sellingPrice) {
      this.totalRevenu =
        stock.sellingPrice * (stock.initialQuantity - stock.quantity);
      return this.totalRevenu;
    }
    return this.totalRevenu;
  }

  calculateTotalCost(stock: StockDTO): number {
    if (stock.unitPrice && stock.initialQuantity) {
      this.totalCost = stock.unitPrice * stock.initialQuantity;
      return this.totalCost;
    }
    return this.totalCost;
  }

  calculateNetRevenu() {
    if (this.stock) {
      this.netRevenu =
        this.calculateRevenue(this.stock) - this.calculateTotalCost(this.stock);
    }
  }

  setStockStatus() {
    if (this.stock) {
      if (
        this.stock.quantity > 0 &&
        this.stock.initialQuantity / 2 < this.stock.quantity
      ) {
        this.status = 'Available';
      } else if (this.stock.quantity === 0) {
        this.status = 'Out of stock';
      } else if (
        this.stock.quantity > 0 &&
        this.stock.initialQuantity / 2 > this.stock.quantity
      ) {
        this.status = 'Running low';
      }
    }
  }

  appendColorTOstatus(): string {
    switch (this.status) {
      case 'Available':
        return 'rgb(71, 182, 69)';
      case 'Out of stock':
        return 'rgb(250 78 78)';
      case 'Running low':
        return 'rgb(243, 217, 19)';
      default:
        return 'rgb(0, 0, 0);';
    }
  }

  showMoreInfoPopup(featureId: number) {
    const moreInfoPopup = document.getElementById(
      `more-info-features-${featureId}`
    );

    moreInfoPopup?.setAttribute(
      'style',
      `visibility : ${
        moreInfoPopup?.style.visibility === 'visible' ? 'hidden' : 'visible'
      }`
    );
  }
}
