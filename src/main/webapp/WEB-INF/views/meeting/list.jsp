<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=1b5744597ccc65933ecad3607daed47e&libraries=services"></script>
<title>Insert title here</title>
</head>
<body>

	<input type="text" id="adrs"><button id="btn2" type="button">검색</button>
	<button id="myListBtn" type="button">내 참석 모임 보기</button>
	<c:forEach items="${list}" var="d" varStatus="i">
	<div class="a" data-meetingNum="${d.meetingNum}" data-contents="${d.contents}" data-title="${d.title}" data-lat="${d.lat }" data-lng="${d.lng }" id="${i.index}"></div>
	</c:forEach>
	<div id="myList"></div>
	<div id="map" style="width:900px;height:700px;float:left;border: solid 1px;margin-right: 300px;"></div>
	<div id="detail" style="float:left;text-align:center;"></div>



	<script type="text/javascript">
		// kakao.maps.load(function() {
        // // v3가 모두 로드된 후, 이 콜백 함수가 실행됩니다.
        // let map = new kakao.maps.Map(node, options);
        // });
	</script>

	<script src="../resources/js/meeting/list.js" defer></script>

</body>
</html>