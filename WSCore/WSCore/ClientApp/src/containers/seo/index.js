import {Form, Input, TextArea} from 'semantic-ui-react'
import _ from 'lodash'
import {BuildField} from '../../form/fields/field'
import SeoModel from './seo.model'
import { Fragment } from 'react'

const SeoForm = (props) => {
    let {
        onShowFieldError,
        onShowFieldErrorRemain,
        model,
        isLoading,
        handleChange,
        customErrorRemain
    } = props

    return (
        <Fragment>
            <Form.Field>
                <label>{_.get(model, 'seoTitle')?.label}</label>
                <Input name={'seoTitle'}
                error={onShowFieldError(_.get(model, 'seoTitle'))}
                disabled={!!isLoading}
                value={_.get(model, 'seoTitle').value || ''}
                onChange={handleChange} placeholder={`${_.get(model, 'seoTitle')?.label} ...`} />
                {/* Error remain */}
                {onShowFieldErrorRemain(_.get(model, 'seoTitle'), customErrorRemain, isLoading)}
            </Form.Field>
            <Form.Field>
                <label>{_.get(model, 'seoContent')?.label}</label>
                <TextArea name={'seoContent'}
                className={onShowFieldError(_.get(model, 'seoContent')) ? 'error' : ''}
                disabled={!!isLoading}
                value={_.get(model, 'seoContent')?.value || ''}
                onChange={handleChange} placeholder={`${_.get(model, 'seoContent')?.label} ...`} />
                {/* Error remain */}
                {onShowFieldErrorRemain(_.get(model, 'seoContent'), customErrorRemain, isLoading)}
            </Form.Field>
            <Form.Field>
                <label>{_.get(model, 'seoKeyWord')?.label}</label>
                <TextArea name={'seoKeyWord'}
                className={onShowFieldError(_.get(model, 'seoKeyWord')) ? 'error' : ''}
                disabled={!!isLoading}
                value={_.get(model, 'seoKeyWord')?.value || ''}
                onChange={handleChange} placeholder={`${_.get(model, 'seoKeyWord')?.label} ...`} />
                {/* Error remain */}
                {onShowFieldErrorRemain(_.get(model, 'seoKeyWord'), customErrorRemain, isLoading)}
            </Form.Field>
        </Fragment>
    )
}

export default SeoForm