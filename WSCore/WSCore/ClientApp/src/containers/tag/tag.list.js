import {Table, Rating, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const ListItems = (props) => {
    let currentTags = props.currentTags || []
    let currentId = props.currentId || null

    const renderLinkItem = (id) => {
        return (id === currentId) ? <span>Edit</span> : <Link to={`/tag/edit/${id}`}>Edit</Link>
    }

    const renderRemoveItem = (id) => {
        return (id === currentId)
                ? <span><Icon name='remove' /></span>
                : <span onClick={()=>props.onDeleteItemBy(id)}><Icon name='remove' /></span>
    }

    return (
        <Table celled padded>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell singleLine>Title</Table.HeaderCell>
                    <Table.HeaderCell>Alias</Table.HeaderCell>
                    <Table.HeaderCell>IsActive</Table.HeaderCell>
                    <Table.HeaderCell>Consensus</Table.HeaderCell>
                    <Table.HeaderCell>ACTs</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    currentTags && currentTags.length > 0
                    && currentTags.map((item, idx) => {
                        return <Table.Row key={idx}>
                            <Table.Cell>{item.title}</Table.Cell>
                            <Table.Cell singleLine>{item.alias}</Table.Cell>
                            <Table.Cell>
                            <Rating icon='star' defaultRating={3} maxRating={3} />
                            </Table.Cell>
                            <Table.Cell textAlign='right'>
                            80% <br />
                            <a href='#'>18 studies</a>
                            </Table.Cell>
                            <Table.Cell>
                                {renderLinkItem(item.id)}
                                {renderRemoveItem(item.id)}
                                <Icon name='eye' />
                            </Table.Cell>
                        </Table.Row>
                    })
                }
            </Table.Body>
        </Table>
    )
}

export default ListItems