import React, { Component } from 'react';

import Login from './login'
import AddPost from './addPost'
import PrintPost from './printPost'
import UpdatePost from './updatePost'
import Search from './search'

import firebase from '../firebase/firebase'

export default class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            post: '',
            id: '',
            createdAt: '',
            login: false,
            edit: false,

            totalPosts: [],
            index: 0,
            n: 4,

            searchText: '',
            postCount: 0
        }
    }

    searchChangeHandler = (e) => {
        this.setState({
            searchText: e.target.value
        })
    }

    contentsClickHandler = (e) => {
        e.preventDefault()
        const posts = [...this.state.totalPosts]

        if (this.state.searchText === '') {

        }

        else if (this.state.searchText === "all") {
            this.setState({
                posts: this.state.totalPosts,
                index: this.state.totalPosts.length,
                postCount: this.state.totalPosts.length
            })
        }

        else {
            const exist = posts.filter((post, index) => post.post.indexOf(this.state.searchText) !== -1)

            //console.log(exist)

            this.setState({
                posts: exist,
                index: this.state.totalPosts.length,
                postCount: exist.length
            })
        }
    }

    dateClickHandler = (e) => {
        const posts = [...this.state.totalPosts]

        if (this.state.searchText === '') {

        }

        else if (this.state.searchText === "all") {
            this.setState({
                posts: this.state.totalPosts,
                index: this.state.totalPosts.length,
                postCount: this.state.totalPosts.length
            })
        }

        else {
            const exist = posts.filter((post, index) => post.createdAt.indexOf(this.state.searchText) !== -1)

            //console.log(exist)

            this.setState({
                posts: exist,
                index: this.state.totalPosts.length,
                postCount: exist.length
            })
        }

    }

    onChangeHandler = (e) => {
        this.setState({
            post: e.target.value
        })
    }


    //AddPost onClick event
    onClickHandler = (e) => {
        e.preventDefault()
        const firestore = firebase.firestore
        const today = new Date();

        const year = today.getFullYear()
        const month = today.getMonth() + 1
        const day = today.getDate()
        const hour = today.getHours()
        const min = today.getMinutes()
        const sec = today.getSeconds()

        const created = year +
            '/' + (month < 10 ? "0" + month : month) +
            '/' + (day < 10 ? "0" + day : day) +
            '/' + (hour < 10 ? "0" + hour : hour) +
            ':' + (min < 10 ? "0" + min : min) +
            ':' + (sec < 10 ? "0" + sec : sec)

        firestore.collection('board').add({ post: this.state.post, createdAt: created })
            .then((doc) => {
                const posts = [{ post: this.state.post, id: doc.id, createdAt: created }, ...this.state.posts]
                const totalPosts = [{ post: this.state.post, id: doc.id, createdAt: created }, ...this.state.totalPosts]

                this.setState({
                    posts: posts,
                    post: '',
                    createdAt: created,

                    totalPosts,
                    index: this.state.index + 1,
                    postCount : this.state.postCount + 1
                })
            }).catch(err => console.log(err))
    }

    onDeleteHandler = (id) => {
        //console.log(id)
        const firestore = firebase.firestore
        firestore.collection('board').doc(id).delete().then(() => {
            const posts = this.state.posts.filter((post) => post.id !== id)
            this.setState({
                posts: posts,
                postCount : this.state.postCount - 1

            })
        })
    }

    onUpdateHandler = (id) => {
        const firestore = firebase.firestore
        firestore.collection('board').doc(id).get().then(doc => {
            this.setState({
                post: doc.data().post,
                id: doc.id,
                createdAt: doc.data().createdAt,
                edit: !this.state.edit
            })
        })


    }

    onUpdateSaveHandler = (e, id, createdAt) => {
        e.preventDefault()

        const firestore = firebase.firestore
        // firestore.collection('board').doc(id).update({ post: this.state.post }).then(() => {
        //     this.setState({
        //         post: '',
        //         edit: !this.state.edit
        //     })
        // })

        firestore.collection('board').doc(id).delete().then(() => {
            const posts = this.state.posts.filter((post) => post.id !== id)
            this.setState({
                posts: posts
            })
        })

        firestore.collection('board').doc(id).set({ post: this.state.post, createdAt: createdAt })
            .then((res) => {
                const posts = [{ post: this.state.post, id: id, createdAt: createdAt }, ...this.state.posts]
                posts.sort((a, b) => {
                    return a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0
                })
                this.setState({
                    posts: posts,
                    post: '',
                    edit: !this.state.edit
                })
            }).catch(err => console.log(err))

    }

    onCancelHandler = (e) => {
        e.preventDefault()

        this.setState({
            post: '',
            edit: !this.state.edit
        })
    }

    checkLogin = () => {
        //console.log('check함수')
        if (firebase.auth.currentUser !== null) {
            this.setState({
                login: true
            })
        }
    }

    onScrollHandler = () => {
        const { innerHeight } = window;
        const { scrollHeight } = document.body;

        // IE에서는 document.documentElement 를 사용.
        const scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;

        // 스크롤링 했을때, 브라우저의 가장 밑에서 실행
        if (scrollHeight - innerHeight - scrollTop <= 0) {

            //출력 할 post가 남아있을 경우에 실행
            if (this.state.totalPosts.length - 1 >= this.state.index) {
                const remains = this.state.totalPosts.length - this.state.index

                if (remains > this.state.n) {
                    const posts = [...this.state.posts, ...this.state.totalPosts.slice(this.state.index, this.state.index + this.state.n)]
                    this.setState({
                        posts,
                        index: this.state.index + this.state.n
                    })
                } else {
                    const posts = [...this.state.posts, ...this.state.totalPosts.slice(this.state.index, this.state.index + remains)]
                    this.setState({
                        posts,
                        index: this.state.index + remains
                    })
                }

            } else {
                console.log('모두 출력')
            }
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.onScrollHandler)
        this.displayPost()
    }

    displayPost = () => {
        //const posts = [...this.state.posts]
        const totalPosts = [...this.state.totalPosts]

        const firestore = firebase.firestore
        firestore.collection('board').orderBy("createdAt", "desc").get().then(docs => {
            // console.log(docs)
            docs.forEach(doc => {
                totalPosts.push({ post: doc.data().post, id: doc.id, createdAt: doc.data().createdAt })
                //posts.push({ post: doc.data().post, id: doc.id, createdAt: doc.data().createdAt })
            })

            // 최대 4개씩 가져와서 출력
            if (totalPosts.length < (this.state.n + 1)) {
                const posts = [...totalPosts]

                this.setState({
                    posts,
                    totalPosts,
                    index: totalPosts.length,
                    postCount: totalPosts.length
                })
            } else {
                const posts = totalPosts.filter((post, index) => index < this.state.n)

                this.setState({
                    posts,
                    totalPosts,
                    index: this.state.n,
                    postCount: totalPosts.length
                })
            }

        })
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScrollHandler)
    }

    render() {
        //console.log(firebase.auth)
        return (
            <div className="board-container">
                {this.state.login ?
                    <div>
                        {/* 로그인 한 화면 */}

                        {this.state.edit ?
                            <UpdatePost
                                post={this.state.post}
                                id={this.state.id}
                                createdAt={this.state.createdAt}
                                onChange={this.onChangeHandler}
                                onUpdateSave={this.onUpdateSaveHandler}
                                onCancel={this.onCancelHandler} />
                            :
                            <div>
                                <Search
                                    searchChangeHandler={this.searchChangeHandler}
                                    contentsClickHandler={this.contentsClickHandler}
                                    dateClickHandler={this.dateClickHandler}
                                    searchText={this.state.searchText}
                                />

                                <AddPost
                                    post={this.state.post}
                                    onChange={this.onChangeHandler}
                                    onClick={this.onClickHandler} />

                                <div className="post-count" style={{ textAlign: "right", marginTop: "20px", marginRight: "20px" }}>Posts : {this.state.totalPosts.length}</div>


                                <PrintPost
                                    posts={this.state.posts}
                                    deleteHandler={this.onDeleteHandler}
                                    updateHandler={this.onUpdateHandler}
                                    login={this.state.login} />
                            </div>

                        }
                    </div>


                    :
                    <div>
                        {/* 로그인 안한 화면 */}
                        {/* <Login login={this.checkLogin} /> */}

                        {/* <PrintPost
                            posts={this.state.posts}
                            deleteHandler={this.onDeleteHandler}
                            login={this.state.login} /> */}

                        {this.state.edit ?
                            <UpdatePost
                                post={this.state.post}
                                id={this.state.id}
                                createdAt={this.state.createdAt}
                                onChange={this.onChangeHandler}
                                onUpdateSave={this.onUpdateSaveHandler}
                                onCancel={this.onCancelHandler} />
                            :
                            <div>

                                <Search
                                    searchChangeHandler={this.searchChangeHandler}
                                    contentsClickHandler={this.contentsClickHandler}
                                    dateClickHandler={this.dateClickHandler}
                                    searchText={this.state.searchText}
                                />

                                <AddPost
                                    post={this.state.post}
                                    onChange={this.onChangeHandler}
                                    onClick={this.onClickHandler} />

                                <div className="post-count" style={{ textAlign: "right", marginTop: "20px", marginRight: "20px" }}>Posts : {this.state.postCount}</div>

                                <PrintPost
                                    posts={this.state.posts}
                                    deleteHandler={this.onDeleteHandler}
                                    updateHandler={this.onUpdateHandler}
                                    login={this.state.login} />
                            </div>

                        }
                    </div>


                }
            </div>
        )
    }
}