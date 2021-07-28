import './App.css'
import { BrowserRouter, Switch, Route, Link, NavLink } from "react-router-dom"

import EditUser from './containers/members/editUser'
import Category from './containers/category'
import CategoryEdit from './containers/category/edit'
// import Tag from './containers/tag'

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
          </ul>
        </nav>
          <Switch>
            <Route exact path="/" component={Category} />
            <Route exact path="/category" component={Category} />
            <Route path="/category/edit/:id" component={CategoryEdit} />
            {/* <Route path="/tag" component={Tag} /> */}
            {/* <Route path="/contact" component={Contact} />
            <Route component={NotFound}/> */}
          </Switch>
        </BrowserRouter>
        {/* <EditUser /> */}
    </div>
  );
}

export default App