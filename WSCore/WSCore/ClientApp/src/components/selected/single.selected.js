import { useEffect, useState } from 'react'
import {Dropdown} from 'semantic-ui-react'

const SingleSelected = (props) => {
    const [currentValue, setCurrentValue] = useState([])
    const [options, setOptions] = useState([])

    useEffect(() => {
        setOptions(props.options)
        setCurrentValue(props.currentValue)
    }, [props.currentValue, props.options])

    const handleChange = (e, { value }) => {
        setCurrentValue(value)
        props.onHandleChange && typeof props.onHandleChange === 'function' && props.onHandleChange(e, value)
    }

    return (
        <Dropdown
        options={options}
        placeholder='Choose item'
        search
        selection
        fluid
        value={currentValue}
        onChange={handleChange}
      />
    )
}

export default SingleSelected