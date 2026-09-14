<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Add New Author</title>
</head>
<body>
	<div>
		<a href="/library">Home</a>
		<form action="addauthor" method="post">
			<table>
				<tr>
					<td>Firstname:</td>
					<td><input name="firstname"/></td>
				</tr>
				<tr>
                	<td>Lastname:</td>
                	<td><input name="lastname"/></td>
                </tr>
			</table>
			<br>
			<div>
				<input type="submit" value="Submit" name="submit">
			</div>
		</form>
	</div>
</body>
</html>