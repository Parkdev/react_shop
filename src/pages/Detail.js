import { useParams } from "react-router-dom"

function Detail(props) {

  // useParams(): 파라미터 정보를 가지고 있다.;
  let {id} = useParams();
  //존재하지 않는 파라미터를 보여주면 if문으로 다른걸 보여주면된다.
  
  // 현재 코드의 문제는 상품의 순서가 바뀌었을때가 반영안된다는 문제점이 있다.
  // 때문에 이를 매칭해주려면 받은 파라미터와 실제 상품 id를 연결해주어야 할것이다.
  let 찾은상품 = props.shoes.find((x)=>x.id == id)
  // 참고 arrow funtion은 return과 중괄호를 생략가능하다.


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={"/img/m" + (찾은상품.id+1) + ".jpeg"} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  )
}

export default Detail