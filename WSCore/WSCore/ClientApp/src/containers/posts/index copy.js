import { unwrapResult } from '@reduxjs/toolkit'
import { Component } from 'react'
import { Icon, Table } from 'semantic-ui-react'
import { connect } from 'react-redux'

import {getListArticles,setCurrentArticles} from '../../reduxStore/actions/article.actions'
import {
    getProviders, setCurrentProviders,
    getTypes, setCurrentTypes
} from '../../reduxStore/contents/content.actions'
import {initReduceIdName} from '../../commons'
import {currencyFormat} from '../../utilities/untils'

class ShowArticle extends Component {
    constructor(props){
        super(props)

        this.currentProviders = []
        this.currentTypes = []
        this.state = {}
    }

    async componentDidMount() {
        // For article
        // const { error, result } = unwrapResult(await this.props.getListArticles())
        let result = await this.props.getListArticles()
        if(result){
            this.props.setCurrentArticles(result.payload)
        }

        // For Providers
        let providers = await this.props.getProviders()
        if(providers){
            this.props.setCurrentProviders(providers.payload)
        }

        // For Types
        let types = await this.props.getTypes()
        if(types){
            this.props.setCurrentTypes(types.payload)
        }
    }
    
    render(){
        const {currentArticles, currentProviders, currentTypes} = this.props
        console.log('=====5');
        this.currentProviders = initReduceIdName(currentProviders || [], 'id', ['name', 'slug', 'thumb'])
        this.currentTypes = initReduceIdName(currentTypes || [], 'id', ['name'])

        const listItem = currentArticles
        let rowItem = listItem && listItem.map((item, i) => {
            return <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{this.currentProviders[item.typeId]?.['name']}</Table.Cell>
                <Table.Cell>{item.price && currencyFormat(item.price, 1)}</Table.Cell>
                <Table.Cell>{this.currentTypes[item.providerId]?.['name']}</Table.Cell>
                <Table.Cell>Buy</Table.Cell>
            </Table.Row>
        })
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
                    {rowItem}
                </Table.Body>
            </Table>
        )
    }    
}

const mapStateToProps = (state) => {
    const {article, content} = state
    return {
        currentArticles: article.currentArticles,
        currentProviders: content.currentProviders,
        currentTypes: content.currentTypes
    }
}
  
const mapDispatchToProps = {
    getListArticles,
    setCurrentArticles,
    getProviders,
    setCurrentProviders,
    getTypes,
    setCurrentTypes
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowArticle)