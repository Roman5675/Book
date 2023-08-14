//Слайдер swiper
new Swiper('.task-slider', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    spaceBetween: 56,
    breakpoints: {
        1920: {
            slidesPerView: 3
        },
        
        801: {
            slidesPerView: 2
        },
        0: {
            slidesPerView: 1
        },
    },
});

//Плеер
const player = document.querySelector('.player'),
    playBtn = document.querySelector('.play'),
    prevBtn = document.querySelector('.prev'),
    nextBtn = document.querySelector('.next'),
    audio = document.querySelector('.audio'),
    progressContainer = document.querySelector('.progress__container'),
    progress = document.querySelector('.progress'),
    title = document.querySelector('.song'),
    imgSrc = document.querySelector('.img__src')
    
//Way song
const waySong = ['https://www.dropbox.com/scl/fi/rbt1fus3xa3adbvqd1kun/001.mp3?rlkey=6o1plng15a9pgnl4vjw4t30yb&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/b66jotgqdtz0wjvhdy4jv/002.mp3?rlkey=azhwbx0g0ere5wl29kfie8kkq&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/ns96p4opof12cg9l4vww9/003.mp3?rlkey=h5elrexm9b6wjpd6t3pf6z320&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/3p2jdq7vxcdhd67myj6r3/004.mp3?rlkey=07tamj9pz6gu93bns8ogpflvs&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/70miedth64vzmvvhmcdq4/005.mp3?rlkey=6v2qpgusglrhuhhs8di2gqzjc&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/zhn1s697yu0qlzdjspp3z/006.mp3?rlkey=zyi4a0icugot7dalj7fjmznrs&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/qvp19pl3s0dfgkseg855m/007.mp3?rlkey=0wbojojsid8uyukkop4uuc5ub&dl=0&raw=1']

let wayIndex = 0

//Name song
const nameSong = [ 'ГЛАВА ПЕРВАЯ', 'ГЛАВА ВТОРАЯ', 'ГЛАВА ТРЕТЬЯ' , 'ГЛАВА ЧЕТВЕРТАЯ' , 'ГЛАВА ПЯТАЯ' , 'ГЛАВА ШЕСТАЯ' , 'ГЛАВА СЕДЬМАЯ']

let nameIndex = 0

//Init way song
function loadSong(song) {
    audio.src = `${song}`
}

loadSong(waySong[wayIndex])

//Init name song
function loadName(name) {
    title.innerHTML = name
}

loadName(nameSong[nameIndex])

//Play
function playSong() {
    player.classList.add('play')
    imgSrc.src = './img/10.png'
    audio.play()
}

//Pause
function pauseSong() {
    player.classList.remove('play')
    imgSrc.src = './img/11.png'
    audio.pause()
}

playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play')
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }

    const test2 = player2.classList.contains('play2')      
    if (test2) {
        pauseSong2()
    }
    const test3 = player3.classList.contains('play3')      
    if (test3) {
        pauseSong3()
    }
    const test4 = player4.classList.contains('play4')
    if (test4) {
        pauseSong4()
    }
    const test5 = player5.classList.contains('play5')
    if (test5) {
        pauseSong5()
    }
    const test6 = player6.classList.contains('play6')
    if (test6) {
        pauseSong6()
    }
})

//Next song
function nextSong() {
    wayIndex++
    if(wayIndex > waySong.length -1) {
        wayIndex = 0
    }

    nameIndex++
    if(nameIndex > waySong.length -1) {
        nameIndex = 0
    }
    loadSong(waySong[wayIndex])
    loadName(nameSong[nameIndex])
    playSong()
}
nextBtn.addEventListener('click', nextSong)

//Prev
function prevSong() {
    wayIndex--
    if(wayIndex < 0) {
        wayIndex = waySong.length -1
    }

    nameIndex--
    if(nameIndex < 0) {
        nameIndex = nameSong.length -1
    }

    loadSong(waySong[wayIndex])
    loadName(nameSong[nameIndex])
    playSong()
}
prevBtn.addEventListener('click', prevSong)

//Progress bar
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress)

//Перемотка песни
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}
progressContainer.addEventListener('click', setProgress)

//Auto play
audio.addEventListener('ended', nextSong)

//Плеер 2
const player2 = document.querySelector('.player2'),
    playBtn2 = document.querySelector('.play2'),
    prevBtn2 = document.querySelector('.prev2'),
    nextBtn2 = document.querySelector('.next2'),
    audio2 = document.querySelector('.audio2'),
    progressContainer2 = document.querySelector('.progress__container2'),
    progress2 = document.querySelector('.progress2'),
    title2 = document.querySelector('.song2'),
    imgSrc2 = document.querySelector('.img__src2')
    
