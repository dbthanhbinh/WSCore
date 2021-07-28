import { Component, Fragment } from "react"
import _ from "lodash"
import { unwrapResult } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import {Form, Button} from 'semantic-ui-react'

import ListModule from './listModule'
import {WithFormBehavior} from '../../form'
import EditModel from './editUser.model'
import {setFieldValue} from '../../form/common'

import {
    getDetailUser,
    setCurrentUser,
    getUserPermission,
    updateUser
} from '../../reduxStore/actions/member.actions'

class EditUser extends Component{

    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            userModules: [],
            model: this.props?.model
        }

        this.handleUpdateUserModules = this.handleUpdateUserModules.bind(this)
        this.handleSubmitData = this.handleSubmitData.bind(this)
    }

    async componentDidMount() {
        // For article
        let payload = {
            userId: '469cf3e1'
        }
        // List all modules available for this user
        unwrapResult(await this.props.getDetailUser(payload))

        // Permissions for Modules and Actions
        unwrapResult(await this.props.getUserPermission(payload))
    }

    handleUpdateUserModules = (listModule = []) => {
        let {model} = this.state
        this.setState(()=>{
            setFieldValue('modules', listModule, model)
        })
    }

    handleSubmitData = () => {
        let {model} = this.state

        let moduleIds = _.get(model, 'modules.value')

        let newModuleIds = _.cloneDeep(moduleIds)
        let _newPayload = newModuleIds && newModuleIds.filter(f => f.isChecked)
        let newPayload = _newPayload && _newPayload.map(item => {
            if(item.isChecked){
                item = _.omit(item, ['actsReadonly', 'isChecked'])
                let tempActs = (item?.acts?.length > 0) ? item.acts.join() : ""
                item.acts = tempActs
                return item
            }
        })

        let payload = {
            body: {
                Modules: newPayload ? JSON.stringify(newPayload) : null
            }
        }
        this.props.updateUser(payload)
    }

    render(){
        const {userPermission} = this.props
        let userModuleActs = _.get(userPermission, "userModuleActs")
        return(
            <Fragment>
                <Form>
                    <Form.Field>
                        {
                            userModuleActs && <ListModule
                                handleOnChange={this.handleUpdateUserModules}
                                items={_.get(userPermission, "packageModules")}
                                userPackageModuleActs={userModuleActs}
                            />
                        }
                    </Form.Field>
                    <Button onClick={this.handleSubmitData} loading type='submit'>Submit</Button>
                </Form>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const {user} = state
    return {
        currentUser: user.currentUser,
        userPermission: user.userPermission
    }
}
  
const mapDispatchToProps = {
    getDetailUser,
    setCurrentUser,
    getUserPermission,
    updateUser
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithFormBehavior(EditUser, EditModel.model()))