
console.log("client side js file is loaded")

//browwser api: fetch: - fetch the data from a page, converted to json and display it in console. 
// fetch('http://puzzle.mead.io/puzzle').then((response)=> {
//   response.json().then((data)=> {
//     console.log(data)
//   })
// })



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#p1')
const messageTwo = document.querySelector('#p2')



weatherform.addEventListener('submit', (e)=> {
  e.preventDefault()
  const location = search.value
  messageOne.innerHTML = "Loading...."
  messageTwo.innerHTML = ""
  
  fetch('http://localhost:3000/weather?address=' + location).then((response)=> {
  response.json().then((data)=> {
    if (data.error) {
      messageOne.innerHTML = data.error
    } else {
      messageOne.innerHTML = data.location
      messageTwo.textContent =   data.forcast.temp + ", " + data.forcast.city_name
    }
  })
})
})