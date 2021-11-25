import { Component } from "react"
import {unwrapResult} from '@reduxjs/toolkit'
import _ from 'lodash'
import {connect} from 'react-redux'
import {Table, Rating, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {objectDefault} from '../../data/enums'

import {
    getListArticles,
    deleteArticleById
} from '../../reduxStore/actions/article.actions'
import Thumbnail from '../../components/thumb'
import {uploadedAssets as uploaded} from '../../data/enums'

class ListItems extends Component{
    constructor(props){
        super(props)
        this.state = {}
        this.posttype = objectDefault.ARTICLE
        this.currentPage = 1
    }

    async componentDidMount(){
        // Get refresh categories
        this.getArticlesByType()
    }

    async getArticlesByType(){
        let type = this.props.match.params.type
        if(type)
            this.posttype = type

        let page = this.props.match.params.page
        if(page)
            this.currentPage = page
        unwrapResult(await this.props.getListArticles({
            url: `articles/${this.posttype}/${this.currentPage}`
        }))
    }

    async deleteArticleById(articleId){
        await this.props.deleteArticleById({url: `articles/${articleId}`})

        // Get refresh categories
        this.getArticlesByType(this.posttype)
    }

    renderLinkItem = (id) => {
        return <Link to={`/articles/edit/${id}`}>Edit</Link>
    }

    renderRemoveItem = (id) => {
        return <span onClick={()=>this.deleteArticleById(id)}><Icon name='remove' /></span>
    }

    renderThumbnail = (item) => {
        return item && item.small ? <Thumbnail src={`${uploaded}/${item.small}`} /> : ''
    }

    render(){
        let {currentArticles} = this.props
        let currentItems = currentArticles?.data
        return (
            <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Image</Table.HeaderCell>
                        <Table.HeaderCell singleLine>Title</Table.HeaderCell>
                        <Table.HeaderCell>Alias</Table.HeaderCell>
                        <Table.HeaderCell>Category</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        currentItems && currentItems.length > 0
                        && currentItems.map((item, idx) => {
                            return <Table.Row key={idx}>
                                <Table.Cell> {this.renderThumbnail(item.media)} </Table.Cell>    
                                <Table.Cell>{item.title}</Table.Cell>
                                <Table.Cell singleLine>{item.alias}</Table.Cell>
                                <Table.Cell>
                                    {item.categoryId}
                                </Table.Cell>
                                <Table.Cell>
                                    {this.renderLinkItem(item.id)}
                                    {this.renderRemoveItem(item.id)}
                                    <Icon name='eye' />
                                </Table.Cell>
                            </Table.Row>
                        })
                    }
                </Table.Body>
            </Table>
        )
    }
}

const mapStateToProps = (state) => {
    let {article} = state
    return {
        currentArticles: article.currentArticles,
        isLoading: article.isLoading
    }
}

const mapDispatchToProps = {
    getListArticles,
    deleteArticleById
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListItems)