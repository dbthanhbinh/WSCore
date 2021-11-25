import MainLayout from '../../layouts'
import ListItems from "./listItems"
import {Grid} from 'semantic-ui-react'

const Article = (props) => {
    return(
        <MainLayout>
            <Grid.Column  width={16}>
                <ListItems {...props}/>
            </Grid.Column>
        </MainLayout>
    )
}
export default Article