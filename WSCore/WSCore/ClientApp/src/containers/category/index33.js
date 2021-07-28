import {Component, React} from 'react'
import {unwrapResult} from '@reduxjs/toolkit'
import _ from 'lodash'
import {connect} from 'react-redux'
import {Container, Grid, Form, Table, Rating, Icon, Input, TextArea, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {WithFormBehavior} from '../../form'
import {actions} from '../../data/enums'
import CategoryModel from './category.model'
import {
    getListCategories,
    getCategoryBy,
    createCategory,
    updateCategory,
    deleteCategoryBy,
    setCurrentCategories
} from '../../reduxStore/actions/category.actions'

import {getListTags} from '../../reduxStore/actions/tag.actions'
import ListItems from './listItems'
import CategoryForm from './form'
import { initModel} from '../../form/common'

import { ImageUpload } from '../../components/ImageUpload'
import MultipleSelected from '../../components/selected/multiple.selected'

class Category extends Component {
    constructor(props){
        super(props)
        this.state = {
            model: props?.model
        }
        this.currentModel = actions.ADD
        this.currentId = null
        this.handleCreateCategory = this.handleCreateCategory.bind(this)
        this.deleteCategoryBy = this.deleteCategoryBy.bind(this)
    }

    async componentDidMount() {
        await this.initData()
    }

    async initData() {
        // get list tags all
        let payload = {
            url: 'tag/tags'
        }
        unwrapResult(await this.props.getListTags(payload))

        // get list category all
        this.getCategories()

        let id = this.props.match.params.id
        if(id){
            this.currentModel = actions.EDIT
            // fetch data
            await this.getCategoryBy(this.props.match.params.id)
        }
    }

    /**
     * Valid when change ItemId
     * @param {*} prevProps 
     */
    async componentDidUpdate(prevProps) {
        //if(prevProps.match.params.id && !this.props.match.params.id)
            //await this.initData()

        if (this.props.match.params.id !== prevProps.match.params.id) {
            // fetch data
            await this.getCategoryBy(this.props.match.params.id)
        }
    }

    /**
     * Get all items without paging
     */
    async getCategories(){
        unwrapResult(await this.props.getListCategories({
            url: 'category/categories'
        }))
    }

    /**
     * Get ItemInfo by itemId
     * @param {*} categoryId 
     * @returns 
     */
    async getCategoryBy(categoryId){
        // fetch data
        let id = categoryId
        if(!id) return

        this.currentModel = actions.EDIT
        this.currentId = id
        let category = await this.props.getCategoryBy({
            url: `categories/${id}`,
            categoryId: id,
            body: {}
        })
        if(category.payload?.statusCode === 200){
            let result = category.payload?.result
            Object.keys(this.state.model).forEach((key) => {
                this.state.model[key].value = result[key] || ''
            })
            // Re-Initi validate Model
            let {reValidModel} = this.props
            reValidModel(this.state.model, true)
            this.setState({model: this.state.model})
        }
    }

    /**
     * Build select option form list
     * @param {*} currentList 
     * @returns 
     */
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

    /**
     * Check if has error, then add error class to semantic element field
     * @param {*} item 
     * @returns 
     */
    showFieldError = (item) => {
        if(item){
            if(!item.isInitModel && !item.isValid)
                return true
        }
        return false
    }

    /**
     * If field has invalid, then show small-text message bellow element field
     * @param {*} item 
     * @returns 
     */
    showFieldErrorRemain = (item) => {
        if(item && item.message && !item.isInitModel){
            return <span className="error-remain">{item.message?.toString()}</span>
        }
    }

    /**
     * Handle Create Item
     * @param {*} e 
     */
     async handleCreateCategory(e){
        let {model} = this.state
        e.preventDefault();

        let payload = {
            body: {
                title: _.get(model, 'title')?.value,
                alias: _.get(model, 'alias')?.value,
                file: _.get(model, 'file')?.value
            }
        }
        let created = await this.props.createCategory(payload)
        if(created){
            // get list category all
            this.getCategories()
        }
    }
    
    /**
     * Update new ItemInfo to currentList
     * @param {*} currentList 
     * @param {*} newItem 
     * @param {*} id 
     * @returns 
     */
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

    /**
     * Handle Update item info
     * @param {*} e 
     */
    async handleUpdateCategory(e){
        e.preventDefault();
        let { model, isFormValid } = initModel(this.state.model, true)
        if(isFormValid){
            let payload = {
                categoryId: this.currentId,
                body: {
                    title: _.get(model, 'title')?.value,
                    alias: _.get(model, 'alias')?.value,
                    file: _.get(model, 'file')?.value
                }
            }
            let updated = await this.props.updateCategory(payload)
            let {currentCategories} = this.props
            if(updated.payload?.statusCode === 200){
                let result = updated.payload?.result?.category
                let newCategories = this.updateItemInList(currentCategories, result, this.currentId)
                this.props.setCurrentCategories(newCategories)
            }
        }
    }

    /**
     * To Delete item by Id
     * @param {*} categoryId 
     */
     async deleteCategoryBy(categoryId){
        await this.props.deleteCategoryBy({
            url: `categories/${categoryId}`,
            categoryId: categoryId,
            body: {}
        })
    }

    /**
     * Render the UI
     * @returns 
     */
    render(){
        let {model} = this.state
        let {handleChange, currentTags, currentCategories, isLoading, isFormValid} = this.props
        currentTags = this.buildOptions(currentTags)

        return(
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <CategoryForm
                                handleChange = {handleChange}
                                model = {model}
                                isLoading = {isLoading}
                                isFormValid = {isFormValid}
                                actions = {actions.ADD}
                                customErrorRemain = {this.showFieldErrorRemain}
                                onHandleAction = {this.handleCreateCategory}
                            />
                        </Grid.Column>

                        <Grid.Column width={11}>
                            <ListItems
                                currentCategories={currentCategories}
                                isLoading={isLoading}
                                currentId={this.currentId}
                                onHandleDeleteAction = {this.deleteCategoryBy}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    let {category, tag} = state
    return {
        currentCategory: category.currentCategory,
        currentCategories: category.currentCategories,
        currentTags: tag.currentTags,
        isLoading: category.isLoading
    }
}

const mapDispatchToProps = {
    getListCategories,
    getCategoryBy,
    getListTags,
    deleteCategoryBy,
    createCategory,
    updateCategory
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithFormBehavior(Category, CategoryModel.model()))
