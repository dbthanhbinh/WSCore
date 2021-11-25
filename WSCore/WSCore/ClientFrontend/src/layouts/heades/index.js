import {Container, Grid} from 'semantic-ui-react'
function Header(props){
    return (
        <Container>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column width={16}>
                Header |
                 <span>Logout</span>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    )
}

export default Header