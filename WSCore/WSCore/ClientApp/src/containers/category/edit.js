import {Component, React} from 'react'
import {unwrapResult} from '@reduxjs/toolkit'
import _ from 'lodash'
import {connect} from 'react-redux'
import {Container, Grid, Form, Table, Rating, Icon, Input, TextArea, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {WithFormBehavior} from '../../form'
import {actions} from '../../data/enums'
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

import { ImageUpload } from '../../components/ImageUpload'
import MultipleSelected from '../../components/selected/multiple.selected'

class Category extends Component {
    constructor(props){
        super(props)
        this.state = {
            model: props?.model
        }
        this.currentModel = actions.EDIT
        this.currentId = null
        this.handleUpdateCategory = this.handleUpdateCategory.bind(this)
    }

    async componentDidMount() {
        // get list tags all
        let payload = {
            url: 'tag/tags',
            body: {}
        }
        unwrapResult(await this.props.getListTags(payload))

        // get list category all
        this.getCategories()

        let id = this.props.match.params.id
        if(!id) return
        // fetch data
        await this.getCategoryBy(this.props.match.params.id)
    }
    
    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            // fetch data
            await this.getCategoryBy(this.props.match.params.id)
        }
    }

    async getCategories(){
        // get list category all
        unwrapResult(await this.props.getListCategories({
            url: 'category/categories',
            body: {}
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

    async deleteCategoryBy(categoryId){
        await this.props.deleteCategoryBy({
            url: `categories/${categoryId}`,
            categoryId: categoryId,
            body: {}
        })
        // Get refresh categories
        this.getCategories()
    }

    render(){
        let {handleChange, currentTags, model, currentCategories, isLoading, isFormValid, currentCategory} = this.props
        // currentTags = this.buildOptions(currentTags)

        console.log('=======aaaaa:', model)
        return(
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <CategoryForm
                                handleChange = {handleChange}
                                currentCategory = {currentCategory}
                                model = {model}
                                isLoading = {isLoading}
                                isFormValid = {isFormValid}
                                actions = {actions.EDIT}
                                onHandleAction = {this.handleUpdateCategory}
                            />
                        </Grid.Column>

                        <Grid.Column width={11}>
                            <ListItems
                                currentCategories={currentCategories}
                                isLoading={isLoading}
                                currentId={this.currentId}
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
