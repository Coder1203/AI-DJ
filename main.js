song = "";
leftWristX= 0;
rightWristY=0;
rightWristX=0;
leftWristY=0;
leftwrist_Score = 0;
rightwrist_Score = 0;
function preload(){
    song = loadSound("music.mp3");
}
    
function setup(){
 canvas = createCanvas(600,500);
 canvas.position(0,0)
 canvas.center();

 video = createCapture(VIDEO);
 video.hide();

 poseNet = ml5.poseNet(video,modelLoaded);
 poseNet.on('pose',gotPoses);

}
function modelLoaded(){
    console.log("PoseNet is loaded")
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftwrist_Score = results[0].pose.keypoints[9].score;
        rightwrist_Score = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

console.log(leftwrist_Score);       
 console.log(floor(leftWristX),floor(leftWristY),floor(rightWristX),floor(rightWristY));

    }
}

function draw(){
image(video,0,0,600,500);

fill("#FF0000");
stroke("#FF0000");

if(rightwrist_Score>0.3){
    circle(rightWristX,rightWristY,20);
    if(rightWristY>0 && rightWristY<=100){
        song.rate(0.5);
        document.getElementById("speed_btn").innerHTML = "Speed = 0.5x";
    }else if(rightWristY>100 && rightWristY<=200){
        song.rate(1);
        document.getElementById("speed_btn").innerHTML = "Speed = 1x";
    }else if(rightWristY>200 && rightWristY<=300){
        song.rate(1.5);
        document.getElementById("speed_btn").innerHTML = "Speed = 1.5x";
    }else if(rightWristY>300 && rightWristY<=400){
        song.rate(2);
        document.getElementById("speed_btn").innerHTML = "Speed = 2x";
    }else if(rightWristY>400 && rightWristY<=500){
        song.rate(2.5);
        document.getElementById("speed_btn").innerHTML = "Speed = 2.5x";
    }
}



if (leftwrist_Score>0.3){
    circle(leftWristX,leftWristY,20);

    remove_decimels = floor(leftWristY);
    volume = remove_decimels/500;
    song.setVolume(volume);
    document.getElementById("volume").innerHTML = "Volume = "+volume;
}




}

function play(){
    song.stop();
    song.play();
    song.setVolume(1);
    song.rate(1);
}