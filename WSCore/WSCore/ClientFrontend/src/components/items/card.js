import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'

const CardItem = (props) => (
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

export default CardItem