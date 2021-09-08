import { Component } from "react"
import {unwrapResult} from '@reduxjs/toolkit'
import _ from 'lodash'
import {connect} from 'react-redux'
import {Table, Rating, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {objectDefault} from '../../data/enums'

import {
    getListUsers,
    deleteUserById
} from '../../reduxStore/actions/member.actions'
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
        this.getUsersByType()
    }

    async getUsersByType(){
        unwrapResult(await this.props.getListUsers({
            url: `users`
        }))
    }

    async deleteUserById(itemId){
        await this.props.deleteUserById({url: `users/${itemId}`})

        // Get refresh categories
        this.getUsersByType(this.posttype)
    }

    renderLinkItem = (id) => {
        return <Link to={`/users/edit/${id}`}>Edit</Link>
    }

    renderRemoveItem = (id) => {
        return <span onClick={()=>this.deleteUserById(id)}><Icon name='remove' /></span>
    }

    renderThumbnail = (item) => {
        return item && item.small ? <Thumbnail src={`${uploaded}/${item.small}`} /> : ''
    }

    render(){
        let {currentUsers} = this.props
        let currentItems = currentUsers
        
        return (
            <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Image</Table.HeaderCell>
                        <Table.HeaderCell singleLine>Title</Table.HeaderCell>
                        <Table.HeaderCell>Alias</Table.HeaderCell>
                        <Table.HeaderCell>IsActive</Table.HeaderCell>
                        <Table.HeaderCell>Consensus</Table.HeaderCell>
                        <Table.HeaderCell>ACTs</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        currentItems && currentItems.length > 0
                        && currentItems.map((item, idx) => {
                            return <Table.Row key={idx}>
                                <Table.Cell> {this.renderThumbnail(item.media)} </Table.Cell>    
                                <Table.Cell>{item.phone}</Table.Cell>
                                <Table.Cell singleLine>{item.alias}</Table.Cell>
                                <Table.Cell>
                                <Rating icon='star' defaultRating={3} maxRating={3} />
                                </Table.Cell>
                                <Table.Cell textAlign='right'>
                                80% <br />
                                <a href='#'>18 studies</a>
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
    let {user} = state
    return {
        currentUsers: user.currentUsers,
        isLoading: user.isLoading
    }
}

const mapDispatchToProps = {
    getListUsers,
    deleteUserById
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListItems)