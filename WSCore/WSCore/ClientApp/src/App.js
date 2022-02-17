import './App.css'
import { BrowserRouter, Switch, Route } from "react-router-dom"

import PrivateRoute from './routes'
import { Cookies } from 'react-cookie'
import {cookiesDefault} from './data/enums'
import _ from 'lodash'

import Login from './containers/authen/login'
import Users from './containers/members/index'
import Register from './containers/members/register'
import EditUser from './containers/members/editUser'
import Category from './containers/category'
import CategoryEdit from './containers/category/edit'
import Menu from './containers/menu'
import EditMenu from './containers/menu/edit'
import Tag from './containers/tag'
import TagEdit from './containers/tag/edit'
import AddArticle from './containers/article/add'
import Article from './containers/article'
import ArticleEdit from './containers/article/edit'

function App() {
  const cookies = new Cookies().get(cookiesDefault.key)
  const isAuthenticated = _.get(cookies, 'isAuthenticated')
  return (
    <div className="app-main">
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

            <PrivateRoute exact authed={isAuthenticated} path='/' component={Category} />
            <PrivateRoute exact authed={isAuthenticated} path="/categories/:type" component={Category} />
            <PrivateRoute exact authed={isAuthenticated} path="/categories/edit/:id" component={CategoryEdit} />

            <PrivateRoute exact authed={isAuthenticated} path="/menus" component={Menu} />
            <PrivateRoute exact authed={isAuthenticated} path="/menus/edit/:id" component={EditMenu} />

            <PrivateRoute exact authed={isAuthenticated} path="/tags" component={Tag} />
            <PrivateRoute exact authed={isAuthenticated} path="/tags/edit/:id" component={TagEdit} />
            <PrivateRoute exact authed={isAuthenticated} path="/articles/:type" component={Article} />
            <PrivateRoute exact authed={isAuthenticated} path="/articles/add/:type" component={AddArticle} />
            <PrivateRoute exact authed={isAuthenticated} path="/articles/edit/:id" component={ArticleEdit} />
            <PrivateRoute exact authed={isAuthenticated} path="/users" component={Users} />
            <PrivateRoute exact authed={isAuthenticated} path="/users/add" component={Register} />
            <PrivateRoute exact authed={isAuthenticated} path="/users/edit/:id" component={EditUser} />
            {/* <Route path="/contact" component={Contact} />
            <Route component={NotFound}/> */}
          </Switch>
        </BrowserRouter>
        {/* <EditUser /> */}
    </div>
  );
}

export default App