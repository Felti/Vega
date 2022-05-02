export class CustomResponse<T> {
	data: T | null = null;
	message: string | null = null;
	detailedMessage: string | null = null;
	timestamp: Date | null = null;
}
