import React, { Component } from 'react'

import AddImage from './addImage'
import PrintImage from './printImage'
import Login from './login'
import Search from './search'

import firebase from '../firebase/firebase'


export default class Gallery extends Component {
    state = {
        image: null,
        imageName: '',
        url: '',
        progress: 0,

        imagesURL: [],
        imageURL: '',
        createdAt: '',

        imageText: "",
        totalImagesURL: [],
        index: 0,
        n: 3,

        searchText: '',
        imageCount: 0
    }

    searchChangeHandler = (e) => {
        this.setState({
            searchText: e.target.value
        })
    }

    contentsClickHandler = (e) => {
        e.preventDefault()
        const imagesURL = [...this.state.totalImagesURL]

        if (this.state.searchText === '') {

        }

        else if (this.state.searchText === "all") {
            this.setState({
                imagesURL: this.state.totalImagesURL,
                index: this.state.totalImagesURL.length,
                imageCount: this.state.totalImagesURL.length
            })
        }

        else {
            const exist = imagesURL.filter((image, index) => image.imageText.indexOf(this.state.searchText) !== -1)

            //console.log(exist)

            this.setState({
                imagesURL: exist,
                index: this.state.totalImagesURL.length,
                imageCount: exist.length
            })
        }
    }

    dateClickHandler = (e) => {
        const imagesURL = [...this.state.totalImagesURL]

        if (this.state.searchText === '') {

        }

        else if (this.state.searchText === "all") {
            this.setState({
                imagesURL: this.state.totalImagesURL,
                index: this.state.totalImagesURL.length,
                imageCount: this.state.totalImagesURL.length
            })
        }

        else {
            const exist = imagesURL.filter((image, index) => image.createdAt.indexOf(this.state.searchText) !== -1)

            //console.log(exist)

            this.setState({
                imagesURL: exist,
                index: this.state.totalImagesURL.length,
                imageCount: exist.length
            })
        }

    }


    onChangeHandler = (e) => {
        const image = e.target.files[0];

        //console.log(image)

        if (image) {
            this.setState({
                image: image,
                imageName: image.name,
            })
        }

        //console.log(this.state)
    }

    onChangeTextHandler = (e) => {
        this.setState({ imageText: e.target.value })
    }


    //upload button clicked
    onClickHandler = () => {
        const { image } = this.state; //image만 들어감

        if (image) {

            //const image = this.state image안에 state의 image , url 둘 다 들어감


            //console.log(image.name)

            const { imageText } = this.state

            //console.log(imageText)

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

            const upload = firebase.storage.ref(`images/${image.name + `${year}-${month}-${day}-${hour}-${min}-${sec}`}`).put(image);
            upload.on(
                "state_changed",
                (snapshot) => {
                    //progress function
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    this.setState({
                        progress
                    })
                },
                (error) => {
                    //error function
                    console.log(error)
                },
                () => {
                    //complete function
                    firebase.storage.ref('images').child(image.name + `${year}-${month}-${day}-${hour}-${min}-${sec}`).getDownloadURL().then(url => {
                        const firestore = firebase.firestore
                        firestore.collection('images').add({ downloadURL: url, createdAt: created, fileName: image.name + `${year}-${month}-${day}-${hour}-${min}-${sec}`, imageText: imageText }).then(res => {
                            const imagesURL = [{ downloadURL: url, id: res.id, createdAt: created, fileName: image.name + `${year}-${month}-${day}-${hour}-${min}-${sec}`, imageText: imageText }, ...this.state.imagesURL]
                            const totalImagesURL = [{ downloadURL: url, id: res.id, createdAt: created, fileName: image.name + `${year}-${month}-${day}-${hour}-${min}-${sec}`, imageText: imageText }, ...this.state.totalImagesURL]
                            //console.log(this.state.imagesURL)
                            this.setState({
                                imagesURL,
                                imageURL: url,
                                createdAt: created,
                                image: null,
                                imageName: "",
                                imageText: "",

                                totalImagesURL,
                                index: this.state.index + 1,
                                imageCount: this.state.imageCount + 1
                            })
                        }).catch(err => console.log(err))

                        //alert("Upload Completed")
                    })
                })

        } else {
            alert("이미지를 올려주세요")
        }

    }

