import React, {Component} from 'react'
import _ from 'lodash'
import {Checkbox, Grid} from 'semantic-ui-react'
import {userActions} from '../../data/enums'

class ListModule extends Component {
    constructor(props){
        super(props)
        this.state = {
            // ListModules: [],
            currentCheckedId: null
        }
        this.handleCheckboxClicked = this.handleCheckboxClicked.bind(this)
        this.buildActions = this.buildActions.bind(this)
    }

    componentDidMount(){
    }

    handleCheckboxClicked = (e, data) => {
        let {ListModules} = this.props
        let target = (e && e.target) ? e.target : {}
        let value = target && target.value ? target.value : (data && data.value ? data.value : '')
        let checked = target && _.isBoolean(target.checked) ? target.checked : (data && _.isBoolean(data.checked) ? data.checked : '')
        let type = target && target.type ? target.type : (data && data.type ? data.type : '')

        if (type === 'checkbox'){
            if(data?.refdata?.type === 'module'){
                if(value = checked){
                    ListModules.map(f => {
                        if (f.moduleId === data.refdata.moduleId){
                            f.actsReadonly = false
                            f.isChecked = true
                        }
                    })
                } else {
                    ListModules.map(f => {
                        if (f.moduleId === data.refdata.moduleId){
                            f.actsReadonly = true
                            f.isChecked = false
                            f.acts = [] // reset acts
                        }
                    })
                }
            }
            else if(data?.refdata?.type === 'act'){
                if(value = checked){
                    let module = ListModules.find((ch) => ch.moduleId === data.refdata.moduleId);
                    if(typeof module !== 'undefined'){
                        if(!module.acts)
                            module.acts = []
                        module.acts.push(data.value)
                    }

                } else {
                    let module = ListModules.find((ch) => ch.moduleId === data.refdata.moduleId);
                    if(typeof module !== 'undefined'){
                        let idx = module.acts.findIndex((f) => f === data.value);
                        idx >= 0 && module.acts.splice(idx, 1);
                    }
                }
            }
        }

        this.setState({
            ListModules
        }, () => {
            this.props.handleOnChange(ListModules)
        })
    }

    buildActions = (itemAct) => {
        let refdata = {
            type: 'act',
            itemId: itemAct.itemId,
            moduleId: itemAct.moduleId,
            packageId: itemAct.packageId
        }
        let _acts = itemAct?.acts
        let acts = userActions && userActions.map((item, idx) => {
            let isChecked = (_acts && _acts.length > 0 && _acts.includes(item.key)) ? true : false
            return <li key={idx.toString()}>
                <Checkbox
                    disabled={itemAct.actsReadonly}
                    label={item.label}
                    value={item.key}
                    checked={isChecked}
                    onChange={this.handleCheckboxClicked}
                    refdata={refdata}
                />
            </li>
        })

        return acts
    }

    checkBoxItems = (items) => {
        let {ListModules} = this.props
        
        return ListModules && ListModules.length > 0 && ListModules.map((item, i) => {
            let refdata = {
                type: 'module',
                itemId: item.moduleId,
                moduleId: item.moduleId,
                packageId: item.packageId
            }
            let acts = this.buildActions(item)

            return <Grid.Column width={4} key={i.toString()}>
                    <Checkbox
                        label={item.moduleTitle}
                        value={item.itemId}
                        defaultChecked={item.isChecked}
                        onChange={this.handleCheckboxClicked}
                        refdata={refdata}
                    />
                    <ul>
                        {acts}
                    </ul>
                </Grid.Column>
        })
    }

    render(){
        return(
            <Grid>
                <Grid.Row>
                    {this.checkBoxItems(this.props.items)}
                </Grid.Row>
            </Grid>
        )
    }
}

export default ListModule