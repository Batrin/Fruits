/* получение информации о canvas */
var cnv = document.getElementById("canvas");
var ctx = cnv.getContext("2d");

/* создание объектов игры */
var imageArray = new Array();
var basket = new Image();
var banana = new Image();
var background = new Image();
var apple = new Image();
var durian = new Image();
var lime = new Image();
var melon = new Image();
var pear = new Image();
var plum = new Image();
var watermelon = new Image();
var heart = new Image();
var bomb = new Image();

/* Добавление картинок фруктов в массив картинок */
imageArray.push(banana);
imageArray.push(apple);
imageArray.push(durian);
imageArray.push(pear);
imageArray.push(plum);
imageArray.push(watermelon);
imageArray.push(melon);
imageArray.push(lime);

/* указание пути к картинкам */
background.src = "img_png/background.png";
basket.src = "img_png/basket.png";
banana.src = "img_png/banana.png";
apple.src = "img_png/apple.png";
durian.src = "img_png/durian.png";
lime.src = "img_png/lime.png";
melon.src = "img_png/melon.png";
plum.src = "img_png/plum.png";
watermelon.src = "img_png/watermelon.png";
pear.src = "img_png/pear.png";
heart.src = "img_png/heart.png";
bomb.src = "img_png/bomb.png";

/* переменные */
var heartsCounter = 2;
var counter = 0;
var fruitsCounter = 0;
var fruits = [];
var lostFruitsCounter = 0;
fruits[0] = {
    name : imageArray[0],
    x : 100,
    y : 0
};

/* Сердечки */
var hearts = [];
pushHearts();
/*  Корзинка */
var baskets = {
  x : canvas.width/2,
  y : canvas.height - 50,
  speed : 15
};
var randomFruit = 0;

/* Бомбы */
var bombs = [];
bombs[0] = {
  x : Math.floor(Math.random() * (canvas.width - 200)),
  y : 0,
  speed : 2
}
function drawBomb(){
  for(var l = 0 ; l < bombs.length ; l++){
    ctx.drawImage(bomb, bombs[l].x, bombs[l].y);
    bombs[l].y += bombs[l].speed;
    console.log(bomb.width);
    if(bombs[l].y + bomb.height >= baskets.y &&
       bombs[l].y + bomb.height < baskets.y + basket.height &&
       bombs[l].x > baskets.x &&
       bombs[l].x + bomb.width < baskets.x + basket.width){
         bombs.splice(l, 1);
         hearts.splice(-1,1);
         setTimeout(ShowMessage, 300);
       }
  }
}

function pushBomb() {
  bombs.push({
    x : Math.floor(Math.random() * (canvas.width - 200)),
    y : 0,
    speed : 2
  });
}
/* Функция отрисовки сердечек */
function pushHearts() {
  for(var l = 0 ; l < 3 ; l++){
    hearts.push({
      x : 50 * l,
      y : 10
    });
  }
}
function drawHeart()  {
  for(var j = 0 ; j < hearts.length; j++){
    ctx.drawImage(heart, hearts[j].x, hearts[j].y);
  }
}

/* функция отрисовки корзины и заднего фона */
function drawBasketAndBackground() {
  ctx.drawImage(background,0,0,canvas.width,canvas.height);
  ctx.drawImage(basket,baskets.x, baskets.y);
}


/* Функция генерации фруктов */
function drawFruits() {
  for(var i = 0 ; i < fruits.length ; i++){
      ctx.drawImage(fruits[i].name,fruits[i].x, fruits[i].y);
      if(fruitsCounter < 10){
        fruits[i].y +=2;
      }
      else if(fruitsCounter > 10 && fruitsCounter < 20){
        fruits[i].y +=3;
      }
      else if(fruitsCounter > 30){
        fruits[i].y +=5;
        baskets.speed = 20;
      }
      else{
        fruits[i].y +=5.5;
      }
      /* Проверка столкновения фрукта и корзинки*/
      if(fruits[i].y + fruits[i].name.height >= baskets.y &&
         fruits[i].y + fruits[i].name.height <= baskets.y + basket.height &&
         fruits[i].x > baskets.x &&
         fruits[i].x + fruits[i].name.width < baskets.x + basket.width){
           fruitsCounter++;
           fruits.splice(i,1);
           document.getElementById("fruitsCounter").innerHTML = "Собрано фруктов : " + fruitsCounter;
         }
       else if(fruits[i].y > canvas.height){
        fruits.splice(i,1);
        lostFruitsCounter++;
        hearts.splice(-1,1);
        setTimeout(ShowMessage, 300);
      }

  }
}

/* Добавление фруктов */
function pushFruits(){
    randomFruit = Math.floor(Math.random() * 8);
    fruits.push({
      x : Math.floor(Math.random() * (canvas.width - 200)),
      y : 0,
      name : imageArray[randomFruit]
    });
}

/* Функции таймера */
function startTimer() {
  window.timerId = window.setInterval(timer, 1000);
}

function stopTimer() {
  window.clearInterval(window.timerId);
}

function timer() {
  counter++;
  document.getElementById("timer_field").innerHTML = "Секунд с начала игры прошло : " + counter;
  if(counter%3 == 0){
    pushFruits();
  }
  if(counter%2 == 0){
    pushBomb();
  }
}

/* Управление и обработка клавиш */
function moveAndStop(e) {
  switch (e.keyCode) {
    case 27:
      alert("Пауза.Нажмите ESC, чтобы продолжить.");
      break;
    case 37:
      baskets.x -= baskets.speed;
      break;
    case 39:
      baskets.x += baskets.speed;
      break;
    case 65:
      if (baskets.x > 0) {
        baskets.x -= baskets.speed;
      }
      break;
    case 68:
      if(baskets.x + basket.width < canvas.width){
        baskets.x += baskets.speed;
      }
      break;
  }
}

function stopGame(){
  fruits = {};
  bombs = {};
  stopTimer();
}
function ShowMessage() {
  if(hearts.length == 0){
    if(counter > 10){
      alert("Победа!!!" + "\n" +
                        "Вы собрали : " + fruitsCounter + " фруктов" + "\n" +
                        "Прошло времени : " + counter + " секунды" + "\n" +
                        "Начать игру снова?");
      stopGame();
    }
    else{
      alert("Поражение..." + "\n" +
                        "Вы собрали : " + fruitsCounter + " фруктов" + "\n" +
                        "Прошло времени : " + counter + " секунды" +"\n" +
                        "Начать игру снова?");
      stopGame();
    }
  }
}
/* Основная функция игры - начало игры */
function startGame(){
  drawBasketAndBackground();
  drawHeart();
  drawFruits();//рисование фруктов
  drawBomb();
  addEventListener("keydown", moveAndStop);
  requestAnimationFrame(startGame);
  }
  
function launchGame(){
    startGame();
    startTimer();
}
/* Запуск игры когда загрузится последняя картинка */
banana.onload = launchGame;
