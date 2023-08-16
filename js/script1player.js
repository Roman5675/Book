//Слайдер swiper
new Swiper('.task-slider', {
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
  },
  spaceBetween: 50,
  breakpoints: {
      
      1200: {
        slidesPerView: 1,
        
      },
      851: {
        slidesPerView: 2
      },
      320: {
        slidesPerView: 1
      },
  },
});

//Плеер 1
const audioplayer = document.querySelector(".audioplayer-first"),
musicImg = audioplayer.querySelector(".img-area img"),
musicName = audioplayer.querySelector(".song-details .name"),
musicArtist = audioplayer.querySelector(".song-details .artist"),
playPauseBtn = audioplayer.querySelector(".play-pause"),
prevBtn = audioplayer.querySelector("#prev"),
nextBtn = audioplayer.querySelector("#next"),
mainAudio = audioplayer.querySelector("#main-audio"),
progressArea = audioplayer.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar"),
musicList = audioplayer.querySelector(".music-list"),
moreMusicBtn = audioplayer.querySelector("#more-music"),
closemoreMusic = musicList.querySelector("#close");

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;

window.addEventListener("load", ()=>{
  loadSong(waySong[musicIndex - 1]);
  loadMusic(musicIndex);
  playingSong(); 
});

//Way song
const waySong = ['https://www.dropbox.com/scl/fi/rbt1fus3xa3adbvqd1kun/001.mp3?rlkey=6o1plng15a9pgnl4vjw4t30yb&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/b66jotgqdtz0wjvhdy4jv/002.mp3?rlkey=azhwbx0g0ere5wl29kfie8kkq&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/ns96p4opof12cg9l4vww9/003.mp3?rlkey=h5elrexm9b6wjpd6t3pf6z320&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/3p2jdq7vxcdhd67myj6r3/004.mp3?rlkey=07tamj9pz6gu93bns8ogpflvs&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/70miedth64vzmvvhmcdq4/005.mp3?rlkey=6v2qpgusglrhuhhs8di2gqzjc&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/zhn1s697yu0qlzdjspp3z/006.mp3?rlkey=zyi4a0icugot7dalj7fjmznrs&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/qvp19pl3s0dfgkseg855m/007.mp3?rlkey=0wbojojsid8uyukkop4uuc5ub&dl=0&raw=1']

//Init way song
function loadSong(a) {
  mainAudio.src = `${a}`;
}

function loadMusic(indexNumb){
  loadSong(waySong[musicIndex - 1]);
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
}

//play music function!!!
function playMusic(){
  audioplayer.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
  
}

//pause music function!!!
function pauseMusic(){
  audioplayer.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}


// play or pause button event!!!
playPauseBtn.addEventListener("click", ()=>{
  const isMusicPlay = audioplayer.classList.contains("paused");
  //if isPlayMusic is true then call pauseMusic else call playMusic
  isMusicPlay ? pauseMusic() : playMusic();
  playingSong();
});


// Прогресс бар
mainAudio.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime; //getting playing song currentTime
  const duration = e.target.duration; //getting playing song total duration
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = audioplayer.querySelector(".current-time"),
  musicDuartion = audioplayer.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", ()=>{
    // update song total duration
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });


  // Прогресс бар
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// Перемотка песни
progressArea.addEventListener("click", (e)=>{


  let progressWidth = progressArea.clientWidth; //getting width of progress bar
  let clickedOffsetX = e.offsetX; //getting offset x value
  let songDuration = mainAudio.duration; //getting song total duration
  
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic(); //calling playMusic function
  playingSong();
});



//code for what to do after song ended
mainAudio.addEventListener("ended", ()=>{
  // we'll do according to the icon means if user has set icon to
  // loop song then we'll repeat the current song and will do accordingly
  let getText = repeatBtn.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      nextMusic(); //calling nextMusic function
      break;
    case "repeat_one":
      mainAudio.currentTime = 0; //setting audio current time to 0
      loadMusic(musicIndex); //calling loadMusic function with argument, in the argument there is a index of current song
      playMusic(); //calling playMusic function
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1); //genereting random index/numb with max range of array length
      do{
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      }while(musicIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex
      musicIndex = randIndex; //passing randomIndex to musicIndex
      loadMusic(musicIndex);
      playMusic();
      playingSong();
      break;
  }
});


const ulTag = audioplayer.querySelector("ul");
// let create li tags according to array length for list
for (let i = 0; i < allMusic.length; i++) {
  //let's pass the song name, artist from the array
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration">3.40</span>
                <audio class="${allMusic[i].src}" src="${allMusic[i].way}"></audio>
              </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag); //inserting the li inside ul tag

  let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    };
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
  });
}

