window.onload = function () {
    var canvas = document.getElementById("canvas");
    var imgSnow = document.getElementById("imgSnow");
    var bgSnow = document.getElementById("bgSnow");
    var ctx = canvas.getContext('2d');

    canvas.width = $('#canvas-container').width();
    canvas.height = $('#canvas-container').height();

    var GetRandomNum = function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }
    console.log(GetRandomNum(0, canvas.width))

    var snowArray = {}; //雪花对象
    var snowIndex = 0; //标识符
    var setting = {
        num: 30, //数量
        snowSize: 15, //大小
        startX: Math.random() * canvas.width, //起始横坐标
        startY: 0, //起始纵坐标
        vy: 0.01
    }

    function Snow() {
        // 起始横坐标
        this.x = Math.random() * canvas.width;
        // 起始纵坐标
        this.y = setting.startY;
        this.size = setting.snowSize + Math.random() * 10 - 10;

        //横坐标偏移量
        this.vx = Math.random() * 3 - 2; //偏移量
        //纵坐标偏移量
        this.vy = Math.random() * 10;

        this.life = 0;
        this.maxLife = 100;
        this.id = snowIndex;
        //当前信息保存至对象snowArray
        snowArray[snowIndex] = this;

        snowIndex++;
    }

    Snow.prototype.draw = function () {
        this.x += this.vx;
        this.y += this.vy;

        this.vy += setting.vy;

        this.life++;

        //删除
        if (this.y > canvas.height + 20) {
            delete snowArray[this.id]
        } else if (this.life >= this.maxLife) {
            snowArray[this.id]
        }

        ctx.drawImage(imgSnow, this.x, this.y, this.size, this.size)
    }

    setInterval(function () {
        ctx.drawImage(bgSnow, 0, 0, canvas.width, canvas.height)
        //数
        for (var i = 0; i < setting.num; i++) {
            if (Math.random() > 0.97) {
                new Snow();
            }
        }

        for (var i in snowArray) {
            snowArray[i].draw();
        }
        //星星
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < starArr.length; i++) {
            starArr[i].angle += starArr[i].changeAngle;
            ctx.save();
            ctx.beginPath();
            ctx.translate(starArr[i].x, starArr[i].y);
            ctx.rotate(starArr[i].angle * Math.PI / 180);
            ctx.scale(Math.sin(starArr[i].angle * Math.PI / 180), Math.sin(starArr[i].angle * Math.PI / 180));
            ctx.globalAlpha = Math.abs(Math.sin(starArr[i].angle * Math.PI / 180));
            drawStars(0, 0, starArr[i].radius1, starArr[i].radius2, starArr[i].num, "fill", "white");
            ctx.restore();
        }

    }, 100)

    function drawStars(x, y, radius1, radius2, num, drawType, color) {
        var angle = 360 / (num * 2);
        var arr = [];
        for (var i = 0; i < num * 2; i++) {
            var starObj = {};
            if (i % 2 == 0) {
                starObj.x = x + radius1 * Math.cos(i * angle * Math.PI / 180);
                starObj.y = y + radius1 * Math.sin(i * angle * Math.PI / 180);
            } else {
                starObj.x = x + radius2 * Math.cos(i * angle * Math.PI / 180);
                starObj.y = y + radius2 * Math.sin(i * angle * Math.PI / 180);
            }
            arr.push(starObj);
        }

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.moveTo(arr[0].x, arr[0].y);
        for (var i = 1; i < arr.length; i++) {
            ctx.lineTo(arr[i].x, arr[i].y);
        }
        ctx.closePath();
        if (drawType == "fill") {
            ctx.fill();
        } else {
            ctx.stroke();
        }
    }
    var starArr = []; //多个星星对象
    for (var i = 0; i < 5; i++) {
        var starObj = {
            radius1: 10 + 5 * Math.random(),
            radius2: 2 + 4 * Math.random(),
            x: 30 + (canvas.width - 60) * Math.random(),
            y: 80 * Math.random(),
            num: 4,
            angle: 360 * Math.random(),
            changeAngle: -5 + 10 * Math.random(),
            color: "rgb(" + parseInt(255 * Math.random()) + "," + parseInt(255 * Math.random()) + "," + parseInt(255 * Math.random()) + ")"
        }
        starArr.push(starObj);
    }


}