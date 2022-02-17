import {Component} from 'react'
import {unwrapResult} from '@reduxjs/toolkit'
import _ from 'lodash'
import MenuModel from './menu.model'
import {controlled, objectDefault} from '../../data/enums'

class MenuFactory extends Component{
    constructor (props){
        super(props)
        this.state = {
            model: MenuModel?.model(),
            allMenuList: [],
        }
        this.userModuleActs = []
        this.menuType = objectDefault.MENU
        this.currentId = null
    }

    async componentDidMount(){
        this.getObjects()
    }

    async deleteObjectBy(menuId){
        console.log('=====this.props33:', this.props)
        await this.props.deleteMenuBy({url: `menus/${menuId}`})

        // Get refresh categories
        this.getObjects()
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
}

export default MenuFactory