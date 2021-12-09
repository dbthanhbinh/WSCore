import {Container, Grid, Dropdown, Menu} from 'semantic-ui-react'
import {menuData} from '../../data/menuData'
import { Link } from 'react-router-dom'
import { Fragment } from 'react'

const buildListOptions = (currentList, currentId, parentId = null, level = 0) => {
  let newList = getListByParentId(currentList, parentId = null)
  return renderSubmenu(newList, currentId, currentId, level)
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

      let activeItem = 'home'
      return (
        <Fragment>
        {
          item && item.hasChilds
              ? <Menu.Item
                  className={`item1 ${item.id.toString()}`}
                  key={`${item.id.toString()}`}
                  name={item.name}
                  active={activeItem === item.slug}
                >
                  <Dropdown item className={`item2 ${item.id.toString()}`} text={item.name}>
                    <Dropdown.Menu>
                    {renderSubHasChild(item, currentId, _parentId, myLevel)}
                    </Dropdown.Menu>
                  </Dropdown>

                </Menu.Item>
              : <Menu.Item
              className={`item3 ${item.id.toString()}`}
                key={item.id.toString()}
                name={item.name}
                active={activeItem === item.slug}
              />
        }
        </Fragment>
      )
  })
}

const renderSubHasChild = (item, currentId, _parentId, myLevel) => {
  let activeItem = 'home'
  return (
    <Dropdown.Item key={`${item.id.toString()}-${item.name}`}>
    {
      item && renderSubmenu(item.childs, currentId, _parentId, myLevel)
    }
    </Dropdown.Item>
  )
}

function PrimaryMenu(props){
  const activeItem = 'home'
  const {data} = menuData

  // let menus = renderSubmenu(data, null, null, 0)

  // console.log('=====', menus)
  return (
    <div className='sec-menu'>
      <Container>
        <Grid columns={1}>
          <Grid.Row>
            <Grid.Column width={16}>
              <Menu inverted secondary>
                {buildListOptions(data, null, null, 0)}                 
              </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  )
}

export default PrimaryMenu