//Way song
const waySong2 = ['https://www.dropbox.com/scl/fi/162azek3gar2zpesl5ou4/008.mp3?rlkey=bz9h2334x1pf2bdzi6yvr0or8&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/hl1fcwimzdjadjpgsvxru/009.mp3?rlkey=gyjip65oa8dx83izxdpfd4gt5&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/585my2bg25ls4w448jq0r/010.mp3?rlkey=lhehekc5cp8by2zm37v0kotyf&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/wpwomohhxrsimo08kr374/011.mp3?rlkey=20h23b217zixifcpmz8mvas40&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/4fap17owt3s4qmba7hsm5/012.mp3?rlkey=882a877pvco9cxkmaoo18o3o1&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/jkc9d7nuvgarjo7r26iqu/013.mp3?rlkey=4t3woyc54f8rhy608seql2lfv&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/2qr7u4znappzxqsj5hw3x/014.mp3?rlkey=8oe3gd62bc4y0jf2mnfkdgwv6&dl=0&raw=1']

let wayIndex2 = 0

//Name song
const nameSong2 = [ 'ГЛАВА ПЕРВАЯ', 'ГЛАВА ВТОРАЯ', 'ГЛАВА ТРЕТЬЯ' , 'ГЛАВА ЧЕТВЕРТАЯ' , 'ГЛАВА ПЯТАЯ' , 'ГЛАВА ШЕСТАЯ' , 'ГЛАВА СЕДЬМАЯ']

let nameIndex2 = 0

//Init way song
function loadSong2(song2) {
    audio2.src = `${song2}`
}

loadSong2(waySong2[wayIndex2])

//Init name song
function loadName2(name2) {
    title2.innerHTML = name2
}

loadName2(nameSong2[nameIndex2])

//Play
function playSong2() {
    player2.classList.add('play2')
    imgSrc2.src = './img/10.png'
    audio2.play()
}

//Pause
function pauseSong2() {
    player2.classList.remove('play2')
    imgSrc2.src = './img/11.png'
    audio2.pause()
}

playBtn2.addEventListener('click', () => {
    const isPlaying2 = player2.classList.contains('play2')
    if (isPlaying2) {
        pauseSong2()
    } else {
        playSong2()
    }

    const test = player.classList.contains('play')      
    if (test) {
        pauseSong()
    }
    const test3 = player3.classList.contains('play3')      
    if (test3) {
        pauseSong3()
    }
    const test4 = player4.classList.contains('play4')
    if (test4) {
        pauseSong4()
    }
    const test5 = player5.classList.contains('play5')
    if (test5) {
        pauseSong5()
    }
    const test6 = player6.classList.contains('play6')
    if (test6) {
        pauseSong6()
    }
})

//Next song
function nextSong2() {
    wayIndex2++
    if(wayIndex2 > waySong2.length -1) {
        wayIndex2 = 0
    }

    nameIndex2++
    if(nameIndex2 > waySong2.length -1) {
        nameIndex2 = 0
    }
    loadSong2(waySong2[wayIndex2])
    loadName2(nameSong2[nameIndex2])
    playSong2()
}
nextBtn2.addEventListener('click', nextSong2)

//Prev
function prevSong2() {
    wayIndex2--
    if(wayIndex2 < 0) {
        wayIndex2 = waySong2.length -1
    }

    nameIndex2--
    if(nameIndex2 < 0) {
        nameIndex2 = nameSong2.length -1
    }

    loadSong2(waySong2[wayIndex2])
    loadName2(nameSong2[nameIndex2])
    playSong2()
}
prevBtn2.addEventListener('click', prevSong2)

//Progress bar
function updateProgress2(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress2.style.width = `${progressPercent}%`
}
audio2.addEventListener('timeupdate', updateProgress2)

//Перемотка песни
function setProgress2(e) {
    const width2 = this.clientWidth
    const clickX2 = e.offsetX
    const duration2 = audio2.duration
    audio2.currentTime = (clickX2 / width2) * duration2
}
progressContainer2.addEventListener('click', setProgress2)

//Auto play
audio2.addEventListener('ended', nextSong2)

