function create(id, grade){
  fetch('https://playentry.org/api/discuss/', {
    method: 'POST',
    body: `{ "images": [], "category": "avo", "title": "${user.username}/${id}/${grade}", "content": "평점", "groupNotice": false }`,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

`<div id="gradebox">
  <div id="gradetitle">
    평점매기기
  </div>
  <div id="grade">
    <span id="gradeleft">&lt;</span><span id="gradescore">5</span><span id="graderight">&gt;</span>
  </div>
</div>`
