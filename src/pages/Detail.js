import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from 'styled-components'
import { Nav } from 'react-bootstrap';

//하나의 스타일 컴포넌트를 만드는것 styled-components
// 버튼 만들기
// 비슷한 컴포넌트 만들때 props를 넣을수도있다.
// 다른 styled를 가져와 더하는 것도 가능하다. ex) styled.button(YellowBtn)
let YellowBtn = styled.button`
  background : ${props => props.bg};
  color :  ${props => props.bg == 'blue' ? 'white' : 'black'};
  padding : 10px;
`

function Detail(props) {
  // useEffect는 기본적으로 mount, update시 코드를 실행시켜준다.
  // useEffect(()=>{
  //   for (var i = 0; i < 10000; i++){
  //     console.log(1)
  // } 
  // })

  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let [tab, setTab] = useState(0);


  // useParams(): 파라미터 정보를 가지고 있다.;
  let { id } = useParams();
  //존재하지 않는 파라미터를 보여주면 if문으로 다른걸 보여주면된다.

  // 현재 코드의 문제는 상품의 순서가 바뀌었을때가 반영안된다는 문제점이 있다.
  // 때문에 이를 매칭해주려면 받은 파라미터와 실제 상품 id를 연결해주어야 할것이다.
  let 찾은상품 = props.shoes.find((x) => x.id == id)
  // 참고 arrow funtion은 return과 중괄호를 생략가능하다.

  // useEffect(()=> {
  //   //타이머 적용방법
  //   setTimeout(()=>{ document.getElementById("Event").style.display = 'none' }, 2000) })
  useEffect(() => {
    setTimeout(() => { setAlert(false) }, 2000)
  }, [])

  // 예제: useEffect를 이용해서 숫자만 입력하는 알럿 띄우기
  let [value, setValue] = useState('')
  let [textAlert, setTextAlert] = useState(false)

  useEffect(() => {
    isNaN(value) ? setTextAlert(true) : setTextAlert(false);
  }, [value])

  //예제: Detail페이지에 투명도 0-> 1 애니메이션을 줘보자
  let [fade2,setFade2] = useState('')

  useEffect(()=> {
    setFade2('end')

    return (()=>{
      // clearTimeout(a);
      setFade2('');
    })
  }, [])

  return (
    <div className={`container start ${fade2}`}>

      {
        alert ? <div className="alert alert-warning">
          2초이내 구매시 할인
        </div> : null
      }


      {/* useEffect 사용해보기 */}
      {count}
      <YellowBtn bg='blue' onClick={() => { setCount(count + 1) }}>버튼</YellowBtn>
      {/* <YellowBtn bg='orange'>버튼</YellowBtn> */}

      <div className="row">
        <div className="col-md-6">
          <img src={"/img/m" + (찾은상품.id + 1) + ".jpeg"} width="100%" />

        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>

      {/* useEffect 예제: 문자입력시 알럿 표시 */}
      <div className="mb-3 align-item-start">
        <div className="row row-cols-auto  mt-5">
          <label for="exampleFormControlInput1" className="col form-label">숫자입력</label>
          {
            textAlert ? <p className="col text-danger">숫자만 입력해주세요</p> : null
          }
        </div>
        <input type="text" className="col form-control red" placeholder="숫자 입력" onChange={(e) => setValue(e.target.value)} />
      </div>

      {/*  탭만들기 */}

      {/* 스텝 1 ui만들기 */}
      <Nav variant="tabs" defaultActiveKey="tab1">
        <Nav.Item>
          <Nav.Link onClick={()=>setTab(0)} eventKey="tab1">탭 1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>setTab(1)} eventKey="tab2">탭 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>setTab(2)} eventKey="tab3">탭 3</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />

    </div>
  )};

function TabContent({tab}) {
  // if (props.tab == 0) {
  //   return (<div>내용1</div>)
  // }
  // if (props.tab == 1) {
  //   return (<div>내용2</div>)
  // }
  // if (props.tab == 2) {
  //   return (<div>내용3</div>)
  // }

  // 전환 애니메이션 만들기
  let [fade,setFade] = useState('')

  useEffect(() => {
    let a = setTimeout(()=>{ setFade('end') }, 10)

    return (()=>{
      clearTimeout(a)
      setFade('')
    })
  }, [tab])

  //위를 더 보기 편하게 작성하려면
  return (
    <div className={'start ' + fade }>
      { [ <div>내용0</div>, <div>내용1</div>, <div>내용2</div> ][tab] }
    </div>
  )
}

export default Detail