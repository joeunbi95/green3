import React, { useEffect, useState } from 'react';
// 2. 리듀서 상태 변수 값 변경 할 훅 가져오기 훅 유즈 디스패치 (세터 setter)
import { useDispatch, useSelector } from 'react-redux';
// 3. 사용자가 만든 리듀서 액션 메서드 가져오기 => 디스패치 할때만 가져온다.
import { mainModalAction } from '../../store/modal';


export default function ModalComponent() {

    const [state, setState] = useState({
        name: '',
        value: '',
        expires: ''
    });

    // 구조 분할 할당 === 비구조화
    const {name, value, expires} = state;



    // 4. 디스패치 선언
    const dispatch = useDispatch();
    const modal = useSelector((state)=>state.modal);

    // 5. 모달창 닫기
    //    모달창 닫기 클릭 이벤트 구현
    //    최종 쿠키가 저장 모달 닫는다.
    const onClickModalClose=(e)=>{
        e.preventDefault();
        dispatch(mainModalAction(false));
        
        setCookie(name, value, expires);
    }

    // 6. 체크박스 이벤트 => 쿠키 설정(setter)
    const onChangeCheckEvent=(e)=>{

        setState({
            ...state,
            chk: e.target.checked
        })
       
    }

    // 쿠키 설정 함수 : 셋쿠키함수(매개변수1,2,3)
    function setCookie(name, value, expires){
        // 웹문서(도큐먼트).쿠키(cookie) = '쿠키이름=값;  path=/;  만료일=기한';
        document.cookie = `${name}=${value}; path=/; expires=${expires}`;
    }



    // 오늘 하루 안열기 체크 상태 감시 프로그램
    useEffect(()=>{
        if(state.chk){
            // 세터 함수 쿠키 설정 데이터 준비;            
            let toDay = new Date();
            toDay.setDate(toDay.getDate() + 1);
            
            // 4kb (1024byte * 4)
            // 공백과 특수문자가 포함된 쿠키이름, 쿠키값은 반드시 
            // 유효성과 일관성을 지키기위해 인코딩을 해야한다.

            // 그러면 공백과 특수문자는 이스케이프(Escape) 처리된다.
            // UTF-8로 인코딩
            // 권장
            // 인코딩은 encode URI Component => encodeURIComponent() 
            // 디코딩은 decode URI Component => decodeURIComponent()

            // UTF-8로 인코딩
            // a-z A-Z 0-9 - _ . ! ~ * ' ( )  & = + $ ? : @ / ,  제외한 나머지 모든 문자 인코딩 된다.
            // 인코딩은 encode URI => encodeURI() 
            // 디코딩은 decode URI => decodeURI()


            let name    = encodeURIComponent('MAIN MODA 2');            
            // a-z A-Z 0-9 - _ . ! ~ * ' ( ) 제외한 나머지 모든 문자 인코딩 된다.
            let value   = encodeURIComponent('(green)! 20241219-main-modal.com close  & ☆ ♥');
            let expires = toDay.toUTCString();

            // 인코딩은 encode URI Component => encodeURIComponent()  결과
            // MAIN  MODAL 1=green 1234 close; MAIN_MODAL1=green_1234_close; MAIN%20MODA%202=green%2020241219-main-modal%20close
            // MAINMODAL1=green1234close;MAIN_MODAL1=green_1234_close;MAIN%20MODA%202=green%2020241219-main-modal%20close
            
            setState({
                ...state,
                name: name,
                value: value,
                expires: expires
            })
        }
        else{
            setState({
                ...state,
                name: '',
                value: '',
                expires: ''
            })
        }
        return
    }, [state.chk])




    return (
        <div className='layer-popup'>
            <div className="container">
                <div className="title">
                    <h2>{modal.글제목}</h2>
                    <span>{modal.작성날짜}</span>
                </div>
                <div className="content">
                    <ul>
                        <li>{modal.글내용}</li>
                    </ul>
                </div>
                <div className="button-box">
                    <button className="close-btn" onClick={onClickModalClose}>닫기</button>
                    
                    {/* for => html + for => htmlFor */}
                    <label htmlFor="chk">
                        <input 
                            type="checkbox" 
                            name="chk" 
                            id="chk" 
                            onChange={onChangeCheckEvent}
                            value='오늘 하루 안보기'
                        /> 
                        <span>오늘 하루 안보기</span>
                    </label>
                </div>
            </div>
        </div>
    );
}