import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ResolutionService {
	screenResolution: number = 0;
	isMobileResolution: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
