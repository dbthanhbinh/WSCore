import {Component, React} from 'react'
import {unwrapResult} from '@reduxjs/toolkit'
import _ from 'lodash'
import {connect} from 'react-redux'
import {Container, Grid} from 'semantic-ui-react'
import {WithFormBehavior} from '../../form'
import {actions} from '../../data/enums'
import CategoryModel from './category.model'
import {
    getListCategories,
    createCategory,
    updateCategory,
    deleteCategoryBy
} from '../../reduxStore/actions/category.actions'

import ListItems from './listItems'
import CategoryForm from './form'

class Category extends Component {
    constructor(props){
        super(props)
        this.state = {
            model: props?.model
        }
        this.currentModel = actions.ADD
        this.currentId = null
        this.handleCreateCategory = this.handleCreateCategory.bind(this)
    }

    async componentDidMount(){
        // get list category all
        this.getCategories()
    }

    async getCategories(){
        unwrapResult(await this.props.getListCategories({url: 'category/categories'}))
    }
    
    async handleCreateCategory(e){
        let {model} = this.state
        e.preventDefault();

        let {error, result } = unwrapResult(await this.props.createCategory({
            url: 'category/categories',
            body: {
                title: _.get(model, 'title')?.value,
                alias: _.get(model, 'alias')?.value,
                file: _.get(model, 'file')?.value
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
                { key: item.id.toString(), text: item.title, value: item.id.toString() }
            )
        })
        return options
    }

    showFieldError = (item) => {
        if(item){
            if(!item.isInitModel && !item.isValid)
                return true
        }
        return false
    }

    showFieldErrorRemain = (item) => {
        if(item && item.message && !item.isInitModel){
            return <span className="error-remain">{item.message?.toString()}</span>
        }
    }

    async deleteCategoryBy(categoryId){
        await this.props.deleteCategoryBy({
            url: `categories/${categoryId}`,
            categoryId: categoryId,
            body: {}
        })
    }

    render(){
        let {model} = this.state
        let {handleChange, currentCategories, isLoading, isFormValid} = this.props
        console.log('======currentCategories:', this.props)
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
