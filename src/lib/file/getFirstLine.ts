export const getFirstLine = async (
	file: File,
	newline = '\n',
): Promise<string> => {
	// @ts-expect-error type is wrong upstream?
	const stream: ReadableStream<string> = file.stream();
	const reader = stream.getReader();
	const chunks = [];
	for (;;) {
		// eslint-disable-next-line no-await-in-loop
		const {done, value} = await reader.read();
		if (done) throw new Error('No newline at end of file.');
		const endIndex = value.indexOf(newline);
		if (endIndex === -1) {
			chunks.push(value);
		} else {
			chunks.push(value.slice(0, endIndex));
			break;
		}
	}

	return chunks.join('');
};
