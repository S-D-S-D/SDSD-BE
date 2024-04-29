const fs = require('fs');

// 모든 JSON 파일을 읽어와서 데이터를 통합할 변수 초기화
let combinedData = {};

// JSON 파일을 읽어와서 데이터를 통합
for (let i = 1; i <= 14; i++) {
  // 파일 이름 설정 (예: input1.json, input2.json, ...)
  const fileName = `data/output${i}.json`;

  // 파일에서 JSON 데이터 읽기
  const jsonData = fs.readFileSync(fileName, 'utf8');

  // JSON 데이터 파싱
  const data = JSON.parse(jsonData);

  // 데이터 통합
  for (const key in data) {
    if (combinedData.hasOwnProperty(key)) {
      combinedData[key] += data[key];
    } else {
      combinedData[key] = data[key];
    }
  }
}

// 값(value)을 기준으로 내림차순으로 정렬
const sortedData = Object.fromEntries(
  Object.entries(combinedData).sort(([,a],[,b]) => b - a)
);

// 정렬된 데이터를 파일에 쓰기
fs.writeFileSync('data/combinedOutput.json', JSON.stringify(sortedData, null, 2));

console.log("Data has been combined and saved to combinedOutput.json");