//play particular song from the list onclick of li tag!!! При нажатии на другую песню, переключение на нее
function playingSong(){
  pauseMusicSecond()
  pauseMusicThird()
  pauseMusicFourth()
  pauseMusicFifth()
  pauseMusicSixth()

  const allLiTag = ulTag.querySelectorAll("li");
  
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");
    
    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    //if the li tag index is equal to the musicIndex then add playing class in it
    if(allLiTag[j].getAttribute("li-index") == musicIndex){
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
}

//particular li clicked function
function clicked(element){
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex; //updating current song index with clicked li index
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}

//Плеер2
const audioplayerSecond = document.querySelector(".audioplayer-second"),
musicImgSecond = audioplayerSecond.querySelector(".img-area img"),
musicNameSecond = audioplayerSecond.querySelector(".song-details .name"),
musicArtistSecond = audioplayerSecond.querySelector(".song-details .artist"),
playPauseBtnSecond = audioplayerSecond.querySelector(".play-pause"),
prevBtnSecond = audioplayerSecond.querySelector("#prev"),
nextBtnSecond = audioplayerSecond.querySelector("#next"),
mainAudioSecond = audioplayerSecond.querySelector("#main-audio"),
progressAreaSecond = audioplayerSecond.querySelector(".progress-area"),
progressBarSecond = progressAreaSecond.querySelector(".progress-bar"),
musicListSecond = audioplayerSecond.querySelector(".music-list"),
moreMusicBtnSecond = audioplayerSecond.querySelector("#more-music"),
closemoreMusicSecond = musicListSecond.querySelector("#close");


let musicIndexSecond = Math.floor((Math.random() * allMusicSecond.length) + 1);
isMusicPausedSecond = true;

window.addEventListener("load", ()=>{
  loadMusicSecond(musicIndexSecond);
  playingSongSecond(); 
});

//Way song
const waySongSecond = ['https://www.dropbox.com/scl/fi/162azek3gar2zpesl5ou4/008.mp3?rlkey=bz9h2334x1pf2bdzi6yvr0or8&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/hl1fcwimzdjadjpgsvxru/009.mp3?rlkey=gyjip65oa8dx83izxdpfd4gt5&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/585my2bg25ls4w448jq0r/010.mp3?rlkey=lhehekc5cp8by2zm37v0kotyf&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/wpwomohhxrsimo08kr374/011.mp3?rlkey=20h23b217zixifcpmz8mvas40&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/4fap17owt3s4qmba7hsm5/012.mp3?rlkey=882a877pvco9cxkmaoo18o3o1&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/jkc9d7nuvgarjo7r26iqu/013.mp3?rlkey=4t3woyc54f8rhy608seql2lfv&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/2qr7u4znappzxqsj5hw3x/014.mp3?rlkey=8oe3gd62bc4y0jf2mnfkdgwv6&dl=0&raw=1']

//Init way song
function loadSongSecond(a) {
  mainAudioSecond.src = `${a}`;
}

function loadMusicSecond(indexNumb2){
  loadSongSecond(waySongSecond[musicIndexSecond - 1]);
  musicNameSecond.innerText = allMusicSecond[indexNumb2 - 1].name;
  musicArtistSecond.innerText = allMusicSecond[indexNumb2 - 1].artist;
}

//play music function
function playMusicSecond(){
  audioplayerSecond.classList.add("paused");
  playPauseBtnSecond.querySelector("i").innerText = "pause";
  mainAudioSecond.play();
}

//pause music function
function pauseMusicSecond(){
  audioplayerSecond.classList.remove("paused");
  playPauseBtnSecond.querySelector("i").innerText = "play_arrow";
  mainAudioSecond.pause();
}

// play or pause button event
playPauseBtnSecond.addEventListener("click", ()=>{
  const isMusicPlay2 = audioplayerSecond.classList.contains("paused");
  //if isPlayMusic is true then call pauseMusic else call playMusic
  isMusicPlay2 ? pauseMusicSecond() : playMusicSecond();
  playingSongSecond();
});

// Прогресс бар
mainAudioSecond.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime; //getting playing song currentTime
  const duration = e.target.duration; //getting playing song total duration
  let progressWidth = (currentTime / duration) * 100;
  progressBarSecond.style.width = `${progressWidth}%`;

  let musicCurrentTime = audioplayerSecond.querySelector(".current-time"),
  musicDuartion = audioplayerSecond.querySelector(".max-duration");
  mainAudioSecond.addEventListener("loadeddata", ()=>{
    // update song total duration
    let mainAdDuration = mainAudioSecond.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  // update playing song current time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// Перемотка песни
progressAreaSecond.addEventListener("click", (e)=>{
  let progressWidth = progressAreaSecond.clientWidth; //getting width of progress bar
  let clickedOffsetX = e.offsetX; //getting offset x value
  let songDuration = mainAudioSecond.duration; //getting song total duration
  
  mainAudioSecond.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusicSecond(); //calling playMusic function
  playingSongSecond();
});


//code for what to do after song ended
mainAudioSecond.addEventListener("ended", ()=>{
  // we'll do according to the icon means if user has set icon to
  // loop song then we'll repeat the current song and will do accordingly
  let getText = repeatBtn2.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      nextMusic2(); //calling nextMusic function
      break;
    case "repeat_one":
      mainAudioSecond.currentTime = 0; //setting audio current time to 0
      loadMusicSecond(musicIndexSecond); //calling loadMusic function with argument, in the argument there is a index of current song
      playMusicSecond(); //calling playMusic function
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusicSecond.length) + 1); //genereting random index/numb with max range of array length
      do{
        randIndex = Math.floor((Math.random() * allMusicSecond.length) + 1);
      }while(musicIndexSecond == randIndex); //this loop run until the next random number won't be the same of current musicIndex
      musicIndexSecond = randIndex; //passing randomIndex to musicIndex
      loadMusicSecond(musicIndexSecond);
      playMusicSecond();
      playingSongSecond();
      break;
  }
});


