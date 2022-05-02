interface Sort {
	sorted: boolean;
	unsorted: boolean;
	empty: boolean;
}

interface Pageable {
	sort: Sort;
	offset: number;
	pageNumber: number;
	pageSize: number;
	paged: boolean;
	unpaged: boolean;
}

export interface PageableResponse<T> {
	content: T[];
	pageable: Pageable;
	last: boolean;
	totalElements: number;
	totalPages: number;
	size: number;
	number: number;
	sort: Sort;
	first: false;
	numberOfElements: number;
}

export interface PeagableDTO {
	page: number;
	size: number;
}
