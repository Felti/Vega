const getFileNameExtension = (fileName: string): string | null => {
	if (fileName != null && fileName.trim() != null) {
		const splittedFileName: string[] = fileName.split('.');
		if (splittedFileName != null && splittedFileName.length > 0) {
			return splittedFileName[splittedFileName.length - 1];
		}
		return null;
	}
	return null;
};

const isStringNotEmpty = (value: string | null | undefined): boolean => {
	return value != null && value != undefined && value.length != 0 && value.trim().length != 0;
};

const hashString = (value: string | null): Promise<string> | null => {
	if (value) {
		return new Promise<string>(async (resolve, reject) => {
			try {
				// Encode as (utf-8) Uint8Array
				const valueUint8 = new TextEncoder().encode(value);
				// Hash the value
				const hashBuffer = await crypto.subtle.digest('SHA-256', valueUint8);
				// Convert buffer to byte array
				const hashArray = Array.from(new Uint8Array(hashBuffer));
				// Convert bytes to hex string
				const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
				// Return hex string
				resolve(hashHex);
			} catch (error) {
				reject(error);
			}
		});
	} else return null;
};

const copyToClipboard = (value: string) => {
	if (navigator.clipboard) navigator.clipboard.writeText(value);
	else {
		const textAreaElement = document.createElement('textarea');
		textAreaElement.value = value;
		textAreaElement.setAttribute('readonly', '');
		textAreaElement.style.position = 'absolute';
		textAreaElement.style.left = '-9999px';
		document.body.appendChild(textAreaElement);
		const selected = document.getSelection()!.rangeCount > 0 ? document.getSelection()!.getRangeAt(0) : false;
		textAreaElement.select();
		document.execCommand('copy');
		document.body.removeChild(textAreaElement);
		if (selected) {
			document.getSelection()!.removeAllRanges();
			document.getSelection()!.addRange(selected);
		}
	}
};

export { getFileNameExtension, isStringNotEmpty, hashString, copyToClipboard };
