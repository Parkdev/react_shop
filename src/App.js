import { Container, Nav, Navbar, NavDropdown, Form, Button, Row } from 'react-bootstrap';
import './App.css';
import { useState, createContext, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios'
import Loading from './pages/Loading.js'
// App.js에서 이미지를 바로 가져오고 싶을때
// import 작명 from 경로
// import bg from './img/bg.png'
// import m1 from './img/m1.jpeg'
// import m2 from './img/m2.jpeg'
// import m3 from './img/m3.jpeg'

//data.js에서 변수를 가져오고 싶을때
// import a from './data.js';
//데이터가 여러개가 export되었을때
// import {a,b} from './data.js';
import data from './components/data.js';

//컴포넌트 가져오기
import Detail from './pages/Detail.js'

//Redux용 cart페이지
import Cart from './pages/Cart.js'
import { useQuery } from 'react-query';

// 이를 한방에 해결할 수 있다.
// public폴더 안에 있는 이미지는 /{이미지경로} 로 쓸 수 있다.
// 서브 경로에다가 발행하고 싶을대 문제가 생길 수 있다.
// 이때는 {process.env.PUBLIC+URL + '{이미지경로}'} 로 작성하면된다.

// Context api
export let Context1 = createContext()

function App() {
  // API를 통해 데이터를 받아왔다고 가정하자 여기에서는 data.js가 전송된 데이터
  let [shoes, setShoes] = useState(data)

  //Context api 예제
  // 상품의 재고를 관리하는 state
  let [stock] = useState([10, 11, 12])


  // 페이지 이동을 도와주는 훅
  // 함수가 들어가있어 별도의 변수에 저장해서 쓰는게 일반적
  let navigate = useNavigate();

  //loading
  let [loading, setLoading] = useState(false);

  //click count
  let [clickCount, setclickCount] = useState(0);

  //local Storage 최근 본상품 만들어보기
  // 좀더 깔끔하게 하려면 상품상세 페이지가 mount될때마다 실행되게하면된다. Detail.js 참고
  useEffect(() => {
    if (localStorage.getItem('watched') == null) {
      localStorage.setItem('watched', JSON.stringify([]))
    }
  }, [])
  // let [recent, setRecent] = useState(JSON.parse(localStorage.getItem('watched')));

  //[React-Query]
  // 일반적으로 데이터를 가져올때,
  // axios.get('https://codingapple1.github.io/userdata.json').then((a))->{
  //   a.data
  // }) 
  // 와 같이 가져와야하지먼 react-query를 이용하면 이를 단축 시킬 수 있다.
  let result = useQuery('작명', () => {
    return axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
      return a.data
    })
  })

  return (
    <div className="App">

      <Navbar expand="lg" className="bg-body-tertiary" bg="light" data-bs-theme="light" >
        <Container>
          <Navbar.Brand href="/">Sandbox4DevP</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="me-auto">
              <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
              <Nav.Link onClick={() => { navigate('/cart') }}>Cart</Nav.Link>
              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>

              </NavDropdown>

            </Nav>
            <Nav className='flex items-center'>
              <Form className="d-flex mr-3">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <Nav className='ms-auto'>
                {result.isLoading ?'로딩중' : result.data.name}
              </Nav>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 페이지 이동은 Link | 근대 안이쁘다 */}
      {/* <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link> */}

      {/* Route사용하기 */}
      <Routes>
        <Route path="/" element={
          <>
            <div className='main-bg'></div>



            <div className="container mt-4">

              <RecentComponent shoes={shoes} />
              <Row xs="auto" className='mt-4'>
                <h1>영상 목록</h1>
              </Row>
              <div className="row mt-4">
                {
                  shoes.map(function (item, index) {
                    return (
                      <Compo key={item.id} shoe={item}></Compo>
                    )
                  })
                }
              </div>
            </div>
            <button className='mt-3 btn btn-success' onClick={
              () => {
                if (clickCount == 0 || clickCount == 1) {
                  //로딩바 부르기
                  setLoading(true);
                  setTimeout(() => {
                    //데이터 부르기
                    let link = 'https://codingapple1.github.io/shop/data' + (clickCount + 2) + '.json'
                    axios.get(link)
                      .then((result) => {
                        let copy = [...shoes, ...result.data];
                        setShoes(copy);
                        //로딩바 숨기기
                        setclickCount(clickCount + 1);
                        setLoading(false);
                      })
                      .catch(() => {
                        alert('로드실패')
                        //로딩바 숨기기
                        setclickCount(clickCount + 1);
                        setLoading(false);
                      });
                  }, 2000);
                } else if (clickCount == 2) {
                  alert('데이터없음')
                }
              }}>데이터 부르기</button>
          </>
        } />

        {/* Context 사용해보자 */}
        {/* url parameter */}
        <Route path="/detail/:id" element={
          <Context1.Provider value={{ stock, shoes }}>
            <Detail shoes={shoes} />
          </Context1.Provider>
        } />

        {/* 더 깊게가려면 nested route를 사용 */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>맴버임</div>} />
          <Route path="location" element={<About />} />
        </Route>

        {/* 직접 해보기 */}
        <Route path="event" element={<Event />}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>}></Route>
          <Route path='two' element={<div>생일기념 쿠폰받기</div>}></Route>
        </Route>

        {/* 404페이지 만들기 */}
        <Route path="*" element={<div>404페이지에요</div>} />

        {/* Redux를 사용해서 새 페이지 만들기 */}
        <Route path="/cart" element={<Cart />} />
      </Routes>

      {/* 로딩페이지 */}
      {loading ? <Loading /> : null}

      {/* floating 최근 본 목록 */}
      {/* <FloatingNav /> */}

      {/* 변수 중간에 값을 넣고 싶을때 +를 쓰면된다. */}
      {/* <div className='main-bg' style={{backgroundImage: 'url('+ bg +')'}}></div> */}
      {/* <div className='main-bg'></div>
      <div className="container">
        <div className="row">
          {
            shoes.map(function (item, index) {
              return (
                <Compo key={item.id} shoe={item}></Compo>
              )
            })
          }
          {/* <div className="col-md-4">
            <img src='/img/m1.jpeg' alt="" />
            <h4>{shoes[0].title}</h4>
            <p>{shoes[0].content}</p>
          </div>
          <div className="col-md-4">
            <img src='/img/m2.jpeg' alt="" />
            <h4>상품명</h4>
            <p>상품설명</p>
          </div>
          <div className="col-md-4">
            <img src='/img/m3.jpeg' alt="" />
            <h4>상품명</h4>
            <p>상품설명</p>
          </div> */}
      {/* </div>
      </div> */}

    </div>
  );
}
// 함수는 항상 대문자 시작
// map으로 컴포넌트에 값을넣을땐 함수로
// 출력은 반드시 return안에
// 계산은 () 괄호
// component는 key값을 넘겨주어야 된다 나중을 위해
// 오브젝트를 그대로 넘길 수 있다.

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet />
    </div>
  )
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Compo(props) {
  let navigate = useNavigate();
  let link = 'detail/' + props.shoe.id
  return (
    <div className="col-md-4" onClick={() => {
      // let arr = new Set(JSON.parse(localStorage.getItem('watched'))).add(props.shoe.id);
      // // console.log(arr);
      // localStorage.setItem('watched', JSON.stringify([...arr]));
      navigate(link);
    }}>
      <img src={"/img/m" + (props.shoe.id + 1) + ".jpeg"} alt="" />
      <h4>{props.shoe.title}</h4>
      <p>{props.shoe.content}</p>
    </div>
  )
}

//중간에 Floating nav를 만들어보자
function RecentComponent(props) {
  let arr = JSON.parse(localStorage.getItem('watched'));
  let [list, setList] = useState(arr);
  return (
    <>
      {list.length != 0 ?
        <>
          <Row xs="auto" className='mt-4'>
            <div className="w-full flex justify-between">
              <div className='flex items-center'>최근 본 목록</div>
              <button className="btn btn-warning" onClick={() => setList([])}>목록 삭제</button>
            </div>

          </Row>
          <div className="row mt-4">
            {
              list.map(function (item, index) {
                return (
                  <Compo key={item} shoe={props.shoes[item]}></Compo>
                )
              })
            }
          </div>
        </>
        : null}
    </>
  )
}

export default App;