import React, { Component } from 'react'
import _ from 'lodash'
import {Container, Grid} from 'semantic-ui-react'
import {connect} from 'react-redux'
import { Link } from "react-router-dom"
import {getAppConfigs, setCurrentPermissions} from '../reduxStore/actions/config.actions'
import {cookiesDefault, layouts} from '../data/enums'
import { withCookies } from 'react-cookie'
import TransitionFlash from '../components/flash'

// Data
import {globalConfigs} from '../data/index'


class MainLayout extends Component {
  constructor(props){
    super(props)
    this.state = {}
    this.handleLoggedout = this.handleLoggedout.bind(this)
    this.layout = _.get(globalConfigs, 'layout.layout')
    this.layoutComponent = <div>full width</div>
    this.initLayout()
  }

  initLayout(){
    if(this.layout){
      switch(this.layout){
        case layouts.FULL:
          this.layoutComponent = <div>full width</div>
          break
        case layouts.LEFT_SB:
          this.layoutComponent = <div>Left navigation</div>
          break
        case layouts.RIGHT_SB:
          this.layoutComponent = <div>Right navigation</div>
          break
        case layouts.LEFT_RIGHT_SB:
          this.layoutComponent = <div>Left Right navigation</div>
          break
        default:
          this.layoutComponent = <div>Full width</div>
          this.layout = layouts.FULL
      }
    } else {
      this.layout = layouts.FULL
    }
  }

  async componentDidMount(){
    this.props.setCurrentPermissions({})
  }

  async handleLoggedout() {
    let {cookies} = this.props
    let loggedCookies = {}
    loggedCookies.loggedData = null
    loggedCookies.isAuthenticated = false
    cookies.set(cookiesDefault.key, loggedCookies, { path: '/' })
    window.location.href = '/login'
  }

  render(){
    
    return (
      <div className="app-main">
        {/* Header */}
        <Container>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column width={16}>
                Header |
                 <span onClick={this.handleLoggedout}>Logout</span>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

        {/* Menu */}
        <Container>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column width={16}>
                Menu
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

        {/* Main body */}
        <Container>
          <Grid columns={1}>
            <Grid.Row>
              {this.layoutComponent}
            </Grid.Row>
          </Grid>
        </Container>        

        {/* Footer */}
        <Container>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column width={16}>
                Footer
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

        {/* Copyright */}
        <Container>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column width={16}>
                Copyright
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

        {/* <Container>
          <Grid columns={1} divided>
            <Grid.Row>
              <Grid.Column width={3}>
                <nav>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/categories/category">Category</Link>
                    </li>
                    <li>
                      <Link to="/tags">Tag</Link>
                    </li>
                    <li>
                      <Link to="/articles/news">Article</Link>
                    </li>
                    <li>
                      <Link to="/users">Users</Link>
                    </li>
                  </ul>
                </nav>
              </Grid.Column>
              <Grid.Column width={13}>
                {this.props.children}
              </Grid.Column>
            </Grid.Row>
            </Grid>
            <TransitionFlash />
        </Container> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let {config} = state
  return {
      currentConfigs: config.currentConfigs,
      currentPermissions: config.currentPermissions,
      isLoading: config.isLoading
  }
}

const mapDispatchToProps = {
  getAppConfigs,
  setCurrentPermissions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(MainLayout))