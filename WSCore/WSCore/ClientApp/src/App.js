import './App.css'
import { BrowserRouter, Switch, Route, Link, NavLink } from "react-router-dom"

import EditUser from './containers/members/editUser'
import Category from './containers/category'
import CategoryEdit from './containers/category/edit'
import Tag from './containers/tag'
import TagEdit from './containers/tag/edit'
import AddArticle from './containers/article/add'
import Article from './containers/article'
import ArticleEdit from './containers/article/edit'

function App() {
  return (
    <div className="app-main">
        <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/categories">Category</Link>
            </li>
            <li>
              <Link to="/tags">Tag</Link>
            </li>
            <li>
              <Link to="/articles">Article</Link>
            </li>
          </ul>
        </nav>
          <Switch>
            <Route exact path="/" component={Category} />
            <Route exact path="/categories" component={Category} />
            <Route exact path="/categories/edit/:id" component={CategoryEdit} />
            <Route exact path="/tags" component={Tag} />
            <Route exact path="/tags/edit/:id" component={TagEdit} />

            <Route exact path="/articles/:type" component={Article} />
            <Route exact path="/articles/:type/:page" component={Article} />
            <Route exact path="/articles/add/:type" component={AddArticle} />
            <Route exact path="/articles/edit/:id" component={ArticleEdit} />
            {/* <Route path="/contact" component={Contact} />
            <Route component={NotFound}/> */}
          </Switch>
        </BrowserRouter>
        {/* <EditUser /> */}
    </div>
  );
}

export default App