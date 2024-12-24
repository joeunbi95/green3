import React, { useEffect, useState } from 'react';
// 2. 리듀서 상태 변수 값 변경 할 훅 가져오기 훅 유즈 디스패치 (세터 setter)
import { useDispatch } from 'react-redux';
// 3. 사용자가 만든 리듀서 액션 메서드 가져오기 => 디스패치 할때만 가져온다.
import { mainModalAction } from '../../../store/modal';

export default function Section3Component() {
    // 4. 디스패치 선언
    const dispatch = useDispatch();
    
    
    // 공지사항 갤러리 상태관리
    const [state, setState] = useState({
        공지사항: [],
        갤러리: []
    });
    
    const [tab, setTab] = React.useState(false);

    // JSON 데이터 가져오기 fetch() API
    // 공지사항 & 갤러리
    useEffect(()=>{
        fetch('./json/section3.json',{
            method: 'GET'
        })
        .then((res)=>res.json())
        .then((data)=>{
            setState({
                ...state,
                공지사항: data.공지사항,
                갤러리: data.갤러리
            })
        }).catch((err)=>{
            console.log(err);
        });
    },[state]);

    
    // 모달창 열기 클릭 이벤트 
    const onClickModalOpen=(e, 공지글)=>{
        e.preventDefault();
        // 5. 모달창열기 구현 => 데이터 전송
        // 공지글 => 번호, 글제목, 글내용, 작성날짜, mainModal(true): 열림
        // 리덕스 => 모달 리듀서에 객체 전송
        const notice = {
            글번호: 공지글.글번호,
            글제목: 공지글.글제목,
            글내용: 공지글.글내용,
            작성날짜: 공지글.작성날짜,
            모달 : true
        }
        dispatch(mainModalAction(notice));
    }


    // 갤러리 탭 버튼 클릭  이벤트
    const onClickBalleryBtn=(e)=>{
        e.preventDefault();
        setTab(true);
    }

    // 공지사항 탭 버튼 클릭 이벤트
    const onClickNoticeBtn=(e)=>{
        e.preventDefault();
        setTab(false);
    }

    return (
        <section id="section3">
            <div className="container">
                <button className={`notice-btn${tab?' on':''}`}  onClick={onClickNoticeBtn} >공지사항</button>
                <button className={`gallery-btn${tab?' on':''}`} onClick={onClickBalleryBtn}>갤러리</button>
                <div className={`notice-box${tab?' on':''}`}>
                    <ul>
                        {
                            state.공지사항.map((item, idx)=>{
                                return (
                                    <li key={item.글번호}>
                                        <a 
                                            href="!#" 
                                            className="open-btn"  
                                            onClick={(e)=>onClickModalOpen(e, item)} 
                                        >
                                            {item.글제목}
                                        </a>
                                        <span>{item.작성날짜}</span>
                                    </li>
                                )
                            })
                        }
                    
                    </ul>                  
                </div>
                
                <div className={`gallery-box${tab?' on':''}`}>
                    <ul>
                        {
                            state.갤러리.map((item, idx)=>{
                                return (
                                    <li key={item.글번호}>
                                        <a href="!#" title={item.이미지설명}>
                                            <img src={item.이미지} alt={item.이미지설명}/>
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
           
            </div>
        </section>
    );
}