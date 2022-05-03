import { PeagableDTO } from '../models/pageable';

export interface PageRequest {
  pageRequest: PeagableDTO;
  deleted: boolean;
}
