import {Container, Grid, Image} from 'semantic-ui-react'
import ShowArticle from '../containers/posts'

function MainLayout() {
    return (
      <div className="app-main">
        <Container>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column width={4}>
                <Image src='/images/wireframe/media-paragraph.png' />
              </Grid.Column>
              <Grid.Column  width={12}>
                <ShowArticle />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
  
  export default MainLayout