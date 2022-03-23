const saveTextToClipboardLegacy = async (text: string): Promise<void> => {
	const el = document.createElement('textarea');
	el.value = text;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.display = 'block';
	el.style.width = '0';
	el.style.height = '0';
	el.style.left = '-9999px';
	document.body.append(el);
	el.select();
	document.execCommand('copy');
	el.remove();
	return Promise.resolve(undefined);
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
