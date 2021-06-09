import React from 'react'
import { Form, Input } from 'semantic-ui-react'

const defaultValue = (model) => {
    return (model && model.value) ? model.value : ''
}

/**
 * 
 * @param {*} props , model = model['itemName']
 */
export function BuildField(props){
    const { ref, onChange, model } = props
    switch(model.type){
        case 'text':
            const nameField = model || {};
            return (
                <Form.Field
                    name={model.name}
                    ref={ref}
                    id={model.id || model.name}
                    control={Input}
                    label={model.label || model.name}
                    placeholder={model.placeholder || model.name}
                    value={defaultValue(model)}
                    onChange={onChange}
                    required={ (nameField) && !!nameField.required}
                    error={ (nameField) && !nameField.isValid}
                />
            )
        default:
        break
    }
}