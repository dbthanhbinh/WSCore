import {Component, Fragment, React} from 'react'
import {unwrapResult} from '@reduxjs/toolkit'
import _ from 'lodash'
import {connect} from 'react-redux'
import {Grid, Table} from 'semantic-ui-react'
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
import ListItems from './listItems'
import { getModuleActPermissions, checkHasPermission } from '../../utilities/cookies'
import TransitionablePortal from '../../components/flash'

class Category extends Component {
    constructor(props){
        super(props)
        this.state = {
            model: props?.model,
            allCategoryList: [],
        }
        this.userModuleActs = []
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
        this.userModuleActs = getModuleActPermissions(objectDefault.CATEGORY)
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
        let {error, result} = unwrapResult(await this.props.deleteCategoryBy({url: `categories/${categoryId}`}))
        if(error) return false

        if(result) {
            if(result.error) return false
        }

        // Get refresh categories
        this.getCategories()
    }

    handleChangeSingleSelected(e, data){
        this.props.handleDropdownChange('parentId', data)
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
        // let sortList = this.buildMultipleLevel(currentCategories)
        // // 84: d842ad48, 82: c31d82dd, 73: f5c1a66c, 71: a2409702
        // // 70: 1df84cf0, 75: 39dffbe5, 77: 3be2b775, 02: 91ceb122
        // // 81: 323cc32e, 73: f5c1a66c, 01: ab91c0fb, 735: 6feb052e
        // // 87: 8e353319
        // let buildOptioned = this.buildListOptions(sortList, currentId, null)

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
                                hasPermission={checkHasPermission(this.userModuleActs, actions.ADD)}
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
