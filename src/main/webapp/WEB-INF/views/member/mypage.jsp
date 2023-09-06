<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
		<h1 class="my-4">마이페이지</h1>
	<div>
		<p>
			아이디 : ${member.id}
		</p>
		<p>
			이름 : ${member.name}
		</p>
		<p>
			닉네임 : ${member.nickName}
		</p>
		<p>
			이메일 : ${member.email}
		</p>
		<p>
			폰번호 : ${member.phone}
		</p>
		<p>
			생일 : ${member.birth}
		</p>
		<p>
			개인 URL : ${member.url}
		</p>
		<p>
			<c:if test="${member.publics eq 1}">
        		전체 공개
       		</c:if>
			<c:if test="${member.publics eq 0}">
        		전체 비공개
       		</c:if>
		</p>
		
		<c:if test="${not empty sessionScope.memberFile}">
			<img alt="" src="../resources/upload/member/${memberFile.fileName}">
		</c:if>
		<c:if test="${empty sessionScope.memberFile}">
			<img alt="" src="../resources/img/기본프사.png">
		</c:if>
		
		<p>
			
		</p>
	
		
		<a href="./update">기본정보수정</a>
		<form action="./delete" id="fr2">
			<input type="button" id="dm" value="회원탈퇴">
		</form>
		<form action="./updateImg" id="fr3">
			<input type="button" id="ic" value="프로필 사진 변경">
		</form><br>
		<!-- <form action="./searchMember" id="fr4"> -->
			<input type="button" id="searchMember" value="회원 검색" onclick="window.open('http://localhost:82/member/searchMember', '회원 검색', 'width=500, height=700')">
		<!-- </form> -->
		<input type="button" id="searchIgnore" value="내가 차단한 회원 조회" onclick="window.open('http://localhost:82/member/searchIgnore', '차단한 회원 검색', 'width=500, height=700')">
	</div>

	<script>
		const dm = document.getElementById("dm")
		const ic = document.getElementById("ic")
		const fr2 = document.getElementById("fr2")
		const fr3 = document.getElementById("fr3")
		const fr4 = document.getElementById("fr4")
		const searchMember = document.getElementById("searchMember")

		dm.addEventListener('click', function(){
			if (confirm("회원 탈퇴하시겠습니까?")) {
            	fr2.submit();
        	}
		})

		ic.addEventListener('click', function(){
			fr3.submit();
		})

		// searchMember.addEventListener('click', function(){
		// 	fr4.submit();
		// })
	</script>
</body>
</html>