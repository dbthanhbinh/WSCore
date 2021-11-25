import React, { Component } from 'react'
import _ from 'lodash'
import eventEmitter from '../utilities/eventEmitter'
import {Container, Grid} from 'semantic-ui-react'
import {connect} from 'react-redux'
import { Link } from "react-router-dom"
import {getAppConfigs, setCurrentPermissions} from '../reduxStore/actions/config.actions'
import {cookiesDefault} from '../data/enums'
import { withCookies } from 'react-cookie'
import TransitionFlash from '../components/flash'

class MainLayout extends Component {
  constructor(props){
    super(props)
    this.state = {}
    this.isTransitionFlash = false
    this.handleLoggedout = this.handleLoggedout.bind(this)
    this.transitionFlash = this.transitionFlash.bind(this)
  }

  async componentDidMount(){
    this.props.setCurrentPermissions({})

    // Notification when add item success
    eventEmitter.on('item-actions-notification', this.transitionFlash)
  }

  componentWillUnmount(){
    // Notification when add item success
    eventEmitter.removeListener('item-actions-notification', this.transitionFlash)
  }

  transitionFlash(objData) {
    if(objData) {
      let hasTransitionFlash = _.has(objData, 'isTransitionFlash')
      if(hasTransitionFlash) {
        this.isTransitionFlash = objData.isTransitionFlash
      }
    }
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
        <Container>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column width={16}>
                Header |
                 <span onClick={this.handleLoggedout}>Logout</span>
              </Grid.Column>
            </Grid.Row>
          </Grid>
              
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
        </Container>
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