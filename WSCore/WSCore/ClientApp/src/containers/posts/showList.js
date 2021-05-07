import { Table } from 'semantic-ui-react'
import {currencyFormat} from '../../utilities/untils'

const rowItems = (listItem, currentProviders, currentTypes) => {
    return listItem && listItem.map((item, i) => {
        return <Table.Row key={item.id}>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{currentProviders[item.typeId]?.['name']}</Table.Cell>
            <Table.Cell>{item.price && currencyFormat(item.price, 1)}</Table.Cell>
            <Table.Cell>{currentTypes[item.providerId]?.['name']}</Table.Cell>
            <Table.Cell>Buy</Table.Cell>
        </Table.Row>
    })
}

function ShowList(props){
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>STT</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>provider</Table.HeaderCell>
                    <Table.HeaderCell>Buy</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {rowItems(props.listItem, props.currentProviders, props.currentTypes)}
            </Table.Body>
        </Table>
    )  
}

export default ShowList