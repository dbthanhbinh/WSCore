import React from 'react'
import { getInputData, initModel, setFieldValue, validatorModel } from './common'

const WithFormBehavior = (WrappedComponent, rawModel) => {
    return class extends React.Component {
        constructor(props) {
            super(props)
            let { model, isFormValid } = initModel(rawModel)
            this.state = {
                isFormValid,
                model
            }

            this.handleChange = this.handleChange.bind(this)
            this.handleSubmit = this.handleSubmit.bind(this)
            this.handleMultipleChange = this.handleMultipleChange.bind(this)
        }

        handleChange = (e, data) => {
            const { name, value } = getInputData(e, data)

            this.setState((prevState)=>{
                let { model, isFormValid } = setFieldValue(name, value, prevState)
                return { model, isFormValid }
            })
        }

        handleMultipleChange = (name, value) => {
            this.setState((prevState)=>{
                let { model, isFormValid } = setFieldValue(name, value, prevState)
                return { model, isFormValid }
            })
        }

        handleSubmit = (cb) => {
            var { isFormValid, model } = this.state
            let validData = validatorModel(model)
            if(isFormValid) {
                this.setState((prevState)=>{
                    return cb({ model: validData.model, isFormValid: validData.isFormValid })
                })
            }
        }

        render() {
            let { isFormValid, model } = this.state
            return <WrappedComponent
                { ...this.props }
                model={model}
                isFormValid = { isFormValid }
                handleChange = { this.handleChange }
                handleSubmit = { this.handleSubmit }
                handleMultipleChange = { this.handleMultipleChange }
            />
        }
    }
}

export { WithFormBehavior }