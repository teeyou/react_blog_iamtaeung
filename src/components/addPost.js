import React from 'react'

const addPost = (props) => {
   //console.log(props)
    return (
        <div className="add-post-container">
            <form className="field has-addons">
                <div className="control is-expanded">
                    <pre style={{backgroundColor:"white"}}><textarea className="textarea" rows="5" value={props.post} onChange={props.onChange} /></pre>
                </div>
                <div className="field has-addons">
                    <button style={{height:"100%"}}className="button is-info is-outlined"onClick={props.onClick}>저장</button>
                </div>

            </form>
        </div>
    )
}

export default addPost