const API_KEY = '69786c42646d696e3235776c78724e';
// 공공데이터에서 name,lat,lon 추출
async function getData() {
    const url = `http://openAPI.seoul.go.kr:8088/${API_KEY}/json/ListPublicReservationSport/1/5/`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("data", data);
    const locations = data.ListPublicReservationSport.row.map((spot)=>[
    spot.AREANM, //xx구/군
    spot.Y, //위도
    spot.X //경도
    ]);
    console.log("locations",locations)
  }
