# 리액트 푸른마을 프로젝트

# 리액트 컴포넌트 분석 설계 제작
1. create-react-app 프로젝트 생성
```bash
    npx create-react-app green
```

2. 프로젝트 실행 테스트

3. 프로젝트 푸른마을에 맞는 컴포넌트 분석 설계 제작
   [public]
        [css]
            reset.css
            style.css
        [scss]
            reset.scss
            style.scss
        [images]
        index.html   

   [src]
        index.js
        [component] 
            랩퍼컴포넌트 WrapComponent.jsx
            modal: false 모달닫기
            modal: true  모달열기
            [wrap]
                헤더컴포넌트  HeaderComponent.jsx : 네비게이션 메인메뉴 서브메뉴 배열처리                
                메인컴포넌트  MainComponent.jsx
                [main]
                        섹션1컴포넌트 Section1Component.jsx : 메인슬라이드, 바로가기
                        섹션2컴포넌트 Section2Component.jsx : 배너
                        섹션3컴포넌트 Section3Component.jsx : 공지사항, 갤러리
                [sub]   => 서브페이지 있다면 => 라우터 필요하다.
                        서브1컴포넌트
                        서브2컴포넌트
                        :
                        로그인컴포넌트
                        아이디찾기컴포넌트
                        비밀번호찾기컴포넌트
                        공지사항컴포넌트
                        :
                푸터컴포넌트 FooterComponent.jsx : 주소, 저작권
                모달컴포넌트 ModalComponent.jsx  : 공지사항 제목, 내용

4. 상태관리, 프롭스 생성 및 설정 관리
  - 탬플릿 리터럴 방식
```JSX
   modal: false ''
   modal: true ' on'

   className={`notice-btn${tab?' on':''}`}

```
  - 조건부 연산자 방식
   modal: false ''
   modal: true ' on'
```JSX
   {
        state.modal && <ModalComponent modal={state.modal}  modalClose={modalClose}/>
    }
```

    - 메인메뉴 이벤트함수(아규먼트) => (파라미터)
    - 서브메뉴[배열] 
```JSX
     // 메인메뉴 버튼
     onMouseEnter={(e)=>onMouseEnterMainBtn(e, 0)}  // 아규먼트 2개 보내기

    // 서브메뉴
     {
        sub[0] &&     
        <div className="sub sub1">
            <ul>
                <li>
                   : 서브메뉴
                </li>
            </ul>
        </div>
    }


```

```JS
     const [sub, setSub] = React.useState(Array(4).fill(false));

     const onMouseEnterMainBtn=(e, number)=>{  // 파라미터 2개 받기
        let imsi = Array(4).fill(false);
      
        imsi[number] = true;
        setSub(imsi);
     }
```


    - 섹션1  
    - 메인슬라이드 구현

    // 애니메이션 대상 선택자 => 슬라이드랩퍼박스
```JSX
    <ul className="slide-wrap" ref={slideWrap}>
    :    

```

```JS
    const slideWrap = useRef();
    


    // 1. 메인슬라이드함수

    // 2. 다음카운트함수
    //    cnt 증가

    // 3. 자동타이머함수

```



5. 리덕스 상태관리 생성 및 설정 관리
    설치 
    - 리덕스 툴킷
    - 리액트 리덕스
    npm i @reduxjs/toolkit react-redux

    npm i @reduxjs/toolkit
    npm i react-redux

    npm i -g yarn
    
    yarn add @reduxjs/toolkit react-redux

    yarn add @reduxjs/toolkit
    yarn add react-redux
    

   - 모달컴포넌트 
   - 모달리듀서
   - modal.js 
        mainModal 
        topModal
   
   
   - [src]
        [store]
            modal.js
   
   # modal.js
   1. 리듀서 생성하는 리덕스 툴깃 가져오기
   2. 리듀서를 생성(이름, 상태관리, 리듀서스(액션메서드))
   3. 리듀서 내보내기
   4. 리듀서 액션메서드 내보내기

```JS
    // 1. 리듀서 생성하는 리덕스 툴깃 가져오기
    import { createSlice } from "@reduxjs/toolkit";

    // 2. 리듀서를 생성(이름, 상태관리, 리듀서스(액션메서드))
    const modal = createSlice({
        name:'modal',
        initialState: {
            mainModal: false,
            topModal: false
        },
        reducers: {
            mainModalAction(state, action){
                state.mainModal = action.payload
            },
            topModalAction(state, action){
                state.topModal = action.payload
            }
        }
    });

    // 3. 리듀서 내보내기
    export default modal.reducer;

    // 4. 리듀서 액션메서드 내보내기
    export const {mainModalAction, topModalAction} = modal.actions

```



   # index.js
   1. 프로바이더 컴포넌트 가져오기 => 리액트 리덕스 react-redux
   2. 스토어 생성 훅 가져오기 => 리덕스 툴킷 @reduxjs/toolkit
   3. 사용자 리듀서 가져오기 => [store] modal.js
   4. 스토어 생성
   5. 스토어 리듀서 등록하기
   6. 프로바이더컴포넌트로 최상위 컴포넌트에 프롭스로 내려보내기 설정

