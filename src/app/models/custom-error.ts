import { CustomResponse } from './custom-response';

export interface CustomError {
	error: CustomResponse<null>;
	status: number;
	statusText: string;
}
