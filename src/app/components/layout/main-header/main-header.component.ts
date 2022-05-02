import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SimpleUserDTO } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { ResolutionService } from 'src/app/services/resolution.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  @Output() toggleContent = new EventEmitter<string>();

  isOnline: boolean = true;
	isMobile: boolean | null = null;

  accountOptions: MenuItem[] = [];

  user: SimpleUserDTO | null = null;
  constructor( private userService: UserService,
		private authService: AuthService,
		private globalService: GlobalService,
		private dialogService: DialogService,
		private resolutionService: ResolutionService) {
   
  }

  ngOnInit() {
		// Get user info
		this.user = this.userService.getLocalUser();
		// Check screen size for responsiveness
		this.resolutionService.isMobileResolution.subscribe(res => (this.isMobile = res));
		// Internet connection checking
		this.globalService.checkInternetActivity().subscribe(res => (this.isOnline = res));

		this.accountOptions = [
			{ label: 'Se déconnecter', icon: 'pi pi-sign-out', command: () => this.authService.signOut() },
		];

		// if (this.userService.isUserRoot()) {
		// 	this.accountOptions.unshift({ label: 'API', icon: 'pi pi-globe', command: () => this.openApiKeyComponent() });
		// }
	}

  toggleMenu() {
		document.getElementById('side-bar')?.classList.toggle('collapse');
		this.toggleContent.emit('collapse');
	}

  toggleMenuIfMobile() {
		if (this.isMobile) this.toggleMenu();
	}

}
