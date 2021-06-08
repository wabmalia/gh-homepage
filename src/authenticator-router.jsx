import React, { useEffect } from "react"
import { format } from "date-fns"
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom"
import { useHashParams } from "./hooks/use-params"
import { useCookie } from "./hooks/use-cookies"
import { isBefore } from "date-fns"

const AuthenticatorRouter = ({ baseRoute, redirectRoute, children }) => {
	return (
		<Router basename={baseRoute}>
			<Route exact path="/">
				<CheckForToken redirectRoute={redirectRoute}>
					{children}
				</CheckForToken>
			</Route>
			<Route path="/callback">
				<RetrieveToken />
			</Route>
		</Router>
	)
}

const CheckForToken = ({ redirectRoute, children }) => {
	const [accessToken] = useCookie("access_token")

	const tokenPayload = accessToken?.split(".")[1]
	const expirationTime = tokenPayload && JSON.parse(atob(tokenPayload)).exp
	const expired = expirationTime && isBefore(new Date(expirationTime * 1000), Date.now())

	const redirectUri = `${window.location.protocol}//${window.location.host}/${redirectRoute}}`
	useEffect(() => {
		if (!accessToken || expired) {
			const state = format(Date.now(), 'ddMMyyyy')
			window.location.href = `
				https://accounts.google.com/o/oauth2/v2/auth?
					client_id=422192019724-fvg91m5kdhj8suc5qbkbq8icm5m228ol.apps.googleusercontent.com
					&scope=openid
					&response_type=id_token
					&nonce=${btoa(state)}
					&state=${state}
					&redirect_uri=${redirectUri}
			`
		}
	}, [accessToken, expired, redirectUri])

	return accessToken && !expired ? children : null
}

const RetrieveToken = () => {
	const history = useHistory()
	const hashParams = useHashParams()
	const [, setAccessTokenCookie] = useCookie("access_token")

	setAccessTokenCookie(hashParams.id_token)
	history.replace("/")

	return null
}


export default AuthenticatorRouter