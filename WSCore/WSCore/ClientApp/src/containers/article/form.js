import {Form, Input, TextArea} from 'semantic-ui-react'
import _ from 'lodash'
import {BuildField} from '../../form/fields/field'
import SeoForm from '../seo'

const CategoryForm = (props) => {
    let {
        onShowFieldError,
        onShowFieldErrorRemain,
        model,
        isLoading,
        handleChange,
        customErrorRemain,
        currentCategory
    } = props

    return (
        <Form>
            <BuildField
                fieldItem = {_.get(model, 'title')}
                fieldType = 'text'
                handleChange = {handleChange}
                isLoading = {isLoading}
                customErrorRemain = {customErrorRemain}
                onShowFieldError = {onShowFieldError}
                onShowFieldErrorRemain = {onShowFieldErrorRemain}
            />
            <Form.Field>
                <label>{_.get(model, 'alias')?.label}</label>
                <Input name={'alias'}
                error={onShowFieldError(_.get(model, 'alias'))}
                disabled={!!isLoading}
                value={_.get(model, 'alias').value || ''}
                onChange={handleChange} placeholder={`${_.get(model, 'alias')?.label} ...`} />
                {/* Error remain */}
                {onShowFieldErrorRemain(_.get(model, 'alias'), customErrorRemain, isLoading)}
            </Form.Field>
            <Form.Field>
                <label>{_.get(model, 'content')?.label}</label>
                <TextArea name={'content'}
                className={onShowFieldError(_.get(model, 'content')) ? 'error' : ''}
                disabled={!!isLoading}
                value={_.get(model, 'content').value || ''}
                onChange={handleChange} placeholder={`${_.get(model, 'content')?.label} ...`} />
                {/* Error remain */}
                {onShowFieldErrorRemain(_.get(model, 'content'), customErrorRemain, isLoading)}
            </Form.Field>
            <Form.Field>
                <label>{_.get(model, 'excerpt')?.label}</label>
                <TextArea name={'excerpt'}
                className={onShowFieldError(_.get(model, 'excerpt')) ? 'error' : ''}
                disabled={!!isLoading}
                value={_.get(model, 'excerpt').value || ''}
                onChange={handleChange} placeholder={`${_.get(model, 'excerpt')?.label} ...`} />
                {/* Error remain */}
                {onShowFieldErrorRemain(_.get(model, 'excerpt'), customErrorRemain, isLoading)}
            </Form.Field>
            <SeoForm model={model}
                onShowFieldError={onShowFieldError}
                onShowFieldErrorRemain={onShowFieldErrorRemain}
                customErrorRemain={customErrorRemain}
                isLoading={isLoading}
                handleChange={handleChange}
            />
        </Form>
    )
}

export default CategoryForm