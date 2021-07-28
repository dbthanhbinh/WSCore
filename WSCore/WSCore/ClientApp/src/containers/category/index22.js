import {Component, React} from 'react'
import {current, unwrapResult} from '@reduxjs/toolkit'
import _ from 'lodash'
import {connect} from 'react-redux'
import {Container, Grid, Form, Icon, Checkbox, Button} from 'semantic-ui-react'
import {WithFormBehavior} from '../../form'
import CategoryModel from './category.model'
import {
    getDetailCategory,
    createCategory
} from '../../reduxStore/actions/category.actions'

import {getListTags} from '../../reduxStore/actions/tag.actions'
import { ImageUpload } from '../../components/ImageUpload'
import MultipleSelected from '../../components/selected/multiple.selected'

class Category extends Component {
    constructor(props){
        super(props)
        this.state = {
            model: props?.model
        }
        this.handleSubmitData = this.handleSubmitData.bind(this)
    }

    async componentDidMount() {
        // get list tags all
        let payload = {
            url: 'tag/tags',
            body: {}
        }
        unwrapResult(await this.props.getListTags(payload))
    }
    
    handleSubmitData = (e) => {
        let {model} = this.state
        e.preventDefault();

        let payload = {
            body: {
                title: _.get(model, 'title')?.value,
                alias: _.get(model, 'alias')?.value,
                file: _.get(model, 'file')?.value
            }
        }
        this.props.createCategory(payload)
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
        let {handleChange, currentTags} = this.props
        currentTags = this.buildOptions(currentTags)
        return(
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <Form>
                                <Form.Field>
                                    <label>Title</label>
                                    <input name={'title'} onChange={handleChange} placeholder='Title ...' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Alias</label>
                                    <input name={'alias'} onChange={handleChange} placeholder='Alias ...' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Content</label>
                                    <input name={'content'} onChange={handleChange} placeholder='Content ...' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Excerpt</label>
                                    <input name={'excerpt'} onChange={handleChange} placeholder='Description ...' />
                                </Form.Field>
                            </Form>
                        </Grid.Column>

                        <Grid.Column width={4}>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form>
                                        <Form.Field>
                                            <ImageUpload handleChange={handleChange} />
                                        </Form.Field>
                                        {
                                            currentTags && currentTags.length > 0
                                            && <Form.Field>
                                                <MultipleSelected items={currentTags}/>
                                            </Form.Field>
                                        }
                                        <Form.Field>
                                            <Button onClick={this.handleSubmitData} type='submit'>Submit</Button>
                                        </Form.Field>
                                    </Form>
                                </Grid.Column>
                            </Grid.Row>
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
        currentTags: tag.currentTags
    }
}

const mapDispatchToProps = {
    getDetailCategory,
    createCategory,
    getListTags
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithFormBehavior(Category, CategoryModel.model()))
