import {Grid, Checkbox, Image} from 'semantic-ui-react'

const GridLayout = () => {
    return <Grid.Row columns={2}>
        <Grid.Column>
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
        </Grid.Column>
        <Grid.Column>
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
        </Grid.Column>
    </Grid.Row>
}

export default GridLayout