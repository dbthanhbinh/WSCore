import { Component } from "react"
import _ from "lodash"
import { unwrapResult } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import {Grid, Form, Button, Input} from 'semantic-ui-react'

import MainLayout from "../../layouts"
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
            userId: 'a45180e5'
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
        let {
            model,
            showFieldError,
            handleChange,
            isLoading,
            isFormValid,
            userPermission
        } = this.props

        let userModuleActs = _.get(userPermission, "userModuleActs")
        let packageModules = _.get(userPermission, "packageModules")

        return(
            <MainLayout>
                <Grid.Row>
                    <Grid columns={1} divided>
                        <Grid.Column width={16}>
                            <Form>
                                <Form.Field>
                                    <label>Full name</label>
                                    <Input name='fullName'
                                        error={showFieldError(_.get(model, 'fullName'))}
                                        onChange={handleChange}
                                        placeholder='Full name ...' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Phone</label>
                                    <Input name='phone'
                                        error={showFieldError(_.get(model, 'phone'))}
                                        onChange={handleChange}
                                        placeholder='Phone ...' />
                                </Form.Field>
                                <Form.Field>
                                    {
                                        packageModules && <ListModule
                                            handleOnChange={this.handleUpdateUserModules}
                                            items={packageModules}
                                            userPackageModuleActs={userModuleActs}
                                        />
                                    }
                                </Form.Field>
                                <Button onClick={this.handleSubmitData} type='submit'>Submit</Button>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
            </MainLayout>
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