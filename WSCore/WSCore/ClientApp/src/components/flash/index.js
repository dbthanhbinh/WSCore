import React, { Component } from 'react'
import {Step, Icon} from 'semantic-ui-react'
import eventEmitter from '../../utilities/eventEmitter'

import {
  Grid,
  TransitionablePortal,
} from 'semantic-ui-react'
import { actions, flashType } from '../../data/enums'

export default class TransitionFlash extends Component {
  constructor(props){
    super(props)
    this.state = { 
      animation: 'swing up',
      duration: 100,
      open: false,
      title: null,
      type: null,
      msg: null
    }
    this.transitionFlash = this.transitionFlash.bind(this)
  }

  componentDidMount(){
    // Notification when add item success
    eventEmitter.on('item-actions-notification', this.transitionFlash)
  }

  componentWillUnmount(){
    // Notification when add item success
    eventEmitter.removeListener('item-actions-notification', this.transitionFlash)
  }

  /**
   * 
   * @param {
   *    type: SUCCESS/ERROR,
   *    msg: ''
   * } objData 
   */
  
  transitionFlash(objData) {
    if(objData) {
      this.setState({
        open: true,
        title: objData.title,
        type: objData.type,
        msg: objData.msg
      })
      setTimeout(function(){
        this.setState({
          open: false,
          title: null,
          type: null,
          msg: null
        })
      }.bind(this), 5000)
    }
  }

  popupTemplate(type, title, msg){
    switch(type){
      case flashType.SUCCESS:
        return this.successTemplate(title, msg)
      case flashType.ERROR:
        return this.warningTemplate(title, msg)
      default:
        return this.warningTemplate(title, msg)
    }
  }

  successTemplate(title, msg){
    return <Step completed style={{
      background: '#a9d5de',
      padding: '10px'
    }}>
      <Icon name='truck' />
      <Step.Content>
        { title && <Step.Title>{title}</Step.Title> }
        <Step.Description>{msg}</Step.Description>
      </Step.Content>
    </Step>
  }

  warningTemplate(title, msg){
    return <Step style={{
      background: '#e0b4b4',
      padding: '10px',
      color: 'red'
    }}>
      <Icon name='info' />
      <Step.Content>
        { title && <Step.Title>{title}</Step.Title> }
        <Step.Description>{msg}</Step.Description>
      </Step.Content>
    </Step>
  }

  render() {
    const { animation, duration, open, msg, type, title } = this.state
    return open ? <Grid columns={2}>
        <Grid.Column>
          <TransitionablePortal
            open={open}
            transition={{ animation, duration }}
          >
            <Step.Group style={{
              right: '1%',
              position: 'fixed',
              bottom: '2%',
              zIndex: 1000
            }}>
              {
                this.popupTemplate(type, title, msg)
              }
            </Step.Group>
          </TransitionablePortal>
        </Grid.Column>
      </Grid>
    : '' 
  }
}