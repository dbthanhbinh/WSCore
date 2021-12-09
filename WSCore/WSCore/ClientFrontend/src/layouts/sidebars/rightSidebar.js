import { Fragment } from 'react'
import ImageWidget from '../../components/widgets/imageWidget'
import PopularWidget from '../../components/widgets/popularWidget'

function RightSidebar(){

    return (
        <Fragment>

            {/* Galleyry */}
            <ImageWidget />            

            {/* Pupular */}
            <PopularWidget />

        </Fragment>
    )
}

export default RightSidebar