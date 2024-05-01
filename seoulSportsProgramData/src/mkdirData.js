const fetch = require('node-fetch');
const fs = require('fs');

const KEY = "697456674f6c6a6d313034674d6f6e54";
const TYPE = "json";
const SERVICE = "ListProgramByPublicSportsFacilitiesService";
let START_INDEX = 1;
let END_INDEX = 1000;
let SUBJECT_NAME;

async function fetchData(START, END) {
  try {
    const url =`http://openapi.seoul.go.kr:8088/${KEY}/${TYPE}/${SERVICE}/${START}/${END}/`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch JSON data from the URL: ${response.status}`);
    }
    const jsonData = await response.json();
    const DATA = jsonData.ListProgramByPublicSportsFacilitiesService;
    
    let subjectCount = {};

    for(let i = 0; i < DATA.row.length; i++){
      const subjectData = DATA.row[i].SUBJECT_NAME;
      if(subjectData in subjectCount ){
        subjectCount[subjectData] += 1;
      } else {
        subjectCount[subjectData] = 1;
      }
    }
    
    return subjectCount;
  } catch (error) {
    console.error("Error fetching JSON data:", error);
    return {};
  }
}

async function fetchAllData() {
  let allData = {};
  //for(let j = 0; j < 14; j++) {
  //  const data = await fetchData((1 + 1000 * j), (j + 1) * 1000);
  //  allData = { ...allData, ...data };
  //}
  const data = await fetchData(12001, 13000);
  allData = { ...allData, ...data };
  // 파일에 데이터 쓰기
  fs.writeFileSync('output13.json', JSON.stringify(allData, null, 2));
}

fetchAllData();