```JS
      <Provider store={store}>
         <WrapComponent />
      </Provider>  
```
    7. 개발자 환경 컴포넌트에서 확인하기


    # 컴포넌트에서 사용하기
    1. 리듀서 상태 변수 값 가져오기 훅 유즈 셀렉터 (게터 getter)
       - 모달창 제어하는 변수 연결 
       - mainModal 변수 가져오기

    2. 리듀서 상태 변수 값 변경 할 훅 가져오기 훅 유즈 디스패치 (세터 setter)
    3. 사용자가 만든 리듀서 액션 메서드 가져오기 => 디스패치 할때만 가져온다.







6. 쿠키(Cookie)    
   : 사용자(User)가  모달창에서 
     체크박스에 오늘 하루 동안 안보기를 체크 선택하면
     브라우저 저장소 쿠키(Cookie)에 
     1일 날짜 기한(Expires 익스파이얼스)이 저장되어
     다음날 (1일) 지나면 자동으로 쿠키는 삭제된다.
     그리고 모달창은 다시 열린다.

   - 쿠키의 종류
     * 세션쿠키 : 브라우저 종료시 삭제된다.   session
     * 기한쿠키 : 일정 기한까지 계속 유지된다.

   - 쿠키확인
     * 개발자모드 F12 키
     * Application 탭메뉴
     * Strorage(저장소)
     * Cookies
       - 네이버를 샘플링 확인
     * 쿠키의 구성요소
       - Name = Value
       - Path = / 
       - Expires = 만료일 세계표준시
     * 웹문서(document)에 쿠키(cookie) 라는 저장소에 저장된다.

    - 쿠키 설정
      name = '메인모달1'  
      value = 'yes'
      path = /
      expires = 2024-12-19T00:49:53.000Z

    - 쿠키 가져오기
      최상위 컴포넌트에서 가져오기
      왜? 현재 모달컴포넌트가 WrapComponent 에 있기 때문에      
      <ModalComponent />
      document.cookie
      
      가져오고 현재 사용하는 쿠키이름이 있다면 
      만료일 남아있기 때문에
      모달창을 닫는다.

      만약 쿠키 이름이 없다면 삭제된 쿠키이다.
      만료일이 지난 쿠키이기때문에 
      그러면 모달창을 열어준다.



   - 모달컴포넌트
   - 쿠키 설정 : 오늘하루동안 열리지 않음(모달창 닫기)
   - 쿠키 삭제 : 모달창 열림


    6. 체크박스 이벤트 => 쿠키 설정(setter)
```js
    const onChangeCheckEvent=(e)=>{

        setState({
            ...state,
            chk: e.target.checked
        })
        
        // console.log( e );
        // console.log( e.target );
        // console.log( e.target.id );
        // console.log( e.target.name );
        // console.log( e.target.type );
        // console.log( e.target.value );
        // console.log( e.target.checked );
        if(e.target.checked){
            let toDay = new Date();
            toDay.setDate(toDay.getDate() + 1);

            // 쿠키이름, 쿠키값은 공백없이 특수문자 없이 사용 권장
            // 쿠키이름, 쿠키값을 공백, 특수문자 사용되면 
            // 유효성과 일관성을 위해서 
            // 인코딩(공백과, 특수문자 이스케이프 처리한다.) 해야한다.
            let name    = 'MAIN_MODAL1';
            let value   = 'green_1234_close';
            let path    = '/';
            let expires = toDay.toUTCString();  // 국제 표준시 설정

        }
        else {
            console.log('');
        }
    }


```

# 모달창 닫기 => 쿠키설정

# 모달창 컴포넌트가 있는 WrapComponet 에서
  1. 저장된 모든 쿠키를 가져온다.

  2. 쿠키 이름과 값이 있다면
     모달창 닫기 구현한다.
     => 디스패치(메인모달액션메서드(fasle))

  3. 쿠키 이름과 값이 없다면
     모달창 열기 구현한다.
     => 디스패치(메인모달액션메서드(true))



# setCookie(이름, 값, 만료일)
# getCookie()


# 쿠키 가져오기 : 겟쿠키 함수

