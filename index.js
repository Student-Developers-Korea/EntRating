function create(title, content){
  fetch('https://playentry.org/api/discuss/', {
    method: 'POST',
    body: `{ "images": [], "category": "avo", "title": "${title}", "content": "${content}", "groupNotice": false }`,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

//이부분은 exte0417님의 EntryBotMaker을 참고하였습니다.
function comment(content, id){
  $.ajax({
    url:"/api/comment",
    dataType:"json",
    type:"POST",
    data:{
      content: content,
      target: id,
      targetSubject: "discuss",
      targetType: "individual"
    }
  })
}
//여기까지가 exte0417님 코드를 참고한부분

async function getcomment(id){
  var length = await fetch(`https://playentry.org/api/comment/discuss/count/${id}?noCache=1597210182375`)
  var length = await length.json()
  var list = []
  for(var i=1; i<parseInt(length/5)+1; i++){
    var a = await fetch(`https://playentry.org/api/comment/discuss/list/${id}/${i}?noCache=1597209869903&targetType=individual`)
    var b = await a.json()
    for(var j=0; j<5; j++){
      list.push(b[j].content)
    }
  }
  var a = await fetch(`https://playentry.org/api/comment/discuss/list/${id}/${parseInt(length/5)+1}?noCache=1597209869903&targetType=individual`)
  var b = await a.json()
  for(var j=0; j<length%5; j++){
    list.push(b[j].content)
  }
  return list
}

async function getcommentuser(id){
  var length = await fetch(`https://playentry.org/api/comment/discuss/count/${id}?noCache=1597210182375`)
  var length = await length.json()
  var list = []
  for(var i=1; i<parseInt(length/5)+1; i++){
    var a = await fetch(`https://playentry.org/api/comment/discuss/list/${id}/${i}?noCache=1597209869903&targetType=individual`)
    var b = await a.json()
    for(var j=0; j<5; j++){
      list.push(b[j].user.username)
    }
  }
  var a = await fetch(`https://playentry.org/api/comment/discuss/list/${id}/${parseInt(length/5)+1}?noCache=1597209869903&targetType=individual`)
  var b = await a.json()
  for(var j=0; j<length%5; j++){
    list.push(b[j].user.username)
  }
  return list
}

async function getall(){
  var length = await fetch('https://playentry.org/api/discuss/find?commentsNothing=false&sort=created&rows=20&page=1&category=avo&noCache=1570785797940')
  var length = await length.json()
  var length = length.count
  var list = []
  for(var i=1; i<parseInt(length/20)+1; i++){
    var a = await fetch(`https://playentry.org/api/discuss/find?commentsNothing=false&sort=created&rows=20&page=${i}&category=avo&noCache=1570785797940`)
    var b = await a.json()
    for(var j=0; j<20; j++){
      list.push(b.data[j].title)
    }
  }
  var a = await fetch(`https://playentry.org/api/discuss/find?commentsNothing=false&sort=created&rows=20&page=${parseInt(length/20)+1}&category=avo&noCache=1570785797940`)
  var b = await a.json()
  for(var j=0; j<length%20; j++){
    list.push(b.data[j].title)
  }
  return list
}

function left(){
  if($('#score')[0].innerHTML > 1){
    $('#score')[0].innerHTML = Number($('#score')[0].innerHTML)-1
  }
}

function right(){
  if($('#score')[0].innerHTML < 5){
    $('#score')[0].innerHTML = Number($('#score')[0].innerHTML)+1
  }
}

function rating(){
  var grade = $('#score')[0].innerHTML
  getall().then(async function(res){
    if(res.indexOf(Entry.projectId)==-1){
      create(Entry.projectId, '평점')
      var a = 0
      rating()
      return
    } else{
      var a = res.indexOf(Entry.projectId)
    }
    console.log(a)
    var b = await fetch(`https://playentry.org/api/discuss/find?commentsNothing=false&sort=created&rows=20&page=${parseInt(a/20)+1}&category=avo&noCache=1570785797940`)
    var c = await b.json()
    console.log(c)
    var ddd = c.data[a%20]._id
    console.log(ddd)
    var ee = await getcommentuser(ddd)
    if(ee.indexOf(user.username)==-1){
      if(confirm(`${grade}점을 주시겠습니까?`)==true){
        comment(grade, ddd)
      }
    }else{
      alert('이미 평점을 남겼습니다')
    }
    $('#ok')[0].style.backgroundColor = '#DCDCDC'
    alert('평점을 남겼습니다')
  })
}

async function getproject(page){
  var list = []
  var a = await fetch(`https://playentry.org/api/project/find?blamed=false&isopen=true&option=list&sort=updated&rows=12&page=${page}&role=teacher&noCache=1570787161672`)
  var b = await a.json()
  for(var i = 0; i<12; i++){
    list.push(b.data[i]._id)
  }
  return list
}

function mean(list){
  var re = 0;
  for(var i = 0; i<list.length; i++){
    re += Number(list[i])
  }
  return String(Math.round(re/list.length*10)/10)
}

function getcolor(num){
  if(num==5){
    return '#007BDC'
  } else if(num>=4){
    return '#00DC71'
  } else if(num>=3){
    return '#FFD23A'
  } else if(num>=2){
    return '#FF703A'
  } else {
    return '#2C2C2C'
  }
}


async function start(){
  if(location.href.split('?')[0]=='https://playentry.org/all#!/'){
    var a = await getproject(Number(location.href.split('&')[2].slice(-1)))
    var b = await getall()
    for(var i = 0; i<12; i++){
      if(b.indexOf(a[i])==-1){
        var c = '없음'
        var d = '#B9B9B9'
        console.log(c)
        } else{
            var c = await fetch(`https://playentry.org/api/discuss/find?commentsNothing=false&sort=created&rows=20&page=${parseInt(b.indexOf(a[i])/20)+1}&category=avo&noCache=1570785797940`)
            var c = await c.json()
            var c = mean(await getcomment(c.data[b.indexOf(a[i])%20]._id))
            console.log(c)
            var d = getcolor(Number(c))
            console.log(d)
        }
      const star = `<style>
      .star{
        width : 75px;
        height : 35px;
        background-color : ${d};
        border-radius : 5px;
        font-size : 20px;
        font-weight : 600;
        color : white;
        text-align : center;
        padding-top : 5px;
        float : left;
        margin : 12px;
        margin-right : 0;
      }
      </style>
      <div class="star">${c} 점</div>`
      document.querySelector(`body > section > section > section > section > div.allListWrapper > div > div:nth-child(${i+1}) > div.projectInfoBox`).innerHTML = star + document.querySelector(`body > section > section > section > section > div.allListWrapper > div > div:nth-child(${i+1}) > div.projectInfoBox`).innerHTML
      document.querySelector(`body > section > section > section > section > div.allListWrapper > div > div:nth-child(${i+1}) > div.projectInfoBox > img`).style.display = 'none'
     }
  } else{
    const gradebox = `<style>
      @font-face {font-family: 'GmarketSansMedium';src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');font-weight: normal;font-style: normal;}
      #gradebox{
        margin-top : 10px;
        width: 300px;
        background-color : white;
        border : 1px solid #d4d5d5;
        font-family : 'GmarketSansMedium';
      }
      #gradetitle{
        background-color : #FFEC33;
        text-align : center;
        height : 41px;
        font-size : 20px;
        padding-top : 9px;
      }
      #grade{
        display: flex;
        justify-content : center;
        padding-top : 10px;
        padding-bottom : 10px;
      }
      .arrow{
        width : 30px;
        height : 30px;
        text-align : center;
        font-size : 15px;
        font-weight : bold;
        color : #1C1C1C;
        background-color : #FFB127;
        border-radius: 50%;
        margin-left : 10px;
        margin-right : 10px;
        cursor : pointer;
        padding-top : 5px;
      }
      #score{
        font-size : 20px;
        padding-top : 3px;
      }
      #ok{
        margin-top : 10px;
        width : 300px;
        height : 41px;
        border : 1px solid #d4d5d5;
        border-radius : 0 0 15px 15px;
        background-color : #27BEFF;
        text-align : center;
        font-size : 20px;
        padding-top : 9px;
        cursor : pointer;
    </style>
    <div id="gradebox">
      <div id="gradetitle">
        평점을 남겨주세요!
      </div>
      <div id="grade">
        <span class="arrow" onclick="left()">&lt;</span>
        <span id="score">5</span>
        <span class="arrow" onclick="right()">&gt;</span>
      </div>
    </div>
    <div id="ok" onclick="rating()">
      확인
    </div>`;
    document.querySelector("body > section > section > div:nth-child(1) > div > div.projectView > div.contentWrapper > div.rightWrapper.ng-scope").innerHTML += gradebox;
  }
}

start()
