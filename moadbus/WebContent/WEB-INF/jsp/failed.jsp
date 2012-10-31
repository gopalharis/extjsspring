<%-- 
    Document   : login
    Created on : 15 Oct 2012, 1:23:15 AM
    Author     : sanket
--%>


<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <div style="width:25%; height: 130px; margin-left:auto; margin-right:auto; border:1px solid black">
            
            <table>
                <thead><tr></tr></thead>
                <tbody>
                    <tr><td colspan="2">
                            <form:form action="/emconsole/login/loginprocessor.htm" method="POST" commandName="login" modelAttribute="login">
                        </td>
                        </tr>
                        <tr><td colspan="2" style="color:red;text-align: center">Login failed. Please try again.</td></tr>
                        <tr>
                <td>
                    Username:
                </td>
                <td>
                    <form:input  path="username"/>
                </td>
            </tr>
            <tr>
                <td>
                    Password:
                </td>
                <td>
                    <form:password path="password" />
                </td>
                    
            </tr>
            <tr>
                <td colspan="2" style="align:center;">
                 <div width="100%" style="text-align:center;">
                     <input type="submit" value="submit"/>
                </div>
                </td>
            </tr>   
            </form:form>
            </tbody>
            </table>
        
        </div>
    </body>
</html>

            
      