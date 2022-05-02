import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageableResponse } from 'src/app/models/pageable';
import { StockDTO } from 'src/app/models/stock';
import { ResolutionService } from 'src/app/services/resolution.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
})
export class StockListComponent implements OnInit {
  constructor(private resolutionService: ResolutionService) {}

  @Input() totalElements: number | null = null;
  @Input() stockPage: PageableResponse<StockDTO> | null = null;

  @Output() loadingChanged: EventEmitter<boolean> = new EventEmitter();
  @Output() pageChanged: EventEmitter<{ page: number; size: number }> =
    new EventEmitter();

  ngOnInit(): void {}

  paginate(event: any) {
    this.pageChanged.emit({ page: event.page + 1, size: event.rows });
  }

  displayPageNumbers() {
    const screen = this.resolutionService.screenResolution;
    if (screen < 360) return 2;
    else if (screen > 360 && screen < 760) return 3;
    else return 5;
  }
}
