import { Component } from "react"
import _ from 'lodash'
import {unwrapResult} from '@reduxjs/toolkit'
import {connect} from 'react-redux'
import {Grid, Form, Checkbox, Button, Input} from 'semantic-ui-react'

import RegisterModel from './register.model'
import { WithFormBehavior } from "../../form"
import MainLayout from '../../layouts'
import {controlled} from '../../data/enums'
import {
    createUser
} from '../../reduxStore/actions/member.actions'

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            model: props?.model
        }
        this.handleRegisterUser = this.handleRegisterUser.bind(this)
    }

    async handleRegisterUser(e){
        let {model} = this.state
        e.preventDefault();

        let payload = {
            FullName: _.get(model, 'fullName')?.value,
            Phone: _.get(model, 'phone')?.value,
            Password: _.get(model, 'password')?.value,
            Repassword: _.get(model, 'repassword')?.value,
            Iagree: true
        }

        let {error, result } = unwrapResult(await this.props.createUser({
            url: `${controlled.USERS}`,
            body: payload
        }))
        if(error) return

    }

    render(){

        let {
            model,
            showFieldError,
            handleChange,
            isLoading,
            isFormValid
        } = this.props

        return(
            <MainLayout>
                <Grid.Row>
                    <Grid columns={1} divided>
                        <Grid.Column width={11}>
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
                                <label>Password</label>
                                <Input name='password'
                                    error={showFieldError(_.get(model, 'password'))}
                                    onChange={handleChange}
                                    placeholder='Password ...' />
                            </Form.Field>
                            <Form.Field>
                                <label>Re Password</label>
                                <Input name='repassword'
                                    error={showFieldError(_.get(model, 'repassword'))}
                                    onChange={handleChange}
                                    placeholder='Password ...' />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox name='iagree'
                                    onChange={handleChange}
                                    label='I agree to the Terms and Conditions' />
                            </Form.Field>
                            <Button
                                disabled={!isFormValid || !!isLoading}
                                loading={!!isLoading}
                                onClick={isFormValid ? this.handleRegisterUser : null}
                                type='submit'>Save changed</Button>
                        </Form>
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    let {userStore} = state
    return {
        currentUsers: userStore.currentUsers,
        currentUser: userStore.currentUser,
        isLoading: userStore.isLoading
    }
}

const mapDispatchToProps = {
    createUser
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithFormBehavior(Register, RegisterModel.model()))