const ulTagSecond = audioplayerSecond.querySelector("ul");
// let create li tags according to array length for list
for (let i = 0; i < allMusicSecond.length; i++) {
  //let's pass the song name, artist from the array
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusicSecond[i].name}</span>
                  <p>${allMusicSecond[i].artist}</p>
                </div>
                <span id="${allMusicSecond[i].src}" class="audio-duration">load</span>
                <audio class="${allMusicSecond[i].src}" src="${allMusicSecond[i].way}"></audio>
              </li>`;
  ulTagSecond.insertAdjacentHTML("beforeend", liTag); //inserting the li inside ul tag

  let liAudioDuartionTag = ulTagSecond.querySelector(`#${allMusicSecond[i].src}`);
  let liAudioTag = ulTagSecond.querySelector(`.${allMusicSecond[i].src}`);
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    };
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
  });
}

//play particular song from the list onclick of li tag!!! При нажатии на другую песню, переключение на нее
function playingSongSecond(){
  pauseMusic()
  pauseMusicThird()
  pauseMusicFourth()
  pauseMusicFifth()
  pauseMusicSixth()

  const allLiTag = ulTagSecond.querySelectorAll("li");
  
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");
    
    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    //if the li tag index is equal to the musicIndex then add playing class in it
    if(allLiTag[j].getAttribute("li-index") == musicIndexSecond){
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    allLiTag[j].setAttribute("onclick", "clickedSecond(this)");
  }
}

//particular li clicked function

function clickedSecond(element){
  let getLiIndex2 = element.getAttribute("li-index");
  musicIndexSecond = getLiIndex2; //updating current song index with clicked li index
  loadMusicSecond(musicIndexSecond);
  playMusicSecond();
  playingSongSecond();
}


//Плеер 3
const audioplayerThird = document.querySelector(".audioplayer-third"),
musicImgThird = audioplayerThird.querySelector(".img-area img"),
musicNameThird = audioplayerThird.querySelector(".song-details .name"),
musicArtistThird = audioplayerThird.querySelector(".song-details .artist"),
playPauseBtnThird = audioplayerThird.querySelector(".play-pause"),
prevBtnThird = audioplayerThird.querySelector("#prev"),
nextBtnThird = audioplayerThird.querySelector("#next"),
mainAudioThird = audioplayerThird.querySelector("#main-audio"),
progressAreaThird = audioplayerThird.querySelector(".progress-area"),
progressBarThird = progressAreaThird.querySelector(".progress-bar"),
musicListThird = audioplayerThird.querySelector(".music-list"),
moreMusicBtnThird = audioplayerThird.querySelector("#more-music"),
closemoreMusicThird = musicListThird.querySelector("#close");


let musicIndexThird = Math.floor((Math.random() * allMusicThird.length) + 1);
isMusicPausedThird = true;

window.addEventListener("load", ()=>{
  loadMusicThird(musicIndexThird);
  playingSongThird(); 
});

//Way song
const waySongThird = ['https://www.dropbox.com/scl/fi/l1tiyhndfdem0jcgzkws6/015.mp3?rlkey=a0vf5dt478oen1lqh4lxbl6y1&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/wo16xazecg2iz7x86e2d1/016.mp3?rlkey=fzvz18a29n1ma4icrvrm40q4j&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/m17ipwcd8sv04qls8sbgn/017.mp3?rlkey=iiv74zil7y5n0qv2b0pg45ycm&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/kwgh588aju6gagx28cyhi/018.mp3?rlkey=9itrm2l3jl5qd3vakywnwv9ad&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/9wg536ldoo0qey3zlyzzd/019.mp3?rlkey=v6yvmnlo1rdd4r59qsmascl5p&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/ftffcioi6rt27pq6f19i8/020.mp3?rlkey=6679vxz6ydxgc2mvt3vt4vw6u&dl=0&raw=1']

//Init way song
function loadSongThird(a) {
  mainAudioThird.src = `${a}`;
}

function loadMusicThird(indexNumb2){
  loadSongThird(waySongThird[musicIndexThird - 1]);
  musicNameThird.innerText = allMusicThird[indexNumb2 - 1].name;
  musicArtistThird.innerText = allMusicThird[indexNumb2 - 1].artist;
}

//play music function
function playMusicThird(){
  audioplayerThird.classList.add("paused");
  playPauseBtnThird.querySelector("i").innerText = "pause";
  mainAudioThird.play();
}

