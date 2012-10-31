<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page trimDirectiveWhitespaces="true"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<html lang="en">
<head>
<spring:message code="login.username" var="username" ></spring:message>
<spring:message code="login.password" var="password"></spring:message>
<spring:message code="login.petname" var="petname"></spring:message>

<meta charset="utf-8">
<title><spring:message code="login.title" ></spring:message> </title>

<!-- main css -->
<link href="css/style.css" rel="stylesheet" type="text/css">

<!-- media queries css -->
<link href="css/media-queries.css" rel="stylesheet" type="text/css">

<script type="text/javascript" src="ext/ext-all.js"></script>
<script type="text/javascript" src="js/login.js"></script>


<!-- html5.js for IE less than 9 -->
<!--[if lt IE 9]>
	<script src="js/html5.js"></script>
<![endif]-->

<!-- css3-mediaqueries.js for IE less than 9 -->
<!--[if lt IE 9]>
	<script src="js/css3-mediaqueries.js"></script>
<![endif]-->

<script type="text/javascript">
	/*
	$(document).ready(function(){
	   $(".equalheight").height(Math.max($("#content").height(),$("#sidebar").height()));
	});
	*/
	
	window.onload = setheight; 
	function setheight(){
	 var Height1 = document.getElementById("content").offsetHeight;
	 var Height2 = document.getElementById("sidebar").offsetHeight;
	 var Height = Math.max(Height1, Height2);
	 // alert(Height);
	 var equalheight = document.getElementsByClassName("equalheight");
	 // alert(equalheight.length);
	 for(i=0; i<equalheight.length; i++) {
	 	equalheight[i].style.height= Height+"px";
	 }
	}

</script>
</head>

<body>
<div id="pagewrap">
  <div id="container" class="shadow20">
    <aside id="sidebar" class="equalheight">
      <section class="pad15">
      	<p class="logotitle txtrt">  
        <img src="images/logo1.png" class="fltrt"><br>
        <spring:message code="login.logo"></spring:message>
        </p>
      </section>
      <section class="pad15 clearfix" style="padding-top: 40%;">
        <img src="images/moadbus.png" class="fltrt">
      </section>
      
      <section class="logintext txtrt clearfix">
        <spring:message code="login.login"></spring:message>
      </section>
      
    </aside>
    <!-- /#sidebar -->
    
    <div id="content" class="equalheight">
      <form name="loginform" id="loginform" action="/emconsole/user/login.htm" method="post">
      	<table cellpadding="0" cellspacing="0" style="padding-top: 45%; padding-left: 30px;">
        	<tr>
            	<td><input type="text" name="username" placeholder="${username}">
                <input type="password" name="password" placeholder="${password}"></td>
                <td><input type="button" name="submit" onclick="fnLoginForm(Ext.get('loginform'))" value="Login" class="btn"></td>
            </tr>
            <!-- 
            <tr>
            	<td><input type="text" name="username" placeholder="${petname}" style="width: 90%;"></td>
                <td></td>
            </tr>
             -->
        </table>
      </form>
      
    </div>
    <!-- /#content -->
    
    
  </div>
</div>
<!-- /#pagewrap -->

</body>
</html>