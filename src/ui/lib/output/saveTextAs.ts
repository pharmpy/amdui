import {saveAs} from 'file-saver';

export default function saveTextAs(text: string, filename: string) {
	const blob = new Blob([text], {type: 'text/plain;charset=utf-8'});
	saveAs(blob, filename);
}
