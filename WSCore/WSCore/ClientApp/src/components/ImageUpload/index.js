import React, { useState } from "react"
import {Icon, Button} from 'semantic-ui-react'
export const ImageUpload = (props) => {
    const [imageData, setImageData] = useState({
        imagePreviewUrl: null,
        imageFile: null,
        imageFileName: null
    })

    const fileChange = (e) => {
        var file = e.target.files[0]
        var fileName = e.target.files[0].name
        var reader = new FileReader()
        
        reader.readAsDataURL(file)
        reader.onloadend = function (e) {
            setImageData({
                imagePreviewUrl: reader.result,
                imageFile: file,
                imageFileName: fileName
            })
            props.handleChange(this, {name: 'file', value: file})
        }
    }

    return (
        <div>
            {
                imageData.imagePreviewUrl
                ? <div className='image-preview-thumb'>
                    <img src={imageData.imagePreviewUrl} alt='' />
                </div>
                : <div>
                    <label>Thumbnail & upload </label>
                        <Button as="label" htmlFor="file" type="button" animated="fade">
                            <Button.Content visible>
                                <Icon name="file" />
                            </Button.Content>
                            <Button.Content hidden>Choose a File</Button.Content>
                        </Button>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            hidden
                            onChange={fileChange}
                        />
                    </div>
            }
        </div>
    )
}