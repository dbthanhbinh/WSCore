import React, { Component } from 'react'
import _ from 'lodash'
import MainLayout from '../../layouts'
import {Container, Grid} from 'semantic-ui-react'
import ItemList from '../../components/items/itemList'
import ItemGrid from '../../components/items/itemGrid'
import {layoutShowType} from '../../data/enums'
import {Items} from '../../data/items'

// Archive data
import { archiveData } from '../../data/archiveData'

class DetailContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            showType: null,
            data: []
        }
    }
    
    componentDidMount(){
        const {type, slug} = this.props.match.params
        this.setState(() => ({
            data: archiveData.data,
            showType: archiveData.showType
        }))
    }

    render () {
        //let { showType, data} = this.state
        let data = []
        let showType = `${this.state.showType}`
        return (
            <MainLayout>
                <Container>
                    <Grid columns={1}>
                        <Grid.Row>
                        <Grid.Column width={16}>
                            <div className='detail-content'>
                                <h1>Detail page</h1>
                            </div>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </MainLayout>
        )
    }
}

export default DetailContainer