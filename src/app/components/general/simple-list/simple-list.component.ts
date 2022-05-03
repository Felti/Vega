import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SimpleListActionsConfig } from 'src/app/models/simple-list-actions-config';
import { SimpleListColumn } from 'src/app/models/simple-list-column';
// Services
import { ResolutionService } from 'src/app/services/resolution.service';
// Models

@Component({
  selector: 'app-simple-list',
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.scss'],
})
export class SimpleListComponent implements OnInit {
  // Data
  localColumns: SimpleListColumn[] = [];

  // Responsiveness
  isMobile: boolean = false;

  // Inputs
  @Input() list: any[] = [];
  @Input() columns: SimpleListColumn[] = [];
  @Input() globalFilterFields: string[] = [];
  @Input() config: SimpleListActionsConfig = new SimpleListActionsConfig();

  // Outputs
  @Output() modify: EventEmitter<any> = new EventEmitter();
  @Output() softDelete: EventEmitter<any> = new EventEmitter();
  @Output() rowSelected: EventEmitter<any> = new EventEmitter();
  @Output() hardDelete: EventEmitter<any> = new EventEmitter();
  @Output() undelete: EventEmitter<any> = new EventEmitter();

  constructor(private resolutionService: ResolutionService) {}

  ngOnInit(): void {
    this.localColumns = [...this.columns];

    this.resolutionService.isMobileResolution.subscribe(
      (res) => (this.isMobile = res)
    );
  }
}
