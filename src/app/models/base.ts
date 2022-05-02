export interface BaseDTO {
	id: number | string;
	deleted: boolean;
	createdAt: Date;
	modifiedAt: Date;
	createdBy: number | string;
}
