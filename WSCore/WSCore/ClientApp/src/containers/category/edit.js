import React, {Component} from 'react'
import {unwrapResult} from '@reduxjs/toolkit'
import _ from 'lodash'
import {connect} from 'react-redux'
import {Container, Grid} from 'semantic-ui-react'
import {WithFormBehavior} from '../../form'
import CategoryModel from './category.model'
import { initModel} from '../../form/common'
import {
    getDetailCategory,
    getCategoryBy,
    getListCategories,
    updateCategory,
    setCurrentCategories,
    deleteCategoryBy
} from '../../reduxStore/actions/category.actions'

import {getListTags} from '../../reduxStore/actions/tag.actions'
import ListItems from './listItems'
import CategoryForm from './form'
import {controlled, actions, objectDefault} from '../../data/enums'
import MainLayout from '../../layouts'
import { getModuleActPermissions, checkHasPermission } from '../../utilities/cookies'

class Category extends Component {
    constructor(props){
        super(props)
        this.state = {
            model: props?.model
        }
        this.userModuleActs = []
        this.currentModel = actions.EDIT
        this.posttype = objectDefault.CATEGORY
        this.currentId = null
        this.handleUpdateCategory = this.handleUpdateCategory.bind(this)
        this.deleteCategoryBy = this.deleteCategoryBy.bind(this)
    }

    async componentDidMount() {
        // get list category all
        // this.getCategories()

        let id = this.props.match.params.id
        if(!id) return
        // fetch data
        await this.getCategoryBy(this.props.match.params.id)
        this.userModuleActs = getModuleActPermissions(objectDefault.CATEGORY)
    }
    
    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            // fetch data
            await this.getCategoryBy(this.props.match.params.id)
        }
    }

    async getCategories(type){
        // get list category all
        if(type)
            this.posttype = type

        unwrapResult(await this.props.getListCategories({
            url: `${controlled.CATEGORIES}/${this.posttype}`
        }))
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

    async handleUpdateCategory(e){
        e.preventDefault();
        let { model, isFormValid } = initModel(this.state.model, true)
        if(isFormValid){
            let payload = {
                url: `categories/${this.currentId}`,
                categoryId: this.currentId,
                body: {
                    title: _.get(model, 'title')?.value,
                    alias: _.get(model, 'alias')?.value,
                    content: _.get(model, 'content')?.value || '',
                    excerpt: _.get(model, 'excerpt')?.value,
                    seotitle: _.get(model, 'seoTitle')?.value,
                    seocontent: _.get(model, 'seoContent')?.value,
                    seokeyword: _.get(model, 'seoKeyWord')?.value,
                    file: _.get(model, 'file')?.value || null
                }
            }
            let {error, result} = unwrapResult(await this.props.updateCategory(payload))
            if(error) return

            if(result){
                let {currentCategories} = this.props
                let res = result.category
                let newCategories = this.updateItemInList(currentCategories,
                    {
                        id: res.id,
                        title: res.title,
                        alias: res.alias,
                        excerpt: res.excerpt,
                        parentId: res.parentId,
                        type: res.type,
                        media: result.media
                    }
                    , this.currentId)
                this.props.setCurrentCategories(newCategories)
            }
        }
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

    async getCategoryBy(categoryId){
        let {model} = this.state
        // fetch data
        let id = categoryId
        if(!id) return

        this.currentModel = actions.EDIT
        this.currentId = id
        let {error, result} = unwrapResult(await this.props.getCategoryBy({url: `categories/edit/${id}`}))
        if(error) return

        if(result && !result.error){
            let res = result?.category
            Object.keys(this.state.model).forEach((key) => {
                this.state.model[key].value = (res && res[key]) ? res[key] : ""
            })

            // Update Seo
            let seoRes = result?.seo
            model['seoTitle'].value = (seoRes && seoRes['seoTitle']) ? seoRes['seoTitle'] : ""
            model['seoContent'].value = (seoRes && seoRes['seoTitle']) ? seoRes['seoContent'] : ""
            model['seoKeyWord'].value = (seoRes && seoRes['seoTitle']) ? seoRes['seoKeyWord'] : ""

            // Re-Initi validate Model
            let {reValidModel} = this.props
            reValidModel(this.state.model, true)
            this.setState({model: this.state.model})

            this.getCategories(result?.category?.type)
        }
    }

    async deleteCategoryBy(categoryId){
        await this.props.deleteCategoryBy({url: `categories/${categoryId}`})

        // Get refresh categories
        this.getCategories()
    }

    render(){
        // let {model} = this.state
        let {
            showFieldError,
            showFieldErrorRemain,
            handleChange,
            model,
            currentCategories,
            isLoading,
            isFormValid,
            currentCategory
        } = this.props

        return(
            <MainLayout>
                <Grid.Row>
                    <Grid columns={1} divided>
                        <Grid.Column width={5}>
                            <CategoryForm
                                handleChange = {handleChange}
                                currentCategory = {currentCategory}
                                model = {model}
                                isLoading = {isLoading}
                                isFormValid = {isFormValid}
                                actions = {actions.EDIT}
                                onHandleAction = {this.handleUpdateCategory}
                                onShowFieldError = { showFieldError }
                                onShowFieldErrorRemain = { showFieldErrorRemain }
                                hasPermission={checkHasPermission(this.userModuleActs, actions.EDIT)}
                            />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <ListItems
                                currentCategories={currentCategories}
                                isLoading={isLoading}
                                currentId={this.currentId}
                                onDeleteCategoryBy = {this.deleteCategoryBy}
                                userModuleActs = {this.userModuleActs}
                                controlled = {controlled.CATEGORIES}
                                actions = {actions}
                            />
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    let {categoryStore, tagStore} = state
    return {
        currentCategory: categoryStore.currentCategory,
        currentCategories: categoryStore.currentCategories,
        currentTags: tagStore.currentTags,
        isLoading: categoryStore.isLoading
    }
}

const mapDispatchToProps = {
    getDetailCategory,
    getCategoryBy,
    getListCategories,
    getListTags,
    deleteCategoryBy,
    updateCategory,
    setCurrentCategories
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithFormBehavior(Category, CategoryModel.model()))
