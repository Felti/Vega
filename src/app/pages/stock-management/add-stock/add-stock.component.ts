import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SimpleFeatureDTO } from 'src/app/models/feature';
import { SimpleColorDTO } from 'src/app/models/color';
import { GlobalService } from 'src/app/services/global.service';
import { MessageToastService } from 'src/app/services/message-toast.service';
import { StockDTO } from 'src/app/models/stock';
import { TagService } from 'src/app/services/tag.service';
import { UserService } from 'src/app/services/user.service';
import { CustomResponse } from 'src/app/models/custom-response';
import { TagDTO } from 'src/app/models/tag';
import { CustomError } from 'src/app/models/custom-error';
import { ToastSeverity, ToastSummary } from 'src/app/enums/toast-config';
import { SimpleUserDTO } from 'src/app/models/user';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss'],
})
export class AddStockComponent implements OnInit {
  disabled: boolean = false;

  // FormGroups
  addStockForm: FormGroup | null = null;
  addFeatureForm: FormGroup | null = null;
  addColorForm: FormGroup | null = null;

  // Data
  providers: SimpleUserDTO[] = [];
  features: SimpleFeatureDTO[] = [];
  tags: TagDTO[] = [];

  selectedTags: TagDTO[] = [];

  constructor(
    // public
    public dynamicDialogRef: DynamicDialogRef,
    public dynamicDialogConfig: DynamicDialogConfig,
    // private
    private fb: FormBuilder,
    private globalService: GlobalService,
    private messageToastService: MessageToastService,
    private confirmationService: ConfirmationService,
    private tagService: TagService,
    private userService: UserService,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
    this.getTags();
    this.getProviders();

    this.addStockForm = this.fb.group({
      name: [null, [Validators.required]],

      description: [null, [Validators.maxLength(100)]],

      unitCost: [null, [Validators.required]],

      unitPrice: [null, [Validators.required]],

      provider: [null, [Validators.required]],

      features: this.fb.array([this.newFeatureLine()], [Validators.required]),

      selectedTags: [[], [Validators.required]],
    });
  }

  // Add Stock
  addStock() {
    this.disabled = true;
    let stockDTO = {
      name: this.addStockForm?.get('name')?.value.trim(),
      description: this.addStockForm?.get('description')?.value,
      unitPrice: this.addStockForm?.get('unitCost')?.value,
      sellingPrice: this.addStockForm?.get('unitPrice')?.value,
      provider: this.addStockForm?.get('provider')?.value,
      features: this.addStockForm?.get('features')?.value,
      tags: this.tagList().value,
    } as StockDTO;

    this.stockService.create(stockDTO).subscribe(
      (res: CustomResponse<StockDTO>) => {
        if (res && res.data) {
          this.onAddEdit(res.data, res.message);
        }
      },
      (error: CustomError | any) => this.onAddEditError(error)
    );
  }

  // Get all Tags
  getTags() {
    this.tagService.get().subscribe(
      (res: CustomResponse<TagDTO[]>) => {
        if (res?.data) {
          this.tags = res.data;
        }
      },
      (error: CustomError | any) => this.displayErrorMessage(error)
    );
  }

  // Get all Tags
  getProviders() {
    this.userService.getProviders().subscribe(
      (res: CustomResponse<SimpleUserDTO[]>) => {
        if (res?.data) {
          this.providers = res.data;
        }
      },
      (error: CustomError | any) => this.displayErrorMessage(error)
    );
  }

  // formArray getters
  featureList(): FormArray {
    return this.addStockForm?.get('features') as FormArray;
  }

  featureColorsList(ftIndex: number): FormArray {
    return this.featureList().at(ftIndex).get('colors') as FormArray;
  }

  tagList(): FormArray {
    return this.addStockForm?.get('selectedTags') as FormArray;
  }

  // add / remove feature
  addFeatureLine() {
    this.featureList().push(this.newFeatureLine());
  }

  removeFeatureLine(ftIndex: number) {
    this.featureList().removeAt(ftIndex);
  }

  // add / remove color
  addFeatureColor(ftIndex: number) {
    this.featureColorsList(ftIndex).push(this.newColorLine());
  }

  removeFeatureColor(ftIndex: number, colorIndex: number) {
    this.featureColorsList(ftIndex).removeAt(colorIndex);
  }

  // init features line
  newFeatureLine(): FormGroup {
    return this.fb.group({
      name: [null, [Validators.required]],
      colors: this.fb.array([this.newColorLine()], [Validators.required]),
    });
  }

  // init color line
  newColorLine(): FormGroup {
    return this.fb.group({
      name: [null, [Validators.required]],
      available: [null, [Validators.required]],
    });
  }

  confirmation() {
    this.confirmationService.confirm({
      message: 'Are you sure ?',
      acceptLabel: 'Yes, Add',
      rejectLabel: 'No',
      accept: () => this.addStock(),
    });
  }

  markAppDirtiness(value: boolean) {
    this.globalService.isDirty = value;
  }

  displayErrorMessage(error: CustomError | any) {
    this.messageToastService.displayToast(
      error?.error?.message,
      ToastSeverity.ERROR,
      ToastSummary.ERROR
    );
  }

  onAddEdit(stockDTO: StockDTO, message: string | null = null) {
    if (stockDTO) {
      this.markAppDirtiness(false);
      this.dynamicDialogRef.close(stockDTO);
      this.messageToastService.displayToast(message);
    }
  }

  closeDialog() {
    if (!this.globalService.isDirty) {
      this.dynamicDialogRef.close();
    } else {
      console.log('dirty');
    }
  }

  onAddEditError(error: CustomError | any) {
    this.disabled = false;
    this.messageToastService.displayToast(
      error?.error?.message,
      ToastSeverity.ERROR,
      ToastSummary.ERROR
    );
  }
}
