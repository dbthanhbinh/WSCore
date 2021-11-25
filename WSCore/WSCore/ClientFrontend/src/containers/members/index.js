import { Component } from "react"
import _ from 'lodash'
import {connect} from 'react-redux'
import {Grid} from 'semantic-ui-react'

import RegisterModel from './register.model'
import { WithFormBehavior } from "../../form"
import MainLayout from '../../layouts'
import {
    createUser
} from '../../reduxStore/actions/member.actions'
import ListItems from './listItems'

class Users extends Component{
    constructor(props){
        super(props)
        this.state = {
            model: props?.model
        }   
    }

    render(){
        return(
            <MainLayout>
                <Grid.Row>
                    <Grid columns={1} divided>
                        <ListItems />
                    </Grid>
                </Grid.Row>
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    let {user} = state
    return {
        currentUsers: user.currentUsers,
        currentUser: user.currentUser,
        isLoading: user.isLoading
    }
}

const mapDispatchToProps = {
    createUser
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithFormBehavior(Users, RegisterModel.model()))