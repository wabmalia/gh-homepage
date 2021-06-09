import React from "react"
import AuthenticatorRouter from "./authenticator-router"
import "./app.scss"

const App = () => {
  return (
    <AuthenticatorRouter baseRoute={process.env.BASE_ROUTE} redirectRoute={"callback"}>
      <div className="homepage">
        <h1>WIP: <b>Homepage</b></h1>
      </div>
    </AuthenticatorRouter>
  )
}


export default App;
