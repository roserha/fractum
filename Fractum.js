Pts.namespace(window);

drawbox = null
form = null
cells = null
cellNumSide = 32
lastCellNumSide = 1

offsetX = - 0.5; offsetY = 0; scale = 100;
offsetXOld = offsetX; offsetYOld = offsetY; scaleOld = scale;

fractType = 'mandel'
lastFractType = fractType

last_px = 0; last_py = 0;

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

    drawbox = new CanvasSpace("#drawbox");
    form = drawbox.getForm();
    drawbox.setup({ bgcolor: "#010210", retina: true, pixelDensity: 8});

    drawbox.play((time, ftime) => {
    }, { autoClear: false });
    
    drawbox.add({
        start: (bound) => {
            drawboxCenterX = drawbox.center.x;
            drawboxCenterY = drawbox.center.y

            drawCells();
            drawbox.refresh(false);
        }, 
        
        animate: (time, ftime) => {
            if (offsetX != offsetXOld || offsetY != offsetYOld || scale != scaleOld || fractType != lastFractType) {
                cellNumSide = 32;
                drawCells();
                // console.log(`ofx: ${offsetX} || ofy: ${offsetY}`)
                offsetXOld = offsetX;
                offsetYOld = offsetY;
                scaleOld = scale;
                lastRefresh = time;
                lastFractType = fractType;
            }

            if (time - lastRefresh > 500 && cellNumSide < 512) {
                if (mouseUp) {
                    lastCellNumSide = cellNumSide
                    cellNumSide *= 2;
                }
                drawCells();
                lastRefresh = time;
                $("#fromNum").text(`${-200/scale+offsetX} + ${-200/scale+offsetY} i`)
                $("#toNum").text(`${200/scale+offsetX} + ${200/scale+offsetY} i`)
                $("#iterNum").text(`${Math.floor(threshold)}`)
            }
        },

        action:( type, px, py, action ) => {
            // console.log(`${type} -> (${px}, ${py}) || ${action}`)

            switch(type) {
                case "drag":
                    offsetX -= (px - last_px) / scale
                    offsetY += (py - last_py) / scale
                    break;

                case "pointerdown":
                    mouseUp = false;
                    break;

                case "pointerup":
                    mouseUp = true;
                    break;
                
                default:
                    break;
            }

            last_px = px; last_py = py;
        }
    });

    drawbox.bindMouse().bindTouch().play();
})