```JS
    function getCookie(){
        // (1) 공백(space) 제거 정규표현식 구현하기
        // \s  => 공백문자 
        // 치환(문자열.replace(정규표현식, '')) 공백을 '' 삭제 
        // const regExp = /\s/g;
        // const cookie = document.cookie.replace(regExp, '');

        // (2) 공백(space) 제거 ES6 이상 replaceAll() 구현하기
        // 치환(문자열.replaceAll(' ', '')) 공백을 '' 삭제 
        const cookie = document.cookie.replaceAll(' ', '');

        console.log( 'cookie 가져오기' );
        console.log( cookie );
        // 1. 쿠키 내부의 쎄미콜론 뒤의 모든 공백은 제거한다.
        //    쿠키는 이름=값 으로 한쌍으로 구성된다.
        //    한싼의 쿠키는 쎄미콜론으로 구분한다.
        // 메인모달2=close; 탑모달=close; MAIN_MODAL1=green_1234_close; 메인모달1=moonjong1234
        // 메인모달2=close; 탑모달=close; MAIN_MODAL1=green_1234_close; 메인모달1=moonjong1234
        
        // 공백제거
        // 메인모달2=close;탑모달=close;MAIN_MODAL1=green_1234_close;메인모달1=moonjong1234

        // 메인모달2=close;탑모달=close;MAIN_MODAL1=green_1234_close;메인모달1=moonjong1234
        
        // 2. 모든 쿠키를  쎄미콜론(;)를 기준으로  
        //    배열에 나누어 저장한다.
        //    문자열.split(';')
        const cookieArr = cookie.split(';');
        cookieArr.map((item, idx, arr)=>{
            console.log( item );
        });
        
        /*         
           [
                '메인모달2=close', 
                '탑모달=close', 
                'MAIN_MODAL1=green_1234_close', 
                '메인모달1=moonjong1234'
            ]
        */  

        // 3. 분리된 쿠키 배열을 '=' 기준으로 나누어 
        //    키: 값 한쌍의 객체 형식
        //    key: value 한쌍의 객체 형식
        //    객체(Object) 형식으로 변환 저장한다.
        //    배열 => 객체 형식으로 변환 기술
        //    예]
        /* 
              [  
                {이름: '메인모달1', 값: 'close'},
                {이름: '메인모달2', 값: 'close'},
                {이름: '탑모달', 값: 'close'},
                {이름: 'MAIN_MODAL1', 값: 'green_1234_close'}
              ]
        */
        // 1. 배열 => 객체 변환 기술1 map() 사용
        // 2. 배열 => 객체 변환 기술2 reduce() 사용
        
        // [구현1]
        // 1. 배열 => 객체 변환 기술1 map() 사용
        //  '메인모달2 = close' => item.split('=') 
        // const obj = cookieArr.map((item)=>({이름: item.split('=')[0], 값: item.split('=')[1] }));
        let obj = cookieArr.map((item)=>(
            {
                이름: item.split('=')[0], 
                값: item.split('=')[1] 
            }
        ));
        console.log( obj );

        // 리턴문 사용
        obj = cookieArr.map((item)=>{
            return {
                    이름: item.split('=')[0],
                    값: item.split('=')[1] 
            }            
        });
        console.log( '리턴문 사용' );
        console.log( obj );

       

        obj.map((item)=>{
           if(item.이름==='MAIN_MODAL1'  &&  item.값==='green_1234_close'){
                dispatch(mainModalAction(false));
           }
           else{
                dispatch(mainModalAction(true));
           }
        });
    
    }

    // 로딩시 쿠키 가져오기 
    // getCookie() 호출실행
    useEffect(()=>{
        getCookie();
    }, [])


// 공백이 있는 원본 쿠키
        console.log( document.cookie )
        // MAIN  MODAL 1=green 1234 close

        // 공백이 제거된 원본 쿠키
        console.log( cookie )
        // 인코딩 encode ASCII CODE  A => 65(10) => 01000001(2) => 전기신호 => A
        // 디코딩 decode
        console.log( decodeURIComponent(cookie) )
        // MAINMODAL1=green1234close;MAIN_MODAL1=green_1234_close;MAIN MODA 2=green 20241219-main-modal close

        // encodeURIComponent('(green)! 20241219-main-modal.com close  & ☆ ♥');
        //                     (green)!%2020241219-main-modal.com%20close%20%20%26%20%E2%98%86%20%E2%99%A5
        //                     (green)! 20241219-main-modal.com close  & ☆ ♥



```


7. 메인슬라이드 
   - 인디게이터 버튼(네비게이션버튼) || 인덱스번호
   - 일시정지 || / 플레이 버튼 ▷


8. MVC 패턴 디자인
   - M: Model(모델) JSON
   - V: View(뷰)    JSX
   - C: Controller(컨트롤러) API(Fetch()) MAP STATE 






-----------------------------------------------------------------------------
# map() reduce() 기초 응용

