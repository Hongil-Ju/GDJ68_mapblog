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
	<c:forEach items="${myList}" var="d" varStatus="i">
	<div class="a" data-meetingNum="${d.meetingNum}" data-contents="${d.contents}" data-title="${d.title}" data-lat="${d.lat }" data-lng="${d.lng }" id="${i.index}"></div>
	</c:forEach>
	<div id="map" style="width:1000px;height:800px;"></div>
	

	<script src="../resources/js/meeting/myList.js" defer></script>

</body>
</html>