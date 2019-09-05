import React, { Component } from 'react';

class Profile extends Component {
    render() {
        return (
            <div className="profile-container">
                <div className="profile-image" style={{ textAlign: 'center', margin: "30px 0" }}>
                    <img
                        src="pf.jpg"
                        alt="avatar"
                        style={{ height: '300px', borderRadius: "50%" }}
                    />
                    <p style={{ fontWeight: "bold", fontSize: "20px" }}>김태웅</p>
                </div>
                <div className="proflie-details" style={{ marginLeft: "20px", fontSize: "20px", lineHeight: "50px", fontWeight: "bold" }}>
                    <hr style={{ height: "3px", background: "linear-gradient(to right,#3273dc,white)", width: '100%' }} />
                    <p>Date of birth : 11 . 27 . 1993</p>
                    <p>Phone : 010-4359-0259</p>
                    <p>Email : teeyou1127@google.com</p>
                    <p>동국대학교 컴퓨터공학 전공</p>
                    <hr style={{ height: "3px", background: "linear-gradient(to right,#3273dc,white)", width: '100%' }} />
                    <p>Google Play Store Download</p>
                    <a href="https://play.google.com/store/apps/details?id=dgu.cse.teeu.alarmcall_noswitch">Auto Call - 자동 전화</a>
                    <br />
                    <a href="https://play.google.com/store/apps/details?id=study.teeu.seoul_movie_showtime">서울 영화관 상영시간표 - Box Office 순위 , CGV , 롯데시네마 , 메가박스</a>
                    <p></p>
                    <hr style={{ height: "3px", background: "linear-gradient(to right,#3273dc,white)", width: '100%' }} />
                    <a href="https://github.com/teeyou">GitHub</a>
                    <br />
                    <a href="https://soundcloud.com/teeyou">SoundCloud</a>
                    <br />
                    <a href="https://www.facebook.com/iamtaeung">FaceBook</a>
                    <p></p>
                    <hr style={{ height: "3px", background: "linear-gradient(to right,#3273dc,white)", width: '100%' }} />
                </div>
            </div >
        )
    }
}

export default Profile;
