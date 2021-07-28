import {Form, Input, TextArea, Button} from 'semantic-ui-react'
import _ from 'lodash'
import { ImageUpload } from '../../components/ImageUpload'

const CategoryForm = (props) => {
    let {model, isLoading, handleChange, isFormValid, onHandleAction, customErrorRemain, currentCategory} = props
    
    const showFieldError = (item) => {
        if(item){
            if(!item.isInitModel && !item.isValid)
                return true
        }
        return false
    }

    const showFieldErrorRemain = (item, customErrorRemain) => {
        if(customErrorRemain && typeof customErrorRemain === 'function')
            customErrorRemain(item)
        else if(item && !item.isValid && item.message && !isLoading){
            return <span className="error-remain">{item.message?.toString()}</span>
        }
    }

    return (
        <Form>
            <Form.Field>
                <label>Title</label>
                <Input name={'title'}
                error={showFieldError(_.get(model, 'title'))}
                disabled={!!isLoading}
                value={_.get(model, 'title').value}
                onChange={handleChange} placeholder='Title ...' />
                {/* Error remain */}
                {showFieldErrorRemain(_.get(model, 'title'), customErrorRemain)}
            </Form.Field>
            <Form.Field>
                <label>Alias</label>
                <Input name={'alias'}
                error={showFieldError(_.get(model, 'alias'))}
                disabled={!!isLoading}
                value={_.get(model, 'alias').value}
                onChange={handleChange} placeholder='Alias ...' />
                {/* Error remain */}
                {showFieldErrorRemain(_.get(model, 'alias'), customErrorRemain)}
            </Form.Field>
            <Form.Field>
                <label>Content</label>
                <TextArea name={'content'}
                className={showFieldError(_.get(model, 'content')) ? 'error' : ''}
                disabled={!!isLoading}
                value={_.get(model, 'content').value}
                onChange={handleChange} placeholder='Content ...' />
                {/* Error remain */}
                {showFieldErrorRemain(_.get(model, 'content'), customErrorRemain)}
            </Form.Field>
            <Form.Field>
                <label>Excerpt</label>
                <TextArea name={'excerpt'}
                className={showFieldError(_.get(model, 'excerpt')) ? 'error' : ''}
                disabled={!!isLoading}
                value={_.get(model, 'excerpt').value}
                onChange={handleChange} placeholder='Description ...' />
                {/* Error remain */}
                {showFieldErrorRemain(_.get(model, 'excerpt'), customErrorRemain)}
            </Form.Field>
            <Form.Field>
                <ImageUpload handleChange = {handleChange}/>
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