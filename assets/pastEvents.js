//Primero los recupero:
const $search = document.getElementById('search')
const $check = document.getElementById('check')
const $cards = document.getElementById("cards-section")
let data;
let pastData;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(datos => datos.json())
.then(datoEventos=>{ 
  data = datoEventos
  pastData = data.events.filter(pastEvent => pastEvent.date < data.currentDate )
  createCheckbox(pastData, $check)
  printCards(pastData, $cards)
  $search.addEventListener( "input", filters)
  $check.addEventListener("change", filters)
})
.catch( err => console.log(err))

//crear checks
function createCheckbox (dataEvents, container){
  let categories = new Set(dataEvents.map(event => event.category))
  categories.forEach(category => {
      container.innerHTML += `
      <div class="form-check form-check-inline">
    <label class="form-check-label" for="${category}">${category}
    <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
    </label>
    </div>
      `
      
  });
}
//crear cards
function createCards (events){
  let div = document.createElement("DIV")
  div.style ="width: 18rem"
  div.classList = "card"
  div.innerHTML = `
  <figure id="cardImg">
  <img src="${events.image}" class="card-img" alt="${events.name}">
  </figure>
  <div class="card-body">
  <h5 class="card-title width">${events.name}</h5>
  <hr>
  <p class="card-text">${events.description}</p>
  </div>
  <div class="card-end">
  <p>Price: ${events.price}</p>
  <a href="details.html?idUrl=${events._id}" class="btn">View More</a>
  </div>
  `
  
return div
}

//imprimir cards
function printCards (events, container){
  container.innerHTML =''
  if (events.length > 0){
      let fragment = document.createDocumentFragment()        
      events.forEach(event => {
          let aux = createCards(event)
          fragment.appendChild(aux)
      })
      container.appendChild(fragment)
      
  } else {
      container.innerHTML = `<div class="noCoicidences">
      <h2>Sorry :'(</h2>
      <h4 >THERES NO COICIDENCES WITH YOUR SEARCH</h4>
      </div>`
  }
  
}

//filtro 
function filters( ){
  let checked = [...document.querySelectorAll('input[type="checkbox"]:checked' )].map(ele => ele.value)
  let filterPerCheck = pastData.filter(event => checked.includes(event.category) || checked.length === 0 )
  let filterPerSearch = filterPerCheck.filter( info => info.name.toLowerCase().startsWith($search.value.toLowerCase()))
  printCards(filterPerSearch, $cards)

} 

