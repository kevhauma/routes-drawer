let drawableData;
let drawSpeed = 30;
let counter = 0;
let padding = 20;
let w = window.innerWidth;
let h = window.innerHeight;

let amountToDrawDiv 
async function setup() {
    createCanvas(w, h);
    frameRate(60)
    background('white')
    amountToDrawDiv  = document.getElementById("amountToDraw")
}

function mousePressed() {

}
let gpxToDraw = []
let lastDrawn
let totalData = -1
function draw() {
    if (!drawableData) return;
    if(totalData<0)
        totalData = drawableData.length
    if (!lastDrawn || lastDrawn.state == 2) {
        lastDrawn = drawableData.shift()
        if (lastDrawn) {
            lastDrawn.ready()
            gpxToDraw.push(lastDrawn)
        } else {
            noLoop()
        }
    }
    stroke(0)
    strokeWeight(1);
    if (!lastDrawn) {
        noLoop()
        return
    }
    lastDrawn.draw();
    
    amountToDrawDiv.textContent =`${totalData-drawableData.length} / ${totalData} drawn`
    //    gpxToDraw.forEach(d => {
    //        if (d.state == 1) {
    //            stroke('red')
    //            strokeWeight(3);
    //        } else {
    //            stroke(0)
    //            strokeWeight(lineWidth);
    //        }
    //
    //        d.draw()
    //
    //
    //        if (d.state == 1) {
    //            strokeWeight(0)
    //            textSize(padding)
    //            text(d.name, padding, padding + 20)
    //        }
    //    })

}
