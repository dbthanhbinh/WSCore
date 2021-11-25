import {Container, Grid} from 'semantic-ui-react'
function Footer(props){
    return (
        <Container>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column width={16}>
                Footer
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    )
}

export default Footer