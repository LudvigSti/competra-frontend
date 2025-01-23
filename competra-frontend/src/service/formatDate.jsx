export function formatDateTime(dateTimeString) {
	const date = new Date(dateTimeString);

	const day = date.getUTCDate();
	const month = date.toLocaleString('default', { month: 'long' });
	const year = date.getUTCFullYear();

	return `${month} ${day}, ${year}`;
}
