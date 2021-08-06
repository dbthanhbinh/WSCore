import {Component, React} from 'react'
import {unwrapResult} from '@reduxjs/toolkit'
import _ from 'lodash'
import {connect} from 'react-redux'
import {Container, Grid, Form, Input, TextArea, Button} from 'semantic-ui-react'
import {WithFormBehavior} from '../../form'
import {actions} from '../../data/enums'
import ArticleModel from './article.model'
import {
    getListArticles,
    createArticle,
    updateArticle,
    deleteArticleBy
} from '../../reduxStore/actions/article.actions'
import {BuildField} from '../../form/fields/field'
import { ImageUpload } from '../../components/ImageUpload'

class AddArticle extends Component {
    constructor(props){
        super(props)
        this.state = {
            model: props?.model
        }
        this.currentModel = actions.ADD
        this.currentId = null
        this.handleCreateArticle = this.handleCreateArticle.bind(this)
        this.deleteArticleBy = this.deleteArticleBy.bind(this)
    }

    async componentDidMount(){
        // get list category all
        this.getArticles()

    }

    async getArticles(){
        unwrapResult(await this.props.getListArticles({url: 'categories'}))
    }
    
    async handleCreateArticle(e){
        let {model} = this.state
        e.preventDefault();

        let {error, result } = unwrapResult(await this.props.createArticle({
            url: 'categories',
            body: {
                title: _.get(model, 'title')?.value,
                alias: _.get(model, 'alias')?.value,
                file: _.get(model, 'file')?.value
            }
        }))

        if(error) return
        if(result){
            // get list category all
            this.getArticles()   
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

    async deleteArticleBy(categoryId){
        await this.props.deleteArticleBy({url: `categories/${categoryId}`})

        // Get refresh categories
        this.getArticles()
    }

    render(){
        let {model} = this.state
        let {
            showFieldError,
            showFieldErrorRemain,
            handleChange,
            isLoading,
            isFormValid
        } = this.props
        
        let customErrorRemain = null

        return(
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Form>
                                <BuildField
                                    fieldItem = {_.get(model, 'title')}
                                    fieldType = 'text'
                                    handleChange = {handleChange}
                                    isLoading = {isLoading}
                                    customErrorRemain = {customErrorRemain}
                                    onShowFieldError = {showFieldError}
                                    onShowFieldErrorRemain = {showFieldErrorRemain}
                                />

                                {/* <Form.Field>
                                    <label>{_.get(model, 'title')?.label}</label>
                                    <Input name={'title'}
                                    error={showFieldError(_.get(model, 'title'))}
                                    disabled={!!isLoading}
                                    value={_.get(model, 'title').value || ''}
                                    onChange={handleChange} placeholder={`${_.get(model, 'title')?.label} ...`} />
                                    
                                    {showFieldErrorRemain(_.get(model, 'title'), customErrorRemain, isLoading)}
                                </Form.Field> */}
                                <Form.Field>
                                    <label>{_.get(model, 'alias')?.label}</label>
                                    <Input name={'alias'}
                                    error={showFieldError(_.get(model, 'alias'))}
                                    disabled={!!isLoading}
                                    value={_.get(model, 'alias').value || ''}
                                    onChange={handleChange} placeholder={`${_.get(model, 'alias')?.label} ...`} />
                                    {/* Error remain */}
                                    {showFieldErrorRemain(_.get(model, 'alias'), customErrorRemain, isLoading)}
                                </Form.Field>
                                <Form.Field>
                                    <label>{_.get(model, 'content')?.label}</label>
                                    <TextArea name={'content'}
                                    className={showFieldError(_.get(model, 'content')) ? 'error' : ''}
                                    disabled={!!isLoading}
                                    value={_.get(model, 'content').value || ''}
                                    onChange={handleChange} placeholder={`${_.get(model, 'content')?.label} ...`} />
                                    {/* Error remain */}
                                    {showFieldErrorRemain(_.get(model, 'content'), customErrorRemain, isLoading)}
                                </Form.Field>
                                <Form.Field>
                                    <label>{_.get(model, 'excerpt')?.label}</label>
                                    <TextArea name={'excerpt'}
                                    className={showFieldError(_.get(model, 'excerpt')) ? 'error' : ''}
                                    disabled={!!isLoading}
                                    value={_.get(model, 'excerpt').value || ''}
                                    onChange={handleChange} placeholder={`${_.get(model, 'excerpt')?.label} ...`} />
                                    {/* Error remain */}
                                    {showFieldErrorRemain(_.get(model, 'excerpt'), customErrorRemain, isLoading)}
                                </Form.Field>
                                <Form.Field>
                                    <label>{_.get(model, 'seoTitle')?.label}</label>
                                    <Input name={'seoTitle'}
                                    error={showFieldError(_.get(model, 'seoTitle'))}
                                    disabled={!!isLoading}
                                    value={_.get(model, 'seoTitle').value || ''}
                                    onChange={handleChange} placeholder={`${_.get(model, 'seoTitle')?.label} ...`} />
                                    {/* Error remain */}
                                    {showFieldErrorRemain(_.get(model, 'seoTitle'), customErrorRemain, isLoading)}
                                </Form.Field>
                                <Form.Field>
                                    <label>{_.get(model, 'seoContent')?.label}</label>
                                    <TextArea name={'seoContent'}
                                    className={showFieldError(_.get(model, 'seoContent')) ? 'error' : ''}
                                    disabled={!!isLoading}
                                    value={_.get(model, 'seoContent')?.value || ''}
                                    onChange={handleChange} placeholder={`${_.get(model, 'seoContent')?.label} ...`} />
                                    {/* Error remain */}
                                    {showFieldErrorRemain(_.get(model, 'seoContent'), customErrorRemain, isLoading)}
                                </Form.Field>
                                <Form.Field>
                                    <label>{_.get(model, 'seoKeyWord')?.label}</label>
                                    <TextArea name={'seoKeyWord'}
                                    className={showFieldError(_.get(model, 'seoKeyWord')) ? 'error' : ''}
                                    disabled={!!isLoading}
                                    value={_.get(model, 'seoKeyWord')?.value || ''}
                                    onChange={handleChange} placeholder={`${_.get(model, 'seoKeyWord')?.label} ...`} />
                                    {/* Error remain */}
                                    {showFieldErrorRemain(_.get(model, 'seoKeyWord'), customErrorRemain, isLoading)}
                                </Form.Field>
                                <Form.Field>
                                    <ImageUpload
                                        handleChange = {handleChange}
                                        currentImg = {null}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Button
                                        disabled={!isFormValid || !!isLoading}
                                        loading={!!isLoading}
                                        onClick={isFormValid ? null : null}
                                        type='submit'>Save changed</Button>
                                </Form.Field>
                            </Form>
                        </Grid.Column>

                        <Grid.Column width={10}>
                            
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    let {category} = state
    return {
        currentArticle: category.currentArticle,
        currentArticles: category.currentArticles,
        isLoading: category.isLoading
    }
}

const mapDispatchToProps = {
    getListArticles,
    deleteArticleBy,
    createArticle,
    updateArticle
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithFormBehavior(AddArticle, ArticleModel.model()))
