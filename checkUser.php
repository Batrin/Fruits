<?php
  session_start();
  $nickname = $_POST["nicknameField"];
  $password = $_POST["passwordField"];
  $nickname = htmlspecialchars($nickname);
  $password = htmlspecialchars($password);
  $_SESSION["nickname"] = $nickname;
  include ("db.php");

  $result = mysqli_query($link,"SELECT id_user from users where nickname='$nickname' && password = '$password'");
  $myrow = mysqli_fetch_array($result);

  if (!empty($myrow['id_user'])) {
    include ("main.php");
  }
 ?>
