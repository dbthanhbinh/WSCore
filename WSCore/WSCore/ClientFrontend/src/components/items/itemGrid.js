import React from 'react'
import { Card } from 'semantic-ui-react'
import CardItem from './card'
import {NotFoundItem} from '../../components/notfound/notfound'

const ItemGrid = (props) => (
    <Card.Group itemsPerRow={4}>
        {
            props && props.dataList
            ? props.dataList.map(elm => {
                return <CardItem data={elm} key={elm.id.toString()} />
            })
            : <NotFoundItem />
        }
    </Card.Group>
)

export default ItemGrid