import React from 'react'

const updatePost = (props) => {
   //console.log(props)
    return (
        <div className="update-post-container">
            <form className="field has-addons">
                <div className="control is-expanded">
                    <pre style={{backgroundColor:"white"}}><textarea className="input" style={{height:"200px"}} value={props.post} onChange={props.onChange} /></pre>
                </div>
                <div className="field has-addons">
                    <button className="button is-info is-outlined" onClick={(e) => props.onUpdateSave(e ,props.id, props.createdAt)}>변경</button>
                    <button className="button is-danger is-outlined"onClick={props.onCancel}>취소</button>
                </div>

            </form>
        </div>
    )
}

export default updatePost