import React from 'react'

const printImage = (props) => {
    const style = {
        textAlign : "center"
    }

    // console.log(props)
    return (
        <div className="print-image-container" style={style}>
            {props.imagesURL.map(imageURL => {
                //console.log(imageURL)
                return (
                    <div key={imageURL.id}>
                        {props.login ?
                            <div className="print-image" style={{ margin: "75px 0"}}>
                                <p>{imageURL.createdAt}</p>
                                <img src={imageURL.downloadURL} width="300px" alt="Uploaded" />
                                <p style={{margin:"20px 0"}}>{imageURL.imageText}</p>
                                <button className="button is-danger" onClick={() => props.deleteImage(imageURL.fileName, imageURL.id)}>삭제</button>
                                <hr/>
                            </div>
                            :
                            <div className="print-image" style={{ margin: "75px 0"}}>
                                <p style={{marginBottom:"20px"}}>{imageURL.createdAt}</p>
                                <img src={imageURL.downloadURL} width="300px" alt="No Data" />
                                <p style={{margin:"20px 0"}}>{imageURL.imageText}</p>
                                <button className="button is-danger" onClick={() => props.deleteImage(imageURL.fileName, imageURL.id)}>삭제</button>
                                <hr/>
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default printImage

