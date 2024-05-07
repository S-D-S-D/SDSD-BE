// 사용자의 현재 위치를 가져오는 함수
function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject(`위치 정보를 가져오는 데 실패했습니다. 오류: ${error.message}`);
                }
            );
        } else {
            reject('이 브라우저는 Geolocation을 지원하지 않습니다.');
        }
    });
}
