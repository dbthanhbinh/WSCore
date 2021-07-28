import { Component } from "react"
import _ from 'lodash'
import {connect} from 'react-redux'
import {WithFormBehavior} from '../../form'
import TabModel from './tag.model'
import {getListTags, createTag} from '../../reduxStore/actions/tag.actions'
import {Container, Grid, Form, Button} from 'semantic-ui-react'

class Tag extends Component{
    constructor(props){
        super(props)
        this.state = {
            model: props?.model
        }
    }

    handleSubmitData = (e) => {
        let {model} = this.state
        e.preventDefault();

        let payload = {
            url:`tag/tags`,
            body: {
                title: _.get(model, 'title')?.value,
                alias: _.get(model, 'alias')?.value
            }
        }
        this.props.createTag(payload)
    }

    render(){
        let {handleChange, isLoading} = this.props
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
                            </Form>
                        </Grid.Column>

                        <Grid.Column width={4}>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form>
                                        <Form.Field>
                                            <Button onClick={!isLoading ? this.handleSubmitData : null} loading={isLoading} type='submit'>Submit</Button>
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
    let {tag} = state
    return {
        currentTag: tag.currentTag,
        currentTags: tag.currentTags,
        isLoading: tag.isLoading
    }
}

const mapDispatchToProps = {
    getListTags,
    createTag
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithFormBehavior(Tag, TabModel))