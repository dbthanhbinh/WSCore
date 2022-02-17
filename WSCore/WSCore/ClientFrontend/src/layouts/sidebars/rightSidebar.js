import { Fragment } from 'react'
import ImageWidget from '../../components/widgets/imageWidget'
import PopularWidget from '../../components/widgets/popularWidget'
import YouTubeEmb from '../../components/widgets/videoWidget'
import {sidebarData} from '../../data/sidebarData'

function RightSidebar(){
    var url = 'https://www.youtube.com/watch?v=NJGbIIub3sM'

    return (
        <Fragment>
            {
                sidebarData && sidebarData.length > 0 && sidebarData.map(elm => {
                    switch(elm.objectType) {
                        case 'ImageWidget':
                            return <ImageWidget key={elm.objectType}/>
                        case 'YouTubeEmb':
                            return <YouTubeEmb url={url} key={elm.objectType}/>
                        case 'PopularWidget':
                            return <PopularWidget key={elm.objectType}/>
                        default:
                            return null
                    }
                })
            }
        </Fragment>
    )
}

export default RightSidebar