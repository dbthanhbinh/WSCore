import React, {Component} from 'react'
import {unwrapResult} from '@reduxjs/toolkit'
import _ from 'lodash'
import {connect} from 'react-redux'
import {Grid} from 'semantic-ui-react'
import {
    getListCategories,
    createCategory,
    updateCategory,
    deleteCategoryBy
} from '../../reduxStore/actions/category.actions'

import MainLayout from '../../layouts'
import CategoryModel from './category.model'
import {WithFormBehavior} from '../../form'
import CategoryForm from './form'
import {controlled, actions, objectDefault} from '../../data/enums'

class Category extends Component {
    constructor(props){
        super(props)
        this.state = {
            model: props?.model,
            allCategoryList: [],
        }
        this.currentModel = actions.ADD
        this.posttype = objectDefault.CATEGORY
        this.currentId = null
        this.handleCreateCategory = this.handleCreateCategory.bind(this)
        this.deleteCategoryBy = this.deleteCategoryBy.bind(this)
        this.handleChangeSingleSelected = this.handleChangeSingleSelected.bind(this)
    }

    async componentDidMount(){
        // get list category all
        this.getCategories()
    }

    async getCategories(){
        let type = this.props.match.params.type
        if(type)
            this.posttype = type

        let catOptions = null
        let catRes = unwrapResult(await this.props.getListCategories({url: `${controlled.CATEGORIES}/${this.posttype}`}))
        if(catRes && catRes.result?.length >0){
            catOptions = this.buildOptions(catRes.result)
        }

        this.setState({
            allCategoryList: catOptions
        })
    }
    
    async handleCreateCategory(e){
        let {model} = this.state
        e.preventDefault();

        let {error, result } = unwrapResult(await this.props.createCategory({
            url: `${controlled.CATEGORIES}`,
            body: {
                title: _.get(model, 'title')?.value,
                alias: _.get(model, 'alias')?.value,
                excerpt: _.get(model, 'excerpt')?.value,
                content: _.get(model, 'content')?.value || '',
                seoTitle: _.get(model, 'seoTitle')?.value,
                seoContent: _.get(model, 'seoContent')?.value,
                seoKeyWord: _.get(model, 'seoKeyWord')?.value,
                file: _.get(model, 'file')?.value,
                type: this.posttype,
                parentId: ''
            }
        }))

        if(error) return
        if(result){
            // get list category all
            this.getCategories()   
        }
    }

    buildOptions = (currentList = []) => {
        let options = []
        if(currentList.length < 1) return options
        currentList.forEach(item => {
            options.push(
                {
                    key: item.id.toString(),
                    text: item.title,
                    value: item.id.toString()
                }
            )
        })
        return options
    }

    async deleteCategoryBy(categoryId){
        await this.props.deleteCategoryBy({url: `categories/${categoryId}`})

        // Get refresh categories
        this.getCategories()
    }

    handleChangeSingleSelected(e, data){
        this.props.handleDropdownChange('parentId', data)
    }

    buildMultipleLevel(currentList = []){
        let newList = []
        currentList.forEach((item) => {
            newList.push({
                id: item.id,
                parentId: item.parentId,
                title: item.title
            })
        })
        return newList
    }

    buildListOptions(currentList, currentId, parentId = null){
        let newList = this.getListByParentId(currentList, parentId = null)
        return this.renderSubmenu(newList, currentId, currentId, 'false')
    }

    /**
     * Build multiple level menus
     * @param {*} currentList 
     * @param {*} currentId 
     * @param {*} parentId 
     * @returns 
     */
    renderSubmenu (currentList, currentId, parentId) {
        return currentList && currentList.length > 0 && currentList.map((item) => {
            item.hasChilds = false
            item.isDisable = false
            let _parentId = currentId
            if (item.childs && item.childs.length > 0) {
                item.hasChilds = true
            }
            if (currentId && item.id === currentId) {
                item.isDisable = true
                if(item.hasChilds)
                    _parentId = item.id
            } else {
                if(parentId && item.parentId === parentId){
                    item.isDisable = true
                    if(item.hasChilds)
                        _parentId = item.id
                } else {
                    item.isDisable = false
                }
            }

            return (
                <li key={item.id.toString()}>
                    <span aria-disabled={true}>{item.title} - <b>{item.isDisable ? 'Yes' : 'no'}</b></span>
                    {
                        item.hasChilds &&
                        <ul className="has-childs">
                            {this.renderSubmenu(item.childs, currentId, _parentId)}
                        </ul>
                    }
                </li>
            )
        })
    }


    getListByParentId(currentList, parentId = null){
        let newList = null
        newList = currentList.filter((item) => item.parentId === parentId)
        if(newList && newList.length > 0){
            newList.forEach((item) => {
                item.childs = this.getListByParentId(currentList, item.id)
            })
        }
        return newList
    }
    
    render(){
        let {model, allCategoryList} = this.state
        let {
            showFieldError,
            showFieldErrorRemain,
            handleChange,
            currentCategories,
            isLoading,
            isFormValid
        } = this.props
        
        let currentId = null
        let sortList = this.buildMultipleLevel(currentCategories)
        // 84: d842ad48, 82: c31d82dd, 73: f5c1a66c, 71: a2409702
        // 70: 1df84cf0, 75: 39dffbe5, 77: 3be2b775, 02: 91ceb122
        // 81: 323cc32e, 73: f5c1a66c, 01: ab91c0fb, 735: 6feb052e
        // 87: 8e353319
        let buildOptioned = this.buildListOptions(sortList, currentId, null)

        return(
            <MainLayout>
                <Grid.Row>
                    <Grid columns={1} divided>
                        <Grid.Column width={5}>
                            <CategoryForm
                                handleChange = {handleChange}
                                model = {model}
                                currentCategories={allCategoryList}
                                isLoading = {isLoading}
                                isFormValid = {isFormValid}
                                actions = {actions.ADD}
                                customErrorRemain = {this.showFieldErrorRemain}
                                onHandleAction = {this.handleCreateCategory}
                                onShowFieldError = { showFieldError }
                                onShowFieldErrorRemain = { showFieldErrorRemain }
                                onHandleChange = {this.handleChangeSingleSelected}
                            />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <ul>
                                {buildOptioned}
                            </ul>
                            {/* <ListItems
                                currentCategories={currentCategories}
                                isLoading={isLoading}
                                currentId={this.currentId}
                                onDeleteCategoryBy = {this.deleteCategoryBy}
                            /> */}
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    let {category} = state
    return {
        currentCategory: category.currentCategory,
        currentCategories: category.currentCategories,
        isLoading: category.isLoading
    }
}

const mapDispatchToProps = {
    getListCategories,
    deleteCategoryBy,
    createCategory,
    updateCategory
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithFormBehavior(Category, CategoryModel.model()))
