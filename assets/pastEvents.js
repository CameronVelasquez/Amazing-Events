let where = document.getElementById("cards-section")

 function crearCards( lista, va ){
     let todasLasCards = ""
     for (let recorrido of lista){
        if  (recorrido.date <= data.currentDate){
        let template =
                    `<div class="card" style="width: 18rem;">
                    <figure id="cardImg">
                    <img src="${recorrido.image}" class="card-img-top" alt="${recorrido.name}">
                    </figure>
                    <div class="card-body">
                    <h5 class="card-title">${recorrido.name}</h5>
                    <p class="card-text">${recorrido.description}</p>
                    </div>
                    <div class="card-end">
                    <p>Price: ${recorrido.price}</p>
                    <a href="details.html" class="btn">Ver Más</a>
                    </div>
                    </div>`
    todasLasCards += template
              
        }        
}

  va.innerHTML = todasLasCards
}
crearCards (data.events, where)