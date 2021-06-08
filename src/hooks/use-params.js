import {useLocation} from "react-router-dom";

export const useHashParams = () => {
	const location = useLocation()
	return location.hash.substr(1)
		.split("&")
		.map(queryParam => {
			const [param, value] = queryParam.split("=")
			return {
				[param]: value
			}
		})
		.reduce((previousValue, currentValue) => ({...previousValue, ...currentValue}), {})
}