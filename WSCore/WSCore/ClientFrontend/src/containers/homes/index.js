import MainLayout from '../../layouts'
import {Container, Grid} from 'semantic-ui-react'
function Home() {
    return (
        <MainLayout>
            <Container>
                <Grid columns={1}>
                    <Grid.Row>
                    <Grid.Column width={16}>
                        <div>Home page fdsf</div>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </MainLayout>
    )
}

export default Home