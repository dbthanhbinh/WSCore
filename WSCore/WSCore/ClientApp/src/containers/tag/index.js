import { Component } from "react"
import {unwrapResult} from '@reduxjs/toolkit'
import _ from 'lodash'
import {connect} from 'react-redux'
import eventEmitter from '../../utilities/eventEmitter'
import {flashType} from '../../data/enums'
import {WithFormBehavior} from '../../form'
import TabModel from './tag.model'
import MainLayout from '../../layouts'
import {
    getListTags,
    getTagById,
    createTag,
    deleteTagBy
} from '../../reduxStore/actions/tag.actions'
import {Grid} from 'semantic-ui-react'
import ListItems from './tag.list'
import {actions} from '../../data/enums'
import TagForm from './form'

class Tag extends Component{
    constructor(props){
        super(props)
        this.state = {
            model: props?.model
        }
        this.currentModel = actions.ADD
        this.currentId = null
        this.deleteTagBy = this.deleteTagBy.bind(this)
        this.handleSubmitData = this.handleSubmitData.bind(this)
    }

    async componentDidMount(){
        // get list tag all
        this.getTags()
    }

    async getTags(){
        unwrapResult(await this.props.getListTags({url: 'tags'}))
    }

    async deleteTagBy(tagId){
        await this.props.deleteTagBy({url: `tags/${tagId}`})
       
        eventEmitter.emit('item-actions-notification', {
            title: 'Delete tag!',
            type: flashType.SUCCESS,
            msg: 'Success!'
        })
        // Get refresh tags
        this.getTags()
    }

    // Create Item
    async handleSubmitData(e){
        let {model} = this.state
        e.preventDefault();
        let notify = {
            title: 'Create tag!',
            type: flashType.SUCCESS,
            msg: 'Success!'
        }
        const {error} = unwrapResult(await this.props.createTag({
            url:`tags`,
            body: {
                title: _.get(model, 'title')?.value,
                alias: _.get(model, 'alias')?.value
            }
        }))

        if(error){
            notify.type = flashType.ERROR
            notify.msg = error.msg
        }
        eventEmitter.emit('item-actions-notification', notify)

        // Create Item and Reset model after created item success
        this.props.resetModel(TabModel.init())

        // Get refresh tags
        this.getTags()
    }

    render(){
        let {
            currentTags,
            isFormValid,
            handleChange,
            isLoading,
            customErrorRemain,
            model,
            showFieldError,
            showFieldErrorRemain
        } = this.props

        return(
            <MainLayout>
                <Grid.Row>
                    <Grid columns={1}>
                        <Grid.Column width={5}>
                            <TagForm 
                                isFormValid = {isFormValid}
                                onHandleChange = {handleChange}
                                isLoading = {isLoading}
                                customErrorRemain = {customErrorRemain}
                                model = {model}
                                onShowFieldError = {showFieldError}
                                onShowFieldErrorRemain = {showFieldErrorRemain}
                                onHandleAction = {this.handleSubmitData}
                            />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <ListItems
                                currentTags={currentTags}
                                isLoading={isLoading}
                                currentId={null}
                                onDeleteItemBy = {this.deleteTagBy}
                            />
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    let {tagStore} = state
    return {
        currentTag: tagStore.currentTag,
        currentTags: tagStore.currentTags,
        isLoading: tagStore.isLoading
    }
}

const mapDispatchToProps = {
    getListTags,
    getTagById,
    createTag,
    deleteTagBy
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithFormBehavior(Tag, TabModel.init()))