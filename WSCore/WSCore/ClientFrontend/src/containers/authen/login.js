import { Component } from "react"
import _ from 'lodash'
import {unwrapResult} from '@reduxjs/toolkit'
import {connect} from 'react-redux'
import { Grid, Form, Button, Input, Header, Image, Message, Segment } from 'semantic-ui-react'
import { withCookies } from 'react-cookie'
import {cookiesDefault} from '../../data/enums'

import LoginModel from './login.model'
import { WithFormBehavior } from "../../form"
import NoneLayout from '../../layouts/noneLayout'
import {
    logInUser
} from '../../reduxStore/actions/authen.actions'


class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            model: props?.model
        }
        this.handleLoginUser = this.handleLoginUser.bind(this)
    }

    async handleLoginUser(e){
        let {model} = this.state
        let {cookies} = this.props
        e.preventDefault();

        let payload = {
            Phone: _.get(model, 'phone')?.value,
            Password: _.get(model, 'password')?.value
        }

        let {error, result } = unwrapResult(await this.props.logInUser({
            url: `login`,
            body: payload
        }))
        if(error) {
            let loggedCookies = {}
            loggedCookies.loggedData = null
            loggedCookies.isAuthenticated = false
            cookies.set(cookiesDefault.key, loggedCookies, { path: '/' })
            return false
        }

        if(result){
          // set user profile after logged in success
          let loggedCookies = {}
          loggedCookies.userData = result
          loggedCookies.isAuthenticated = true
          cookies.set(cookiesDefault.key, loggedCookies, { path: '/' })
          window.location.href = '/'
        }
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
            <NoneLayout>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image src='/logo.png' /> Log-in to your account
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left'
                                    name='phone'
                                    error={showFieldError(_.get(model, 'phone'))}
                                    onChange={handleChange}
                                    placeholder='Phone ...'
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    name='password'
                                    error={showFieldError(_.get(model, 'password'))}
                                    onChange={handleChange}
                                    type='password'
                                    placeholder='Password ...'
                                />
                                <Button
                                    color='teal' fluid size='large'
                                    disabled={!isFormValid || !!isLoading}
                                    loading={!!isLoading}
                                    onClick={isFormValid ? this.handleLoginUser : null}
                                    type='submit'>Logged in</Button>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <a href='#'>Sign Up</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </NoneLayout>
        )
    }
}

const mapStateToProps = (state) => {
    let {authen} = state
    return {
        currentAuthen: authen.currentAuthen,
        isLoading: authen.isLoading
    }
}

const mapDispatchToProps = {
    logInUser
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithFormBehavior(withCookies(Login), LoginModel.model()))