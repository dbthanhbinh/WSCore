import React from 'react'
import { Image, Item, Card, List, Icon } from 'semantic-ui-react'

const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

export const PCard = (props) => (
    <Card>
        <Image src={props.data.thumb} wrapped ui={false} />
        <Card.Content>
            <Card.Header>{props.data.name}</Card.Header>
            <Card.Meta>Joined in 2016</Card.Meta>
            <Card.Description>
                {props.data.excerpt}
            </Card.Description>
        </Card.Content>

        <Card.Content extra>
            <span>
                <Icon name='user' />
                10 Friends
            </span>
        </Card.Content>
    </Card>
)

export const PList = (props) => (
    <Item>
        <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
        <Item.Content>
            <Item.Header as='a'>12 Years a Slave</Item.Header>
            <Item.Meta>
            <span className='cinema'>Union Square 14</span>
            </Item.Meta>
            <Item.Description>{paragraph}</Item.Description>
        </Item.Content>
    </Item>
)

export const PLink = (props) => (
    <List.Item as='a'>{props.data.name}</List.Item>
)