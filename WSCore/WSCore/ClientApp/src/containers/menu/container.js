import React from 'react'
import {Grid} from 'semantic-ui-react'
import MainLayout from '../../layouts'
import MenuForm from './form'
import {controlled, actions} from '../../data/enums'
import ListItems from './listItems'

const MenuContainer = (props) => {
    console.log('=====props:', props)
    let {
        onHandleAction,
        onDeleteObjectBy,
        handleDropdownChange,
        showFieldError,
        showFieldErrorRemain,
        handleChange,
        currentMenus,
        isLoading,
        isFormValid,
        model,
        allMenuList
    } = props
    return(
        <MainLayout>
            <Grid.Row>
                <Grid columns={1} divided>
                    <Grid.Column width={5}>
                        <MenuForm
                            isShowTabMenu={true}
                            model = {model}
                            isLoading = {isLoading}
                            isFormValid = {isFormValid}
                            actions = {actions.ADD}
                            customErrorRemain = {showFieldErrorRemain}
                            handleChange = {handleChange}
                            handleDropdownChange = {handleDropdownChange}
                            onHandleAction = {onHandleAction}
                            onShowFieldError = { showFieldError }
                            onShowFieldErrorRemain = { showFieldErrorRemain }
                            currentList = {allMenuList}
                            currentObject = {null}
                            hasPermission={true}
                        />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <ListItems
                            currentCategories={currentMenus}
                            isLoading={isLoading}
                            currentId={null}
                            onDeleteObjectBy = {onDeleteObjectBy}
                            userModuleActs = {[]}
                            controlled = {controlled.MENUS}
                            actions = {actions}
                        />
                    </Grid.Column>
                </Grid>
            </Grid.Row>
        </MainLayout>
    )
}

export default MenuContainer