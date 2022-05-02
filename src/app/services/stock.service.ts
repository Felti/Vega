import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// Models
import { CustomResponse } from '../models/custom-response';
import { StockDTO } from '../models/stock';
import { PageableResponse } from '../models/pageable';
import { StockRequest } from '../RequestObjects/StockRequest';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private readonly api: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStock(id: number | string): Observable<CustomResponse<StockDTO>> {
    return this.http.get<CustomResponse<StockDTO>>(`${this.api}/stocks/${id}`);
  }

  get(
    stockRequest: StockRequest
  ): Observable<CustomResponse<PageableResponse<StockDTO>>> {
    return this.http.post<CustomResponse<PageableResponse<StockDTO>>>(
      `${this.api}/stocks/all`,
      stockRequest
    );
  }

  create(dto: StockDTO): Observable<CustomResponse<StockDTO>> {
    return this.http.post<CustomResponse<StockDTO>>(`${this.api}/stocks`, dto);
  }

  edit(dto: StockDTO): Observable<CustomResponse<StockDTO>> {
    return this.http.patch<CustomResponse<StockDTO>>(`${this.api}/stocks`, dto);
  }

  softDelete(id: number | string): Observable<CustomResponse<StockDTO>> {
    return this.http.get<CustomResponse<StockDTO>>(
      `${this.api}/stocks/soft-delete/${id}`
    );
  }

  undelete(id: number | string): Observable<CustomResponse<StockDTO>> {
    return this.http.get<CustomResponse<StockDTO>>(
      `${this.api}/stocks/un-delete/${id}`
    );
  }

  getRevenuStats(): Observable<CustomResponse<number>> {
    return this.http.get<CustomResponse<number>>(
      `${this.api}/stock/stats/revenu`
    );
  }

  getCostsStats(): Observable<CustomResponse<number>> {
    return this.http.get<CustomResponse<number>>(
      `${this.api}/stock/stats/costs`
    );
  }
}
