import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// Models
import { TagDTO } from '../models/tag';
import { CustomResponse } from '../models/custom-response';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private readonly api: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getById(id: number | string): Observable<CustomResponse<TagDTO>> {
    return this.http.get<CustomResponse<TagDTO>>(`${this.api}/tags/${id}`);
  }

  get(): Observable<CustomResponse<TagDTO[]>> {
    return this.http.get<CustomResponse<TagDTO[]>>(`${this.api}/tags`);
  }

  create(dto: TagDTO): Observable<CustomResponse<TagDTO>> {
    return this.http.post<CustomResponse<TagDTO>>(`${this.api}/tags`, dto);
  }

  edit(dto: TagDTO): Observable<CustomResponse<TagDTO>> {
    return this.http.patch<CustomResponse<TagDTO>>(`${this.api}/tags`, dto);
  }

  delete(id: number | string): Observable<CustomResponse<TagDTO>> {
    return this.http.delete<CustomResponse<TagDTO>>(`${this.api}/tags/${id}`);
  }

  softDelete(id: number | string): Observable<CustomResponse<TagDTO>> {
    return this.http.get<CustomResponse<TagDTO>>(
      `${this.api}/tags/soft-delete/${id}`
    );
  }

  undelete(id: number | string): Observable<CustomResponse<TagDTO>> {
    return this.http.get<CustomResponse<TagDTO>>(
      `${this.api}/tags/un-delete/${id}`
    );
  }
}
