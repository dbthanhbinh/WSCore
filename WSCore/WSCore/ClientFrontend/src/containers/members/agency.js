import { Component, Fragment } from "react"
import {Form, Checkbox, Button} from 'semantic-ui-react'

class Agency extends Component{

    render(){

        return(
            <Fragment>
                <Form>
                    <Form.Field>
                        <label>Phone</label>
                        <input placeholder='Phone ...' />
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input placeholder='Email' />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input placeholder='Password ...' />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </Fragment>
        )
    }
}

export default Agency