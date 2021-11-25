import {Container, Grid} from 'semantic-ui-react'
function Copyright(props){
    return (
        <Container>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column width={16}>
                <p>Copyright @ 2021</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    )
}

export default Copyright