function drawCells() {
    if (cellNumSide != lastCellNumSide) {
        rectangleSize = null;
        cells = Create.gridCells( drawbox.innerBound, cellNumSide, cellNumSide );
        rectangleSize = Rectangle.size(cells[0])
        lastCellNumSide = cellNumSide
    }

    threshold = Math.pow(scale, 0.25) * 25/3;

    // console.log(threshold)
    let i = 0;
    for (; i < cells.length - 8; i += 8) {
        // pasrallelization look up web workers or smth
        let p = cells[i]
        let p2 = cells[i+1]
        let p3 = cells[i+2]
        let p4 = cells[i+3]
        let p5 = cells[i+4]
        let p6 = cells[i+5]
        let p7 = cells[i+6]
        let p8 = cells[i+7]

        let cn = Rectangle.center(p)
        let r = Rectangle.fromCenter(cn , rectangleSize);
        let x = (cn.x - drawboxCenterX) / scale + offsetX;
        let y = (drawboxCenterY - cn.y) / scale + offsetY;
        let c = Color.HSLtoRGB(testDiverge(0, 0, x, y)).hex;
        
        let cn2 = Rectangle.center(p2)
        let r2 = Rectangle.fromCenter(cn2 , rectangleSize);
        let x2 = (cn2.x - drawboxCenterX) / scale + offsetX;
        let y2 = (drawboxCenterY - cn2.y) / scale + offsetY;
        let c2 = Color.HSLtoRGB(testDiverge(0, 0, x2, y2)).hex;
        
        let cn3 = Rectangle.center(p3)
        let r3 = Rectangle.fromCenter(cn3 , rectangleSize);
        let x3 = (cn3.x - drawboxCenterX) / scale + offsetX;
        let y3 = (drawboxCenterY - cn3.y) / scale + offsetY;
        let c3 = Color.HSLtoRGB(testDiverge(0, 0, x3, y3)).hex;
        
        let cn4 = Rectangle.center(p4)
        let r4 = Rectangle.fromCenter(cn4 , rectangleSize);
        let x4 = (cn4.x - drawboxCenterX) / scale + offsetX;
        let y4 = (drawboxCenterY - cn4.y) / scale + offsetY;
        let c4 = Color.HSLtoRGB(testDiverge(0, 0, x4, y4)).hex;

        let cn5 = Rectangle.center(p5)
        let r5 = Rectangle.fromCenter(cn5 , rectangleSize);
        let x5 = (cn5.x - drawboxCenterX) / scale + offsetX;
        let y5 = (drawboxCenterY - cn5.y) / scale + offsetY;
        let c5 = Color.HSLtoRGB(testDiverge(0, 0, x5, y5)).hex;
        form.fill(c5).stroke(c5).rect(r5);

        let cn6 = Rectangle.center(p6)
        let r6 = Rectangle.fromCenter(cn6 , rectangleSize);
        let x6 = (cn6.x - drawboxCenterX) / scale + offsetX;
        let y6 = (drawboxCenterY - cn6.y) / scale + offsetY;
        let c6 = Color.HSLtoRGB(testDiverge(0, 0, x6, y6)).hex;
        form.fill(c6).stroke(c6).rect(r6);

        let cn7 = Rectangle.center(p7)
        let r7 = Rectangle.fromCenter(cn7 , rectangleSize);
        let x7 = (cn7.x - drawboxCenterX) / scale + offsetX;
        let y7 = (drawboxCenterY - cn7.y) / scale + offsetY;
        let c7 = Color.HSLtoRGB(testDiverge(0, 0, x7, y7)).hex;
        form.fill(c7).stroke(c7).rect(r7);

        let cn8 = Rectangle.center(p8)
        let r8 = Rectangle.fromCenter(cn8 , rectangleSize);
        let x8 = (cn8.x - drawboxCenterX) / scale + offsetX;
        let y8 = (drawboxCenterY - cn8.y) / scale + offsetY;
        let c8 = Color.HSLtoRGB(testDiverge(0, 0, x8, y8)).hex;
        form.fill(c8).stroke(c8).rect(r8);
        
        form.fill(c).stroke(c).rect(r);
        form.fill(c2).stroke(c2).rect(r2);
        form.fill(c3).stroke(c3).rect(r3);
        form.fill(c4).stroke(c4).rect(r4);
        form.fill(c5).stroke(c5).rect(r5);
        form.fill(c6).stroke(c6).rect(r6);
        form.fill(c7).stroke(c7).rect(r7);
        form.fill(c8).stroke(c8).rect(r8);
        
        // console.log(`%cx: ${x} || y: ${y} || ${c}`, `background: ${c}`)
    }
    for(; i < cells.length; i++) {
        let p = cells[i]
        let cn = Rectangle.center(p)
        let r = Rectangle.fromCenter(cn , rectangleSize);
        let x = (cn.x - drawboxCenterX) / scale + offsetX;
        let y = (drawboxCenterY - cn.y) / scale + offsetY;
        let c = Color.HSLtoRGB(testDiverge(0, 0, x, y)).hex;
        form.fill(c).stroke(c).rect(r);
    }
}

addEventListener("wheel", (event) => { })

onwheel = (event) => {
    if (event.deltaY < 0) {
        scale += -0.05 * event.deltaY * scale / 100;
    } else if (event.deltaY > 0) {
        scale -= 0.05 * event.deltaY * scale / 100;
    }
 }