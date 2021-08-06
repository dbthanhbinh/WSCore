import React, { useEffect, useState } from "react"
import {Icon, Button} from 'semantic-ui-react'
import {uploadedAssets as uploaded} from '../../data/enums'
export const ImageUpload = (props) => {
    const [imageData, setImageData] = useState({
        imagePreviewUrl: null,
        imageFile: null,
        imageFileName: null,
        isHasFileChange: false,
        isDeleteImage: false
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
                imageFileName: fileName,
                isHasFileChange: true
            })
            props.handleChange(this, {name: 'file', value: file})
        }
    }

    //useEffect
    useEffect(() => {
        if(props.currentImg){
            let src = uploaded + `/` + props.currentImg
            setImageData({imagePreviewUrl: src})
        }
    },[props.currentImg]);

    const removeCurrentPreview = () => {
        setImageData({
            imagePreviewUrl: null,
            imageFile: null,
            imageFileName: null,
            isHasFileChange: true,
            isDeleteImage: true
        })
    }

    return (
        <div>
            {
                (imageData.imagePreviewUrl)
                ? <div className='image-preview-thumb'>
                    <img src={imageData.imagePreviewUrl} alt={props.alt} />
                    <span onClick={removeCurrentPreview}><Icon name='remove' /></span>
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