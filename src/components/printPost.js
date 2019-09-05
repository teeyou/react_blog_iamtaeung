import React from 'react'

const printPost = (props) => {
    return (
        props.posts.map((post) => {
            //console.log(post)
            return (
                <div className="print-post" key={post.id} style={{ marginTop: "25px", marginBottom: "25px" }}>
                    {props.login ?
                        <div className="box">
                            <p>{post.createdAt}</p>
                            <div className="level">
                                <pre className="title" style={{ backgroundColor: "white", whiteSpace:"pre-wrap" }}>
                                    <p style={{ fontSize: "16px" }}>
                                        {post.post}
                                    </p>
                                </pre>
                                <span>
                                    <button
                                        style={{ marginBottom: "10px", marginRight: "10px" }}
                                        className="button is-info level-right"
                                        onClick={() => props.updateHandler(post.id)}>
                                        수정
                                    </button>
                                    <button
                                        className="button is-danger level-right"
                                        onClick={() => props.deleteHandler(post.id)}>
                                        삭제
                                    </button>
                                </span>

                            </div>
                        </div>
                        :
                        <div className="box" style={{margin:"50px 0"}}>
                            <p>{post.createdAt}</p>
                            <div className="level">
                                <pre className="title" style={{ backgroundColor: "white", whiteSpace:"pre-wrap"}}>
                                    <p style={{ fontSize: "16px" }}>
                                        {post.post}
                                    </p>
                                </pre>
                                <span>
                                    <button
                                        style={{ marginBottom: "10px", marginRight: "10px" }}
                                        className="button is-info level-right"
                                        onClick={() => props.updateHandler(post.id)}>
                                        수정
                                    </button>
                                    <button
                                        className="button is-danger level-right"
                                        onClick={() => props.deleteHandler(post.id)}>
                                        삭제
                                    </button>
                                </span>
                            </div>
                        </div>
                    }
                </div>
            )
        })
    )
}

export default printPost