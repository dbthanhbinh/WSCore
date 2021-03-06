import { unwrapResult } from '@reduxjs/toolkit'
import { Component } from 'react'
import {Container, Grid, Image, Table} from 'semantic-ui-react'
import { connect } from 'react-redux'

import {getListArticles,setCurrentArticles} from '../../reduxStore/actions/article.actions'
import {
    getProviders, setCurrentProviders,
    getTypes, setCurrentTypes
} from '../../reduxStore/contents/content.actions'
import {initReduceIdName} from '../../commons'
import ShowList from './showList'
import CheckBoxList from '../../components/checkBoxList'

class ShowArticle extends Component {
    constructor(props){
        super(props)

        this.currentProviders = []
        this.currentTypes = []
        this.state = {}
    }

    async componentDidMount() {
        // For article
        // const { error, result } = unwrapResult(await this.props.getListArticles())
        let result = await this.props.getListArticles()
        if(result){
            this.props.setCurrentArticles(result.payload)
        }

        // For Providers
        let providers = await this.props.getProviders()
        if(providers){
            this.props.setCurrentProviders(providers.payload)
        }

        // For Types
        let types = await this.props.getTypes()
        if(types){
            this.props.setCurrentTypes(types.payload)
        }
    }
    
    render(){
        const {currentArticles, currentProviders, currentTypes} = this.props
        this.currentProviders = initReduceIdName(currentProviders, 'id', ['id', 'name', 'slug', 'thumb'])
        this.currentTypes = initReduceIdName(currentTypes, 'id', ['id', 'name'])

        const listItem = currentArticles
        return (
            <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column width={4}>
                <CheckBoxList items={this.currentTypes}/>
              </Grid.Column>
              <Grid.Column  width={12}>
                <ShowList
                    listItem={listItem}
                    currentProviders={this.currentProviders}
                    currentTypes={this.currentTypes}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )
    }    
}

const mapStateToProps = (state) => {
    const {article, content} = state
    return {
        currentArticles: article.currentArticles,
        currentProviders: content.currentProviders,
        currentTypes: content.currentTypes
    }
}
  
const mapDispatchToProps = {
    getListArticles,
    setCurrentArticles,
    getProviders,
    setCurrentProviders,
    getTypes,
    setCurrentTypes
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowArticle)