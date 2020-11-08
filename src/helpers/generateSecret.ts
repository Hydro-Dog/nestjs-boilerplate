export function generateSecret() {
	return Math.random()
		.toString(36)
		.slice(-8);
}
