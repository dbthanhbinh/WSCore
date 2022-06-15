import React, {Component} from 'react'
import {unwrapResult} from '@reduxjs/toolkit'
import _ from 'lodash'
import {connect} from 'react-redux'
import {Grid, Form, Button} from 'semantic-ui-react'
import {WithFormBehavior} from '../../form'
import ArticleModel from './article.model'
import ArticleForm from './form'
import { ImageUpload } from '../../components/ImageUpload'
import MultipleSelected from '../../components/selected/multiple.selected'
import SingleSelected from '../../components/selected/single.selected'
import {controlled, actions, objectDefault} from '../../data/enums'
import MainLayout from '../../layouts'

import {
    getArticleById,
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
            currentCategoryList: [],
            currentTagValues: [],
            currentImg: null
        }
        this.currentModel = actions.EDIT
        this.posttype = objectDefault.ARTICLES
        this.currentId = null
        this.handleUpdateArticle = this.handleUpdateArticle.bind(this)
        this.getArticleById = this.getArticleById.bind(this)
        this.handleChangeSingleSelected = this.handleChangeSingleSelected.bind(this)
        this.handleChangeMultipleSelected = this.handleChangeMultipleSelected.bind(this)
        this.handleAddition = this.handleAddition.bind(this)

        console.log('=====ArticleModel:', ArticleModel.model());
    }

    async componentDidMount(){
        let id = this.props.match.params.id
        if(!id) return

        // fetch data
        await this.getArticleById(id)
    }

    addRemoveCurrentTagValues(currentTagValues, tagId, action = actions.ADD){
        let idx = currentTagValues.findIndex(it => it === tagId)
        if(action === actions.ADD){
            if(idx < 0)
                currentTagValues.push(tagId)
        }
        return currentTagValues
    }

    mapTagIsToModel(objecttags){
        let {currentTagValues, model} = this.state
        if(objecttags && objecttags.length >0){
            objecttags.forEach(element => {
                currentTagValues = this.addRemoveCurrentTagValues(currentTagValues, element.tagId, actions.ADD)
            });
            this.setState(
                model['tagIds'].value = currentTagValues
            )
        }
    }

    async getArticleById(articleId){
        let id = articleId
        if(!id) return
        // fetch data
        this.currentModel = actions.EDIT
        this.currentId = id
        let {error, result} = unwrapResult(await this.props.getArticleById({url: `${controlled.ARTICLES}/edit/${id}`}))
        if(error) return

        let {currentTagValues, model} = this.state
        if(result){
            // Update article
            let articleRes = result?.article
            this.posttype = result?.article?.type
            Object.keys(model).forEach((key) => {
                model[key].value = (articleRes && articleRes[key]) ? articleRes[key] : ""
            })

            // Update Seo
            let seoRes = result?.seo
            model['seoTitle'].value = (seoRes && seoRes['seoTitle']) ? seoRes['seoTitle'] : ""
            model['seoContent'].value = (seoRes && seoRes['seoTitle']) ? seoRes['seoContent'] : ""
            model['seoKeyWord'].value = (seoRes && seoRes['seoTitle']) ? seoRes['seoKeyWord'] : ""

            // Re-Initi validate Model
            let {reValidModel} = this.props
            reValidModel(model, true)

            let objectTags = result?.objectTags
            if(objectTags && objectTags.length >0){
                objectTags.forEach(elm => {
                    currentTagValues.push(elm.tagId)
                })
            }
            model['tagIds'].value = currentTagValues

            let catOptions = null
            let catRes = unwrapResult(await this.props.getListCategories({url: `${controlled.CATEGORIES}`}))
            if(catRes && catRes.result?.length >0){
                catOptions = this.buildOptions(catRes.result)
            }

            let tagOptions = null
            let tagsRes = unwrapResult(await this.props.getListTags({url: `${controlled.TAGS}`}))
            if(tagsRes && tagsRes.result?.length > 0){
                tagOptions = this.buildOptions(tagsRes.result)
            }

            this.setState({
                model: model,
                currentCategoryList: catOptions,
                currentTagList: tagOptions,
                currentImg: result.media?.small
            })
        }
    }
    
    async getCategories(){
        unwrapResult(await this.props.getListCategories({url: `${controlled.CATEGORIES}`}))
    }

    async getTags(){
        unwrapResult(await this.props.getListTags({url: `${controlled.TAGS}`}))
    }

    async handleUpdateArticle(e){
        let {model} = this.state
        e.preventDefault();

        let payload = {
            url: `${controlled.ARTICLES}/${this.currentId}`,
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
        }

        let {error, result } = unwrapResult(await this.props.updateArticle(payload))
        if(error) return false
        
        if(result){
            let articleRes = result?.article
            let {currentTagValues} = this.state
            Object.keys(this.state.model).forEach((key) => {
                this.state.model[key].value = (articleRes && articleRes[key]) ? articleRes[key] : ""
            })

            // update objecttags
            let objectTags = result?.objectTags
            if(objectTags && objectTags.length >0){
                this.mapTagIsToModel(objectTags)
            }
            model['tagIds'].value = currentTagValues

            // Update Seo
            let seoRes = result?.seo
            model['seoTitle'].value = (seoRes && seoRes['seoTitle']) ? seoRes['seoTitle'] : ""
            model['seoContent'].value = (seoRes && seoRes['seoTitle']) ? seoRes['seoContent'] : ""
            model['seoKeyWord'].value = (seoRes && seoRes['seoTitle']) ? seoRes['seoKeyWord'] : ""
            
            // Re-Initi validate Model
            let {reValidModel} = this.props
            reValidModel(this.state.model, true)
            this.setState({model: this.state.model})
        }
    }

    async handleAddition(value){
        let {error, result} = unwrapResult(await this.props.createTag({
            url:`${controlled.TAGS}`,
            body: {
                title: value
            }
        }))

        if(error) return
        if(result){
            let {error, result} = unwrapResult(await this.props.getListTags({url: `${controlled.TAGS}`}))
            if(error) return false

            if(result && result.length > 0){
                let options = this.buildOptions(result)
                this.setState({currentTagList: options})
            }
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
        let {model, currentTagList, currentCategoryList, currentImg} = this.state
        let {
            showFieldError,
            showFieldErrorRemain,
            handleChange,
            isLoading,
            isFormValid,
            currentArticle
        } = this.props

        return(
            <MainLayout>
                <Grid.Row>
                    <Grid columns={1} divided>
                        <Grid.Column width={12}>
                            <ArticleForm
                                handleChange = {handleChange}
                                currentItem = {currentArticle}
                                model = {model}
                                isLoading = {isLoading}
                                isFormValid = {isFormValid}
                                actions = {actions.EDIT}
                                onHandleAction = {this.handleUpdateArticle}
                                onShowFieldError = { showFieldError }
                                onShowFieldErrorRemain = { showFieldErrorRemain }
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Form>
                                <Form.Field>
                                    <ImageUpload
                                        handleChange = {handleChange}
                                        currentImg = {currentImg || null}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Select Category</label>
                                    {
                                        currentCategoryList && <SingleSelected
                                            currentValue={currentArticle?.article?.categoryId}
                                            options={currentCategoryList}
                                            onHandleChange={this.handleChangeSingleSelected}
                                        />
                                    }
                                </Form.Field>
                                <Form.Field>
                                    <label>Select tags</label>
                                    {
                                        currentTagList && <MultipleSelected
                                            currentValues={_.get(model, 'tagIds').value || ''}
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
                                        onClick={isFormValid ? this.handleUpdateArticle : null}
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
    let {articleStore, tagStore, categoryStore, objecttagStore} = state
    return {
        currentArticle: articleStore.currentArticle,
        currentCategories: categoryStore.currentCategories,
        currentTags: tagStore.currentTags,
        currentObjectTags: objecttagStore.currentObjectTags,
        isLoading: articleStore.isLoading
    }
}

const mapDispatchToProps = {
    getArticleById,
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
