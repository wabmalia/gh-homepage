
export const useCookie = (name) => {
	const value = document.cookie
		?.split('; ')
		?.find(row => row.startsWith(name))
		?.split('=')[1]

	const setValue = (value) => {
		document.cookie = `${name}=${value}`
	}
	return [value, setValue]
}