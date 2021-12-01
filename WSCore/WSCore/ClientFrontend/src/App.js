import './assets/app.scss'
import { BrowserRouter, Switch, Route } from "react-router-dom"

import PrivateRoute from './routes'
import { Cookies } from 'react-cookie'
import {cookiesDefault} from './data/enums'
import _ from 'lodash'

import Home from './containers/homes'
import Users from './containers/members/index'
import Register from './containers/members/register'
import EditUser from './containers/members/editUser'
import Category from './containers/category'
import CategoryEdit from './containers/category/edit'
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
            <Route exact path='/' component={Home} />
            
            <Route exact path="/categories/:type" component={Category} />
            <Route exact path="/categories/edit/:id" component={CategoryEdit} />

            <Route exact path="/tags" component={Tag} />
            <Route exact path="/tags/edit/:id" component={TagEdit} />
            <Route exact path="/articles/:type" component={Article} />
            <Route exact path="/articles/add/:type" component={AddArticle} />
            <Route exact path="/articles/edit/:id" component={ArticleEdit} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/users/add" component={Register} />
            <Route exact path="/users/edit/:id" component={EditUser} />
            {/* <Route path="/contact" component={Contact} />
            <Route component={NotFound}/> */}
          </Switch>
        </BrowserRouter>
        {/* <EditUser /> */}
    </div>
  );
}

export default App