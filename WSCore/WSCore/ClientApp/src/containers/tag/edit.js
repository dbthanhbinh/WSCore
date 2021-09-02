import { Component } from "react"
import {unwrapResult} from '@reduxjs/toolkit'
import _ from 'lodash'
import {connect} from 'react-redux'
import {WithFormBehavior} from '../../form'
import TabModel from './tag.model'
import {
    getListTags,
    getTagById,
    updateTag,
    deleteTagBy,
    setCurrentTags
} from '../../reduxStore/actions/tag.actions'
import {Container, Grid} from 'semantic-ui-react'
import ListItems from './tag.list'
import {actions} from '../../data/enums'
import TagForm from './form'
import { initModel} from '../../form/common'
import MainLayout from '../../layouts'

class Tag extends Component{
    constructor(props){
        super(props)
        this.state = {
            model: props?.model
        }
        this.currentModel = actions.EDIT
        this.currentId = null
        this.deleteTagBy = this.deleteTagBy.bind(this)
        this.handleUpdateData = this.handleUpdateData.bind(this)
    }

    async componentDidMount(){
        // get list tag all
        this.getTags()

        let id = this.props.match.params.id
        if(!id) return
        // fetch data
        await this.getTagById(this.props.match.params.id)
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            // fetch data
            await this.getTagById(this.props.match.params.id)
        }
    }

    async getTags(){
        unwrapResult(await this.props.getListTags({url: 'tags'}))
    }

    async getTagById(tagId){
        // fetch data
        let id = tagId
        if(!id) return

        this.currentModel = actions.EDIT
        this.currentId = id
        let {error, result} = unwrapResult(await this.props.getTagById({url: `getByid/${id}`}))
        if(error) return
        
        if(result){
            let res = result
            Object.keys(this.state.model).forEach((key) => {
                this.state.model[key].value = (res && res[key]) ? res[key] : ""
            })
            // Re-Initi validate Model
            let {reValidModel} = this.props
            reValidModel(this.state.model, true)
            this.setState({model: this.state.model})
        }
    }

    async deleteTagBy(tagId){
        unwrapResult(await this.props.deleteTagBy({url: `tags/${tagId}`}))
        // if(error) return

        // Get refresh tags
        this.getTags()
    }

    updateItemInList(currentList, newItem, id){
        let newList = _.clone(currentList)
        if(newItem && id && newList?.length > 0){
            let idx = _.findIndex(newList, el => el.id === id)
            if(idx >= 0){
                newList[idx] = newItem
            }
        }
        return newList
    }

    async handleUpdateData(e){
        e.preventDefault();
        let { model, isFormValid } = initModel(this.state.model, true)
        if(isFormValid){
            let payload = {
                url:`tags/${this.currentId}`,
                body: {
                    title: _.get(model, 'title')?.value,
                    alias: _.get(model, 'alias')?.value
                }
            }
            let {error, result} = unwrapResult(await this.props.updateTag(payload))
            if(error) return

            if(result){
                let {currentTags} = this.props
                let res = result?.tag
                let newItems = this.updateItemInList(currentTags, res, this.currentId)
                this.props.setCurrentTags(newItems)
            }
        }
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

        console.log('=====: ', this.props)

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
                                onHandleAction = {this.handleUpdateData}
                            />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <ListItems
                                currentTags={currentTags}
                                isLoading={isLoading}
                                currentId={this.currentId}
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
    let {tag} = state
    return {
        currentTag: tag.currentTag,
        currentTags: tag.currentTags,
        isLoading: tag.isLoading
    }
}

const mapDispatchToProps = {
    getListTags,
    getTagById,
    updateTag,
    deleteTagBy,
    setCurrentTags
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithFormBehavior(Tag, TabModel))