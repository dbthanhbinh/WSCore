import './assets/app.scss'
import { BrowserRouter, Switch, Route } from "react-router-dom"

// import PrivateRoute from './routes'
// import { Cookies } from 'react-cookie'
// import {cookiesDefault} from './data/enums'
// import _ from 'lodash'

import Home from './containers/homes'
import ArchiveContainer from './containers/archive'
import DetailContainer from './containers/single/article'

function App() {
  // const cookies = new Cookies().get(cookiesDefault.key)
  // const isAuthenticated = _.get(cookies, 'isAuthenticated')

  return (
    <div className="app-main">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />

            {/* Detail */}
            <Route exact path='/:slug' component={DetailContainer} />

            {/* Category */}
            <Route exact path='/:type/:slug' component={ArchiveContainer} />

            {/* <Route path="/contact" component={Contact} /> */}
            <Route path='*' component={() => 'Notfound!'}/>
          </Switch>
        </BrowserRouter>
        {/* <EditUser /> */}
    </div>
  );
}

export default App