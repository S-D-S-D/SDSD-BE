const fetch = require('node-fetch')

const KEY = "697456674f6c6a6d313034674d6f6e54"
const TYPE = "json"
const SERVICE = "ListProgramByPublicSportsFacilitiesService"
let START_INDEX = 1
let END_INDEX = 1000
let SUBJECT_NAME

async function fetchData(START, END) {
  try {
    const url =`http://openapi.seoul.go.kr:8088/${KEY}/${TYPE}/${SERVICE}/${START}/${END}/`
    const response = await fetch(url);// URL에 대한 GET 요청을 만듬
    if (!response.ok) {
      throw new Error(`Failed to fetch JSON data from the URL: ${response.status}`);// api 값을 받아왔는지 확인
    }
    const jsonData = await response.json();// json으로 값을 반환
    DATA = jsonData.ListProgramByPublicSportsFacilitiesService;
    
    let subjectCount = {}

    for(let i=0; i<DATA.row.length; i++){// 데이터에 따라 값을 json에 넣어줌
      const subjectData = DATA.row[i].SUBJECT_NAME// row별 데이터 접근
      if(subjectData in subjectCount ){
        subjectCount[subjectData] += 1// 데이터가 있으면 value 증가
      }else{
          subjectCount[subjectData] = 1// 데이터가 없으면 새롭게 추가
      }
    }
    console.log(subjectCount)
  } catch (error) {
    console.error("Error fetching JSON data:", error);
  }
}
async function fetchAllData() {
  for(let j = 0; j < 14; j++) {
    await fetchData((1 + 1000 * j), (j + 1) * 1000);
  }
}

fetchAllData();