```JS
    // 리듀스    map(     item, idx, arr) 함수 사용하기
    // 리듀스 reduce(acc, item, idx, arr) 함수 사용하기
    // 리듀스 reduce(누산기 acc 어큐믈레이터 연산결과저장, item, idx, arr) 함수 사용하기
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let sum = arr.reduce((acc, item)=> acc + item, 0);
    // 0 + 1 = 1 acc
    // 1 + 2 = 3 acc
    // 3 + 3 = 6 acc
    // 6 + 4 = 10 acc
    // :
    // 45 + 10 = 55 acc

    console.log( ' 리듀스 reduce(acc, item, idx, arr) 함수 사용하기' );
    console.log(  sum );

    // reduce() 사용 배열을 객체로 변환하기
    console.log( cookieArr );
    // [ 'MAIN_MODAL1 = green_1234_close' ]
    /*
        [ 
            {
                이름: 'MAIN_MODAL1',
                값 : 'green_1234_close'
            }
        ]
    */
    // 리턴문 없으면 소괄호로 감싼다.
    let result = cookieArr.reduce((acc, item)=> ([...acc, {이름: item.split('=')[0],값: item.split('=')[1]}]), []);
    console.log( 'reduce => 배열을 객체로 변환 ' );
    console.log( result );

    // map() 반복문, 계산,...배열처리
    // filter() 일치 불일치 필터링
    // reduce() 누산기 연산결과기억, 반복문, 계산,...배열처리


    const result2 = cookieArr.reduce((acc, item, idx, arr)=> (
        [
            ...acc, 
            {
                이름: item.split('=')[0],
                값: item.split('=')[1]
            }
        ]
    ), []);
    console.log( 'reduce => 배열을 객체로 변환 ' );
    console.log( result2 );



    // 리턴문 사용
    const result3 = cookieArr.reduce((acc, item)=> {
        return [
            ...acc, 
            {
                이름: item.split('=')[0],
                값: item.split('=')[1]
            }
        ]
    }, []);

    console.log( 'result3 => 배열을 객체로 변환 ' );
    console.log( result3 );

    // reduce() 응용
    const job = [
        {이름: '조지현', 나이: 39, 급여: 3500000, 직업: '프론트앤드'},
        {이름: '홍지문', 나이: 49, 급여: 4500000, 직업: '백앤드'},
        {이름: '김수현', 나이: 26, 급여: 2500000, 직업: '웹디자이너'},
        {이름: '이수정', 나이: 25, 급여: 2700000, 직업: '웹퍼블리셔'},
        {이름: '김시연', 나이: 29, 급여: 5000000, 직업: '프론트앤드'},
        {이름: '김시연', 나이: 29, 급여: 6000000, 직업: '웹디자이너'},
        {이름: '김시연', 나이: 29, 급여: 6000000, 직업: '풀스택'}
    ]

    // 1. 급여 합계 계산 리듀스
    // 리턴문 사용
    let hap = job.reduce((acc, item, idx, arr)=> {
        return acc + item.급여;
    }, 0);
    console.log( hap.toLocaleString('ko-KR') );
    // 19,200,000

    // 즉시 리턴
    hap = job.reduce((acc, item, idx, arr)=> acc + item.급여 , 0 );
    console.log( hap.toLocaleString('ko-KR')  );

    // 2. 급여 300만원 이상인 인원수 카운트
    // 리턴문 사용
    let cnt = job.reduce((acc, item)=>{
        if(item.급여>=3000000){
            return acc + 1;
        }
        else {
            return acc
        }
    }, 0);

    console.log( '급여 300만원 이상인 인원수 카운트' );
    console.log( cnt + '명');

    // 즉시리턴
    // 조건문 3항연산자
    cnt = job.reduce((acc, item)=> item.급여 >= 3000000 ? acc + 1 : acc, 0);

    console.log( '급여 300만원 이상인 인원수 카운트' );
    console.log( cnt + '명');

    // 문제 예시] 직업이 프론트앤드 인 사람의 급여의 합계 출력
    // 즉시리턴
    // 조건문 3항연산자
    sum = job.reduce((acc, item)=> item.직업==='프론트앤드' ? acc + item.급여 : acc, 0);

    console.log( '문제 예시] 직업이 프론트앤드 인 사람의 급여의 합계 출력' );
    console.log( sum.toLocaleString('ko-KR') + '원');


    // map() 함수이용 
    // 1. 급여 300만원이상인 인원수
    // map()
    let acc = 0;  // 누적연산 변수
    job.map((item, idx, arr) => {       
        return item.급여>=3000000 ? acc += 1 : acc += 0  
    } );        
    console.log( acc );

    // reduce()         
    cnt = job.reduce((acc, item, idx, arr)=> item.급여 >=3000000 ? acc+1 : acc+0 , 0 );
    console.log( cnt );

    // 2. 직업이 프론트앤드인 급여 합계        
    // map()
    acc = 0; // 누적 연산 변수
    job.map((item, idx, arr) => {
        return item.직업==='프론트앤드' ? acc += item.급여 : acc += 0;
    });
    console.log(  acc );

    // reduce()
    sum = job.reduce((acc, item, idx, arr)=> {
        return item.직업==='프론트앤드' ? acc + item.급여  : acc + 0;
    }, 0);
    console.log(  sum );

    // 3. 나이가 30세 이상 급여 합계
    // map()
    // reduce()
    acc = 0; // 누적 연산 변수
    job.map((item, idx, arr) => {
        return item.나이>=30 ? acc += item.급여 : acc += 0;
    });
    console.log(  acc );

    // reduce()
    sum = job.reduce((acc, item, idx, arr)=> {
        return item.나이>=30 ? acc + item.급여  : acc + 0;
    }, 0);
    console.log(  sum );

    
    // reduce() 응용
    // 이름, 나이, 급여, 직업
    const jobArr = [
        "조지현, 39, 3500000, 프론트앤드",
        "홍지문, 49, 4500000, 백앤드",
        "김수현, 26, 2500000, 웹디자이너",
        "이수정, 25, 2700000, 웹퍼블리셔",
        "김시연, 29, 5000000, 프론트앤드",
        "김수영, 29, 6000000, 웹디자이너",
        "문영수, 29, 7000000, 풀스택"
    ]

    // 배열(Array) => 객체(Object)        
    // map() 1;
    acc = [];
    jobArr.map((item)=> {
        return acc = [
                ...acc,
                {
                    이름: item.split(',')[0],
                    나이: item.split(',')[1],
                    급여: item.split(',')[2],
                    직업: item.split(',')[3]
                }
        ]
    });
    console.log( acc );
    
    // map() 2;
    // 맵함수는 리턴하면 결과 값 배열
    acc = jobArr.map((item)=> (
            {
                이름: item.split(',')[0],
                나이: item.split(',')[1],
                급여: item.split(',')[2],
                직업: item.split(',')[3]
            }
    ));
    console.log( acc );


    // reduce();
    // 배열 = []
    let 직장인 = jobArr.reduce((acc, item)=> [
        ...acc,
        {
            이름: item.split(',')[0],
            나이: item.split(',')[1],
            급여: item.split(',')[2],
            직업: item.split(',')[3]
        }
    ], [] );
    console.log( 직장인 );


    let txt = "조지현, 39, 3500000, 프론트앤드;  홍지문, 49, 4500000, 백앤드;  김수현, 26, 2500000, 웹디자이너;이수정, 25, 2700000, 웹퍼블리셔;  김시연, 29, 5000000, 프론트앤드; 김수영, 29, 6000000, 웹디자이너; 문영수, 29, 7000000, 풀스택";

    // 0. 단계 " "  공백제거 정규표현식  \s  => replace(정규표현식, "")
    // 0. 단계 " "  공백제거 " "  => replaceAll(" ", "")

    // 1. 단계 ";"  배열 만들기
    // let txtArr = txt.replaceAll(' ','').split(';');  // 행단위 배열처리
    // Global 글로발 전체(All)
    let txtArr = txt.replace(/\s/g,'').split(';');  // 행단위 배열처리

    console.log( txtArr );
    /* 
        [
            "조지현, 39, 3500000, 프론트앤드",
            "홍지문, 49, 4500000, 백앤드",
            "김수현, 26, 2500000, 웹디자이너",
            "이수정, 25, 2700000, 웹퍼블리셔",
            "김시연, 29, 5000000, 프론트앤드",
            "김수영, 29, 6000000, 웹디자이너",
            "문영수, 29, 7000000, 풀스택"
        ]
    */
    // 2. 단계 ","  객체 만들기 이름, 나이, 급여, 직업
    let res = txtArr.map((item)=> (
        {
            이름: item.split(',')[0],
            나이: item.split(',')[1],
            급여: item.split(',')[2],
            직업: item.split(',')[3]
        }
    ));
    console.log( res );

    // reduce()
    res = txtArr.reduce((acc, item)=> [
        ...acc, 
        {
            이름: item.split(',')[0],
            나이: item.split(',')[1],
            급여: item.split(',')[2],
            직업: item.split(',')[3]
        }
    ], []);
    console.log( res );
```

