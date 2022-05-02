import { BaseDTO } from './base';
import { SimpleCategoryDTO } from './category';
import { SimpleStockDTO } from './stock';

export interface TagDTO extends SimpleTagDTO {
  category: SimpleCategoryDTO;
  stocks: SimpleStockDTO[];
}

export interface SimpleTagDTO extends BaseDTO {
  id: number;
  name: string;
}
