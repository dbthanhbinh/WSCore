import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { truncateExcerpt } from '../../utilities/untils'

const CardItem = (props) => (
    <Card>
        <Image src={props.data.thumb} wrapped ui={false} />
        <Card.Content>
            <Card.Header><Link to={`../${props.data.slug}`}>{props.data.name}</Link></Card.Header>
            <Card.Meta>Joined in 2016</Card.Meta>
            <Card.Description>
                {truncateExcerpt(props.data.excerpt, 50, '...')}
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