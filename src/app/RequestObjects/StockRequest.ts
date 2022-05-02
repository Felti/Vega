import { PeagableDTO } from '../models/pageable';

export interface StockRequest {
  pageRequest: PeagableDTO;
  deleted: boolean;
}
