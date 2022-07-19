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
    getUserPermissions,
    updateUser
} from '../../reduxStore/actions/member.actions'

class EditUser extends Component{

    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            userModules: [],
            ListModules: [],
            model: this.props?.model
        }
        this.currentUserId = null
        this.handleUpdateUserModules = this.handleUpdateUserModules.bind(this)
        this.handleSubmitData = this.handleSubmitData.bind(this)
    }

    async componentDidMount() {
        
        let id = this.props.match.params.id
        if(!id) return
        this.currentUserId = id
        let payload = {
            userId: id
        }
        // List all modules available for this user
        let {error, result } =  unwrapResult(await this.props.getDetailUser(payload))
        if(error) return false
        if(result) {
            // Permissions for Modules and Actions
            unwrapResult(await this.props.getUserPermissions(payload))
            const {userPermissions} = this.props
            const modules = _.get(userPermissions, "modules")
            const moduleActiveIds = _.get(userPermissions, "moduleActiveIds")

            console.log('=====modules:', modules)
            
            // let userModuleActs = _.get(userPermissions, "userModuleActs")
            // let packageModules = _.get(userPermissions, "packageModules")
            
            
            const ListModules = this.setModuleCheckedList(modules, moduleActiveIds)
            this.setState({ListModules})
        }
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
                UserId: this.currentUserId,
                Modules: newPayload ? JSON.stringify(newPayload) : null
            }
        }
        this.props.updateUser(payload)
    }

    // Set init default
    setModuleCheckedList = (modules) => {
        let ListModules = []
        
        modules && modules.length > 0 && modules.forEach((elm, i) => {
            let acts = []
            acts = (elm && elm.userModuleActs && elm.userModuleActs.length > 0) ? elm.userModuleActs.split(',') : []
            ListModules.push({
                itemId: elm.id,
                moduleId: elm.id,
                moduleTitle: elm.title,
                packageId: elm.packageId,
                isChecked: (acts && acts.length) > 0 ? true : false,
                acts: acts,
                hasActs: (acts && acts.length) > 0 ? true : false,
                limit: 0,
                itemReadonly: false,
                actsReadonly: false,
            })
        })
        return ListModules
    }

    render(){
        let {
            model,
            showFieldError,
            handleChange,
            isLoading,
            isFormValid,
            currentUser,
            userPermissions
        } = this.props

        let {ListModules} = this.state

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
                                        ListModules && <ListModule
                                            handleOnChange={this.handleUpdateUserModules}
                                            ListModules={ListModules}
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
    const {userStore} = state
    return {
        currentUser: userStore.currentUser,
        userPermissions: userStore.userPermissions
    }
}
  
const mapDispatchToProps = {
    getDetailUser,
    setCurrentUser,
    getUserPermissions,
    updateUser
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithFormBehavior(EditUser, EditModel.model()))