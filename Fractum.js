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
last_tx = -1; last_ty = -1; 
initial_pinchdist = 0; initial_scale = 0;

let mouseUp = true;
let lastRefresh = 0;

let rectangleSize = null;
let drawboxCenterX = null;
let drawboxCenterY = null;

divergeFunction = mandelbrotSet;


$(() => {
    $('#toggleTheme').on('click', function () {
        document.body.classList.toggle("light");
    });

     $('#fractalType').on('change', function () {
        offsetX = - 0.5; offsetY = 0; scale = 100;
        fractType = $('#fractalType').val()

        switch (fractType) {
            case 'triplebrot':
                divergeFunction = triplebrotSet;
                break;

            case 'tetrabrot':
                divergeFunction = tetrabrotSet;
                break;

            case 'burnship':
                divergeFunction = burningShip;
                break;

            case 'tricorn':
                divergeFunction = tricorn;
                break;

            case 'rose1':
                divergeFunction = sawtooth;
                break;

            case 'rose2':
                divergeFunction = teardrop;
                break;

            case 'rose3':
                divergeFunction = screamingSoul;
                break;
            
            default:
                divergeFunction = mandelbrotSet;
                break;
        }
     });

     divergeFunction(-200/scale+offsetX, 200/scale+offsetY, 
        200/scale+offsetX, -200/scale+offsetY, threshold);

     drawbox = divergeFunction.canvas;
     
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

     handleTouchStart = (e) => {
        let touches = e.touches;
        e.preventDefault();
        e.stopPropagation();

        if (touches.length == 1) {    
            last_tx = e.touches[0].pageX; last_ty = e.touches[0].pageY;
        } else if (touches.length == 2) {
            tdx = e.touches[0].pageX - e.touches[1].pageX;
            tdy = e.touches[0].pageY - e.touches[1].pageY;
            
            tdeltalen = Math.sqrt(tdx*tdx + tdy*tdy);
            initial_pinchdist = tdeltalen;
            initial_scale = scale;
        }
     }

     handleTouchEvent = (e) => {
        let touches = e.touches;
        e.preventDefault();
        e.stopPropagation();

        if (touches.length == 1) {
            if (last_tx > 0 && last_ty > 0) {
                offsetX -= (e.touches[0].pageX - last_tx) / scale
                offsetY -= (e.touches[0].pageY - last_ty) / scale
            }
    
            last_tx = e.touches[0].pageX; last_ty = e.touches[0].pageY;
        } else if (touches.length == 2) {
            tdx = e.touches[0].pageX - e.touches[1].pageX;
            tdy = e.touches[0].pageY - e.touches[1].pageY;
            
            tdeltalen = Math.sqrt(tdx*tdx + tdy*tdy);
            pinchscale = tdeltalen / initial_pinchdist;
            scale = pinchscale * initial_scale;
        }
     }

     handleTouchEnd = (e) => { 
        if (e.touches.length == 1) {
            last_tx = e.touches[0].pageX; last_ty = e.touches[0].pageY;
        }
    }

     drawbox.addEventListener('touchstart', handleTouchStart, true);
     drawbox.addEventListener('touchmove', handleTouchEvent, true);
     drawbox.addEventListener('touchend', handleTouchEnd, true);
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
function updateData() {
    $("#fromNum").text(`${(-200/scale+offsetX).toFixed(6)} + ${(-200/scale+offsetY).toFixed(6)} i`)
    $("#toNum").text(`${(200/scale+offsetX).toFixed(6)} + ${(200/scale+offsetY).toFixed(6)} i`)
    $("#iterNum").text(`${Math.floor(threshold).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
    $("#scaleNum").text(`${(Math.round(scale)/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
}

setInterval(updateData, 33);

function drawCells() {
    threshold = Math.max(Math.pow(scale, 0.5) * 2.5, 25);

    if (offsetXOld != offsetX || offsetYOld != offsetY || scaleOld != scale || typeOld != fractType)
        divergeFunction(-200/scale+offsetX, 200/scale+offsetY, 
            200/scale+offsetX, -200/scale+offsetY, threshold);


    offsetXOld = offsetX; offsetYOld = offsetY; scaleOld = scale; typeOld = fractType;
    window.requestAnimationFrame(drawCells);
}

window.requestAnimationFrame(drawCells);