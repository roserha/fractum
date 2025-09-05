Pts.namespace(window);

drawbox = null
form = null
cells = null
cellNumSide = 512
lastCellNumSide = 1

offsetX = - 0.5; offsetY = 0; scale = 100;
offsetXOld = offsetX; offsetYOld = offsetY; scaleOld = scale;

fractType = 0
typeOld = fractType

last_px = -1; last_py = -1;

let mouseUp = true;
let lastRefresh = 0;

let rectangleSize = null;
let drawboxCenterX = null;
let drawboxCenterY = null;


$(() => {
     $('#fractalType').on('change', function () {
        offsetX = - 0.5; offsetY = 0; scale = 100;
        fractType = $('#fractalType').val()
     });

     testDiverge(-200/scale+offsetX, 200/scale+offsetY, 
        200/scale+offsetX, -200/scale+offsetY, threshold, fractType);

     drawbox = testDiverge.canvas;
     
     console.log(drawbox);
     $('#drawbox').html(drawbox);

     
     drawbox.onmousedown = (e) => {
        mouseUp = false;
        last_px = e.x; last_py = e.y;
     }

     drawbox.onmouseup = (e) => {
        mouseUp = true;
     }

     drawbox.onmousemove = (e) => {
        if (!mouseUp) {
            if (last_px > 0 && last_py > 0) {
                offsetX -= (e.x - last_px) / scale
                offsetY -= (e.y - last_py) / scale
            }
    
            last_px = e.x; last_py = e.y;
        }
     }
})

addEventListener("wheel", (event) => { })

onwheel = (event) => {
    if (event.deltaY < 0) {
        scale += -0.05 * event.deltaY * scale / 100;
    } else if (event.deltaY > 0) {
        scale -= 0.05 * event.deltaY * scale / 100;
    }

    drawCells();
}

function drawCells() {
    $("#fromNum").text(`${-200/scale+offsetX} + ${-200/scale+offsetY} i`)
    $("#toNum").text(`${200/scale+offsetX} + ${200/scale+offsetY} i`)
    $("#iterNum").text(`${Math.floor(threshold)}`)
    $("#scaleNum").text(`${Math.round(scale)/100}`)

    threshold = Math.max(Math.pow(scale, 0.5) * 2.5, 25);

    if (offsetXOld != offsetX || offsetYOld != offsetY || scaleOld != scale || typeOld != fractType)
        testDiverge(-200/scale+offsetX, 200/scale+offsetY, 
            200/scale+offsetX, -200/scale+offsetY, threshold, fractType);


    offsetXOld = offsetX; offsetYOld = offsetY; scaleOld = scale; typeOld = fractType;
    window.requestAnimationFrame(drawCells);
}

window.requestAnimationFrame(drawCells);