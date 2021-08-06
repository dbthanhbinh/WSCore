import {Form, Input, TextArea, Button} from 'semantic-ui-react'
import _ from 'lodash'
import { ImageUpload } from '../../components/ImageUpload'
import {BuildField} from '../../form/fields/field'

const CategoryForm = (props) => {
    let {
        onShowFieldError,
        onShowFieldErrorRemain,
        model,
        isLoading,
        handleChange,
        isFormValid,
        onHandleAction,
        customErrorRemain,
        currentCategory
    } = props
    let media = _.get(currentCategory, 'media')

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

            {/* <Form.Field>
                <label>{_.get(model, 'title')?.label}</label>
                <Input name={'title'}
                error={onShowFieldError(_.get(model, 'title'))}
                disabled={!!isLoading}
                value={_.get(model, 'title').value || ''}
                onChange={handleChange} placeholder={`${_.get(model, 'title')?.label} ...`} />
                
                {onShowFieldErrorRemain(_.get(model, 'title'), customErrorRemain, isLoading)}
            </Form.Field> */}
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
            <Form.Field>
                <ImageUpload
                    handleChange = {handleChange}
                    currentImg = {media?.small || null}
                />
            </Form.Field>
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

export default CategoryForm