//Плеер 3
const player3 = document.querySelector('.player3'),
    playBtn3 = document.querySelector('.play3'),
    prevBtn3 = document.querySelector('.prev3'),
    nextBtn3 = document.querySelector('.next3'),
    audio3 = document.querySelector('.audio3'),
    progressContainer3 = document.querySelector('.progress__container3'),
    progress3 = document.querySelector('.progress3'),
    title3 = document.querySelector('.song3'),
    imgSrc3 = document.querySelector('.img__src3')
    
//Way song
const waySong3 = ['https://www.dropbox.com/scl/fi/l1tiyhndfdem0jcgzkws6/015.mp3?rlkey=a0vf5dt478oen1lqh4lxbl6y1&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/wo16xazecg2iz7x86e2d1/016.mp3?rlkey=fzvz18a29n1ma4icrvrm40q4j&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/m17ipwcd8sv04qls8sbgn/017.mp3?rlkey=iiv74zil7y5n0qv2b0pg45ycm&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/kwgh588aju6gagx28cyhi/018.mp3?rlkey=9itrm2l3jl5qd3vakywnwv9ad&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/9wg536ldoo0qey3zlyzzd/019.mp3?rlkey=v6yvmnlo1rdd4r59qsmascl5p&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/ftffcioi6rt27pq6f19i8/020.mp3?rlkey=6679vxz6ydxgc2mvt3vt4vw6u&dl=0&raw=1']

let wayIndex3 = 0

//Name song
const nameSong3 = [ 'ГЛАВА ПЕРВАЯ', 'ГЛАВА ВТОРАЯ', 'ГЛАВА ТРЕТЬЯ' , 'ГЛАВА ЧЕТВЕРТАЯ' , 'ГЛАВА ПЯТАЯ' , 'ГЛАВА ШЕСТАЯ']

let nameIndex3 = 0

//Init way song
function loadSong3(song3) {
    audio3.src = `${song3}`
}

loadSong3(waySong3[wayIndex3])

//Init name song
function loadName3(name3) {
    title3.innerHTML = name3
}

loadName3(nameSong3[nameIndex3])

//Play
function playSong3() {
    player3.classList.add('play3')
    imgSrc3.src = './img/10.png'
    audio3.play()
}

//Pause
function pauseSong3() {
    player3.classList.remove('play3')
    imgSrc3.src = './img/11.png'
    audio3.pause()
}

playBtn3.addEventListener('click', () => {
    const isPlaying3 = player3.classList.contains('play3')
    if (isPlaying3) {
        pauseSong3()
    } else {
        playSong3()
    }

    const test = player.classList.contains('play')      
    if (test) {
        pauseSong()
    }
    const test2 = player2.classList.contains('play2')      
    if (test2) {
        pauseSong2()
    }
    const test4 = player4.classList.contains('play4')
    if (test4) {
        pauseSong4()
    }
    const test5 = player5.classList.contains('play5')
    if (test5) {
        pauseSong5()
    }
    const test6 = player6.classList.contains('play6')
    if (test6) {
        pauseSong6()
    }
})

//Next song
function nextSong3() {
    wayIndex3++
    if(wayIndex3 > waySong3.length -1) {
        wayIndex3 = 0
    }

    nameIndex3++
    if(nameIndex3 > waySong3.length -1) {
        nameIndex3 = 0
    }
    loadSong3(waySong3[wayIndex3])
    loadName3(nameSong3[nameIndex3])
    playSong3()
}
nextBtn3.addEventListener('click', nextSong3)

//Prev
function prevSong3() {
    wayIndex3--
    if(wayIndex3 < 0) {
        wayIndex3 = waySong3.length -1
    }

    nameIndex3--
    if(nameIndex3 < 0) {
        nameIndex3 = nameSong3.length -1
    }

    loadSong3(waySong3[wayIndex3])
    loadName3(nameSong3[nameIndex3])
    playSong3()
}
prevBtn3.addEventListener('click', prevSong3)

//Progress bar
function updateProgress3(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress3.style.width = `${progressPercent}%`
}
audio3.addEventListener('timeupdate', updateProgress3)

//Перемотка песни
function setProgress3(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio3.duration
    audio3.currentTime = (clickX / width) * duration
}
progressContainer3.addEventListener('click', setProgress3)

//Auto play
audio3.addEventListener('ended', nextSong3)

