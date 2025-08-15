Pts.namespace(window);
let threshold = 25
const divergeDistance = 250

function magnitude(real, imag) {
    return Math.sqrt(real * real + imag * imag);
}

function testDiverge(real, imag, c_real, c_imag) {
    let oldReal = real; let oldImag = imag;
    let newReal = real; let newImag = imag;

    for (let i = 0; i < threshold; i++) {
        if (magnitude(oldImag, oldImag) > 250) {
            return Color.hsl((180 + 180 * (i / 25)) % 360, 0.35, Math.min((i / 25), 0.75))
        } else {
            switch (fractType) {
                case 'rose1':
                    var oldVal = math.complex(oldReal, oldImag)
                    var newVal = math.exp(oldVal)

                    newReal = newVal.re + c_real
                    newImag = newVal.im + c_imag
                    break;
                case 'rose2':
                    var oldVal = math.complex(oldReal, oldImag)
                    var newVal = math.pow(oldVal, math.abs(oldVal))

                    newReal = newVal.re + c_real
                    newImag = newVal.im + c_imag
                    break;
                case 'rose3':
                    var oldVal = math.complex(math.abs(oldReal), math.abs(oldImag))
                    var newVal = math.pow(oldVal, math.abs(oldVal))

                    newReal = newVal.re + c_real
                    newImag = newVal.im + c_imag
                    break;
                case 'rose4':
                    var oldVal = math.complex(-math.abs(oldReal), math.abs(oldImag))
                    var newVal = math.pow(oldVal, math.abs(oldVal))

                    newReal = newVal.re + c_real
                    newImag = newVal.im + c_imag
                    break;
                case 'mandel3':
                    newReal = ((oldReal * oldReal * oldReal) - (3 * oldReal * oldImag * oldImag)) + c_real
                    newImag = ((3 * oldReal * oldReal * oldImag) - (oldImag * oldImag * oldImag)) + c_imag
                    break;

                case 'mandel4':
                    newReal = ((oldReal * oldReal * oldReal * oldReal) - (6 * oldReal * oldReal * oldImag * oldImag) + (oldImag * oldImag * oldImag * oldImag)) + c_real
                    newImag = ((4 * oldReal * oldReal * oldReal * oldImag) - (4 * oldReal * oldImag * oldImag * oldImag)) + c_imag
                    break;
                
                default:
                    if (fractType == 'ship') {
                        newReal = -Math.abs(oldReal); newImag = Math.abs(oldImag);
                        oldReal = newReal
                        oldImag = newImag
                    } else if (fractType == 'tricorn') {
                        newImag = -oldImag;
                        oldImag = newImag
                    }
        
                    newReal = ((oldReal * oldReal) - (oldImag * oldImag)) + c_real
                    newImag = (2 * oldReal * oldImag) + c_imag        
                    break;
                }
                oldReal = newReal
                oldImag = newImag
        }
    }

    return Color.hsl(0,0,1);
}