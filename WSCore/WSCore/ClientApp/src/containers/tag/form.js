import {BuildField} from '../../form/fields/field'
import {Form, Button} from 'semantic-ui-react'
import _ from 'lodash'

const TagForm = (props) => {
    let {
        isFormValid,
        onHandleChange,
        isLoading,
        customErrorRemain,
        model,
        onShowFieldError,
        onShowFieldErrorRemain,
        onHandleAction
    } = props

    return(
        <Form>
            <BuildField
                fieldItem = {_.get(model, 'title')}
                fieldType = 'text'
                handleChange = {onHandleChange}
                isLoading = {isLoading}
                customErrorRemain = {customErrorRemain}
                onShowFieldError = {onShowFieldError}
                onShowFieldErrorRemain = {onShowFieldErrorRemain}
            />
            <BuildField
                fieldItem = {_.get(model, 'alias')}
                fieldType = 'text'
                handleChange = {onHandleChange}
                isLoading = {isLoading}
                customErrorRemain = {customErrorRemain}
                onShowFieldError = {onShowFieldError}
                onShowFieldErrorRemain = {onShowFieldErrorRemain}
            />

            <Form.Field>
                <Button
                    disabled={!isFormValid || !!isLoading}
                    loading={!!isLoading}
                    onClick={isFormValid ? ((onHandleAction && typeof onHandleAction === 'function') ? onHandleAction : null) : null}
                    type='submit'>Save changed</Button>
            </Form.Field>
        </Form>
    )
}

export default TagForm