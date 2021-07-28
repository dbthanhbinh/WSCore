import React from 'react'
import { getInputData, initModel, reInitModel, setFieldValue, validatorModel } from './common'

const WithFormBehavior = (WrappedComponent, rawModel) => {
    return class extends React.Component {
        constructor(props) {
            super(props)
            let { model, isFormValid } = initModel(rawModel, true)
            this.state = {
                isFormValid,
                model: model
            }

            this.handleChange = this.handleChange.bind(this)
            this.handleSubmit = this.handleSubmit.bind(this)
            this.handleMultipleChange = this.handleMultipleChange.bind(this)
            this.reValidModel = this.reValidModel.bind(this)
        }

        handleChange = (e, data) => {
            const { name, value } = getInputData(e, data)

            this.setState((prevState)=>{
                let { model, isFormValid } = setFieldValue(name, value, prevState.model)
                return { model, isFormValid }
            })
        }

        reValidModel = (reModel) => {
            this.setState((prevState)=>{
                let { model, isFormValid } = reInitModel(reModel, false)
                return { model, isFormValid }
            })
        }

        handleMultipleChange = (name, value) => {
            this.setState((prevState)=>{
                let { model, isFormValid } = setFieldValue(name, value, prevState.model)
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
                reValidModel = {this.reValidModel}
                handleSubmit = { this.handleSubmit }
                handleMultipleChange = { this.handleMultipleChange }
            />
        }
    }
}

export { WithFormBehavior }