import { BaseDTO } from './base';
import { SimpleFeatureDTO } from './feature';

export interface ColorDTO extends SimpleColorDTO {
  feature: SimpleFeatureDTO;
}

export interface SimpleColorDTO extends BaseDTO {
  id: number;
  name: string;
  available: number;
}
