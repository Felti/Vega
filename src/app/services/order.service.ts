import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// Models
import { CustomResponse } from '../models/custom-response';
import { PageableResponse } from '../models/pageable';
import { PageRequest } from '../RequestObjects/pageRequest';
import { OrderDTO } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly api: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStock(id: number | string): Observable<CustomResponse<OrderDTO>> {
    return this.http.get<CustomResponse<OrderDTO>>(`${this.api}/orders/${id}`);
  }

  get(
    pageRequest: PageRequest
  ): Observable<CustomResponse<PageableResponse<OrderDTO>>> {
    return this.http.post<CustomResponse<PageableResponse<OrderDTO>>>(
      `${this.api}/orders/all`,
      pageRequest
    );
  }

  create(dto: OrderDTO): Observable<CustomResponse<OrderDTO>> {
    return this.http.post<CustomResponse<OrderDTO>>(`${this.api}/orders`, dto);
  }

  edit(dto: OrderDTO): Observable<CustomResponse<OrderDTO>> {
    return this.http.patch<CustomResponse<OrderDTO>>(`${this.api}/orders`, dto);
  }

  softDelete(id: number | string): Observable<CustomResponse<OrderDTO>> {
    return this.http.get<CustomResponse<OrderDTO>>(
      `${this.api}/orders/soft-delete/${id}`
    );
  }

  undelete(id: number | string): Observable<CustomResponse<OrderDTO>> {
    return this.http.get<CustomResponse<OrderDTO>>(
      `${this.api}/orders/un-delete/${id}`
    );
  }
}
