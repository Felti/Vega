const isListEmpty = (list: any[] | null | undefined): boolean => {
	return Array.isArray(list) && list.length === 0;
};

const isListNotEmpty = (list: any[] | null | undefined): boolean => {
	return Array.isArray(list) && list.length > 0;
};

export { isListEmpty, isListNotEmpty };
