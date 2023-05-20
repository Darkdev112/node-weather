console.log('Client Side javascript');

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('.lat')
const searchElement2 = document.querySelector('.lon')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const latitude = searchElement.value;
    const longitude = searchElement2.value;

    msg1.textContent = "Loading...."

    if(latitude && longitude){      
        fetch(`http://localhost:3000/weather?latitude=${latitude}&longitude=${longitude}`)
            .then((response) => {
                return response.json()
            }).then((data) => {
            if(data.error){
                msg1.textContent= ""
                msg2.textContent = data.error
            }
            else{
                console.log(data);
                msg1.textContent = `${data.currentWeather}. It is now ${data.temperature} F whereas it feels like ${data.feelsLike} F`
            }
    })
    }
    else{
        console.log("Fill everything");
        msg1.textContent = "Fill everything"
    }
})