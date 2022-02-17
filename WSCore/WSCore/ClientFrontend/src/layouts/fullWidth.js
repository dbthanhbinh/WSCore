import {Container, Grid} from 'semantic-ui-react'
import {layoutColumnsWidth} from '../data/enums'

function FullWidth(props) {
    return(
        <div className='sec-main'>
            <Container>
                <Grid columns={1}>
                    <Grid.Row>
                        <Grid.Column width={layoutColumnsWidth.FULL_WIDTH}>
                            {props.mainbody}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
}
export default FullWidth