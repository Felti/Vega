const arraysEqual = (firstArray: { id: number }[], secondArray: { id: number }[]) => {
	if (firstArray === secondArray) return true;
	if (firstArray == null || secondArray == null) return false;
	if (firstArray.length !== secondArray.length) return false;
	for (let i = 0; i < firstArray.length; ++i) {
		if (firstArray[i].id !== secondArray[i].id) return false;
	}
	return true;
};

export { arraysEqual };
