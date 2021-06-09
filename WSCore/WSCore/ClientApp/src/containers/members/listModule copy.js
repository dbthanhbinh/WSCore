import {Component, React} from 'react'
import _ from 'lodash'
import {Checkbox} from 'semantic-ui-react'
import {userActions} from '../../data/enums'

class ListModule extends Component {
    constructor(props){
        super(props)
        this.state = {
            moduleCheckedList: [],
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
        let {moduleCheckedList, currentCheckedId} = this.state
        let target = (e && e.target) ? e.target : {}
        let value = target && target.value ? target.value : (data && data.value ? data.value : '')
        let checked = target && _.isBoolean(target.checked) ? target.checked : (data && _.isBoolean(data.checked) ? data.checked : '')
        let type = target && target.type ? target.type : (data && data.type ? data.type : '')

        if (type === 'checkbox'){
            if(data?.refdata?.type === 'module'){
                if(value = checked){
                    moduleCheckedList.push({
                        itemId: data?.refdata?.itemId,
                        moduleId: data.refdata.moduleId,
                        packageId: data.refdata.packageId,
                        acts: [],
                        limit: 10
                    })

                } else {
                    let index = moduleCheckedList.findIndex((ch) => ch === data.value);
                    moduleCheckedList.splice(index, 1);
                }

                currentCheckedId =  {
                    type: 'module',
                    itemId: data?.refdata?.itemId,
                    moduleId: data.refdata.moduleId,
                    packageId: data.refdata.packageId,
                }
            }
            else if(data?.refdata?.type === 'act'){
                if(value = checked){
                    let module = moduleCheckedList.find((ch) => ch.moduleId === data.refdata.moduleId);
                    if(typeof module !== 'undefined'){
                        if(!module.acts)
                            module.acts = []
                        module.acts.push(data.value)
                    }

                } else {
                    let module = moduleCheckedList.find((ch) => ch.moduleId === data.refdata.moduleId);
                    if(typeof module !== 'undefined'){
                        let idx = module.acts.findIndex((f) => f === data.value);
                        idx >= 0 && module.acts.splice(idx, 1);
                    }
                }
                currentCheckedId = null
            }
        }

        this.setState({
            moduleCheckedList,
            currentCheckedId
        }, () => {
            this.props.handleOnChange(moduleCheckedList)
        })
    }

    buildActions = (itemId, moduleId, packageId, checkedActs, isDisableAct = false) => {
        let refdata = {
            type: 'act',
            itemId: itemId,
            moduleId: moduleId,
            packageId: packageId
        }
        checkedActs = checkedActs && checkedActs.length > 0 && checkedActs.split(',') || []
        let acts = userActions && userActions.map((item, idx) => {
            let isChecked = checkedActs && checkedActs.includes(item.key) ? true : false
            return <Checkbox
                disabled={isDisableAct}
                key={idx.toString()}
                label={item.label}
                value={item.key}
                defaultChecked={isChecked}
                onChange={this.handleCheckboxClicked}
                refdata={refdata}
            />
        })

        return acts
    }

    checkBoxItems = (items) => {
        let {moduleCheckedList, currentCheckedId} = this.state
        let {userPackageModuleActs} = this.props

        return items && items.length > 0 && items.map((item, i) => {
            // Checked module default
            let muduleItem = userPackageModuleActs && (userPackageModuleActs.find((f) => f.moduleId === item.moduleId))
            let isChecked = false
            let moduleActs = ""
            if(typeof muduleItem !== 'undefined'){
                isChecked = true
                moduleActs = muduleItem.acts
            }
            
            // Process ModuleId has checked
            let idx = moduleCheckedList.findIndex((f) => f.moduleId === item.moduleId)
            let isDisableAct = false
            if(idx <= 0){
                isDisableAct = true
            } else {
                isDisableAct = false
            }

            console.log('=====moduleCheckedList:', moduleCheckedList)
            let acts = this.buildActions(item.moduleId, item.moduleId, item.packageId, moduleActs, isDisableAct)
            let refdata = {
                type: 'module',
                itemId: item.moduleId,
                moduleId: item.moduleId,
                packageId: item.packageId
            }

            return <div key={i.toString()}>
                    <Checkbox
                        label={item.moduleTitle}
                        value={item.moduleId}
                        onChange={this.handleCheckboxClicked}
                        refdata={refdata}
                    />
                    {acts}
                    <br/>
                </div>
        })
    }

    // Set init default
    setModuleCheckedList = () => {
        let {userPackageModuleActs} = this.props
        let {moduleCheckedList} = this.state

        userPackageModuleActs && userPackageModuleActs.length > 0 && userPackageModuleActs.forEach(elm => {
            let moduleItem = moduleCheckedList.find((ch) => ch.moduleId === elm.moduleId)
            if(typeof moduleItem === 'undefined'){
                moduleCheckedList.push({
                    itemId: elm.moduleId,
                    moduleId: elm.moduleId,
                    packageId: elm.packageId,
                    acts: (elm.acts && elm.acts.length > 0) ? elm.acts.split(',') : [],
                    limit: elm.limit
                })
            }

            this.setState({moduleCheckedList})
        });
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