import React from 'react'
import {Form, Input, TextArea} from 'semantic-ui-react'
import { ImageUpload } from '../../components/ImageUpload'

/**
 * 
 * @param {*} props , model = model['itemName']
 */
export function BuildField(props){
    const {
        fieldType,
        fieldItem,
        handleChange,
        isLoading,
        customErrorRemain,
        onShowFieldError,
        onShowFieldErrorRemain,
        currentImg
    } = props
    
    switch(fieldType){
        case 'text':
            return (
                <Form.Field>
                    <label>{fieldItem?.label}</label>
                    <Input name={fieldItem?.name}
                    error={onShowFieldError(fieldItem)}
                    disabled={!!isLoading}
                    value={fieldItem?.value || ''}
                    onChange={handleChange} placeholder={`${fieldItem?.label} ...`} />
                    {/* Error remain */}
                    {onShowFieldErrorRemain(fieldItem, customErrorRemain, isLoading)}
                </Form.Field>
            )
        case 'textarea':
            return(
                <Form.Field>
                    <label>{fieldItem?.label}</label>
                    <TextArea name={fieldItem?.name}
                    className={onShowFieldError(fieldItem) ? 'error' : ''}
                    disabled={!!isLoading}
                    value={fieldItem?.value || ''}
                    onChange={handleChange} placeholder={`${fieldItem?.label} ...`} />
                    {/* Error remain */}
                    {onShowFieldErrorRemain(fieldItem, customErrorRemain, isLoading)}
                </Form.Field>
            )
        case 'imageupload':
            return(
                <Form.Field>
                    <ImageUpload
                        handleChange = {handleChange}
                        currentImg = {currentImg}
                    />
                </Form.Field>
            )
        default:
        break
    }
}