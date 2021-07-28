import { Component } from 'react'
import {Dropdown} from 'semantic-ui-react'

class MultipleSelected extends Component {
    constructor(props){
        super(props)
        this.state = {
            options: props.items
        }
    }

    handleAddition = (e, { value }) => {
        this.setState((prevState) => ({
          options: [{ key: value, text: value, value, }, ...prevState.options],
        }))
    }

    handleChange = (e, { value }) => this.setState({ currentValues: value })

    render(){
        let {currentValues, options} = this.state
        return (
            <Dropdown
            options={options}
            placeholder='Choose tags'
            search
            selection
            fluid
            multiple
            allowAdditions
            value={currentValues || []}
            onAddItem={this.handleAddition}
            onChange={this.handleChange}
          />
        )
    }
}

export default MultipleSelected