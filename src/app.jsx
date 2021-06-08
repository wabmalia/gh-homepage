import "./app.scss"
import AuthenticatorRouter from "./authenticator-router"

const App = () => {
  return (
    <AuthenticatorRouter baseRoute="/home" redirectRoute={"callback"}>
      <div className="homepage">
        <h1>WIP: <b>Homepage</b></h1>
      </div>
    </AuthenticatorRouter>
  )
}


export default App;
