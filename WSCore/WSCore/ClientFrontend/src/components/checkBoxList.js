import {Component, React} from 'react'
import {Checkbox} from 'semantic-ui-react'

class CheckBoxList extends Component {
    constructor(props){
        super(props)
    }
    checkBoxItems = (items) => {
        return items && items.length > 0 && items.map((item, i) => {
            return <Checkbox key={item.id.toString()} label={item.name} value={item.id} />
        })
    }
    render(){
        return(
            <ul>
                {this.checkBoxItems(this.props.items)}
            </ul>
        )
    }
}

export default CheckBoxList