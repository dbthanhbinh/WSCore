import React from 'react'

function YouTubeEmb(props) {
    // var urls = 'https://www.youtube.com/watch?v=NJGbIIub3sM'
    var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    let r1 = props && props.url && props.url.match(rx);

    return r1 ? 
        <div className='widget-section videos-container'>
        <iframe
            width="300"
            height="215"
            src={`https://www.youtube.com/embed/${r1[1]}`}
            title="YouTube video player"
            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div> : ''
}

export default YouTubeEmb