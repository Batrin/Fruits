<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
      <link rel="stylesheet" href="style.css">
    <title></title>
  </head>
  <body>
    <form class="registrationForm" action="checkUser.php" method="post">
      <input  class="registField" type="text" name="nicknameField" placeholder="Enter your nickname here.." required>
      <input  class="registField"type="password" name="passwordField" placeholder="Enter your password here.." required>
      <input  class="registFieldButton"type="submit" name="" value="To auth">
      <br>
      <div class="regist">
        <p><a href="registration.php">Регистрация</a></p>
      </div>
    </form>
  </body>
</html>
