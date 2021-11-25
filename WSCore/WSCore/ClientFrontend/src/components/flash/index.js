import React, { Component } from 'react'
import {
  Grid,
  Header,
  Segment,
  TransitionablePortal,
} from 'semantic-ui-react'

export default class TransitionFlash extends Component {
  state = { animation: 'swing up', duration: 500, open: false }
  render() {
    
    console.log('===== test2')
    const { animation, duration, open } = this.state
    return (
      <Grid columns={2}>
        <Grid.Column>
          <TransitionablePortal
            open={open}
            transition={{ animation, duration }}
          >
            <Segment
              style={{
                right: '1%',
                position: 'fixed',
                bottom: '2%',
                zIndex: 1000,
              }}
            >
              <Header>This is a controlled portal</Header>
              <p>Portals have tons of great callback functions to hook into.</p>
              <p>To close, simply click the close button or click away</p>
            </Segment>
          </TransitionablePortal>
        </Grid.Column>
      </Grid>
    )
  }
}