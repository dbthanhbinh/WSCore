import {Route, Redirect } from "react-router-dom"

function PrivateRoute ({component: Component, authed, ...rest}) {
  console.log('=====authed: ', authed)
    return (
      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} {...rest} />
          : <Redirect to='/login' />}
      />
    )
}

export default PrivateRoute