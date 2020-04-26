const paramRegex = /(\?|\&)([^=]+)\=([^\&]+)/g

function getParams(){
   let params = window.location.href.match(paramRegex)
   if(!params) return null
   params = params.map(p=>p.substring(1,p.length))
    let paramObject = {}
    params.forEach(f=>{
        let parts = f.split("=")
        paramObject[parts[0]] = parts[1]
    })
    console.log(paramObject)
    return paramObject
}

