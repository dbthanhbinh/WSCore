import { Cookies } from 'react-cookie'
import {cookiesDefault} from '../data/enums'
import _ from 'lodash'

class CookiesData {

}


export const getModuleActPermissions =  (moduleName) => {
    const cookies = new Cookies().get(cookiesDefault.key)

    if(cookies) {
        const packageModules = _.get(cookies, 'userData.loggedPermissions.packageModules')
        const loggedProfile = _.get(cookies, 'userData.loggedProfile')
        const userModuleActs = _.get(cookies, 'userData.loggedPermissions.userModuleActs')
        
        const packageModuleItem = packageModules?.find(
                elm => elm.moduleAlias === moduleName &&
                elm.userId === loggedProfile?.userId
            )

        let userModuleActItem = []
        userModuleActItem = packageModuleItem && userModuleActs?.find(
                elm => elm.moduleId === packageModuleItem.moduleId &&
                elm.userId === packageModuleItem.userId &&
                elm.packageId === packageModuleItem.packageId 
            )
        return userModuleActItem?.acts?.split(',') || [];

    } else {
        return null;
    }
}

export const checkHasPermission =  (permissions, currentAction) => {
    if(!permissions || !currentAction) return false
    return permissions.includes(currentAction)
}

export const checkIsLoggedIn = () => {
    const cookies = new Cookies().get(cookiesDefault.key)
    const loggedData = _.get(cookies, 'loggedData')
    const isAuthenticated = _.get(cookies, 'isAuthenticated')
    if(!loggedData || !isAuthenticated) {
        var unauthorizedRedirect = "/login"
        window.location.href = unauthorizedRedirect;
        // return false
    } else return true
}