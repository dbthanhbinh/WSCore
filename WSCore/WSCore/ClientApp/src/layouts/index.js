import {Container, Grid} from 'semantic-ui-react'
import { BrowserRouter, Switch, Route, Link, NavLink } from "react-router-dom"

function MainLayout(props) {
    return (
      <div className="app-main">
        <Container>
          <Grid columns={1} divided>
            <Grid.Row>
              <Grid.Column width={3}>
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
                      <Link to="/articles/news">Article</Link>
                    </li>
                  </ul>
                </nav>
              </Grid.Column>
              <Grid.Column width={13}>
                {props.children}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
  
  export default MainLayout