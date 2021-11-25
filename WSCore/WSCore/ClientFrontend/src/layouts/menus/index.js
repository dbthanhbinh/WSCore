import {Container, Grid} from 'semantic-ui-react'
function Menu(props){
    return (
        <Container>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column width={16}>
                Menu
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    )
}

export default Menu