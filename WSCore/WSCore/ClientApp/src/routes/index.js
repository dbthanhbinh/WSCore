import {Route, Redirect } from "react-router-dom"

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => <Component {...props} {...rest} />}
    />
  )
    // return (
    //   <Route
    //     {...rest}
    //     render={(props) => authed === true
    //       ? <Component {...props} {...rest} />
    //       : <Redirect to='/login' />}
    //   />
    // )
}

export default PrivateRoute