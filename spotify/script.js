let index = 0;
let audioElement = new Audio("main.mp3");
let masterPlay = document.getElementById("play");
let gif = document.getElementById("gif");
let range = document.getElementById("range");
let allMusic = Array.from(document.getElementsByClassName("music"));
let mainName = document.getElementsByClassName("mainName");


let songs = [
    {songName : "Cornfield Chase", filePath : "m1.mp3", coverPath : "m1.png"},
    {songName : "Capital Letters", filePath : "m2.mp3", coverPath : "m2.png"},
    {songName : "Heartless", filePath : "m3.mp3", coverPath : "m3.png"},
    {songName : "4K", filePath : "m4.mp3", coverPath : "m4.png"},
    {songName : "FE!N", filePath : "m5.mp3", coverPath : "m5.png"},
    {songName : "Feather", filePath : "m6.mp3", coverPath : "m6.png"},
    {songName : "After Dark", filePath : "m7.mp3", coverPath : "m7.png"},
];


masterPlay.addEventListener("click", () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener("timeupdate", () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    range.value = progress;
});

range.addEventListener("change", () => {
    audioElement.currentTime = range.value * audioElement.duration / 100;
});

allMusic.forEach((Element, i) => {
    Element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    Element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

const songPlay = () => {
    Array.from(document.getElementsByClassName("songPlay")).forEach((element) => {
        element.classList.remove("fa-pause");
        element.classList.add("fa-play");
    })
}

Array.from(document.getElementsByClassName("songPlay")).forEach((element) => {
    element.addEventListener("click", (e) => {
        songPlay();
        index = parseInt(e.target.id);
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        audioElement.src = `m${index +1}.mp3`;
        mainName.innerText = songs[index].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
    })
});

document.getElementById("previous").addEventListener("click", () => {
    if(index <= 0){
        index = 0;
    }else{
        index -= 1;
    }
    audioElement.src = `m${index +1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        mainName.innerText = songs[index].songName;
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
});

document.getElementById("next").addEventListener("click", () => {
    if(index >= 6){
        index = 0;
    }else{
        index += 1;
    }
    audioElement.src = `m${index +1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        mainName.innerText = songs[index].songName;
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
});


