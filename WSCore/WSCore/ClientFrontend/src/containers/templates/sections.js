import { Fragment } from 'react'
import {Item, Image, Card, Grid, List, Button} from 'semantic-ui-react'
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
const popularItems2 = [
    {
        id: 1,
        slug: 'first-article-01',
        name: 'First article 01',
        excerpt: 'This is a summary description, which explan why this is Excerpt for this article This is a summary description, which explan why this is Excerpt for this article This is a summary description, which explan why this is Excerpt for this article',
        thumb: 'https://react.semantic-ui.com/images/wireframe/image.png'
    },
    {
        id: 2,
        slug: 'first-article-01',
        name: 'First article 01',
        excerpt: 'This is a summary description, which explan why this is Excerpt for this article This is a summary description, which explan why this is Excerpt for this article This is a summary description, which explan why this is Excerpt for this article',
        thumb: 'https://react.semantic-ui.com/images/wireframe/image.png'
    },
    {
        id: 3,
        slug: 'first-article-01',
        name: 'First article 01',
        excerpt: 'This is a summary description, which explan why this is Excerpt for this article This is a summary description, which explan why this is Excerpt for this article This is a summary description, which explan why this is Excerpt for this article',
        thumb: 'https://react.semantic-ui.com/images/wireframe/media-paragraph.png'
    },
    {
        id: 4,
        slug: 'first-article-01',
        name: 'First article 01',
        excerpt: 'This is a summary description, which explan why this is Excerpt for this article This is a summary description, which explan why this is Excerpt for this article This is a summary description, which explan why this is Excerpt for this article',
        thumb: 'https://react.semantic-ui.com/images/wireframe/media-paragraph.png'
    }
]

export const PopularSection = (props) => {
    return (
        <Fragment>
            <Grid.Row className='section-container service-section'>
                <Grid columns={16}>
                    <Grid.Row className='section-header'>
                        <Grid.Column width={16}>
                            <h2>Header section</h2>
                            <div className='description'>
                                <p>This is a summary description, which explan why this is Excerpt for this article This is a summary description, which explan why this is Excerpt for this article This is a summary description, which explan why this is Excerpt for this article</p>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className='section-content'>
                        <Grid.Column width={16}>
                            <Card.Group itemsPerRow={3}>
                                {
                                    popularItems && popularItems.length > 0 && popularItems.map(elm => {
                                        return <PCard key={elm.id.toString()} data={elm}/>
                                    })
                                }
                            </Card.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Row>
        </Fragment>
    )
}

export const ServiceSection = (props) => {
    return (
        <Fragment>
            <Grid.Row className='section-container service-section'>
                <Grid columns={2}>
                    
                    <Grid.Column width={8}>
                        <Grid.Row className='section-header'>
                            <Grid.Column width={16}>
                                <h2>Service section</h2>
                                <div className='description'>
                                    <p>This is a summary description, which explan why</p>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className='section-content'>
                            <Card.Group itemsPerRow={2}>
                                {
                                    popularItems2 && popularItems2.length > 0 && popularItems2.map(elm => {
                                        return <PCard key={elm.id.toString()} data={elm}/>
                                    })
                                }
                            </Card.Group>
                        </Grid.Row>
                    </Grid.Column>

                    <Grid.Column width={8}>
                        <Image src='http://khoangiengxuankhiem.com/wp-content/uploads/2021/11/257286562_1384322078651329_8998192198352236528_n.jpg' />
                    </Grid.Column>
                </Grid>
            </Grid.Row>
        </Fragment>
    )
}

export const CategorySection = (props) => {
    return (
        <Fragment>
            <Grid.Row className='section-container  service-section'>
                <Grid.Row className='section-header'>
                    <Grid.Column width={16}>
                        <h2>Service section</h2>
                        <div className='description'>
                            <p>This is a summary description, which explan why</p>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid columns={3}>
                    <Grid.Column width={5}>
                        <Grid.Row className='section-content'>
                            <Card.Group itemsPerRow={2}>
                                {
                                    popularItems2 && popularItems2.length > 0 && popularItems2.map(elm => {
                                        return <PCard key={elm.id.toString()} data={elm}/>
                                    })
                                }
                            </Card.Group>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Image src='http://khoangiengxuankhiem.com/wp-content/uploads/2021/11/big_banner-1.jpg' />
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Grid.Row className='section-content'>
                            <Card.Group itemsPerRow={2}>
                                {
                                    popularItems2 && popularItems2.length > 0 && popularItems2.map(elm => {
                                        return <PCard key={elm.id.toString()} data={elm}/>
                                    })
                                }
                            </Card.Group>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </Grid.Row>
        </Fragment>
    )
}

export const BigBannerSection = (props) => {
    return (
        <Fragment>
            <Grid.Row className='section-container service-section'>
                <Grid.Row className='section-big-banner'>
                    <Grid.Column width={16}>
                        <Image
                            as='a'
                            href='https://google.com'
                            src='http://khoangiengxuankhiem.com/wp-content/uploads/2021/11/slide1.png' />
                    </Grid.Column>
                </Grid.Row>
            </Grid.Row>
        </Fragment>
    )
}

export const CustomSection = (props) => {
    return (
        <Fragment>
            <Grid.Row className='section-container service-section'>
                <Grid columns={2}>
                    <Grid.Column width={8}>
                        <Grid.Row className='section-header'>
                            <Grid.Column width={16}>
                                <h2>Service section</h2>
                                <div className='description'>
                                    <p>This is a summary description, which explan why</p>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Grid.Row className='section-header'>
                            <Grid.Column width={16}>
                                <div className='description'>
                                    <p>This is a summary description, which explan why</p>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className='section-content'>
                            <List>
                                <List.Item icon='users' content='Semantic UI' />
                                <List.Item icon='marker' content='New York, NY' />
                                <List.Item
                                icon='mail'
                                content={<a href='mailto:jack@semantic-ui.com'>jack@semantic-ui.com</a>}
                                />
                                <List.Item
                                icon='linkify'
                                content={<a href='http://www.semantic-ui.com'>semantic-ui.com</a>}
                                />
                            </List>
                            <Button
                            color='red'
                            content='Like'
                            icon='heart'
                            label={{ basic: true, color: 'red', pointing: 'left', content: '2,048' }}
                            />
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </Grid.Row>
        </Fragment>
    )
}