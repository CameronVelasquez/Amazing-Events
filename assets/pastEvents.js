//Primero los recupero:
const $search = document.getElementById('search')
const $check = document.getElementById('check')
const $cards = document.getElementById("cards-section")

const pastFilter = data.events.filter( equis => equis.date <= data.currentDate ) //array con los eventos

//funcion para crear las cards , aun no enviarlas, se usara luego para 'pintarlas'

 function crearCards( lista){
     let todasLasCards = ""
     for (let recorrido of lista){
      
        let template =
                    `<div class="card" style="width: 18rem;">
                    <figure id="cardImg">
                    <img src="${recorrido.image}" class="card-img" alt="${recorrido.name}">
                    </figure>
                    <div class="card-body">
                    <h5 class="card-title">${recorrido.name}</h5>
                    <hr>
                    <p class="card-text">${recorrido.description}</p>
                    </div>
                    <div class="card-end">
                    <p>Price: ${recorrido.price}</p>
                    <a href="details.html?idUrl=${recorrido._id}" class="btn">Ver Más</a>
                    </div>
                    </div>`
    todasLasCards += template 

}
return todasLasCards     
}

//quizas aqui va la funcion renderTemplate, probar despues si no rompe code
renderTemplate (crearCards(pastFilter), $cards) 

//generar checks en js
//variable
const sinRepetidos = []
const categorias = pastFilter.map(events => events.category) //nombre de las categorias, aun repetidas en este punto.

//con esto V se crea un array con los nombres de las categorias sin repetir.
categorias.forEach(categorias => {
  if (!sinRepetidos.includes (categorias)){
    sinRepetidos.push (categorias)}
  })
  
//Creacion de los botones checkbox
  function generarCheck(lista){
    let todosLosChecks = ""
    for (recorrido of lista){
      let templateCheck = `<div class="form-check form-check-inline">
      <label class="form-check-label" for="${recorrido}">${recorrido}
      <input class="form-check-input" type="checkbox" id="${recorrido}" value="${recorrido}">
      </label>
      </div>`
      todosLosChecks += templateCheck
    }
      return todosLosChecks
}

//inner para pasar checks a pantalla
$check.innerHTML = generarCheck(sinRepetidos)

//referencia a especificamente los buttons checks

//funcion de filtro para el check / entiendo que incluye filtro search
function filterCheck(arrayCheckbuttons, listMovies){
  let listValue = [];
  for (let click of arrayCheckbuttons) {
    if (click.checked)
    listValue.push(click.value.toLowerCase())
  }
  //creo que aqui filtra tambien al search
  let filtered =listMovies.filter(movie => listValue.includes(movie.category.toLowerCase()))
  if (listValue.length === 0) {
    return listMovies
  } else {
    return filtered
  }
}

//addEventListener
$check.addEventListener('change', filtroCruzado)
$search.addEventListener( 'input', filtroCruzado)

//funcion para filtrar por nombre de evento (search)
function searchMovies(inputBusqueda, listMovies){
  const filterMovies = listMovies.filter(movie => {
    return movie.name.toLowerCase().startsWith(inputBusqueda.value.toLowerCase())
  })
  
  return filterMovies
}


//funcion filtro Cruzado

function filtroCruzado(evento) {
  let checkbuttons = document.querySelectorAll(".form-check-input") //hacer un console log para saber si es un array ( //genera un array )
  const filtradosPorBusqueda = searchMovies($search, pastFilter)
  const filtradosPorCheck = filterCheck(checkbuttons, filtradosPorBusqueda)
  
  if (filtradosPorCheck.length === 0) {
    let alert = `<div class="noCoicidences">
    <h2>Sorry :'(</h2>
    <h4 >THERES NO COICIDENCES WITH YOUR SEARCH</h4>
    </div>`
    renderTemplate(alert, $cards)
  } else {
    renderTemplate(crearCards(filtradosPorCheck), $cards)
  }
}

//funcion renderTemplate

function renderTemplate(template, ubicacion) {
  ubicacion.innerHTML = template
}

filtroCruzado()



