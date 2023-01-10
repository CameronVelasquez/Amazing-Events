let cadenaParametroUrl = location.search //retorna lo que esta pasado el '?' 
let parametros = new URLSearchParams(cadenaParametroUrl) //convierte el anterior return a URLSearchParams = se puede usar 'get'.
let idCard = parametros.get("idUrl") //regresa string si obtuvo 'idURL'

let $container = document.getElementById("detailed-card")
let dataJson;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(data => data.json())
    .then( data => {
        dataJson = data
        pintarCard(dataJson.events.find(evento => evento._id == idCard), $container)
    })
    .catch(err => console.log(err))

function pintarCard(propiedadEvents, contenedor){
    

    contenedor.innerHTML = ""
    let template = `<figure>
    <img  class="detailed-img" src="${propiedadEvents.image}" alt="">
  </figure>
                    <section class="detailed-descrip">
                        <h2>${propiedadEvents.name}</h2>
                        <hr>
                        <dl>
                            <dt>Date:</dt>
                            <dd>${propiedadEvents.date}</dd>

                            <dt>Description:</dt>
                            <dd>${propiedadEvents.description}</dd>
                            <dt>Category:</dt>
                            <dd>${propiedadEvents.category}</dd>
                            <dt>Place:</dt>
                            <dd>${propiedadEvents.place}</dd>
                            <dt>Capacity:</dt>
                            <dd>${propiedadEvents.capacity}</dd>
                            <dt>Price:</dt>
                            <dd>${propiedadEvents.price}</dd>
                        </dl>                 
                    </section>`

    contenedor.innerHTML = template
}


