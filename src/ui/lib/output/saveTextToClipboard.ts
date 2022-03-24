const saveTextToClipboardLegacy = async (text: string): Promise<void> => {
	const element = document.createElement('textarea');
	element.value = text;
	element.setAttribute('readonly', '');
	element.style.position = 'absolute';
	element.style.display = 'block';
	element.style.width = '0';
	element.style.height = '0';
	element.style.left = '-9999px';
	document.body.append(element);
	element.select();
	document.execCommand('copy');
	element.remove();
	return undefined;
};

const saveTextToClipboardModern = async (text: string): Promise<void> => {
	return navigator.clipboard.writeText(text);
};

const saveTextToClipboard = async (text: string): Promise<void> => {
	return navigator.clipboard
		? saveTextToClipboardModern(text)
		: saveTextToClipboardLegacy(text);
};

export default saveTextToClipboard;
