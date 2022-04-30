let canvas = document.getElementById('gamezone');
let context = canvas.getContext('2d');
let scoreshow = document.getElementById('score');
let bruhimg = new Image();
let background = new Image();
let pipetop = new Image();
let pipebot = new Image();
bruhimg.src = "bird.png";
background.src = "background.png";
pipetop.src = "pipetop.png";
pipebot.src = "pipebot.png";

let score = 0;
let distance2pipe = 140; // Khoảng cách giữa 2 ống
let distancetobotpipe; //Khoảng cách từ đầu ống trên đến đầu ống dưới
let bruh = {
    x: background.width / 5,
    y: background.height / 2
}
let pipe = [];
pipe[0] = {
    x: canvas.width,
    y: 0
}

function run() {
    context.drawImage(background, 0, 0);
    context.drawImage(bruhimg, bruh.x, bruh.y, 30, 30);

    for (let i = 0; i < pipe.length; i++) {
        distancetobotpipe = pipetop.height + distance2pipe;
        context.drawImage(pipetop, pipe[i].x, pipe[i].y);
        context.drawImage(pipebot, pipe[i].x, pipe[i].y + distancetobotpipe);
        pipe[i].x -= 10; // tốc độ chạy của ống lùi dần về x=0
        if (pipe[i].x === canvas.width / 2) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipetop.height) - pipetop.height
            })
        }
        if (pipe[i].x === 0) score++;  // thêm điểm khi ống đến tọa độ x=0
        if (pipe[i].x === 0) pipe.splice(0, 1); // xóa ống khi ống đến x=0
        //sự kiện khi chim chạm ống và nền canvas
        if (bruh.y + bruhimg.height === canvas.height ||
            bruh.x + bruhimg.width >= pipe[i].x && bruh.x <= pipe[i].x + pipetop.width
            && (bruh.y <= pipe[i].y + pipetop.height ||
                bruh.y + bruhimg.height >= pipe[i].y + distancetobotpipe)
        ) {
            return;
        }
    }

    scoreshow.innerHTML = "Score : " + score; // in ra Score
    bruh.y += 3; //độ rơi của con chim
    requestAnimationFrame(run);
}

document.addEventListener("keydown", function () {
    bruh.y -= 50;
})
run()

