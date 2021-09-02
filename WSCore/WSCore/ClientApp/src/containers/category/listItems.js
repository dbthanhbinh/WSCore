import {Fragment, React} from 'react'
import {Table, Rating, Icon, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {uploadedAssets as uploaded} from '../../data/enums'
import Thumbnail from '../../components/thumb'

const ListItems = (props) => {
    let currentCategories = props.currentCategories || []
    let currentId = props.currentId || null

    const renderLinkItem = (id) => {
        return (id === currentId) ? <span>Edit</span> : <Link to={`/categories/edit/${id}`}>Edit</Link>
    }

    const renderRemoveItem = (id) => {
        return (id === currentId) ? <span><Icon name='remove' /></span> : <span onClick={()=>props.onDeleteCategoryBy(id)}><Icon name='remove' /></span>
    }

    const renderThumbnail = (item) => {
        return item && item.small ? <Thumbnail src={`${uploaded}/${item.small}`} /> : ''
    }

    // =========================================
    const buildMultipleLevel = (currentList = []) => {
        let newList = []
        currentList.forEach((item) => {
            newList.push({
                id: item.id,
                parentId: item.parentId,
                title: item.title
            })
        })
        return newList
    }

    const buildListOptions = (currentList, currentId, parentId = null, level = 0) => {
        let newList = getListByParentId(currentList, parentId = null)
        return renderSubmenu(newList, currentId, currentId, level)
    }

    /**
     * Build multiple level menus
     * @param {*} currentList 
     * @param {*} currentId 
     * @param {*} parentId 
     * @returns 
     */
     const renderSubmenu = (currentList, currentId, parentId, level) => {
        return currentList && currentList.length > 0 && currentList.map((item) => {
            item.hasChilds = false
            item.isDisable = false
            let _parentId = currentId
            let myLevel = level
            if (item.childs && item.childs.length > 0) {
                item.hasChilds = true
                myLevel = level+1
            }
            if (currentId && item.id === currentId) {
                item.isDisable = true
                if(item.hasChilds)
                    _parentId = item.id
            } else {
                if(parentId && item.parentId === parentId){
                    item.isDisable = true
                    if(item.hasChilds)
                        _parentId = item.id
                } else {
                    item.isDisable = false
                }
            }

            return (
                <Fragment key={item.id.toString()}>
                    <Table.Row key={item.id.toString()}>
                        <Table.Cell>
                            <span aria-disabled={true}>{getChart(level)} {item.title} - <b>{item.isDisable ? 'Yes' : 'no'}</b> {item.id.toString()}</span>
                        </Table.Cell>
                        <Table.Cell>
                            {renderLinkItem(item.id)}
                            {renderRemoveItem(item.id)}
                            <Icon name='eye' />
                        </Table.Cell>
                    </Table.Row>
                    {
                        item.hasChilds &&
                        renderSubmenu(item.childs, currentId, _parentId, myLevel)
                    }
                </Fragment>
            )
        })
    }

    const getChart = (level) => {
        let prefix = ''
        if(level === 1)
            prefix = '|-'
        else if(level === 2)
            prefix = '|- -'
        else if(level === 3)
            prefix = '|- - -'
        else if(level === 4)
            prefix = '|- - - -'
        return prefix  //'|-'
    }

    const getListByParentId = (currentList, parentId = null) => {
        let newList = null
        newList = currentList.filter((item) => item.parentId === parentId)
        if(newList && newList.length > 0){
            newList.forEach((item) => {
                item.childs = getListByParentId(currentList, item.id)
            })
        }
        return newList
    }

    let sortList = buildMultipleLevel(currentCategories)
    let buildOptioned = buildListOptions(sortList, currentId, null)

    return (
        <Table celled padded>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>ACTs</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    buildOptioned
                }
            </Table.Body>
        </Table>
    )
}

export default ListItems