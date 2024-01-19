// 파일공유시 보내고자하는 파일 안에 export먼저하고 사용하는곳에서 import를 하면된다.

// let a = 10;
// let b = 102;

// // export default a;
// // 여러개를 하고싶을때
// export {a,b}

let data = [
    {
      id : 0,
      title : "심슨가족",
      content : "Born in France",
      price : 120000
    },
  
    {
      id : 1,
      title : "사랑한다고 말해줘",
      content : "Born in Seoul",
      price : 110000
    },
  
    {
      id : 2,
      title : "킬러들의 쇼핑몰",
      content : "Born in the States",
      price : 130000
    }
  ] 

  export default data;