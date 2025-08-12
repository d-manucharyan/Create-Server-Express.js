//! DELETE
fetch('http://localhost:3000/api/users/4', {
    method: 'DELETE'
})
    .then(res => res.json())
    .then(data => console.log(data))

//! POST
fetch('http://localhost:3000/api/users', {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
        id: 21,
        name: 'Valod',
        age: 45,
        email: 'valod@gmail.com',
        password: "valod1821"
    })
})
    .then(res => res.json())
    .then(res => console.log(res))