//pause music function
function pauseMusicThird(){
  audioplayerThird.classList.remove("paused");
  playPauseBtnThird.querySelector("i").innerText = "play_arrow";
  mainAudioThird.pause();
}

// play or pause button event
playPauseBtnThird.addEventListener("click", ()=>{
  const isMusicPlay2 = audioplayerThird.classList.contains("paused");
  //if isPlayMusic is true then call pauseMusic else call playMusic
  isMusicPlay2 ? pauseMusicThird() : playMusicThird();
  playingSongThird();
});

// Прогресс бар
mainAudioThird.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime; //getting playing song currentTime
  const duration = e.target.duration; //getting playing song total duration
  let progressWidth = (currentTime / duration) * 100;
  progressBarThird.style.width = `${progressWidth}%`;

  let musicCurrentTime = audioplayerThird.querySelector(".current-time"),
  musicDuartion = audioplayerThird.querySelector(".max-duration");
  mainAudioThird.addEventListener("loadeddata", ()=>{
    // update song total duration
    let mainAdDuration = mainAudioThird.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  // update playing song current time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// Перемотка песни
progressAreaThird.addEventListener("click", (e)=>{
  let progressWidth = progressAreaThird.clientWidth; //getting width of progress bar
  let clickedOffsetX = e.offsetX; //getting offset x value
  let songDuration = mainAudioThird.duration; //getting song total duration
  
  mainAudioThird.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusicThird(); //calling playMusic function
  playingSongThird();
});


//code for what to do after song ended
mainAudioThird.addEventListener("ended", ()=>{
  // we'll do according to the icon means if user has set icon to
  // loop song then we'll repeat the current song and will do accordingly
  let getText = repeatBtn2.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      nextMusic2(); //calling nextMusic function
      break;
    case "repeat_one":
      mainAudioThird.currentTime = 0; //setting audio current time to 0
      loadMusicThird(musicIndexThird); //calling loadMusic function with argument, in the argument there is a index of current song
      playMusicThird(); //calling playMusic function
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusicThird.length) + 1); //genereting random index/numb with max range of array length
      do{
        randIndex = Math.floor((Math.random() * allMusicThird.length) + 1);
      }while(musicIndexThird == randIndex); //this loop run until the next random number won't be the same of current musicIndex
      musicIndexThird = randIndex; //passing randomIndex to musicIndex
      loadMusicThird(musicIndexThird);
      playMusicThird();
      playingSongThird();
      break;
  }
});


const ulTagThird = audioplayerThird.querySelector("ul");
// let create li tags according to array length for list
for (let i = 0; i < allMusicThird.length; i++) {
  //let's pass the song name, artist from the array
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusicThird[i].name}</span>
                  <p>${allMusicThird[i].artist}</p>
                </div>
                <span id="${allMusicThird[i].src}" class="audio-duration">load</span>
                <audio class="${allMusicThird[i].src}" src="${allMusicThird[i].way}"></audio>
              </li>`;
  ulTagThird.insertAdjacentHTML("beforeend", liTag); //inserting the li inside ul tag

  let liAudioDuartionTag = ulTagThird.querySelector(`#${allMusicThird[i].src}`);
  let liAudioTag = ulTagThird.querySelector(`.${allMusicThird[i].src}`);
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    };
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
  });
}

//play particular song from the list onclick of li tag!!! При нажатии на другую песню, переключение на нее
function playingSongThird(){
  pauseMusic();
  pauseMusicSecond();
  pauseMusicFourth();
  pauseMusicFifth();
  pauseMusicSixth();

  const allLiTag = ulTagThird.querySelectorAll("li");
  
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");
    
    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    //if the li tag index is equal to the musicIndex then add playing class in it
    if(allLiTag[j].getAttribute("li-index") == musicIndexThird){
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    allLiTag[j].setAttribute("onclick", "clickedThird(this)");
  }
}

//particular li clicked function

function clickedThird(element){
  let getLiIndex2 = element.getAttribute("li-index");
  musicIndexThird = getLiIndex2; //updating current song index with clicked li index
  loadMusicThird(musicIndexThird);
  playMusicThird();
  playingSongThird();
}

//Плеер 4
const audioplayerFourth = document.querySelector(".audioplayer-fourth"),
musicImgFourth = audioplayerFourth.querySelector(".img-area img"),
musicNameFourth = audioplayerFourth.querySelector(".song-details .name"),
musicArtistFourth = audioplayerFourth.querySelector(".song-details .artist"),
playPauseBtnFourth = audioplayerFourth.querySelector(".play-pause"),
prevBtnFourth = audioplayerFourth.querySelector("#prev"),
nextBtnFourth = audioplayerFourth.querySelector("#next"),
mainAudioFourth = audioplayerFourth.querySelector("#main-audio"),
progressAreaFourth = audioplayerFourth.querySelector(".progress-area"),
progressBarFourth = progressAreaFourth.querySelector(".progress-bar"),
musicListFourth = audioplayerFourth.querySelector(".music-list"),
moreMusicBtnFourth = audioplayerFourth.querySelector("#more-music"),
closemoreMusicFourth = musicListFourth.querySelector("#close");