    onDeleteHandler = (fileName, id) => {

        //console.log(fileName)

        firebase.firestore.collection("images").doc(id).delete().then(() => {
            const imagesURL = this.state.imagesURL.filter((imageURL) => imageURL.id !== id)

            this.setState({
                imagesURL,
                imageCount: this.state.imageCount - 1
            })
        })

        firebase.storage.ref().child("images/" + fileName).delete()

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

            //출력 할 이미지가 남아있을 경우에 실행
            if (this.state.totalImagesURL.length - 1 >= this.state.index) {
                const remains = this.state.totalImagesURL.length - this.state.index
                //console.log(remains)

                if (remains > this.state.n) {
                    const imagesURL = [...this.state.imagesURL, ...this.state.totalImagesURL.slice(this.state.index, this.state.index + this.state.n)]
                    this.setState({
                        imagesURL,
                        index: this.state.index + this.state.n
                    })
                } else {
                    //console.log(this.state.totalImagesURL.slice(this.state.index, this.state.index + remains))
                    const imagesURL = [...this.state.imagesURL, ...this.state.totalImagesURL.slice(this.state.index, this.state.index + remains)]
                    this.setState({
                        imagesURL,
                        index: this.state.index + remains
                    })
                }

            } else {
                console.log("모두 출력")
            }

        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.onScrollHandler)
        const totalImagesURL = [...this.state.totalImagesURL]


        //const imagesURL = [...this.state.imagesURL]
        const firestore = firebase.firestore
        firestore.collection('images').orderBy("createdAt", "desc").get().then(docs => {
            //console.log(docs)
            docs.forEach(doc => {
                //console.log(doc.data())
                totalImagesURL.push({ downloadURL: doc.data().downloadURL, id: doc.id, createdAt: doc.data().createdAt, fileName: doc.data().fileName, imageText: doc.data().imageText })

                // imagesURL.push({ downloadURL: doc.data().downloadURL, id: doc.id, createdAt: doc.data().createdAt, fileName: doc.data().fileName, imageText: doc.data().imageText })

            })


            // 최대 3개씩 가져와서 출력

            if (totalImagesURL.length < (this.state.n + 1)) {
                const imagesURL = [...totalImagesURL]

                // console.log(imagesURL)

                this.setState({
                    imagesURL: imagesURL,
                    totalImagesURL,
                    index: totalImagesURL.length,
                    imageCount: totalImagesURL.length
                })


            } else {
                const imagesURL = totalImagesURL.filter((imageURL, index) => index < this.state.n)
                //console.log(imagesURL)

                this.setState({
                    imagesURL: imagesURL,
                    totalImagesURL,
                    index: this.state.n,
                    imageCount: totalImagesURL.length
                })
            }

        })
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScrollHandler)
    }

    checkLogin = () => {
        //console.log('check')
        if (firebase.auth.currentUser !== null) {
            this.setState({
                login: true
            })
        }
    }

    render() {
        return (
            <div className="gallery-container">

                {this.state.login ?
                    <div>
                        <Search
                            searchChangeHandler={this.searchChangeHandler}
                            contentsClickHandler={this.contentsClickHandler}
                            dateClickHandler={this.dateClickHandler}
                            searchText={this.state.searchText}
                        />

                        <AddImage
                            onChange={this.onChangeHandler}
                            onClick={this.onClickHandler}
                            onChangeText={this.onChangeTextHandler}
                            imageName={this.state.imageName}
                            imageText={this.state.imageText} />
                        <br />

                        <div className="image-count" style={{ textAlign: "right", marginTop: "20px", marginRight: "20px" }}>Images : {this.state.totalImagesURL.length}</div>

                        <PrintImage
                            imagesURL={this.state.imagesURL}
                            deleteImage={this.onDeleteHandler}
                            login={this.state.login} />
                    </div>

                    :
                    <div>
                        {/* <Login login={this.checkLogin} /> */}
                        <Search
                            searchChangeHandler={this.searchChangeHandler}
                            contentsClickHandler={this.contentsClickHandler}
                            dateClickHandler={this.dateClickHandler}
                            searchText={this.state.searchText}
                        />

                        <AddImage
                            onChange={this.onChangeHandler}
                            onClick={this.onClickHandler}
                            onChangeText={this.onChangeTextHandler}
                            imageName={this.state.imageName}
                            imageText={this.state.imageText} />
                        <br />

                        <div className="image-count" style={{ textAlign: "right", marginTop: "20px", marginRight: "20px" }}>Images : {this.state.imageCount}</div>

                        <PrintImage
                            imagesURL={this.state.imagesURL}
                            deleteImage={this.onDeleteHandler} />
                    </div>

                }
            </div>
        )
    }
}