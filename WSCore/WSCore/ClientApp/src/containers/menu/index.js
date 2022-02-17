import React from 'react'
import {unwrapResult} from '@reduxjs/toolkit'
import _ from 'lodash'
import {connect} from 'react-redux'
import {
    getListMenus,
    createMenu
} from '../../reduxStore/actions/menu.actions'
import MenuModel from './menu.model'
import {WithFormBehavior} from '../../form'
import {controlled} from '../../data/enums'
import MenuContainer from './container'
import MenuFactory from './menu.factory'

class AddMenu extends MenuFactory {
    
    componentDidMount(){
        super.componentDidMount()
    }

    async handleCreateObject(e){
        let {model} = this.props
        e.preventDefault();

        let {error, result } = unwrapResult(await this.props.createMenu({
            url: `${controlled.MENUS}`,
            body: {
                title: _.get(model, 'title')?.value,
                excerpt: _.get(model, 'excerpt')?.value,
                customType: 'custom',
                menuType: this.menuType,
                customUrl: '',
                parentId: _.get(model, 'parentId')?.value,
            }
        }))

        if(error) return
        if(result){
            // get list objects all
            this.getObjects()   
        }
    }

    render(){
        let {allMenuList} = this.state
        return (
            <MenuContainer
                {...this.props}
                onHandleAction = {this.handleCreateObject.bind(this)}
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
    createMenu
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithFormBehavior(AddMenu, MenuModel.model()))