let musicIndexFourth = Math.floor((Math.random() * allMusicFourth.length) + 1);
isMusicPausedFourth = true;

window.addEventListener("load", ()=>{
  loadMusicFourth(musicIndexFourth);
  playingSongFourth(); 
});

//Way song
const waySongFourth = ['https://www.dropbox.com/scl/fi/jc3ghrbm4arofeihj4e6e/021.mp3?rlkey=gnohmhs9mmmrwgm0tqlfckywz&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/3k30725degdkhouv2rzs6/022.mp3?rlkey=rofm8acrmtlwb71pm8pwtauj7&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/ewm7cp4tt776qqzdd26wh/023.mp3?rlkey=zk7mk5vjzlyi72437my42m90g&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/5tz477yt92kcwy6wj6hkc/024.mp3?rlkey=t2ktf7kktafdnon2xlqdjivox&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/47qqv7s54pd0odjgbgvgx/025.mp3?rlkey=hgu6n8fuc21djh63qz1jye965&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/q2eqycc5giuofkae353sg/026.mp3?rlkey=s9euv7ocy8wvc3mobikxeut4u&dl=0&raw=1'];

//Init way song
function loadSongFourth(a) {
  mainAudioFourth.src = `${a}`;
}

function loadMusicFourth(indexNumb2){
  loadSongFourth(waySongFourth[musicIndexFourth - 1]);
  musicNameFourth.innerText = allMusicFourth[indexNumb2 - 1].name;
  musicArtistFourth.innerText = allMusicFourth[indexNumb2 - 1].artist;
}

//play music function
function playMusicFourth(){
  audioplayerFourth.classList.add("paused");
  playPauseBtnFourth.querySelector("i").innerText = "pause";
  mainAudioFourth.play();
}

//pause music function
function pauseMusicFourth(){
  audioplayerFourth.classList.remove("paused");
  playPauseBtnFourth.querySelector("i").innerText = "play_arrow";
  mainAudioFourth.pause();
}

// play or pause button event
playPauseBtnFourth.addEventListener("click", ()=>{
  const isMusicPlay2 = audioplayerFourth.classList.contains("paused");
  //if isPlayMusic is true then call pauseMusic else call playMusic
  isMusicPlay2 ? pauseMusicFourth() : playMusicFourth();
  playingSongFourth();
});

// Прогресс бар
mainAudioFourth.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime; //getting playing song currentTime
  const duration = e.target.duration; //getting playing song total duration
  let progressWidth = (currentTime / duration) * 100;
  progressBarFourth.style.width = `${progressWidth}%`;

  let musicCurrentTime = audioplayerFourth.querySelector(".current-time"),
  musicDuartion = audioplayerFourth.querySelector(".max-duration");
  mainAudioFourth.addEventListener("loadeddata", ()=>{
    // update song total duration
    let mainAdDuration = mainAudioFourth.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  // update playing song current time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// Перемотка песни
progressAreaFourth.addEventListener("click", (e)=>{
  let progressWidth = progressAreaFourth.clientWidth; //getting width of progress bar
  let clickedOffsetX = e.offsetX; //getting offset x value
  let songDuration = mainAudioFourth.duration; //getting song total duration
  
  mainAudioFourth.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusicFourth(); //calling playMusic function
  playingSongFourth();
});


//code for what to do after song ended
mainAudioFourth.addEventListener("ended", ()=>{
  // we'll do according to the icon means if user has set icon to
  // loop song then we'll repeat the current song and will do accordingly
  let getText = repeatBtn2.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      nextMusic2(); //calling nextMusic function
      break;
    case "repeat_one":
      mainAudioFourth.currentTime = 0; //setting audio current time to 0
      loadMusicFourth(musicIndexFourth); //calling loadMusic function with argument, in the argument there is a index of current song
      playMusicFourth(); //calling playMusic function
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusicFourth.length) + 1); //genereting random index/numb with max range of array length
      do{
        randIndex = Math.floor((Math.random() * allMusicFourth.length) + 1);
      }while(musicIndexFourth == randIndex); //this loop run until the next random number won't be the same of current musicIndex
      musicIndexFourth = randIndex; //passing randomIndex to musicIndex
      loadMusicFourth(musicIndexFourth);
      playMusicFourth();
      playingSongFourth();
      break;
  }
});


const ulTagFourth = audioplayerFourth.querySelector("ul");
// let create li tags according to array length for list
for (let i = 0; i < allMusicFourth.length; i++) {
  //let's pass the song name, artist from the array
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusicFourth[i].name}</span>
                  <p>${allMusicFourth[i].artist}</p>
                </div>
                <span id="${allMusicFourth[i].src}" class="audio-duration">load</span>
                <audio class="${allMusicFourth[i].src}" src="${allMusicFourth[i].way}"></audio>
              </li>`;
  ulTagFourth.insertAdjacentHTML("beforeend", liTag); //inserting the li inside ul tag

  let liAudioDuartionTag = ulTagFourth.querySelector(`#${allMusicFourth[i].src}`);
  let liAudioTag = ulTagFourth.querySelector(`.${allMusicFourth[i].src}`);
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    };
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
  });
}

