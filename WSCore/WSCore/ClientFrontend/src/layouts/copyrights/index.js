import {Container, Grid} from 'semantic-ui-react'
function Copyright(props){
    return (
      <div className='sec-copyright'>
        <Container>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column width={16}>
                <p>Copyright 2021 © UX Themes</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
}

export default Copyright