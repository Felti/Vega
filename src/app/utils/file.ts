import { getFileNameExtension } from './string';
import { userFileExtensions } from '../shared/constants';

const formatFileSize = (bytes: number, decimalPoint: number = 2) => {
	if (bytes == 0) return '0 Bytes';
	const k = 1024,
		dm = decimalPoint || 2,
		sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
		i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const isCsvFile = (fileName: string): boolean => {
	const fileExtension: string | null = getFileNameExtension(fileName);

	if (fileExtension != null && userFileExtensions.includes(fileExtension)) return true;
	return false;
};

export { formatFileSize, isCsvFile };
