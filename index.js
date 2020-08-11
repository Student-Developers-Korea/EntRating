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

`<div id="gradebox">
  <div id="gradetitle">
    평점매기기
  </div>
  <div id="grade">
    <span id="gradeleft">&lt;</span><span id="gradescore">5</span><span id="graderight">&gt;</span>
  </div>
</div>`
