import React, {Component} from 'react'
import _ from 'lodash'
import {Checkbox} from 'semantic-ui-react'
import {userActions} from '../../data/enums'

class ListModule extends Component {
    constructor(props){
        super(props)
        this.state = {
            ListModules: [],
            currentCheckedId: null
        }
        this.handleCheckboxClicked = this.handleCheckboxClicked.bind(this)
        this.buildActions = this.buildActions.bind(this)
        this.setModuleCheckedList = this.setModuleCheckedList.bind(this)
    }

    componentDidMount(){
        this.setModuleCheckedList()
    }

    handleCheckboxClicked = (e, data) => {
        let {ListModules} = this.state
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
        let {ListModules} = this.state
        
        return ListModules && ListModules.length > 0 && ListModules.map((item, i) => {
            let refdata = {
                type: 'module',
                itemId: item.moduleId,
                moduleId: item.moduleId,
                packageId: item.packageId
            }
            let acts = this.buildActions(item)

            return <div key={i.toString()}>
                    <Checkbox
                        label={item.moduleTitle}
                        value={item.moduleId}
                        defaultChecked={item.isChecked}
                        onChange={this.handleCheckboxClicked}
                        refdata={refdata}
                    />
                    <ul>
                        {acts}
                    </ul>
                </div>
        })
    }

    // Set init default
    setModuleCheckedList = () => {
        let {userPackageModuleActs, items} = this.props
        let ListModules = []

        items && items.length > 0 && items.forEach((elm, i) => {
            let moduleItem = userPackageModuleActs && userPackageModuleActs.length > 0
                && userPackageModuleActs.find((ch) => ch.moduleId === elm.moduleId && ch.packageId === elm.packageId)
            let acts = typeof moduleItem !== 'undefined' ? ((moduleItem.acts && moduleItem.acts.length > 0) ? moduleItem.acts.split(',') : []) : [] 

            ListModules.push({
                itemId: elm.moduleId,
                moduleId: elm.moduleId,
                moduleTitle: elm.moduleTitle,
                packageId: elm.packageId,
                isChecked: (typeof moduleItem !== 'undefined' || (acts && acts.length)) > 0 ? true : false,
                acts: acts,
                hasActs: (acts && acts.length) > 0 ? true : false,
                limit: typeof moduleItem !== 'undefined' ? moduleItem.limit : 0,
                itemReadonly: false,
                actsReadonly: (typeof moduleItem !== 'undefined' || (acts && acts.length)) > 0 ? false : true,
            })
        })

        this.setState({ListModules}, () => {
            this.props.handleOnChange(ListModules)
        })
    }

    render(){
        return(
            <div>
                {this.checkBoxItems(this.props.items)}
            </div>
        )
    }
}

export default ListModule