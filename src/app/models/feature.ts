import { BaseDTO } from './base';
import { SimpleColorDTO } from './color';
import { SimpleStockDTO } from './stock';

export interface FeatureDTO extends SimpleFeatureDTO {
  stock: SimpleStockDTO;
}

export interface SimpleFeatureDTO extends BaseDTO {
  id: number;
  name: string;
  nbrAvailable: number;
  colors: SimpleColorDTO[];
}
