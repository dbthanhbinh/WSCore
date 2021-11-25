import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
function RightSidebar(){
    const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    
    return (
        <Item.Group divided>
            <Item>
                <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                <Item.Content>
                    <Item.Header as='a'>12 Years a Slave</Item.Header>
                    <Item.Meta>
                    <span className='cinema'>Union Square 14</span>
                    </Item.Meta>
                    <Item.Description>{paragraph}</Item.Description>
                </Item.Content>
            </Item>
            <Item>
                <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                <Item.Content>
                    <Item.Header as='a'>12 Years a Slave</Item.Header>
                    <Item.Meta>
                    <span className='cinema'>Union Square 14</span>
                    </Item.Meta>
                    <Item.Description>{paragraph}</Item.Description>
                </Item.Content>
            </Item>
            <Item>
                <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                <Item.Content>
                    <Item.Header as='a'>12 Years a Slave</Item.Header>
                    <Item.Meta>
                    <span className='cinema'>Union Square 14</span>
                    </Item.Meta>
                    <Item.Description>{paragraph}</Item.Description>
                </Item.Content>
            </Item>
            <Item>
                <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                <Item.Content>
                    <Item.Header as='a'>12 Years a Slave</Item.Header>
                    <Item.Meta>
                    <span className='cinema'>Union Square 14</span>
                    </Item.Meta>
                    <Item.Description>{paragraph}</Item.Description>
                </Item.Content>
            </Item>
            <Item>
                <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                <Item.Content>
                    <Item.Header as='a'>12 Years a Slave</Item.Header>
                    <Item.Meta>
                    <span className='cinema'>Union Square 14</span>
                    </Item.Meta>
                    <Item.Description>{paragraph}</Item.Description>
                </Item.Content>
            </Item>
        </Item.Group>
    )
}

export default RightSidebar