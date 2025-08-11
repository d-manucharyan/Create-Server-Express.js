fetch('http://localhost:3000/api/users/5', {
    method: 'DELETE'
})
    .then(res => res.json())
    .then(data => console.log(data))