//Плеер 4
const player4 = document.querySelector('.player4'),
    playBtn4 = document.querySelector('.play4'),
    prevBtn4 = document.querySelector('.prev4'),
    nextBtn4 = document.querySelector('.next4'),
    audio4 = document.querySelector('.audio4'),
    progressContainer4 = document.querySelector('.progress__container4'),
    progress4 = document.querySelector('.progress4'),
    title4 = document.querySelector('.song4'),
    imgSrc4 = document.querySelector('.img__src4')
    
//Way song
const waySong4 = ['https://www.dropbox.com/scl/fi/jc3ghrbm4arofeihj4e6e/021.mp3?rlkey=gnohmhs9mmmrwgm0tqlfckywz&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/3k30725degdkhouv2rzs6/022.mp3?rlkey=rofm8acrmtlwb71pm8pwtauj7&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/ewm7cp4tt776qqzdd26wh/023.mp3?rlkey=zk7mk5vjzlyi72437my42m90g&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/5tz477yt92kcwy6wj6hkc/024.mp3?rlkey=t2ktf7kktafdnon2xlqdjivox&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/47qqv7s54pd0odjgbgvgx/025.mp3?rlkey=hgu6n8fuc21djh63qz1jye965&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/q2eqycc5giuofkae353sg/026.mp3?rlkey=s9euv7ocy8wvc3mobikxeut4u&dl=0&raw=1']

let wayIndex4 = 0

//Name song
const nameSong4 = [ 'ГЛАВА ПЕРВАЯ', 'ГЛАВА ВТОРАЯ', 'ГЛАВА ТРЕТЬЯ' , 'ГЛАВА ЧЕТВЕРТАЯ' , 'ГЛАВА ПЯТАЯ' , 'ГЛАВА ШЕСТАЯ']

let nameIndex4 = 0

//Init way song
function loadSong4(song4) {
    audio4.src = `${song4}`
}

loadSong4(waySong4[wayIndex4])

//Init name song
function loadName4(name4) {
    title4.innerHTML = name4
}

loadName4(nameSong4[nameIndex4])

//Play
function playSong4() {
    player4.classList.add('play4')
    imgSrc4.src = './img/10.png'
    audio4.play()
}

//Pause
function pauseSong4() {
    player4.classList.remove('play4')
    imgSrc4.src = './img/11.png'
    audio4.pause()
}

playBtn4.addEventListener('click', () => {
    const isPlaying4 = player4.classList.contains('play4')
    if (isPlaying4) {
        pauseSong4()
    } else {
        playSong4()
    }

    const test = player.classList.contains('play')      
    if (test) {
        pauseSong()
    }
    const test2 = player2.classList.contains('play2')      
    if (test2) {
        pauseSong2()
    }
    const test3 = player3.classList.contains('play3')
    if (test3) {
        pauseSong3()
    }
    const test5 = player5.classList.contains('play5')
    if (test5) {
        pauseSong5()
    }
    const test6 = player6.classList.contains('play6')
    if (test6) {
        pauseSong6()
    }
})

//Next song
function nextSong4() {
    wayIndex4++
    if(wayIndex4 > waySong4.length -1) {
        wayIndex4 = 0
    }

    nameIndex4++
    if(nameIndex4 > waySong4.length -1) {
        nameIndex4 = 0
    }
    loadSong4(waySong4[wayIndex4])
    loadName4(nameSong4[nameIndex4])
    playSong4()
}
nextBtn4.addEventListener('click', nextSong4)

//Prev
function prevSong4() {
    wayIndex4--
    if(wayIndex4 < 0) {
        wayIndex4 = waySong4.length -1
    }

    nameIndex4--
    if(nameIndex4 < 0) {
        nameIndex4 = nameSong4.length -1
    }

    loadSong4(waySong4[wayIndex4])
    loadName4(nameSong4[nameIndex4])
    playSong4()
}
prevBtn4.addEventListener('click', prevSong4)

//Progress bar
function updateProgress4(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress4.style.width = `${progressPercent}%`
}
audio4.addEventListener('timeupdate', updateProgress4)

//Перемотка песни
function setProgress4(e) {
    const width4 = this.clientWidth
    const clickX4 = e.offsetX
    const duration4 = audio4.duration
    audio4.currentTime = (clickX4 / width4) * duration4
}
progressContainer4.addEventListener('click', setProgress4)

//Auto play
audio4.addEventListener('ended', nextSong4)

//Плеер 5
const player5 = document.querySelector('.player5'),
    playBtn5 = document.querySelector('.play5'),
    prevBtn5 = document.querySelector('.prev5'),
    nextBtn5 = document.querySelector('.next5'),
    audio5 = document.querySelector('.audio5'),
    progressContainer5 = document.querySelector('.progress__container5'),
    progress5 = document.querySelector('.progress5'),
    title5 = document.querySelector('.song5'),
    imgSrc5 = document.querySelector('.img__src5')
    
