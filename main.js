const searchForm = document.querySelector('.search-form')
const inputValue = document.querySelector('.input-value')
const temperature = document.querySelector('.temperature')
const city = document.querySelector('.city')
const weatherIcon = document.querySelector('.weather-icon')
const condition = document.querySelector('.condition')
const locationList = document.querySelector('.locations-list')
const favoriteButton = document.querySelector('.favorite-button')

let cities = []

function getCity(cityName) {
	const serverUrl = 'http://api.openweathermap.org/data/2.5/weather'
	const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'
	const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`

	return fetch(url).then(reponse => {
		if (reponse.status === 404) {
			alert(new Error('Такой страны не существет'))
		}
		if (cityName.length === 0) {
			throw new Error("City name it' is too short")
		}
		return reponse.json()
	})
}

searchForm.addEventListener('submit', event => {
	event.preventDefault()

	const cityName = inputValue.value

	getCity(cityName)
		.then(response => {
			temperature.textContent = `${Math.round(response.main.temp)}°C`
			city.textContent = response.name
			weatherIcon.src = `https://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png`
			condition.textContent = `${response.weather[0].main}, ${response.weather[0].description}`
			console.log(response)
		})
		.catch(error => {
			console.log(error)
		})
	inputValue.value = ''
})

function addCity(targetCity) {
	cities.push(targetCity)
}

function createElement() {
	locationList.textContent = ''
	cities.forEach((element, index) => {
		const newLocation = document.createElement('li')
		const deleteButton = document.createElement('img')
		newLocation.className = 'location'
		newLocation.textContent = element
		deleteButton.className = 'delete-icon'
		deleteButton.src = 'img/delete-icon.png'
		newLocation.append(deleteButton)
		locationList.append(newLocation)

		deleteButton.addEventListener('click', () => {
			cities = cities.filter((item, idx) => idx !== index)
			createElement()
			console.log(cities)
		})
	})
}

favoriteButton.addEventListener('click', () => {
	addCity(city.textContent)
	createElement()
	console.log(cities)
})
