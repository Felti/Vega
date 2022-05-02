import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Enums
import { Role } from '../enums/role';
import { UserPrivilege } from '../enums/privileges/user';
// Models
import { CustomResponse } from '../models/custom-response';

import {
  CreateSingleUser,
  SimpleUserDTO,
  UpdateSingleUser,
  UserDTO,
  UserRolesPrivilegesModificationDTO,
} from '../models/user';
// Utils
import { hashString } from '../utils/string';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly api: string = environment.apiUrl;

  sendSignOutSignal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private http: HttpClient) {}

  getUsers(deleted: boolean = false): Observable<CustomResponse<UserDTO[]>> {
    return this.http.get<CustomResponse<UserDTO[]>>(
      `${this.api}/users?deleted=${deleted}`
    );
  }

  getProviders(): Observable<CustomResponse<UserDTO[]>> {
    return this.http.get<CustomResponse<UserDTO[]>>(
      `${this.api}/users/providers`
    );
  }

  /**
   * @returns List of users privileged to create documents
   */
  getDocumentCreators(): Observable<CustomResponse<SimpleUserDTO[]>> {
    return this.http.get<CustomResponse<SimpleUserDTO[]>>(
      `${this.api}/users/document-creators`
    );
  }

  setUserStatus(
    id: number | string,
    status: boolean
  ): Observable<CustomResponse<UserDTO>> {
    return this.http.get<CustomResponse<UserDTO>>(
      `${this.api}/users/${id}/status/${status}`
    );
  }

  importUsersFromCsv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.api}/users/import`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  createInternalUser(
    user: CreateSingleUser
  ): Observable<CustomResponse<UserDTO>> {
    return this.http.post<CustomResponse<UserDTO>>(
      `${this.api}/users/single`,
      user
    );
  }

  updateUserInfo(user: UpdateSingleUser): Observable<CustomResponse<UserDTO>> {
    return this.http.patch<CustomResponse<UserDTO>>(
      `${this.api}/users/single`,
      user
    );
  }

  updateRolesAndPrivileges(
    dto: UserRolesPrivilegesModificationDTO
  ): Observable<CustomResponse<UserDTO>> {
    return this.http.patch<CustomResponse<UserDTO>>(
      `${this.api}/users/roles-privileges`,
      dto
    );
  }

  getById(id: number | string): Observable<CustomResponse<UserDTO>> {
    return this.http.get<CustomResponse<UserDTO>>(`${this.api}/users/${id}`);
  }

  getByLogin(login: string): Observable<CustomResponse<UserDTO>> {
    return this.http.get<CustomResponse<UserDTO>>(
      `${this.api}/users/login/${login}`
    );
  }

  getByPrincipal(): Observable<CustomResponse<UserDTO>> {
    return this.http.get<CustomResponse<UserDTO>>(
      `${this.api}/users/principal`
    );
  }

  getLocalUserRoles(signOut: boolean = true): string[] {
    const storedRolesHash: string | null = localStorage.getItem('urh_1004');
    const currentRolesHash: Promise<string> | null = hashString(
      localStorage.getItem('ur_1003')
    );

    if (currentRolesHash) {
      currentRolesHash.then((value: string) => {
        if (!value || !storedRolesHash || value !== storedRolesHash) {
          this.sendSignOutSignal.next(signOut);
        }
      });
    } else this.sendSignOutSignal.next(signOut);

    return localStorage.getItem('ur_1003') != null
      ? JSON.parse(localStorage.getItem('ur_1003')!)
      : [];
  }

  getLocalUserPrivileges(signOut: boolean = true): string[] {
    const storedPrivilegesHash: string | null =
      localStorage.getItem('uph_1006');
    const currentPrivilegesHash: Promise<string> | null = hashString(
      localStorage.getItem('up_1005')
    );

    if (currentPrivilegesHash) {
      currentPrivilegesHash.then((value: string) => {
        if (!value || !storedPrivilegesHash || value !== storedPrivilegesHash) {
          this.sendSignOutSignal.next(signOut);
        }
      });
    } else this.sendSignOutSignal.next(signOut);

    return localStorage.getItem('up_1005') != null
      ? JSON.parse(localStorage.getItem('up_1005')!)
      : [];
  }

  getLocalUserRolesAndPrivilegesFlat(): string[] {
    return [...this.getLocalUserRoles(), ...this.getLocalUserPrivileges()];
  }

  canUserModifyUsers(): boolean {
    const userPrivileges: string[] = this.getLocalUserPrivileges();

    if (
      (userPrivileges.includes(UserPrivilege.CAN_ASSIGN_ROLE_TO_USER) &&
        userPrivileges.includes(UserPrivilege.CAN_ASSIGN_PRIVILEGE_TO_USER)) ||
      userPrivileges.includes(UserPrivilege.CAN_CHANGE_USER_STATUS)
    ) {
      return true;
    }

    return false;
  }

  isUserRoot(): boolean {
    if (this.getLocalUserRoles().includes(Role.ROLE_ROOT)) return true;

    return false;
  }

  getLocalUser(): SimpleUserDTO | null {
    const userRaw = localStorage.getItem('u_1000');
    if (userRaw) return JSON.parse(userRaw) as SimpleUserDTO;

    return null;
  }

  getUserName(
    user: UserDTO | SimpleUserDTO | null = this.getLocalUser()
  ): string {
    const lastName: string =
      user && user.lastName ? ` ${user.lastName.trim()}` : '';
    return `${user?.firstName?.trim()}${lastName}`;
  }

  isOwnerOrHasPrivilege(
    ownerId: number | string | undefined,
    privilege: string
  ): boolean {
    const user = this.getLocalUser();
    if (
      (ownerId && Number(user?.id) === Number(ownerId)) ||
      this.getLocalUserPrivileges().includes(privilege.toUpperCase())
    ) {
      return true;
    }
    return false;
  }

  hasPrivilege(privilege: string): boolean {
    if (this.getLocalUserPrivileges().includes(privilege.toUpperCase()))
      return true;
    return false;
  }
}