--------------------------------------------------------------------------------------
# JSON 데이터 fetch() &  axios() API 구현하기
아파치톰켓서버 => ORACLE + JAVA + JSP & SERVLET(서블릿) => JSON => 웹페이지에전송
아파치톰켓서버 => MYSQL + JAVA + JSP & SERVLET(서블릿) => JSON => 웹페이지에전송
윈도우NT서버 => MSSQL + ASP & 닷넷 => JSON => 웹페이지에전송
아파치웹서버 => MYSQL + PHP => JSON => 웹페이지에전송

# JSON 데이터 분석 설계 제작
- [pulic]
     [json]
        {}notice.json
        {}slide.json

1. 공지사항(notice) [{},{},{},{}]
    - 글제목
    - 글내용
    - 작성날짜
```JSON
    // notice.json
    {
        "공지사항": [
            {"글번호":1,"글제목":"모든 스타벅스 카드의 자동 충전 서비스가 종료되는 것이 아닌 일부 결제 대행사를 통한 결제 서비스의 제공이 종료되는 것으로, 스타벅스 앱을 통하여 자동 충전을 다시 설정하시면 서비스 종료일 이후에도 자동 충전 기능 사용이 가능합니다. 즐거운(스마일콘) 시스템 점검 안내 페이스북 공유하기 새창","글내용":"모든 스타벅스 카드의 자동 충전 서비스가 종료되는 것이 아닌 일부 결제 대행사를 통한 결제 서비스의 제공이 종료되는 것으로, 스타벅스 앱을 통하여 자동 충전을 다시 설정하시면 서비스 종료일 이후에도 자동 충전 기능 사용이 가능합니다. 즐거운(스마일콘) 시스템 점검 안내 페이스북 공유하기 새창 온라인 전자결제대행사(스마트로)와의 계약 종료로 인하여, 일부 스타벅스 카드 자동 충전 서비스가 2024년 12월 15일까지만 제공될 예정임을 안내 드립니다.","작성날짜":"2024-12-23"},
            {"글번호":2,"글제목":"즐거운의 시스템 점검으로 인해 스마일콘에서 발행된 스타벅스 모바일 상품권 사용이 일시적으로 제한됩니다.","글내용":"즐거운의 시스템 점검으로 인해 스마일콘에서 발행된 스타벅스 모바일 상품권 사용이 일시적으로 제한됩니다. 즐거운의 시스템 점검으로 인해 스마일콘에서 발행된 스타벅스 모바일 상품권 사용이 일시적으로 제한됩니다.","작성날짜":"2024-12-21"},
            {"글번호":3,"글제목":"스마트로 PG(전자결제대행사)를 통한 일부 자동 충전 서비스 종료 사전 안내 페이스북 공유하기 새창","글내용":"스마트로 PG(전자결제대행사)를 통한 일부 자동 충전 서비스 종료 사전 안내 페이스북 공유하기 새창 사이렌 오더/딜리버스 음료 기본 설정 변경 안내 (ICED → HOT) 페이스북 공유하기 새창 스마트로 PG(전자결제대행사)를 통한 일부 자동 충전 서비스 종료 사전 안내 페이스북 공유하기 새창 사이렌 오더/딜리버스 음료 기본 설정 변경 안내 (ICED → HOT) 페이스북 공유하기 새창","작성날짜":"2024-12-19"},
            {"글번호":4,"글제목":"온라인 전자결제대행사(스마트로)와의 계약 종료로 인하여, 일부 스타벅스 카드 자동 충전 서비스가 2024년 12월 15일까지만 제공될 예정임을 안내 드립니다.","글내용":"온라인 전자결제대행사(스마트로)와의 계약 종료로 인하여, 일부 스타벅스 카드 자동 충전 서비스가 2024년 12월 15일까지만 제공될 예정임을 안내 드립니다. 온라인 전자결제대행사(스마트로)와의 계약 종료로 인하여, 일부 스타벅스 카드 자동 충전 서비스가 2024년 12월 15일까지만 제공될 예정임을 안내 드립니다.","작성날짜":"2024-12-17"}
        ]
    }
```


