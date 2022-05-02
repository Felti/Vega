import { BaseDTO } from './base';
import { TagDTO } from './tag';

export interface CategoryDTO extends SimpleCategoryDTO {
  tags: TagDTO[];
}

export interface SimpleCategoryDTO extends BaseDTO {
  name: string;
}
