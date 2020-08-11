function create(title, content){
  fetch('https://playentry.org/api/discuss/', {
    method: 'POST',
    body: `{ "images": [], "category": "avo", "title": "${title}", "content": "${content}", "groupNotice": false }`,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

function getcontent(id){
  var a = await fetch(`https://playentry.org/api/discuss/${id}?noCache=1597130420343&discussId=${id}`)
  var b = await a.json()
  return b.content
}

const template = `<style>
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
document.querySelector("body > section > section > div:nth-child(1) > div > div.projectView > div.contentWrapper > div.rightWrapper.ng-scope").innerHTML += template;
