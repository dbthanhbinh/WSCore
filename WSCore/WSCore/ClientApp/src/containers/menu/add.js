import React, {Component} from 'react'
import {unwrapResult} from '@reduxjs/toolkit'
import _ from 'lodash'
import {connect} from 'react-redux'
import {Grid} from 'semantic-ui-react'
import {
    getListMenus,
    createMenu
} from '../../reduxStore/actions/menu.actions'

import MainLayout from '../../layouts'
import MenuModel from './menu.model'
import {WithFormBehavior} from '../../form'
import MenuForm from './form'
import {controlled, actions, objectDefault} from '../../data/enums'
import ListItems from './listItems'
import { getModuleActPermissions, checkHasPermission } from '../../utilities/cookies'

class Menu extends Component {
    constructor(props){
        super(props)
        this.state = {
            model: props?.model,
            allMenuList: [],
        }
        this.userModuleActs = []
        this.currentModel = actions.ADD
        this.menuType = objectDefault.MENU
        this.currentId = null
        this.handleCreateObject = this.handleCreateObject.bind(this)
        this.handleChangeSingleSelected = this.handleChangeSingleSelected.bind(this)
    }

    async componentDidMount(){
        // get list object all
        this.getObjects()
        this.userModuleActs = getModuleActPermissions(objectDefault.CATEGORY)
    }

    async getObjects(){
        let type = this.props.match.params.type
        if(type)
            this.menuType = type

        let catOptions = null
        let catRes = unwrapResult(await this.props.getListMenus({url: `${controlled.MENUS}/getFilterByMenuType/${this.menuType}`}))
        
        if(catRes && catRes.result?.length >0){
            catOptions = this.buildOptions(catRes.result)
        }

        this.setState({
            allMenuList: catOptions
        })
    }
    
    async handleCreateObject(e){
        let {model} = this.state
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

    buildOptions = (currentList = []) => {
        let options = []
        if(currentList.length < 1) return options
        currentList.forEach(item => {
            options.push(
                {
                    key: item.id.toString(),
                    text: item.title,
                    value: item.id.toString()
                }
            )
        })
        return options
    }

    handleChangeSingleSelected(e, data){
        this.props.handleDropdownChange('parentId', data)
    }
    
    render(){
        let {model, allMenuList} = this.state
        let {
            showFieldError,
            showFieldErrorRemain,
            handleChange,
            currentMenus,
            isLoading,
            isFormValid
        } = this.props

        let currentId = null
        return(
            <MainLayout>
                <Grid.Row>
                    <Grid columns={1} divided>
                        <Grid.Column width={5}>
                            <MenuForm
                                isShowTabMenu={true}
                                handleChange = {handleChange}
                                model = {model}
                                isLoading = {isLoading}
                                isFormValid = {isFormValid}
                                actions = {actions.ADD}
                                customErrorRemain = {this.showFieldErrorRemain}
                                onHandleAction = {this.handleCreateObject}
                                onShowFieldError = { showFieldError }
                                onShowFieldErrorRemain = { showFieldErrorRemain }
                                onHandleChange = {this.handleChangeSingleSelected}
                                currentList = {allMenuList}
                                currentObject = {null}
                                hasPermission={checkHasPermission(this.userModuleActs, actions.ADD)}
                            />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <ListItems
                                currentCategories={currentMenus}
                                isLoading={isLoading}
                                currentId={this.currentId}
                                onDeleteCategoryBy = {null}
                                userModuleActs = {this.userModuleActs}
                                controlled = {controlled.MENUS}
                                actions = {actions}
                            />
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
            </MainLayout>
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
)(WithFormBehavior(Menu, MenuModel.model()))
