//=========== Initializing Constant variables ===========
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const API_KEY = '&appid=85a6dc2524e13f48ed66216076adb361'
const PLACE_HOLDERS = ['City', 'Date', 'Tempreture', 'Feelings']

// DOM Objects
// text Inputs
const ZIP_INPUT = document.querySelector('#zip')
const TEXT_AREA = document.querySelector('#feelings')
// Buttons
const GENERATE_BUTTON = document.querySelector('#generate')
const CLEAR_BUTTON = document.querySelector('#clear')
//DIVS for display

const HOLDER_DIV = document.querySelector('#entry-holder')
const CITY_DIV = document.querySelector('#city')
const DATE_DIV = document.querySelector('#date')
const TEMPRETURE_DIV = document.querySelector('#temp')
const CONTENT_DIV = document.querySelector('#content')
//=========== End of constant variables ============

//Adding Date Object
let date = new Date()
let newDate =
  date.getDate() + '/ ' + (date.getMonth() + 1) + '/ ' + date.getFullYear()

//Adding event listeners to buttons
GENERATE_BUTTON.addEventListener('click', (e) => {
  e.preventDefault()
  //send data if its not empty
  if (ZIP_INPUT.value && TEXT_AREA.value) {
    generate(TEXT_AREA.value)
  } else {
    callToast('Please Fill up the inputs')
  }
})
CLEAR_BUTTON.addEventListener('click', (e) => {
  e.preventDefault()
  //clears data in all fields
  clearUI()
})

//Helper Functions
//Method to convert Kelvin to Celsius (used in updateUI function)
const KelvToCels = (K) => (K - 273.15).toFixed(1)

const generate = async (feelings) => {
  getData(API_URL, ZIP_INPUT.value, API_KEY)
    .then((data) => postData({ ...data, feelings }))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err))
}
const getData = async (url, zipCode, key) => {
  //Fetch from OpenWeather
  const response = await fetch(url + zipCode + key)
  try {
    const data = await response.json()
    return data
  } catch (err) {
    return err
  }
}
const postData = async (data) => {
  const POST_URL = '/post'
  const res = await fetch(POST_URL, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  try {
    const newData = await res.json()
    return newData
  } catch (err) {
    return err
  }
}
const updateUI = async (data) => {
  clearUI()
  let i = 0
  for (const div of HOLDER_DIV.children) {
    div.firstElementChild.innerText = PLACE_HOLDERS[i++]
  }
  console.log('newData', data)
  CITY_DIV.lastElementChild.innerText = data.name
  DATE_DIV.lastElementChild.innerText = newDate
  TEMPRETURE_DIV.lastElementChild.innerText = KelvToCels(data.main.temp) + ' C'
  CONTENT_DIV.lastElementChild.innerText = data.feelings
}
const clearUI = () => {
  ZIP_INPUT.value = ''
  TEXT_AREA.value = ''
  for (const div of HOLDER_DIV.children) {
    div.firstElementChild.innerText = ''
    div.lastElementChild.innerText = ''
  }
}
//this method is made to give users feedback, for better UX
const callToast = (text) => {
  Toastify({
    text,
    duration: 2000,
    gravity: 'top',
    position: 'right',
    backgroundColor: 'linear-gradient(to right, #f00, #f50)',
    className: 'info',
  }).showToast()
}
