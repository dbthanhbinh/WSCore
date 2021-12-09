import React, { Component } from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {getAppConfigs, setCurrentPermissions} from '../reduxStore/actions/config.actions'
import {cookiesDefault, layouts} from '../data/enums'
import { withCookies } from 'react-cookie'

import TopHeader from './topHeaders'
import Header from './heades'
import PrimaryMenu from './menus'
import Footer from './footers'
import Copyright from './copyrights'

import FullWidth from './fullWidth'
import LeftLayout from './leftLayout'
import RightLayout from './rightLayout'
import LeftRightLayout from './leftRightLayout'
import LeftSidebar from './sidebars/leftSidebar'
import RightSidebar from './sidebars/rightSidebar'

// Data
import {globalConfigs} from '../data/index'

class MainLayout extends Component {
  constructor(props){
    super(props)
    this.state = {}
    this.handleLoggedout = this.handleLoggedout.bind(this)
    this.layout = _.get(globalConfigs, 'layout.layout')
    this.enable = _.get(globalConfigs, 'layout')
    this.initLayout()
  }

  initLayout(){
    if(this.layout){
      this.layout = layouts.RIGHT_SB
      switch(this.layout){
        case layouts.FULL:
          this.layoutComponent = <FullWidth />
          break
        case layouts.LEFT_SB:
          this.layoutComponent = <LeftLayout
              leftsidebar = {<LeftSidebar />}
              mainbody = {this.props.children}
            />
          break
        case layouts.RIGHT_SB:
          this.layoutComponent = <RightLayout
              rightsidebar = {<RightSidebar />}
              mainbody = {this.props.children}
            />
          break
        case layouts.LEFT_RIGHT_SB:
          this.layoutComponent = <LeftRightLayout
            leftsidebar = {<LeftSidebar />}
            rightsidebar = {<RightSidebar />}
            mainbody = {this.props.children}
          />
          break
        default:
          this.layoutComponent = <FullWidth mainbody = {this.props.children}/>
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
        {/* TopHeader */}
        {this.enable.enableTopHeader && <TopHeader />}
        {/* Header */}
        {this.enable.enableHeader && <Header />}

        {/* Menu */}
        {this.enable.enableMenu && <PrimaryMenu />}

        {/* Main body */}
        {this.layoutComponent}

        {/* Footer */}
        {this.enable.enableFooter && <Footer />}

        {/* Copyright */}
        {this.enable.enableCopyright && <Copyright />}

        <div id="fb-root"></div>
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