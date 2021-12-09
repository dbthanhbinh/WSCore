import {Container, Grid, Dropdown, Menu} from 'semantic-ui-react'
import {menuData} from '../../data/menuData'
import { Link } from 'react-router-dom'

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
          <div key={item.id.toString()}>
            {
              item.hasChilds &&
              renderSubmenu(item.childs, currentId, _parentId, myLevel)
            }
          </div>
      )
  })
}

function PrimaryMenu(props){
  const activeItem = 'home'
  const {data} = menuData

  let menus = renderSubmenu(data, null, null, 0)

  console.log('=====', menus)
  return (
    <div className='sec-menu'>
      <Container>
        <Grid columns={1}>
          <Grid.Row>
            <Grid.Column width={16}>
              <Menu inverted secondary>
                {
                  data.map(elm => {
                    return <Menu.Item
                      key={elm.id}
                      name={elm.name}
                      active={activeItem === elm.slug}
                    >
                      <Dropdown item text='Display Options'>
                        <Dropdown.Menu>
                          <Dropdown.Header>Text Size</Dropdown.Header>
                          <Dropdown.Item>Small</Dropdown.Item>
                          <Dropdown.Item>Medium</Dropdown.Item>
                          <Dropdown.Item>
                            <Dropdown item text='Display Options'>
                              <Dropdown.Menu>
                                <Dropdown.Header>Text Size</Dropdown.Header>
                                <Dropdown.Item>Small</Dropdown.Item>
                                <Dropdown.Item>Medium</Dropdown.Item>
                                <Dropdown.Item>Large</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Menu.Item>  
                  })
                }
                 
              </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  )
}

export default PrimaryMenu