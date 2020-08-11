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


document.querySelector("body > section > section > div:nth-child(1) > div > div.projectView > div.contentWrapper > div.rightWrapper.ng-scope").innerHTML += template;
