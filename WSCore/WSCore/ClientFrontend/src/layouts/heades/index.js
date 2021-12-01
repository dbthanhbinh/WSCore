import {Container, Grid} from 'semantic-ui-react'
function Header(props){
    return (
      <div className='sec-header'>
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
      </div>
    )
}

export default Header