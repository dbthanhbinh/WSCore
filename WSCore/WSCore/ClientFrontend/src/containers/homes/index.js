import MainLayout from '../../layouts'
import {Container, Grid, Image} from 'semantic-ui-react'
import ItemList from '../../components/items/itemList'
import ItemCard from '../../components/items/itemCard'
function Home() {
    return (
        <MainLayout>
            <Container>
                <Grid columns={1}>
                    <Grid.Row>
                    <Grid.Column width={16}>
                        {/* This is a Home page */}
                        {/* <ItemList /> */}
                        <ItemCard />
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </MainLayout>
    )
}

export default Home