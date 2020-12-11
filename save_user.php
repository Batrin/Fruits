<?php
  $login = $_POST['loginField'];
  $password = $_POST['passwordField'];
  $nickname = $_POST['nicknameField'];

  $login = htmlspecialchars($login);
  $password = htmlspecialchars($password);
  $nickname = htmlspecialchars($nickname);

  include ("db.php");

  $result = mysqli_query($link,"SELECT id_user from users where login='$login'");
  $myrow = mysqli_fetch_array($result);
  if (!empty($myrow['id_user'])) {
    exit ("Извините, введённый вами логин уже зарегистрирован. Введите другой логин.");
  }
   $result2 = mysqli_query ($link,"INSERT INTO users (login,nickname,password) VALUES('$login','$nickname','$password')");
   if ($result2=='TRUE')
   {
    echo "Вы успешно зарегистрированы! Теперь вы можете зайти на сайт. <a href='index.php'>Авторизация</a>";
    }
  else{
    echo "Ошибка, попробуйте позже!";
  }
 ?>
