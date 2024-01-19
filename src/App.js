import { Container, Nav, Navbar, NavDropdown, Form, Button } from 'react-bootstrap';
import './App.css';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'

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
import data from './data.js';

//컴포넌트 가져오기
import Detail from './detail.js'

// 이를 한방에 해결할 수 있다.
// public폴더 안에 있는 이미지는 /{이미지경로} 로 쓸 수 있다.
// 서브 경로에다가 발행하고 싶을대 문제가 생길 수 있다.
// 이때는 {process.env.PUBLIC+URL + '{이미지경로}'} 로 작성하면된다.

function App() {
  // API를 통해 데이터를 받아왔다고 가정하자 여기에서는 data.js가 전송된 데이터
  let [shoes] = useState(data)

  return (
    <div className="App">

      <Navbar expand="lg" className="bg-body-tertiary" bg="light" data-bs-theme="light" >
        <Container>
          <Navbar.Brand href="/">Sandbox4DevP</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Cart</Nav.Link>
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

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 페이지 이동은 Link */}
      <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link>

      {/* Route사용하기 */}
      <Routes>
        <Route path="/" element={
          <>
            <div className='main-bg'></div>
            <div className="container">
              <div className="row">
                {
                  shoes.map(function (item, index) {
                    return (
                      <Compo key={item.id} shoe={item}></Compo>
                    )
                  })
                }
              </div>
            </div>
          </>
        } />
        <Route path="/detail" element={<Detail/>}/>
      </Routes>



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

function Compo(props) {
  return (
    <div className="col-md-4">
      <img src={"/img/m" + (props.shoe.id + 1) + ".jpeg"} alt="" />
      <h4>{props.shoe.title}</h4>
      <p>{props.shoe.content}</p>
    </div>
  )
}

export default App;