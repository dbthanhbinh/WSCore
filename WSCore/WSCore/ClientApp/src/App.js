import './App.css'
import { BrowserRouter, Switch, Route, Link, NavLink } from "react-router-dom"

import EditUser from './containers/members/editUser'
import Category from './containers/category'
import CategoryEdit from './containers/category/edit'
import Tag from './containers/tag'
import TagEdit from './containers/tag/edit'
import AddArticle from './containers/article/add'

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
              <Link to="/category">Category</Link>
            </li>
            <li>
              <Link to="/tag">Tag</Link>
            </li>
            <li>
              <Link to="/article">Article</Link>
            </li>
          </ul>
        </nav>
          <Switch>
            <Route exact path="/" component={Category} />
            <Route exact path="/category" component={Category} />
            <Route exact path="/category/edit/:id" component={CategoryEdit} />
            <Route exact path="/tag" component={Tag} />
            <Route exact path="/tag/edit/:id" component={TagEdit} />
            <Route exact path="/article" component={AddArticle} />
            {/* <Route path="/contact" component={Contact} />
            <Route component={NotFound}/> */}
          </Switch>
        </BrowserRouter>
        {/* <EditUser /> */}
    </div>
  );
}

export default App