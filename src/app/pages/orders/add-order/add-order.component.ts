import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastSeverity, ToastSummary } from 'src/app/enums/toast-config';
import { CustomError } from 'src/app/models/custom-error';
import { OrderDTO } from 'src/app/models/order';
import { GlobalService } from 'src/app/services/global.service';
import { MessageToastService } from 'src/app/services/message-toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent implements OnInit {
  disabled: boolean = false;

  // FormGroups
  addOrderForm: FormGroup | null = null;

  constructor(
    // public
    public dynamicDialogRef: DynamicDialogRef,
    public dynamicDialogConfig: DynamicDialogConfig,
    // private
    private fb: FormBuilder,
    private globalService: GlobalService,
    private messageToastService: MessageToastService,
    private confirmationService: ConfirmationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.addOrderForm = this.fb.group({
      products: this.fb.array([this.newProductLine()], [Validators.required]),

      customer: [null, [Validators.required]],

      reference: [null, [Validators.required]],

      isPaid: [null, [Validators.required]],

      isShipped: [null, [Validators.required]],

      isCancelled: [null, [Validators.required]],
    });
  }

  addOrder() {}

  // formArray getters
  productsList(): FormArray {
    return this.addOrderForm?.get('products') as FormArray;
  }

  // add / remove feature
  addProductLine() {
    this.productsList().push(this.newProductLine());
  }

  removeProductLine(pdIndex: number) {
    this.productsList().removeAt(pdIndex);
  }

  // init products line
  newProductLine(): FormGroup {
    return this.fb.group({
      name: [null, [Validators.required]],
      color: [null, [Validators.required]],
      size: [null, [Validators.required]],
      price: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
    });
  }

  confirmation() {
    this.confirmationService.confirm({
      message: 'Are you sure ?',
      acceptLabel: 'Yes, Add',
      rejectLabel: 'No',
      accept: () => this.addOrder(),
    });
  }

  markAppDirtiness(value: boolean) {
    this.globalService.isDirty = value;
  }

  closeDialog() {
    if (!this.globalService.isDirty) {
      this.dynamicDialogRef.close();
    } else {
      console.log('dirty');
    }
  }

  onAddEdit(orderDTO: OrderDTO, message: string | null = null) {
    if (orderDTO) {
      this.markAppDirtiness(false);
      this.dynamicDialogRef.close(orderDTO);
      this.messageToastService.displayToast(message);
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

  displayErrorMessage(error: CustomError | any) {
    this.messageToastService.displayToast(
      error?.error?.message,
      ToastSeverity.ERROR,
      ToastSummary.ERROR
    );
  }
}
