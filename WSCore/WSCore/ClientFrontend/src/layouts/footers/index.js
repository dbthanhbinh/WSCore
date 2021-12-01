import {Container, Grid, List, Image} from 'semantic-ui-react'
function Footer(props){
    return (
      <div className='sec-footer'>
        <Container>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column width={16}>
              <List horizontal>
                <List.Item>
                  <Image avatar src='https://react.semantic-ui.com/images/avatar/small/tom.jpg' />
                  <List.Content>
                    <List.Header>Tom</List.Header>
                    Top Contributor
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Image avatar src='https://react.semantic-ui.com/images/avatar/small/tom.jpg' />
                  <List.Content>
                    <List.Header>Christian Rocha</List.Header>
                    Admin
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Image avatar src='https://react.semantic-ui.com/images/avatar/small/tom.jpg' />
                  <List.Content>
                    <List.Header>Matt</List.Header>
                    Top Rated User
                  </List.Content>
                </List.Item>
              </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
}

export default Footer