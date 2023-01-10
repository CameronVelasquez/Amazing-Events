const $body1 = document.getElementById("tbody-1")
const $body2 = document.getElementById("tbody-2")
const $body3 = document.getElementById("tbody-3")
let data;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(response => response.json())
.then(completeData => {
    data = completeData
    upcomingTRs( data, $body2)
    pastTRs(data, $body3)
    maxCapacity(data.events)
    let justEvents = newPropertyPercentage(data)
    maxPercentage(justEvents)
    minPercentage(justEvents)
})
.catch(err => console.log(err))

//para calcular Ingresos/Revenues
function revenues(prices, estimatesOrAssistance){
    let rev = prices * estimatesOrAssistance
    return rev.toLocaleString()
}
//para calcular Percentage of attendace
function percentageOfAttendance (capacities, estimatesOrAssistance){
    let percentage = (estimatesOrAssistance / (capacities/100)).toFixed(0)
    return percentage
}

//crear UpcomingTRs
function upcomingTRs(data, container){
    let upcomingFiltered = data.events.filter(event => event.date > data.currentDate)
    let template = ""
    for (let event of upcomingFiltered){
        template += `<tr>
        <td>${event.category}</td>
        <td>$ ${revenues(event.estimate, event.price)}</td>
        <td>${percentageOfAttendance(event.capacity, event.estimate)}%</td>
    </tr>`
    }
    container.innerHTML = template
}
//crear PastTRs
function pastTRs(data, container){
    let pastFiltered = data.events.filter(event => event.date < data.currentDate)
    let template = ""
    for (let event of pastFiltered){
        template += `<tr>
        <td>${event.category}</td>
        <td>$ ${revenues(event.assistance, event.price)}</td>
        <td>${percentageOfAttendance(event.capacity, event.assistance)}%</td>
    </tr>`
    }
    container.innerHTML = template
}

//data events statistics
function maxCapacity (events){
    let maximCapacity = events.sort((event1, event2) => event2.capacity - event1.capacity)
    document.getElementById ("maxCapacity").innerHTML = maximCapacity[0].name 
}

function newPropertyPercentage(data){
let list = []
    for (let i = 0; i < data.events.length; i++) {
        list.push(data.events[i]);
        
        list[i].percentage = percentageOfAttendance(list[i].capacity, (list[i].assistance ?? list[i].estimate));
    }
    console.log(list)
    return list.sort((event1, event2) => event2.percentage - event1.percentage)
}

function maxPercentage(events2){
    document.getElementById("maxPercentage").innerHTML = `${events2[0].name} with ${events2[0].percentage}%`
}

function minPercentage(events2){
    document.getElementById("minPercentage").innerHTML = `${events2[events2.length-1].name} with ${events2[events2.length-1].percentage}%`
}