# Section3Component.jsx
1-1 공지글 전체 객체로 생성해서 보내기

  
  ```JS
    // 모달창 열기 클릭 이벤트 
    const onClickModalOpen=(e, 공지글)=>{
        e.preventDefault();
        // 5. 모달창열기 구현 => 데이터 전송
        // 공지글 => 글번호, 글제목, 글내용, 작성날짜, 모달 true
        // 리덕스 => modal 리듀서 전송 객체
        const notice = {
            글번호: 공지글.글번호,
            글제목: 공지글.글제목,
            글내용: 공지글.글내용,
            작성날짜: 공지글.작성날짜,
            모달: true
        }
        dispatch(mainModalAction(notice));
    }
```


# [store]  modal.js
1-2 리듀서 확인 console.log();
```JS
    mainModalAction(state, action){ 
        state.mainModal = action.payload.모달;
        state.글번호 = action.payload.글번호;
        state.글제목 = action.payload.글제목;
        state.글내용 = action.payload.글내용;
        state.작성날짜 = action.payload.작성날짜;

        console.log(  'action.payload' )
        console.log(  action.payload )
        console.log(  action.payload.글번호 )
        console.log(  action.payload.글제목 )
        console.log(  action.payload.글내용 )
        console.log(  action.payload.작성날짜 )
        console.log(  state )
    },

```

#  ModalComponent.jsx
1-3. 모달창에 글제목, 직상날짜, 글내용 바인딩 하기





2. 갤러리(Gallery) [{},{},{}]
    - 글번호
    - 이미지
    - 이미지설명
```JSON
    // gallery.json
    {
        "갤러리": [
            {"글번호":1,"이미지":"./images/gallery1.jpg","이미지설명":"마을과 전경 이미지"},
            {"글번호":2,"이미지":"./images/gallery2.jpg","이미지설명":"마을과 뒷산 이미지"},
            {"글번호":3,"이미지":"./images/gallery3.jpg","이미지설명":"마을과 호수 이미지"}
        ]
    }
```

2-1 갤러리 JSON 데이터 fetch()  API로 가져오기 => 상태관리에 저장

2-2 상태관리 갤러리 데이터 JSX 바인딩하기




