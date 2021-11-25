import { unwrapResult } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import {Dropdown} from 'semantic-ui-react'

const MultipleSelected = (props) => {
    const [currentValues, setCurrentValues] = useState([])
    const [currentList, setCurrentList] = useState([])

    useEffect(() => {
        setCurrentList(props.options)
        setCurrentValues(props.currentValues)
    }, [props.currentValues, props.options])

    const handleAddition = (e, { value }) => {
        if(value){
            props.handleAddition && typeof props.handleAddition === 'function' && props.handleAddition(value)
            setCurrentList(currentList)
        }

        // currentList.push({ key: value, text: value, value })
        // setCurrentList(currentList)
    }

    const handleChange = (e, { value }) => {
        setCurrentValues(value)
        props.onHandleChange && typeof props.onHandleChange === 'function' && props.onHandleChange(e, value)
    }

    return (
        <Dropdown
        options={currentList}
        placeholder='Choose tags'
        search
        selection
        fluid
        multiple
        allowAdditions
        value={currentValues || []}
        onAddItem={handleAddition}
        onChange={handleChange}
      />
    )
}

export default MultipleSelected