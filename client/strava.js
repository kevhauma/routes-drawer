window.addEventListener("load", initStrava, false)

let stravabuttonlink
let loadedPathsDiv
let sets = []
let getConfig = {
    headers: {}
}
let stravaUrl
function initStrava() {
    const client_id = "43070"
    const responseURL = window.location.href.split("?")[0]
    const scope = "activity:read"

     stravaUrl = `http://www.strava.com/oauth/authorize?client_id=${client_id}&response_type=code&scope=${scope}&approval_prompt=force&redirect_uri=${responseURL}`

    stravabuttonlink = document.getElementById("stravaButtonLink")
    loadedPathsDiv = document.getElementById("loadedPaths")

    stravabuttonlink.setAttribute("href", stravaUrl)
    console.log("strava loaded")
    let params = getParams()
    if (params) {
        getAccess(params.code)
    }

}
async function getAccess(code) {
    stravabuttonlink.style.display = "none"
    try{
    let res = await fetch(`https://strava-code-to-token.herokuapp.com/?code=${code}`)
    let data = await res.json()
    if (data.errors) {
        console.error(data)
        return
    }
   
    const creds = {
        ac: data.access_token,
        name: `${data.athlete.firstname} ${data.athlete.lastname}`,
        id: data.athlete.id
    }
    getConfig.headers.Authorization = `Bearer ${creds.ac}`

    getRoutes(creds)
         }catch(e){
        window.location=stravaUrl
}
}

async function getRoutes(creds) {
    let res = await fetch(`https://www.strava.com/api/v3/athletes/${creds.id}/activities?per_page=100`, getConfig)
    let data = await res.json()
    if (data.errors) {
        console.error(data)
        return
    }

    for (let a of data) {
        const newSet = {
            id: a.ad,
            date: a.start_date,
            name: a.name,
            points: await getRoutePath(a.id)
        }
        sets.push(newSet)
        makeChild(newSet)

    }
    let goButton = document.getElementById("go")
    goButton.style.display="block"
    goButton.addEventListener("click",()=>{
        loadedPathsDiv.style.display = "none"
        coordsToPxls(sets)
    })
    
}

async function getRoutePath(id) {
    let res = await fetch(`https://www.strava.com/api/v3/activities/${id}`, getConfig)
    let data = await res.json()
    let pl = data.map.polyline
    let decoded = polyline.decode(pl, 6)
    return decoded.map(arr => ({lat: arr[0],lon: arr[1]}));
}

function makeChild({id,name,date}) {
    let mainDiv = document.createElement("div")
    mainDiv.id = id
    mainDiv.classList.add("path")
    
    let deleteButton = document.createElement("div")
    deleteButton.textContent = "delete"
    deleteButton.classList.add("deletebutton")
    deleteButton.addEventListener("click",()=>{
        remove(id)
        mainDiv.style.display="none"
    })
    
    let dateDiv = document.createElement("div")
    dateDiv.textContent = new Date(date).toLocaleDateString()
    
    let nameDiv = document.createElement("div")
    nameDiv.textContent = name
    
    mainDiv.appendChild(dateDiv)
    mainDiv.appendChild(nameDiv)
    mainDiv.appendChild(deleteButton)
}

function remove(id) {
sets = sets.filter(s=>s.id!==id)
}
