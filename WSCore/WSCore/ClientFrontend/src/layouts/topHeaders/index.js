import {Container, Grid} from 'semantic-ui-react'
function TopHeader(props){
    return (
      <div className='sec-topheader'>
        <Container>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column width={16}>
                TOP HEADER ADD ANYTHING HERE OR JUST REMOVE IT....
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
}

export default TopHeader