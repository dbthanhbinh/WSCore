import React, {Component} from 'react'
import {unwrapResult} from '@reduxjs/toolkit'
import _ from 'lodash'
import {connect} from 'react-redux'
import {Grid, Form, Button} from 'semantic-ui-react'
import eventEmitter from '../../utilities/eventEmitter'
import {flashType} from '../../data/enums'
import {WithFormBehavior} from '../../form'
import {controlled, actions, objectDefault} from '../../data/enums'
import ArticleModel from './article.model'
import ArticleForm from './form'
import { ImageUpload } from '../../components/ImageUpload'
import MultipleSelected from '../../components/selected/multiple.selected'
import SingleSelected from '../../components/selected/single.selected'
import MainLayout from '../../layouts'
import {
    createArticle,
    updateArticle
} from '../../reduxStore/actions/article.actions'

import {
    getListCategories
} from '../../reduxStore/actions/category.actions'

import {
    getListTags,
    createTag
} from '../../reduxStore/actions/tag.actions'

import {
    getListObjectTags
} from '../../reduxStore/actions/objecttag.actions'

class AddArticle extends Component {
    constructor(props){
        super(props)
        this.state = {
            model: props?.model,
            currentTagList: [],
            currentCategoryList: []
        }
        this.currentModel = actions.ADD
        this.posttype = objectDefault.ARTICLE
        this.currentId = null
        this.handleCreateArticle = this.handleCreateArticle.bind(this)
        this.handleChangeSingleSelected = this.handleChangeSingleSelected.bind(this)
        this.handleChangeMultipleSelected = this.handleChangeMultipleSelected.bind(this)
    }

    async componentDidMount(){
        // get list category all
        let categories = await this.getListCategories()
        let tags = await this.getListTags()
        this.setState({
            currentTagList: tags || [],
            currentCategoryList: categories || []
        })
    }

    async getListCategories(){
        let type = this.props.match.params.type
        if(type)
            this.posttype = type

        let {error, result} = unwrapResult(await this.props.getListCategories({url: `${controlled.CATEGORIES}/${this.posttype}`}))
        if(error) return false

        if(result && result.length > 0){
            return this.buildOptions(result)
        } else {
            return false
        }
    }

    async getListTags(){
        let {error, result} = unwrapResult(await this.props.getListTags({url: 'tags'}))
        if(error) return false

        if(result && result.length > 0){
            return this.buildOptions(result)
        } else {
            return false
        }
    }
    
    async handleCreateArticle(e){
        let {model} = this.state
        e.preventDefault();

        let notify = {
            title: 'Create article!',
            type: flashType.SUCCESS,
            msg: 'Success!'
        }
        let {error, result } = unwrapResult(await this.props.createArticle({
            url: `${controlled.ARTICLES}`,
            body: {
                title: _.get(model, 'title')?.value,
                alias: _.get(model, 'alias')?.value,
                excerpt: _.get(model, 'excerpt')?.value,
                content: _.get(model, 'content')?.value,
                seoTitle: _.get(model, 'seoTitle')?.value,
                seoContent: _.get(model, 'seoContent')?.value,
                seoKeyWord: _.get(model, 'seoKeyWord')?.value,
                categoryId: _.get(model, 'categoryId')?.value,
                tagIds: _.get(model, 'tagIds')?.value,
                file: _.get(model, 'file')?.value,
                type: this.posttype,
                parentId: ''
            }
        }))
        if(error){
            notify.type = flashType.ERROR
            notify.msg = error.msg
            eventEmitter.emit('item-actions-notification', notify)
            return false
        }
        

        if(result){
            eventEmitter.emit('item-actions-notification', notify)
            setTimeout(function(){
                this.props.history.push(`/${controlled.ARTICLES}/edit/${result?.article?.id}`);
            }.bind(this), 4000)
        }
    }

    handleChangeSingleSelected(e, data){
        this.props.handleDropdownChange('categoryId', data)
    }

    handleChangeMultipleSelected(e, data){
        this.props.handleDropdownChange('tagIds', data)
    }

    buildOptions = (currentList = []) => {
        let options = []
        if(currentList.length < 1) return options
        currentList.forEach(item => {
            options.push(
                { key: item.id.toString(), text: item.title, value: item.id.toString() }
            )
        })
        return options
    }

    render(){
        let {model, currentCategoryList, currentTagList} = this.state
        let {
            showFieldError,
            showFieldErrorRemain,
            handleChange,
            isLoading,
            isFormValid
        } = this.props

        return(
            <MainLayout>
                <Grid.Row>
                    <Grid columns={1} divided>
                        <Grid.Column width={11}>
                            <ArticleForm
                                handleChange = {handleChange}
                                currentItem = {null}
                                model = {model}
                                isLoading = {isLoading}
                                isFormValid = {isFormValid}
                                actions = {actions.EDIT}
                                onShowFieldError = { showFieldError }
                                onShowFieldErrorRemain = { showFieldErrorRemain }
                            />
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Form>
                                <Form.Field>
                                    <ImageUpload
                                        handleChange = {handleChange}
                                        currentImg = {null}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Select Category</label>
                                    {
                                        <SingleSelected
                                            currentValue={null}
                                            options={currentCategoryList}
                                            onHandleChange={this.handleChangeSingleSelected}
                                        />
                                    }
                                </Form.Field>
                                <Form.Field>
                                    <label>Select tags</label>
                                    {
                                        <MultipleSelected
                                            currentValues={null}
                                            options={currentTagList}
                                            onHandleChange={this.handleChangeMultipleSelected}
                                            handleAddition={this.handleAddition}
                                        />
                                    }
                                </Form.Field>
                                <Form.Field>
                                    <Button
                                        disabled={!isFormValid || !!isLoading}
                                        loading={!!isLoading}
                                        onClick={isFormValid ? this.handleCreateArticle : null}
                                        type='submit'>Save changed</Button>
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    let {tagStore, categoryStore, articleStore, objecttagStore} = state
    return {
        currentCategories: categoryStore.currentCategories,
        currentTags: tagStore.currentTags,
        currentObjectTags: objecttagStore.currentObjectTags,
        isLoading: articleStore.isLoading
    }
}

const mapDispatchToProps = {
    createArticle,
    updateArticle,
    getListCategories,
    getListTags,
    createTag,
    getListObjectTags
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithFormBehavior(AddArticle, ArticleModel.model()))