//Way song
const waySong5 = ['https://www.dropbox.com/scl/fi/16uivi72hdjodn564vihl/027.mp3?rlkey=c3f63jpyjwi2zv2dv0j44luyp&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/5ttez4xay7kfh7pyikvzc/028.mp3?rlkey=t2nznfcwa1a3ewepj8zg5aws2&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/tndhmzi2fxg6d4tlc3gdg/029.mp3?rlkey=qs604fj4zk0s08io4h7ilwr64&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/d1dkefil7jzymd9zriflk/030.mp3?rlkey=iears4x0i09c3vw9x69o1uvcg&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/45ftg4qarrrlq77sapijj/031.mp3?rlkey=ik6o70kjh2hg3jed529j268ru&dl=0&raw=1']

let wayIndex5 = 0

//Name song
const nameSong5 = [ 'ГЛАВА ПЕРВАЯ', 'ГЛАВА ВТОРАЯ', 'ГЛАВА ТРЕТЬЯ' , 'ГЛАВА ЧЕТВЕРТАЯ' , 'ГЛАВА ПЯТАЯ']

let nameIndex5 = 0

//Init way song
function loadSong5(song5) {
    audio5.src = `${song5}`
}

loadSong5(waySong5[wayIndex5])

//Init name song
function loadName5(name5) {
    title5.innerHTML = name5
}

loadName5(nameSong5[nameIndex5])

//Play
function playSong5() {
    player5.classList.add('play5')
    imgSrc5.src = './img/10.png'
    audio5.play()
}

//Pause
function pauseSong5() {
    player5.classList.remove('play5')
    imgSrc5.src = './img/11.png'
    audio5.pause()
}

playBtn5.addEventListener('click', () => {
    const isPlaying5 = player5.classList.contains('play5')
    if (isPlaying5) {
        pauseSong5()
    } else {
        playSong5()
    }

    const test = player.classList.contains('play')      
    if (test) {
        pauseSong()
    }
    const test2 = player2.classList.contains('play2')      
    if (test2) {
        pauseSong2()
    }
    const test3 = player3.classList.contains('play3')
    if (test3) {
        pauseSong3()
    }
    const test4 = player4.classList.contains('play4')
    if (test4) {
        pauseSong4()
    }
    const test6 = player6.classList.contains('play6')
    if (test6) {
        pauseSong6()
    }
})

//Next song
function nextSong5() {
    wayIndex5++
    if(wayIndex5 > waySong5.length -1) {
        wayIndex5 = 0
    }

    nameIndex5++
    if(nameIndex5 > waySong5.length -1) {
        nameIndex5 = 0
    }
    loadSong5(waySong5[wayIndex5])
    loadName5(nameSong5[nameIndex5])
    playSong5()
}
nextBtn5.addEventListener('click', nextSong5)

//Prev
function prevSong5() {
    wayIndex5--
    if(wayIndex5 < 0) {
        wayIndex5 = waySong5.length -1
    }

    nameIndex5--
    if(nameIndex5 < 0) {
        nameIndex5 = nameSong5.length -1
    }

    loadSong5(waySong5[wayIndex5])
    loadName5(nameSong5[nameIndex5])
    playSong5()
}
prevBtn5.addEventListener('click', prevSong5)

//Progress bar
function updateProgress5(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress5.style.width = `${progressPercent}%`
}
audio5.addEventListener('timeupdate', updateProgress5)

//Перемотка песни
function setProgress5(e) {
    const width5 = this.clientWidth
    const clickX5 = e.offsetX
    const duration5 = audio5.duration
    audio5.currentTime = (clickX5 / width5) * duration5
}
progressContainer5.addEventListener('click', setProgress5)

//Auto play
audio5.addEventListener('ended', nextSong5)

//Плеер 6
const player6 = document.querySelector('.player6'),
    playBtn6 = document.querySelector('.play6'),
    prevBtn6 = document.querySelector('.prev6'),
    nextBtn6 = document.querySelector('.next6'),
    audio6 = document.querySelector('.audio6'),
    progressContainer6 = document.querySelector('.progress__container6'),
    progress6 = document.querySelector('.progress6'),
    title6 = document.querySelector('.song6'),
    imgSrc6 = document.querySelector('.img__src6')
    
