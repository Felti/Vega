import { BaseDTO } from './base';
import { InvoiceDTO } from './invoice';
import { ProductDTO } from './product';
import { FeatureDTO } from './feature';
import { TagDTO } from './tag';
import { UserDTO } from './user';

export interface StockDTO extends SimpleStockDTO {
  tags: TagDTO[];
  features: FeatureDTO[];
  invoices: InvoiceDTO[];
  products: ProductDTO[];
}

export interface SimpleStockDTO extends BaseDTO {
  name: string;
  description: string;
  initialQuantity: number;
  quantity: number;
  unitPrice: number;
  sellingPrice: number;
  total: number;
  provider: UserDTO;
}
