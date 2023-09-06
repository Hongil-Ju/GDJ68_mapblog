let now_utc = Date.now();
let timeOff = new Date().getTimezoneOffset()*60000;
let today = new Date(now_utc-timeOff).toISOString().substring(0,16);
let maxToday = new Date(now_utc-timeOff+14).toISOString().substring(0,16);
let now = new Date();
let maxDate = new Date(now.setDate(now.getDate()+14)).toISOString().substring(0,16);


$("#meetingDate").attr("min",today);
$("#meetingDate").attr("max",maxDate);

let centertLat =33.450701;
let centerLng =126.570667;

getLocation();
function getLocation() {
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function(position) {
        // alert(position.coords.latitude + ' ' + position.coords.longitude);
        centertLat = position.coords.latitude;
        console.log(centertLat);
        centerLng = position.coords.longitude;
        console.log(centerLng);
        getKakaoMap2(centertLat,centerLng);
        $("#lat").val(centertLat);
        $("#lng").val(centerLng);
      }, function(error) {
        console.error(error);
        alert('GPS 지원을 동의하지 않으셨습니다.')
        getKakaoMap2(centertLat,centerLng);
        $("#lat").val(centertLat);
        $("#lng").val(centerLng);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS를 지원하지 않습니다');
      getKakaoMap2(centertLat,centerLng);
      $("#lat").val(centertLat);
      $("#lng").val(centerLng);
    }
  }

  $('#btn2').on("click",function(){
    console.log($('#adrs').val());
    getKakaoMap(centertLat,centerLng);
  })

function getKakaoMap(centertLat,centerLng){

  let mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = { 
          center: new kakao.maps.LatLng(centertLat,centerLng), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
      };

  let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

  // 주소-좌표 변환 객체를 생성합니다
  let geocoder = new kakao.maps.services.Geocoder();

  // 주소로 좌표를 검색합니다
  geocoder.addressSearch($('#adrs').val(), function(result, status) {

    // 정상적으로 검색이 완료됐으면 
    if (status === kakao.maps.services.Status.OK) {

      let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
     
      // 결과값으로 받은 위치를 마커로 표시합니다
      let marker = new kakao.maps.Marker({
          map: map,
          position: coords
      });
      $("#lat").val(coords.Ma);
      $("#lng").val(coords.La);
      map.setCenter(coords);
      kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
      
        // 클릭한 위도, 경도 정보를 가져옵니다 
        let latlng = mouseEvent.latLng; 
        
        // 마커 위치를 클릭한 위치로 옮깁니다
        marker.setPosition(latlng);
        
        let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
        message += '경도는 ' + latlng.getLng() + ' 입니다';
        
        let resultDiv = document.getElementById('clickLatlng'); 
        resultDiv.innerHTML = message;
        
        $("#lat").val(latlng.getLat());
        $("#lng").val(latlng.getLng());
  
      });
    }else{
      alert('검색 실패');
    // 지도를 클릭한 위치에 표출할 마커입니다
    let marker = new kakao.maps.Marker({ 
        // 지도 중심좌표에 마커를 생성합니다 
        position: map.getCenter() 
    }); 
    // 지도에 마커를 표시합니다
    marker.setMap(map);
    
    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
      
      // 클릭한 위도, 경도 정보를 가져옵니다 
      let latlng = mouseEvent.latLng; 
      
      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);
      
      let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
      message += '경도는 ' + latlng.getLng() + ' 입니다';
      
      let resultDiv = document.getElementById('clickLatlng'); 
      resultDiv.innerHTML = message;
      
      $("#lat").val(latlng.getLat());
      $("#lng").val(latlng.getLng());

    });
   }
  })

}

function getKakaoMap2(centertLat,centerLng){

  let mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = { 
          center: new kakao.maps.LatLng(centertLat,centerLng), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
      };

  let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    let marker = new kakao.maps.Marker({ 
        // 지도 중심좌표에 마커를 생성합니다 
        position: map.getCenter() 
    }); 
    // 지도에 마커를 표시합니다
    marker.setMap(map);
    
    var geocoder = new kakao.maps.services.Geocoder();

    infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

      // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);


    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
      
      // 클릭한 위도, 경도 정보를 가져옵니다 
      let latlng = mouseEvent.latLng; 
      
      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);
      
      let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
      message += '경도는 ' + latlng.getLng() + ' 입니다';
      
      let resultDiv = document.getElementById('clickLatlng'); 
      resultDiv.innerHTML = message;
      
      $("#lat").val(latlng.getLat());
      $("#lng").val(latlng.getLng());

      searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
            detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
            
            var content = '<div class="bAddr">' +
                            '<span class="title">법정동 주소정보</span>' + 
                            detailAddr + 
                        '</div>';

            // 마커를 클릭한 위치에 표시합니다 
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            infowindow.setContent(content);
            infowindow.open(map, marker);
        }   
    });
    });

    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'idle', function() {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
    }

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
function displayCenterInfo(result, status) {
  if (status === kakao.maps.services.Status.OK) {
      var infoDiv = document.getElementById('centerAddr');

      for(var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === 'H') {
              // infoDiv.innerHTML = result[i].address_name;
              break;
          }
      }
  }    
}

   }

