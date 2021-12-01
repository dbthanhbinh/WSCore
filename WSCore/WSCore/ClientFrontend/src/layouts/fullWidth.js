import {Container, Grid} from 'semantic-ui-react'

function FullWidth() {
    return(
        <div className='sec-main'>
            <Container>
                <Grid columns={1}>
                    <Grid.Row>
                        <Grid columns={1} divided>
                            Full width
                        </Grid>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
}
export default FullWidth