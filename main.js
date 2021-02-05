song = "";
leftWristX= 0;
rightWristY=0;
rightWristX=0;
leftWristY=0;
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
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log(floor(leftWristX),floor(leftWristY),floor(rightWristX),floor(rightWristY));

    }
}

function draw(){
image(video,0,0,600,500);

fill("#FF0000");
stroke("#FF0000");
circle(leftWristX,leftWristY,20);

remove_decimels = floor(leftWristY);
volume = remove_decimels/500;
song.setVolume(volume);
document.getElementById("volume").innerHTML = "Volume "+volume+"x";



}

function play(){
    song.stop();
    song.play();
    song.setVolume(1);
    song.rate(1);
}