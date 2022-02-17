import React from 'react'
import {unwrapResult} from '@reduxjs/toolkit'
import _ from 'lodash'
import {connect} from 'react-redux'
import {
    getListMenus,
    getDetailMenu,
    getMenuBy,
    updateMenu,
    deleteMenuBy,
    setCurrentMenus
} from '../../reduxStore/actions/menu.actions'
import MenuModel from './menu.model'
import {WithFormBehavior} from '../../form'
import {actions, objectDefault} from '../../data/enums'
import {getModuleActPermissions} from '../../utilities/cookies'
import MenuContainer from './container'
import {initModel} from '../../form/common'

import MenuFactory from './menu.factory'
class AddMenu extends MenuFactory {
    
    async componentDidMount(){
        super.componentDidMount()

        let id = this.props.match.params.id
        if(!id) return
        await this.getObjectBy(this.props.match.params.id)
        this.userModuleActs = getModuleActPermissions(objectDefault.MENU)
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            // Fetch data
            await this.getObjectBy(this.props.match.params.id)
        }
    }

    updateItemInList(currentList, newItem, id){
        let newList = _.clone(currentList)
        if(newItem && id && newList?.length > 0){
            let idx = _.findIndex(newList, el => el.id === id)
            if(idx >= 0){
                newList[idx] = newItem
            }
        }
        return newList
    }

    async handleUpdateObject(e){
        e.preventDefault();
        let { model, isFormValid } = initModel(this.state.model, true)
        if(isFormValid){
            let payload = {
                url: `menus/${this.currentId}`,
                menuId: this.currentId,
                body: {
                    title: _.get(model, 'title')?.value,
                    excerpt: _.get(model, 'excerpt')?.value,
                    parentId: _.get(model, 'parentId')?.value,
                    customUrl: ''
                }
            }
            let {error, result} = unwrapResult(await this.props.updateMenu(payload))
            if(error) return

            if(result){
                let {currentMenus} = this.props
                let res = result.menu
                let newList = this.updateItemInList(currentMenus,
                    {
                        id: res.id,
                        title: res.title,
                        excerpt: res.excerpt,
                        parentId: res.parentId,
                        menuType: res.menuType,
                        customUrl: result.customUrl
                    }
                    , this.currentId)
                this.props.setCurrentMenus(newList)
            }
        }
    }

    async getObjectBy(objectId){
        
        // fetch data
        let id = objectId
        if(!id) return

        this.currentModel = actions.EDIT
        this.currentId = id
        let {error, result} = unwrapResult(await this.props.getMenuBy({url: `menus/edit/${id}`}))
        if(error) return

        if(result && !result.error){
            let res = result?.menu
            Object.keys(this.state.model).forEach((key) => {
                this.state.model[key].value = (res && res[key]) ? res[key] : ""
            })

            // Re-Initi validate Model
            let {reValidModel} = this.props
            reValidModel(this.state.model, true)
            this.setState({model: this.state.model})

            this.getObjects(result?.menu?.type)
        }
    }

    handleChangeSingleSelected(e, data){
        this.props.handleDropdownChange('parentId', data)
    }

    render() {
        let {allMenuList} = this.state
        return (
            <MenuContainer
                {...this.props}
                handleDropdownChange={this.handleChangeSingleSelected.bind(this)}
                onHandleAction = {this.handleUpdateObject.bind(this)}
                onDeleteObjectBy = {this.deleteObjectBy.bind(this)}
                allMenuList = {allMenuList}
            />
        )
    }
}

const mapStateToProps = (state) => {
    let {menu} = state
    return {
        currentMenu: menu.currentMenu,
        currentMenus: menu.currentMenus,
        isLoading: menu.isLoading
    }
}

const mapDispatchToProps = {
    getListMenus,
    getDetailMenu,
    getMenuBy,
    updateMenu,
    deleteMenuBy,
    setCurrentMenus
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithFormBehavior(AddMenu, MenuModel.model()))