//play particular song from the list onclick of li tag!!! При нажатии на другую песню, переключение на нее
function playingSongFourth(){
  pauseMusic()
  pauseMusicSecond()
  pauseMusicThird()
  pauseMusicFifth()
  pauseMusicSixth()

  const allLiTag = ulTagFourth.querySelectorAll("li");
  
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");
    
    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    //if the li tag index is equal to the musicIndex then add playing class in it
    if(allLiTag[j].getAttribute("li-index") == musicIndexFourth){
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    allLiTag[j].setAttribute("onclick", "clickedFourth(this)");
  }
}

//particular li clicked function

function clickedFourth(element){
  let getLiIndex2 = element.getAttribute("li-index");
  musicIndexFourth = getLiIndex2; //updating current song index with clicked li index
  loadMusicFourth(musicIndexFourth);
  playMusicFourth();
  playingSongFourth();
}

//Плеер 5
const audioplayerFifth = document.querySelector(".audioplayer-fifth"),
musicImgFifth = audioplayerFifth.querySelector(".img-area img"),
musicNameFifth = audioplayerFifth.querySelector(".song-details .name"),
musicArtistFifth = audioplayerFifth.querySelector(".song-details .artist"),
playPauseBtnFifth = audioplayerFifth.querySelector(".play-pause"),
prevBtnFifth = audioplayerFifth.querySelector("#prev"),
nextBtnFifth = audioplayerFifth.querySelector("#next"),
mainAudioFifth = audioplayerFifth.querySelector("#main-audio"),
progressAreaFifth = audioplayerFifth.querySelector(".progress-area"),
progressBarFifth = progressAreaFifth.querySelector(".progress-bar"),
musicListFifth = audioplayerFifth.querySelector(".music-list"),
moreMusicBtnFifth = audioplayerFifth.querySelector("#more-music"),
closemoreMusicFifth = musicListFifth.querySelector("#close");


let musicIndexFifth = Math.floor((Math.random() * allMusicFifth.length) + 1);
isMusicPausedFifth = true;

window.addEventListener("load", ()=>{
  loadMusicFifth(musicIndexFifth);
  playingSongFifth(); 
});

//Way song
const waySongFifth = ['https://www.dropbox.com/scl/fi/16uivi72hdjodn564vihl/027.mp3?rlkey=c3f63jpyjwi2zv2dv0j44luyp&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/5ttez4xay7kfh7pyikvzc/028.mp3?rlkey=t2nznfcwa1a3ewepj8zg5aws2&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/tndhmzi2fxg6d4tlc3gdg/029.mp3?rlkey=qs604fj4zk0s08io4h7ilwr64&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/d1dkefil7jzymd9zriflk/030.mp3?rlkey=iears4x0i09c3vw9x69o1uvcg&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/45ftg4qarrrlq77sapijj/031.mp3?rlkey=ik6o70kjh2hg3jed529j268ru&dl=0&raw=1']

//Init way song
function loadSongFifth(a) {
  mainAudioFifth.src = `${a}`;
}

function loadMusicFifth(indexNumb2){
  loadSongFifth(waySongFifth[musicIndexFifth - 1]);
  musicNameFifth.innerText = allMusicFifth[indexNumb2 - 1].name;
  musicArtistFifth.innerText = allMusicFifth[indexNumb2 - 1].artist;
}

//play music function
function playMusicFifth(){
  audioplayerFifth.classList.add("paused");
  playPauseBtnFifth.querySelector("i").innerText = "pause";
  mainAudioFifth.play();
}

//pause music function
function pauseMusicFifth(){
  audioplayerFifth.classList.remove("paused");
  playPauseBtnFifth.querySelector("i").innerText = "play_arrow";
  mainAudioFifth.pause();
}

// play or pause button event
playPauseBtnFifth.addEventListener("click", ()=>{
  const isMusicPlay2 = audioplayerFifth.classList.contains("paused");
  //if isPlayMusic is true then call pauseMusic else call playMusic
  isMusicPlay2 ? pauseMusicFifth() : playMusicFifth();
  playingSongFifth();
});

