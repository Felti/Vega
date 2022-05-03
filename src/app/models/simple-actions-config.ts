export class SimpleActionsConfig {
	displayModifyBtn: boolean = true;
	displayUndeleteBtn: boolean = true;
	displaySoftDeleteBtn: boolean = true;
	displayHardDeleteBtn: boolean = true;

	toggleDisplayModifyBtn() {
		this.displayModifyBtn = !this.displayModifyBtn;
	}

	toggleDisplayUndeleteBtn() {
		this.displayUndeleteBtn = !this.displayUndeleteBtn;
	}

	toggleDisplaySoftDeleteBtn() {
		this.displaySoftDeleteBtn = !this.displaySoftDeleteBtn;
	}

	toggleDisplayHardDeleteBtn() {
		this.displayHardDeleteBtn = !this.displayHardDeleteBtn;
	}
}
