import {Container, Grid} from 'semantic-ui-react'
import {layoutColumnsWidth} from '../data/enums'

function RightLayout(props) {
    return(
        <Container>
            <Grid columns={1}>
                <Grid.Row>
                    <Grid columns={1} divided>
                        <Grid.Column width={layoutColumnsWidth.MAIN_BODY_W}>
                            {props.mainbody}
                        </Grid.Column>
                        <Grid.Column width={layoutColumnsWidth.RIGHT_SB_W}>
                            {props.rightsidebar}
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
            </Grid>
        </Container>
    )
}
export default RightLayout