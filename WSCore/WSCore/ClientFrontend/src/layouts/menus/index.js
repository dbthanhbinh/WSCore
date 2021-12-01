import {Container, Grid, Menu, Segment} from 'semantic-ui-react'
function PrimaryMenu(props){
  const activeItem = null
  return (
    <div className='sec-menu'>
      <Container>
        <Grid columns={1}>
          <Grid.Row>
            <Grid.Column width={16}>
              <Menu inverted secondary>
                <Menu.Item
                  name='home'
                  active={activeItem === 'home'}
                />
                <Menu.Item
                  name='messages'
                  active={activeItem === 'messages'}
                />
                <Menu.Item
                  name='friends'
                  active={activeItem === 'friends'}
                />
              </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  )
}

export default PrimaryMenu