# Section1Component.jsx
3. 섹션1 슬라이드 
```JSON
    // main_slide.json
    {
        "메인슬라이드": [
            {"글번호":1,"클래스":"slide3 last", "이미지":"./images/slide3.jpg", "타이틀":"푸른마을 이미지 슬라이드3"},
            {"글번호":2,"클래스":"slide1",      "이미지":"./images/slide1.jpg", "타이틀":"푸른마을 이미지 슬라이드1"},
            {"글번호":3,"클래스":"slide2",      "이미지":"./images/slide2.jpg", "타이틀":"푸른마을 이미지 슬라이드2"},
            {"글번호":4,"클래스":"slide3",      "이미지":"./images/slide3.jpg", "타이틀":"푸른마을 이미지 슬라이드3"},
            {"글번호":5,"클래스":"slide1 first","이미지":"./images/slide1.jpg", "타이틀":"푸른마을 이미지 슬라이드1"}
        ]
    }
```


# Section2Component.jsx
4. 섹션2 배너
```JSON
    // section2.json
    {
        "section2": {
            "글번호":1,
            "타이틀":"Lorem ipsum dolor sit amet consectetur adipisicing elit.", 
            "내용":"Illum placeat ipsa eos neque illo, voluptates excepturi modi molestiae nostrum accusamus cum corporis? Dolorem praesentium facilis enim reiciendis aut tempora provident corporis, voluptatibus quidem minima ea fuga, quam distinctio!", 
            "이미지":"./images/banner.jpg"
        }
    }
```

# Section1Component.jsx
5. 섹션1 링크 바로가기
```JSON
    // section1.json
    {
        "section1": [
            {"글번호":1, "타이틀":"link1", "이미지":"./images/link1.jpg"}
            {"글번호":2, "타이틀":"", "이미지":""}
            {"글번호":3, "타이틀":"link2", "이미지":"./images/link1.jpg"}
            {"글번호":4, "타이틀":"", "이미지":""}
            {"글번호":5, "타이틀":"link3", "이미지":"./images/link1.jpg"}
        ]
    }
```

```JS
 useEffect(()=>{
        // 0 1 2 3 4
        // 0  2  4 => 나머지 0
        // 1 3  => 나머지 1
        // idx % 2 연산 JSX 출력시 버블링 발생
        // link.바로가기.map((item, idx)=>
        //     idx % 2 === 1 ?  console.log("2행, 4행 " + idx )  : console.log( "1행 3행 5행" + idx )  
        // );

        
        // 중괄호 있는 리턴문 사용 형식은
        // if 문사용 가능
        // 그러나 반드시 리턴문 사용
        link.바로가기.map((item, idx)=>{
            if(item.타이틀!==""){
                return console.log("idx = 0, 2, 4"  + idx + " " + item.이미지 ) // 0 2 4
            }
            else {
                return console.log("idx = 1, 3"  + idx + " " + item.이미지 ) // 1, 3
            }
        })            


        // 중괄호 없는 즉시리턴 형식은
        // 3항연산자 사용
        // if 문사용 안된다.
        link.바로가기.map((item, idx)=>
            item.타이틀!=="" ?
                console.log("idx = 0, 2, 4"  + idx + " " + item.이미지 ) // 0 2 4
            :            
                console.log("idx = 1, 3"  + idx + " " + item.이미지 ) // 1, 3            
        )
            
        


    }, [link.바로가기]);

```


# HeaderComponent.jsx
6. 헤더 네비게이션(Navigation) 메인메뉴 & 서브메뉴
네비게이션 => 메인메뉴 => 서브메뉴[4]

```JSON
    // nav.json
    {        
        "네비게이션": {
            "메인메뉴": {
                "OnSale": [
                    ["메인1서브","OnSale","할인행사"],
                    ["봄 먹거리","여름 먹거리","가을 먹거리","겨울 먹거리"],
                    ["메인요리","밑반찬","간식","브런치"],
                    ["신규매장","추천매장","공지사항"]
                ],
                "기획전": [
                    ["메인2서브", "기획전", "신상품"],
                    ["아동복", "자켓", "팬츠","장남감"],
                    ["신규매장", "추천매장", "공지사항"]
                ], 
                "푸른마을 레시피": [
                    ["메인3서브","푸른마을 레시피","베스트"],
                    ["남성의류","자켓","팬츠","운동복"],
                    ["메인요리","밑반찬","간식","브런치"]
                ],
                "매장안내": [
                    ["메인4서브","매장안내","알뜰상품"],
                    ["여성의류","상의","팬츠","레깅스"]
                ]
            }
        }
    }
```