//Way song
const waySong6 = ['https://www.dropbox.com/scl/fi/16jayrdpeufzmmc0vr9jk/032.mp3?rlkey=wl7opmk3pfw82igb4pv1gtc6d&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/m2lq5c588zpsfjrhtuqjc/033.mp3?rlkey=8f3umyivew81fe9peg85o5gq5&dl=0&raw=1', 'https://www.dropbox.com/scl/fi/j4br5jtdq4k2i60n3m7st/034.mp3?rlkey=vqpnwuqq4gz8o00ld4a3ex2vx&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/r0f9xckfzamum90vrn0xw/035.mp3?rlkey=0e122xjc4q8gey4t87u5lcmwi&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/fajpagrkh7wo56x2s40ak/036.mp3?rlkey=1jby4h2jegiwaqecl86004h4d&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/x1rzhuswjpo2183ib5h4b/037.mp3?rlkey=17eol4l5gwg0rlqtonc8y9p77&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/bhtaswfn9j7w9e5ps5spt/038.mp3?rlkey=athuyr89gyr99pe6pqql5dgfr&dl=0&raw=1' , 'https://www.dropbox.com/scl/fi/ye64n36jua8gt6uvagrje/039.mp3?rlkey=wak9897q7gm5qexzbo7nei98p&dl=0&raw=1']

let wayIndex6 = 0

//Name song
const nameSong6 = [ 'ГЛАВА ПЕРВАЯ', 'ГЛАВА ВТОРАЯ', 'ГЛАВА ТРЕТЬЯ' , 'ГЛАВА ЧЕТВЕРТАЯ' , 'ГЛАВА ПЯТАЯ' , 'ГЛАВА ШЕСТАЯ' , 'ГЛАВА СЕДЬМАЯ' , 'ГЛАВА ВОСЬМАЯ']

let nameIndex6 = 0

//Init way song
function loadSong6(song6) {
    audio6.src = `${song6}`
}

loadSong6(waySong6[wayIndex6])

//Init name song
function loadName6(name6) {
    title6.innerHTML = name6
}

loadName6(nameSong6[nameIndex6])

//Play
function playSong6() {
    player6.classList.add('play6')
    imgSrc6.src = './img/10.png'
    audio6.play()
}

//Pause
function pauseSong6() {
    player6.classList.remove('play6')
    imgSrc6.src = './img/11.png'
    audio6.pause()
}

playBtn6.addEventListener('click', () => {
    const isPlaying6 = player6.classList.contains('play6')
    if (isPlaying6) {
        pauseSong6()
    } else {
        playSong6()
    }

    const test = player.classList.contains('play')      
    if (test) {
        pauseSong()
    }
    const test2 = player2.classList.contains('play2')      
    if (test2) {
        pauseSong2()
    }
    const test3 = player3.classList.contains('play3')
    if (test3) {
        pauseSong3()
    }
    const test4 = player4.classList.contains('play4')
    if (test4) {
        pauseSong4()
    }
    const test5 = player5.classList.contains('play5')
    if (test5) {
        pauseSong5()
    }
})

//Next song
function nextSong6() {
    wayIndex6++
    if(wayIndex6 > waySong6.length -1) {
        wayIndex6 = 0
    }

    nameIndex6++
    if(nameIndex6 > waySong6.length -1) {
        nameIndex6 = 0
    }
    loadSong6(waySong6[wayIndex6])
    loadName6(nameSong6[nameIndex6])
    playSong6()
}
nextBtn6.addEventListener('click', nextSong6)

//Prev
function prevSong6() {
    wayIndex6--
    if(wayIndex6 < 0) {
        wayIndex6 = waySong6.length -1
    }

    nameIndex6--
    if(nameIndex6 < 0) {
        nameIndex6 = nameSong6.length -1
    }

    loadSong6(waySong6[wayIndex6])
    loadName6(nameSong6[nameIndex6])
    playSong6()
}
prevBtn6.addEventListener('click', prevSong6)

//Progress bar
function updateProgress6(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress6.style.width = `${progressPercent}%`
}
audio6.addEventListener('timeupdate', updateProgress6)

//Перемотка песни
function setProgress6(e) {
    const width6 = this.clientWidth
    const clickX6 = e.offsetX
    const duration6 = audio6.duration
    audio6.currentTime = (clickX6 / width6) * duration6
}
progressContainer6.addEventListener('click', setProgress6)

//Auto play
audio6.addEventListener('ended', nextSong6)