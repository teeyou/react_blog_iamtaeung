import React from 'react'

const addImage = (props) => {
    //console.log(props)
    return (
        <div className="add-image-container" style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", margin:"20px 0"}}>
            <div className="file has-name" style={{marginBottom:"20px"}}>
                <label className="file-label">
                    <input className="file-input" type="file" onChange={props.onChange} name="resume" style={{width:"300px"}} />

                    <span className="file-cta">
                        <span className="file-icon">
                            <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label">
                            Choose a file…
                    </span>
                    </span>
                    <span className="file-name">
                        {props.imageName}
                    </span>
                </label>
            </div>

            <div>
                <input className="input is-warning" type="text" placeholder="이 사진은 . . ." value={props.imageText} onChange={props.onChangeText} style={{width:"300px"}} />
                <button className="button is-warning" onClick={props.onClick}>확인</button>
            </div>

        </div>
    )
}

export default addImage