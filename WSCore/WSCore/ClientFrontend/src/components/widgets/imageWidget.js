import { Fragment } from 'react'
import {Card} from 'semantic-ui-react'

// Galleyry
const ImageItems = [
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
    }
]

function ImageWidget(){
    return (
        <Fragment>
            <Card.Group itemsPerRow={1}>
                {
                    ImageItems && ImageItems.length > 0 && ImageItems.map(elm => {
                        return elm && elm.thumb && <Card key={`${elm.id.toString()}`} image={`${elm.thumb}`} />
                    })
                }
            </Card.Group>
        </Fragment>
    )
}

export default ImageWidget