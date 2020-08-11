function create(id, grade){
  fetch('https://playentry.org/api/discuss/', {
    method: 'POST',
    body: `{ "images": [], "category": "avo", "title": "${user.username}/${id}/${grade}", "content": "평점", "groupNotice": false }`,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
