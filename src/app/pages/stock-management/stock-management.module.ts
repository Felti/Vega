import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockManagementRoutingModule } from './stock-management-routing.module';
import { StockListComponent } from '../stock-management/stock-list/stock-list.component';
import { StockCardComponent } from './stock-card/stock-card.component';
import { StockManagementComponent } from './stock-management.component';
import { StockStatsComponent } from 'src/app/components/general/stock-stats/stock-stats.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StatsCardComponent } from 'src/app/components/general/stats-card/stats-card.component';
import { AddStockComponent } from './add-stock/add-stock.component';

@NgModule({
  declarations: [
    StockListComponent,
    StockStatsComponent,
    StockCardComponent,
    StockManagementComponent,
    StockStatsComponent,
    StatsCardComponent,
    AddStockComponent,
  ],
  imports: [CommonModule, StockManagementRoutingModule, SharedModule],
})
export class StockManagementModule {}
