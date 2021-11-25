import {Image} from 'semantic-ui-react'

const Thumbnail = (props) => {
    return <div className='thumb-preview'>
        <Image src = {props.src} alt = {props.alt || ''} title = {props.title || ''} />
    </div>
}

export default Thumbnail