import {Form, Input, TextArea, Button} from 'semantic-ui-react'
import _ from 'lodash'
import { ImageUpload } from '../../components/ImageUpload'
import {BuildField} from '../../form/fields/field'
import SingleSelected from '../../components/selected/single.selected'
import SeoForm from '../seo'

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
        currentCategory,
        currentCategories,
        onHandleChange,
        hasPermission
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
                <label>Select parrent</label>
                {
                    currentCategories && <SingleSelected
                        currentValue={null}
                        options={currentCategories}
                        onHandleChange={onHandleChange}
                    />
                }
            </Form.Field>

            <SeoForm model={model}
                onShowFieldError={onShowFieldError}
                onShowFieldErrorRemain={onShowFieldErrorRemain}
                customErrorRemain={customErrorRemain}
                isLoading={isLoading}
                handleChange={handleChange}
            />
            <Form.Field>
                <ImageUpload
                    handleChange = {handleChange}
                    currentImg = {media?.small || null}
                />
            </Form.Field>
            <Form.Field>
                <Button
                    disabled={!isFormValid || !!isLoading || !hasPermission}
                    loading={!!isLoading}
                    onClick={isFormValid ? ((onHandleAction && typeof onHandleAction === 'function') ? onHandleAction : null) : null}
                    type='submit'>Save changed</Button>
            </Form.Field>
        </Form>
    )
}

export default CategoryForm