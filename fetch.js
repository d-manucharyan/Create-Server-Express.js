fetch('http://localhost:3000/api/users/4', {
    method: 'DELETE'
})
    .then(res => res.json())
    .then(data => console.log(data))


    
    // {
    //     "id": 4,
    //     "name": "Diana Miller",
    //     "age": 42,
    //     "email": "diana.miller@example.com",
    //     "password": "dmPass456"
    // }