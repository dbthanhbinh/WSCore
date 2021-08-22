import MainLayout from '../../layouts'
import ListItems from "./listItems"
const Article = (props) => {
    return(
        <MainLayout>
            <ListItems {...props}/>
        </MainLayout>
    )
}
export default Article