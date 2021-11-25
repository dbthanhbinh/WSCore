import {Container, Grid} from 'semantic-ui-react'

function FullWidth() {
    return(
        <Container>
            <Grid columns={1}>
                <Grid.Row>
                    <Grid columns={1} divided>
                        Full width
                    </Grid>
                </Grid.Row>
            </Grid>
        </Container>
    )
}
export default FullWidth