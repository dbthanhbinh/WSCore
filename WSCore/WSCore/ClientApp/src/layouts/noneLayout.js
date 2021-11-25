import React from 'react'
import {Container, Grid} from 'semantic-ui-react'

export const NoneLayout = (props) => {
  return (
    <div className="app-main">
      <Container>
        <Grid columns={1} divided>
          <Grid.Row>
            <Grid.Column width={16}>
              {props.children}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  )
}

export default NoneLayout