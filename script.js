console.log("welcome to spotify")
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let volumeslider=document.getElementById('volumeslider');
let volumevalue=document.getElementById("volumevalue");
let myProgressBar=document.getElementById('myProgressBar');
let muteBtn=document.getElementById('muteBtn');
let currentTimeE1=document.getElementById('currentTime');
let totalTimeE1=document.getElementById('totalTime');

let songItems=Array.from(document.getElementsByClassName('songItems'));
let songs=[
    {songName:"Let the world burn",filepath:"songs/1.mp3",coverpath:"cover.1jpg"},
    {songName:"pal pal",filepath:"songs/2.mp3",coverpath:"cover.2jpg"},
    {songName:"Ehsaas",filepath:"songs/3.mp3.",coverpath:"cover.3jpg"},
    {songName:"Tere ishq mein",filepath:"songs/4.mp3",coverpath:"cover.4jpg"},
    {songName:"naal nachna",filepath:"songs/5.mp3",coverpath:"cover.5jpg"}

]
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused|| audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play')
    }
})
songItems.forEach((element,i)=>{
element.getElementsByClassName("songName").innerText=songs[i].songName;
})
audioElement.addEventListener('timeupdate',()=>{

progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
}) 
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        let clickedIndex=parseInt(element.id);
        if(songIndex===clickedIndex && !audioElement.paused){
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
}
   else{

    makeAllPlays();
    songIndex=clickedIndex;
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play()
    e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
}
    })
})




document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>4){
        songIndex=0;
    }
    else{
    songIndex+=1;
    }
     audioElement.src=`songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
    document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
    songIndex-=1;
    }
     audioElement.src=`songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
    function playsong(index){
        songIndex=index;;
         audioElement.src=`songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
    }
    audioElement.addEventListener('ended',()=>{
        songIndex++;
        if(songIndex>=songs.length){
            songIndex=0;
        }
        playsong(songIndex);
    });
    muteBtn.addEventListener("click",()=>{
        if(audioElement.muted===false)
        {
            audioElement.muted=true;
            volumeslider=0;
    muteBtn.classList.remove("fa-volume-high");
    muteBtn.classList.add("fa-volume-xmark");
        }else{
            audioElement.muted=false;
            volumeslider.value=100;
            audioElement.volume=1;
            muteBtn.classList.remove("fa-volume-xmark");
            muteBtn.classList.add("fa-volume-high");
        }

    });
        function formatTime(seconds){
            let min=Math.floor(seconds/60);
            let sec=Math.floor(seconds%60);
            if(sec<10)sec="0"+sec;
            if(min<10)min="0"+min;
            return `${min}:${sec}`;
        }
        audioElement.addEventListener("loadedmetadata",()=>{
            totalTimeE1.innerText=formatTime(audioElement.duration);
        });
        audioElement.addEventListener("timeupdate",()=>{
            let progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
            myProgressBar.value=progress;
            currentTimeE1.innerText=formatTime(audioElement.currentTime);
            });
    


            


