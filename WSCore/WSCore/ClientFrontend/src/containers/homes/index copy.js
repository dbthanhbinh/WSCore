import MainLayout from '../../layouts'
import {Container, Grid, Image} from 'semantic-ui-react'
import ItemList from '../../components/items/itemList'
import ItemGrid from '../../components/items/itemGrid'
import {Items} from '../../data/items'

function Home() {
    return (
        <MainLayout>
            <Container>
                <Grid columns={1}>
                    <Grid.Row>
                    <Grid.Column width={16}>
                        <div className='template-content'>
                            <ItemGrid dataList={Items} />
                        </div>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </MainLayout>
    )
}

export default Home