// Прогресс бар
mainAudioFifth.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime; //getting playing song currentTime
  const duration = e.target.duration; //getting playing song total duration
  let progressWidth = (currentTime / duration) * 100;
  progressBarFifth.style.width = `${progressWidth}%`;

  let musicCurrentTime = audioplayerFifth.querySelector(".current-time"),
  musicDuartion = audioplayerFifth.querySelector(".max-duration");
  mainAudioFifth.addEventListener("loadeddata", ()=>{
    // update song total duration
    let mainAdDuration = mainAudioFifth.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  // update playing song current time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// Перемотка песни
progressAreaFifth.addEventListener("click", (e)=>{
  let progressWidth = progressAreaFifth.clientWidth; //getting width of progress bar
  let clickedOffsetX = e.offsetX; //getting offset x value
  let songDuration = mainAudioFifth.duration; //getting song total duration
  
  mainAudioFifth.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusicFifth(); //calling playMusic function
  playingSongFifth();
});


//code for what to do after song ended
mainAudioFifth.addEventListener("ended", ()=>{
  // we'll do according to the icon means if user has set icon to
  // loop song then we'll repeat the current song and will do accordingly
  let getText = repeatBtn2.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      nextMusic2(); //calling nextMusic function
      break;
    case "repeat_one":
      mainAudioFifth.currentTime = 0; //setting audio current time to 0
      loadMusicFifth(musicIndexFifth); //calling loadMusic function with argument, in the argument there is a index of current song
      playMusicFifth(); //calling playMusic function
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusicFifth.length) + 1); //genereting random index/numb with max range of array length
      do{
        randIndex = Math.floor((Math.random() * allMusicFifth.length) + 1);
      }while(musicIndexFifth == randIndex); //this loop run until the next random number won't be the same of current musicIndex
      musicIndexFifth = randIndex; //passing randomIndex to musicIndex
      loadMusicFifth(musicIndexFifth);
      playMusicFifth();
      playingSongFifth();
      break;
  }
});


const ulTagFifth = audioplayerFifth.querySelector("ul");
// let create li tags according to array length for list
for (let i = 0; i < allMusicFifth.length; i++) {
  //let's pass the song name, artist from the array
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusicFifth[i].name}</span>
                  <p>${allMusicFifth[i].artist}</p>
                </div>
                <span id="${allMusicFifth[i].src}" class="audio-duration">load</span>
                <audio class="${allMusicFifth[i].src}" src="${allMusicFifth[i].way}"></audio>
              </li>`;
  ulTagFifth.insertAdjacentHTML("beforeend", liTag); //inserting the li inside ul tag

  let liAudioDuartionTag = ulTagFifth.querySelector(`#${allMusicFifth[i].src}`);
  let liAudioTag = ulTagFifth.querySelector(`.${allMusicFifth[i].src}`);
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    };
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
  });
}

//play particular song from the list onclick of li tag!!! При нажатии на другую песню, переключение на нее
function playingSongFifth(){
  pauseMusic()
  pauseMusicSecond()
  pauseMusicThird()
  pauseMusicFourth()
  pauseMusicSixth()

  const allLiTag = ulTagFifth.querySelectorAll("li");
  
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");
    
    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    //if the li tag index is equal to the musicIndex then add playing class in it
    if(allLiTag[j].getAttribute("li-index") == musicIndexFifth){
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    allLiTag[j].setAttribute("onclick", "clickedFifth(this)");
  }
}

//particular li clicked function

function clickedFifth(element){
  let getLiIndex2 = element.getAttribute("li-index");
  musicIndexFifth = getLiIndex2; //updating current song index with clicked li index
  loadMusicFifth(musicIndexFifth);
  playMusicFifth();
  playingSongFifth();
}

//Плеер 6
const audioplayerSixth = document.querySelector(".audioplayer-sixth"),
musicImgSixth = audioplayerSixth.querySelector(".img-area img"),
musicNameSixth = audioplayerSixth.querySelector(".song-details .name"),
musicArtistSixth = audioplayerSixth.querySelector(".song-details .artist"),
playPauseBtnSixth = audioplayerSixth.querySelector(".play-pause"),
prevBtnSixth = audioplayerSixth.querySelector("#prev"),
nextBtnSixth = audioplayerSixth.querySelector("#next"),
mainAudioSixth = audioplayerSixth.querySelector("#main-audio"),
progressAreaSixth = audioplayerSixth.querySelector(".progress-area"),
progressBarSixth = progressAreaSixth.querySelector(".progress-bar"),
musicListSixth = audioplayerSixth.querySelector(".music-list"),
moreMusicBtnSixth = audioplayerSixth.querySelector("#more-music"),
closemoreMusicSixth = musicListSixth.querySelector("#close");


let musicIndexSixth = Math.floor((Math.random() * allMusicSixth.length) + 1);
isMusicPausedSixth = true;

window.addEventListener("load", ()=>{
  loadMusicSixth(musicIndexSixth);
  playingSongSixth(); 
});

//Way song
const waySongSixth = ['https://www.dropbox.com/scl/fi/16jayrdpeufzmmc0vr9jk/032.mp3?rlkey=wl7opmk3pfw82igb4pv1gtc6d&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/m2lq5c588zpsfjrhtuqjc/033.mp3?rlkey=8f3umyivew81fe9peg85o5gq5&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/j4br5jtdq4k2i60n3m7st/034.mp3?rlkey=vqpnwuqq4gz8o00ld4a3ex2vx&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/r0f9xckfzamum90vrn0xw/035.mp3?rlkey=0e122xjc4q8gey4t87u5lcmwi&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/fajpagrkh7wo56x2s40ak/036.mp3?rlkey=1jby4h2jegiwaqecl86004h4d&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/x1rzhuswjpo2183ib5h4b/037.mp3?rlkey=17eol4l5gwg0rlqtonc8y9p77&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/bhtaswfn9j7w9e5ps5spt/038.mp3?rlkey=athuyr89gyr99pe6pqql5dgfr&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/ye64n36jua8gt6uvagrje/039.mp3?rlkey=wak9897q7gm5qexzbo7nei98p&dl=0&raw=1']

