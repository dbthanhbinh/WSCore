import { Fragment } from 'react'
import {Item, Image, Card} from 'semantic-ui-react'
import {PCard, PLink, PList} from './pItem'

// PopularWidget
const popularItems = [
    {
        id: 1,
        slug: 'first-article-01',
        name: 'First article 01',
        excerpt: 'This is a summary description, which explan why this is Excerpt for this article This is a summary description, which explan why this is Excerpt for this article This is a summary description, which explan why this is Excerpt for this article',
        thumb: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
    },
    {
        id: 2,
        slug: 'first-article-01',
        name: 'First article 01',
        excerpt: 'This is a summary description, which explan why this is Excerpt for this article This is a summary description, which explan why this is Excerpt for this article This is a summary description, which explan why this is Excerpt for this article',
        thumb: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
    },
    {
        id: 3,
        slug: 'first-article-01',
        name: 'First article 01',
        excerpt: 'This is a summary description, which explan why this is Excerpt for this article This is a summary description, which explan why this is Excerpt for this article This is a summary description, which explan why this is Excerpt for this article',
        thumb: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
    }
]

function PopularSection(){
    return (
        <Fragment>
            <Item.Group divided>
                <Item.Header><h3>Header</h3></Item.Header>
                    {
                        popularItems && popularItems.length > 0 && popularItems.map(elm => {
                            return <PList key={elm.id.toString()} data={elm}/>
                        })
                    }
            </Item.Group>
        </Fragment>
    )
}

export default PopularSection