```JS
  // 메인메뉴 바인딩 테스트
    useEffect(()=>{        
        console.log( state.메인메뉴 )
        // 메인메뉴 만 출력
        // 반복문 for of 배열

        // 1. 메인메뉴만 출력 방법
        //    JSX 에서 적하지 않다.
        // 반복문 for in 객체
        for (let item in  state.메인메뉴) {
            console.log( item);
        }
        // 출력
        /*
          OnSale
          기획전
          푸른마을 레시피
          매장안내
        */

        // 객체를 지정하는 방식
        // . 점표기법 => 공백이 포함안된상태만 가능
        // [''] 대괄호 표기법 => 공백이 포함된 상태도 가능
        console.log( state.메인메뉴.OnSale ); // 자식요소 배열 모두 점표기
        console.log( state.메인메뉴.기획전 ); // 자식요소 배열 모두  점표기
        console.log( state.메인메뉴['푸른마을 레시피']); // 자식요소 배열 모두  [] 표기
        console.log( state.메인메뉴['매장안내'] ); // 자식요소 배열 모두 

        // 2. 객체(Object)의 키(keys), 밸류(values), 엔트리(entries)
        console.log(  Object.keys(state.메인메뉴) ); // => 키 배열로 출력
        // (4) ['OnSale', '기획전', '푸른마을 레시피', '매장안내']

        console.log(  Object.values(state.메인메뉴) ); // => 값 배열로 출력        
        // (4) [Array(4), Array(3), Array(3), Array(2)]

        console.log(  Object.entries(state.메인메뉴) ); // => 키: 밸류 한쌍 출력 []
        // Array(2), Array(2), Array(2), Array(2)]

        // 2. 객체를 배열로 생성해서 map() 함수 사용
        //  Object.keys(state.메인메뉴) 결과가 배열로 출력 
        Object.keys(state.메인메뉴).map((item, idx)=>{
            return console.log( idx,  item); // 인덱스번호, 메인메뉴
        });

        // 3. 각 메인메뉴에 서브메뉴를 출력하라
        //    최종 JSX 데이터 바인가능한 형태가 만들어 졌다
        //    인덱스번호, 메인메뉴, 서브메뉴[], 서브메뉴[] 배열 길이
        Object.keys(state.메인메뉴).map((item, idx)=>{
            return console.log( idx,  item,  state.메인메뉴[item], state.메인메뉴[item].length );
        });


    },[state.메인메뉴])

```


```JSX

<ul onMouseLeave={onMouseLeaveMainBtn}>
{ 
// ['메인메뉴1', '메인메뉴2', '메인메뉴3', '메인메뉴4'].map()
    Object.keys(state.메인메뉴).map((item, idx)=>                                                            
        <li key={item}>
            <a href="!#" className="main-btn" title="OnSale"  onMouseEnter={(e)=>onMouseEnterMainBtn(e, idx)} >{item}</a>
            {
                sub[idx] &&     
                <div className="sub sub1">
                    <ul>
                        {
                        state.메인메뉴[item].map((item2, idx2)=>
                            <li key={idx2}> {/*  줄 */}
                            {               
                                item2.map((item3, idx3)=>
                                    <span key={idx3}> {/*  칸 */}
                                        <a href="!#">{item3}</a>
                                    </span>   
                                )
                            }
                            </li>
                        )     
                        }
                    </ul>
                </div>
            }
        </li>            
    )    
}
</ul>

```

------------------------------------------------------------------------------

# 배포하기 깃허브 닷홈
1. 닷홈 배포주소
http://eunbi9503.dothome.co.kr/green2/

2. 깃허브 배포주소
https://joeunbi95.github.io/green/

리파지토리 => green
https://github.com/joeunbi95/green.git

# 깃허브 배포 순서
1. 리파지토리 생성 green => create repository
2. 리파지토리 주소 복사하기
3. 리파지토리 주소 붙여넣기
  - 리액트 원본 파일이 업로드될 폴더[리파지토리] => green
    https://github.com/joeunbi95/green.git
    https://github.com/joeunbi95/green2.git

4. 배포 할 프로젝트를 길이가 짧은 폴더를 만들고 프로젝트 복사 붙여넣는다.
5. README.md 파일 정리 홈페이지 소개, 기능, 기술, 스택등 홈페이지 소개와 본인소개
6. npm i
7. package.json 열고 배포 주소를 기록한다.
  "hompage": "https://github.com/joeunbi95/green.git"

/////////////////////////////////////////////////////////////////////////////
1. 깃 설정
```bash
    git init
``` 

2. 깃 환경 config 사용자(user) email, name 설정
```bash
    git config user.email 'dmsq1@naver.com'
    git config user.name 'joeunbi95'

    $ git config user.email
    dmsq1@naver.com

    $ git config user.name
    joeunbi95
```

3. 리파지토리 주소 origin
```bash
    git remote add origin https://github.com/joeunbi95/green.git

    git remote add origin https://github.com/joeunbi95/green2.git

    git remote add origin https://github.com/joeunbi95/green3.git

    git remote remove origin    // origin 삭제
```

4. origin 확인
```bash
    git remote -v

    origin  https://github.com/joeunbi95/green.git (fetch)
    origin  https://github.com/joeunbi95/green.git (push)
```

5. 스테이징 모든파일 업로드 => push 준비
```bash
    git add .
```

6. 커밋
```bash
    git commit -m "리액트 프로젝트 푸른마을 배포"
```

7. push
```bash
    git push origin master
```

8. 새고로침[F5]

9. npm run build = https://cra.link/deployment => GitHub Pages

10. npm install --save gh-pages

11. package.json :
    "predeploy": "npm run build",
    "deploy": "gh-pages -b master -d build"

12. npm run deploy

13. GitHub 새로고침

14. setting => pages => Branch => master => save
