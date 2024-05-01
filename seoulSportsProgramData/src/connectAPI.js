const fetch = require('node-fetch')

const KEY = "697456674f6c6a6d313034674d6f6e54"
const TYPE = "json"
const SERVICE = "ListProgramByPublicSportsFacilitiesService"
let START_INDEX = 1
let END_INDEX = 2
let SUBJECT_NAME
let DATA
const url =`http://openapi.seoul.go.kr:8088/${KEY}/${TYPE}/${SERVICE}/${START_INDEX}/${END_INDEX}/`

//console.log(url)

fetch(url)// URL에 대한 GET 요청을 만듬
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Failed to fetch JSON data from the URL: ${response.status}`);
    }
  })
  .then(jsonData => {
    DATA = jsonData.ListProgramByPublicSportsFacilitiesService
  })
  .catch(error => {
    console.error("Error fetching JSON data:", error);
  });

console.log(DATA)
