const express = require('express')
const app = express();
const port = 5500;

const API_KEY = '69786c42646d696e3235776c78724e';

app.get('/', async (req,res)=>{
    try {
        const url = `http://openAPI.seoul.go.kr:8088/${API_KEY}/json/ListPublicReservationSport/1/524/`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("data", data);

        // const informations = data.ListPublicReservationSport.
        
        const locations = data.ListPublicReservationSport.row.map(spot => ({
            areaName: spot.AREANM,
            latitude: spot.Y, //위도
            longitude: spot.X //경도
        }));
        
        // 중복된 데이터 정리
        const uniqueLocations = Array.from(new Set(locations.map(a => JSON.stringify(a))))
            .map(str => JSON.parse(str));
        console.log("locations", locations);

        // 클라이언트에게 JSON 형식으로 응답 보내기
        res.json(uniqueLocations);
    } catch (error) {
        console.error('Error fetching data:', error);
        // 에러 발생 시 적절한 에러 응답
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/page', (req,res)=>
    res.send('/page')
)

app.listen(5500, () => 
    console.log('port running')
)

