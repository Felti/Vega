import { BaseDTO } from './base';
import { SimpleInvoiceDTO } from './invoice';
import { SimpleProductDTO } from './product';

import { SimpleUserDTO } from './user';

export interface OrderDTO extends SimpleOrderDTO {
  invoice: SimpleInvoiceDTO;
  products: SimpleProductDTO[];
}

export interface SimpleOrderDTO extends BaseDTO {
  reference: string;
  isCancelled: boolean;
  isPaid: boolean;
  isShipped: boolean;
  totalAmount: number;
  customer: SimpleUserDTO;
  customerCompleteName: string;
}