//Init way song
function loadSongSixth(a) {
  mainAudioSixth.src = `${a}`;
}

function loadMusicSixth(indexNumbSixth){
  loadSongSixth(waySongSixth[musicIndexSixth - 1]);
  musicNameSixth.innerText = allMusicSixth[indexNumbSixth - 1].name;
  musicArtistSixth.innerText = allMusicSixth[indexNumbSixth - 1].artist;
}

//play music function
function playMusicSixth(){
  audioplayerSixth.classList.add("paused");
  playPauseBtnSixth.querySelector("i").innerText = "pause";
  mainAudioSixth.play();
}

//pause music function
function pauseMusicSixth(){
  audioplayerSixth.classList.remove("paused");
  playPauseBtnSixth.querySelector("i").innerText = "play_arrow";
  mainAudioSixth.pause();
}

// play or pause button event
playPauseBtnSixth.addEventListener("click", ()=>{
  const isMusicPlay2 = audioplayerSixth.classList.contains("paused");
  //if isPlayMusic is true then call pauseMusic else call playMusic
  isMusicPlay2 ? pauseMusicSixth() : playMusicSixth();
  playingSongSixth();
});

// Прогресс бар
mainAudioSixth.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime; //getting playing song currentTime
  const duration = e.target.duration; //getting playing song total duration
  let progressWidth = (currentTime / duration) * 100;
  progressBarSixth.style.width = `${progressWidth}%`;

  let musicCurrentTime = audioplayerSixth.querySelector(".current-time"),
  musicDuartion = audioplayerSixth.querySelector(".max-duration");
  mainAudioSixth.addEventListener("loadeddata", ()=>{
    // update song total duration
    let mainAdDuration = mainAudioSixth.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  // update playing song current time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// Перемотка песни
progressAreaSixth.addEventListener("click", (e)=>{
  let progressWidth = progressAreaSixth.clientWidth; //getting width of progress bar
  let clickedOffsetX = e.offsetX; //getting offset x value
  let songDuration = mainAudioSixth.duration; //getting song total duration
  
  mainAudioSixth.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusicSixth(); //calling playMusic function
  playingSongSixth();
});


//code for what to do after song ended
mainAudioSixth.addEventListener("ended", ()=>{
  // we'll do according to the icon means if user has set icon to
  // loop song then we'll repeat the current song and will do accordingly
  let getText = repeatBtn2.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      nextMusic2(); //calling nextMusic function
      break;
    case "repeat_one":
      mainAudioSixth.currentTime = 0; //setting audio current time to 0
      loadMusicSixth(musicIndexSixth); //calling loadMusic function with argument, in the argument there is a index of current song
      playMusicSixth(); //calling playMusic function
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusicSixth.length) + 1); //genereting random index/numb with max range of array length
      do{
        randIndex = Math.floor((Math.random() * allMusicSixth.length) + 1);
      }while(musicIndexSixth == randIndex); //this loop run until the next random number won't be the same of current musicIndex
      musicIndexSixth = randIndex; //passing randomIndex to musicIndex
      loadMusicSixth(musicIndexSixth);
      playMusicSixth();
      playingSongSixth();
      break;
  }
});


const ulTagSixth = audioplayerSixth.querySelector("ul");
// let create li tags according to array length for list
for (let i = 0; i < allMusicSixth.length; i++) {
  //let's pass the song name, artist from the array
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusicSixth[i].name}</span>
                  <p>${allMusicSixth[i].artist}</p>
                </div>
                <span id="${allMusicSixth[i].src}" class="audio-duration">load</span>
                <audio class="${allMusicSixth[i].src}" src="${allMusicSixth[i].way}"></audio>
              </li>`;
  ulTagSixth.insertAdjacentHTML("beforeend", liTag); //inserting the li inside ul tag

  let liAudioDuartionTag = ulTagSixth.querySelector(`#${allMusicSixth[i].src}`);
  let liAudioTag = ulTagSixth.querySelector(`.${allMusicSixth[i].src}`);
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    };
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
  });
}

//play particular song from the list onclick of li tag!!! При нажатии на другую песню, переключение на нее
function playingSongSixth(){
  pauseMusic()
  pauseMusicSecond()
  pauseMusicThird()
  pauseMusicFourth()
  pauseMusicFifth()

  const allLiTag = ulTagSixth.querySelectorAll("li");
  
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");
    
    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    //if the li tag index is equal to the musicIndex then add playing class in it
    if(allLiTag[j].getAttribute("li-index") == musicIndexSixth){
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    allLiTag[j].setAttribute("onclick", "clickedSixth(this)");
  }
}

//particular li clicked function

function clickedSixth(element){
  let getLiIndex2 = element.getAttribute("li-index");
  musicIndexSixth = getLiIndex2; //updating current song index with clicked li index
  loadMusicSixth(musicIndexSixth);
  playMusicSixth();
  playingSongSixth();
}