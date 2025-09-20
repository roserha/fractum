Pts.namespace(window);
let threshold = 25
const divergeDistance = 250

function arg(a, b) {
    return Math.atan2(b,a);
}

function e_z_real(a,b) {
    return Math.exp(a) * Math.cos(b);
}

function e_z_imag(a,b) {
    return Math.exp(a) * Math.sin(b);
}

function ab_cd_real(a,b,c,d) {
    return Math.pow(a*a + b*b, c/2) * Math.exp(-d*arg(a,b)) * Math.cos(c * arg(a, b) + 0.5 * d * Math.log(a*a + b*b));
}

function ab_cd_imag(a,b,c,d) {
    return Math.pow(a*a + b*b, c/2) * Math.exp(-d*arg(a,b)) * Math.sin(c * arg(a, b) + 0.5 * d * Math.log(a*a + b*b));
}

function magnitude(real, imag) {
    return Math.sqrt(real * real + imag * imag);
}

function fakeMagnitude(real, imag) {
    return (real * real + imag * imag);
}

function hueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1/6) return p + (q - p) * 6 * t;
  if (t < 1/2) return q;
  if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
  return p;
}

function HSLtoRGB(h,s,l) {
  let r = 0;
  let g = 0;
  let b = 0;

  let h_ = (h % 360) / 360;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1. + s) : l + s - l * s;
    const p = 2. * l - q;
    r = hueToRgb(p, q, h_ + 1./3.);
    g = hueToRgb(p, q, h_);
    b = hueToRgb(p, q, h_ - 1./3.);
  }

  return [r,g,b];
}


const gpu = new GPU.GPU();

gpu
.addFunction(magnitude)
.addFunction(fakeMagnitude)
.addFunction(hueToRgb)
.addFunction(HSLtoRGB)
.addFunction(arg)
.addFunction(e_z_real)
.addFunction(e_z_imag)
.addFunction(ab_cd_real)
.addFunction(ab_cd_imag);

const mandelbrotSet = gpu.createKernel(function (a1, b1, a2, b2, t) {
    let y = this.thread.y; let x = this.thread.x;

    let dx = (a2 - a1) / 512;
    let dy = (b2 - b1) / 512;
    
    let real = 0; let imag = 0;

    let c_real = a1 + dx*x;
    let c_imag = b1 + dy*y;
    
    let oldReal = real; let oldImag = imag;
    let newReal = real; let newImag = imag;
    
    let diverged = false;

    let maxMagnitude = 16;

    for (let i = 0; i < t; i++) {
        if (fakeMagnitude(oldReal, oldImag) > maxMagnitude) {
            const colors = HSLtoRGB((180 + 180 * (i / 25)) % 360, 0.35, Math.min((i / 25), 0.75))
            this.color(colors[0], colors[1], colors[2], 1);
            diverged = true;
            break;
            // return [(180 + 180 * (i / 25)) % 360, 0.35, Math.min((i / 25), 0.75), 1];
        } 
        else {
            newReal = ((oldReal * oldReal) - (oldImag * oldImag)) + c_real
            newImag = (2 * oldReal * oldImag) + c_imag    
            
            oldReal = newReal; oldImag = newImag;
        }
    }

    if (!diverged) { this.color(1, 1, 1, 1); }
})
.setGraphical(true)
.setOutput([512, 512]);

const triplebrotSet = gpu.createKernel(function (a1, b1, a2, b2, t) {
    let y = this.thread.y; let x = this.thread.x;

    let dx = (a2 - a1) / 512;
    let dy = (b2 - b1) / 512;
    
    let real = 0; let imag = 0;

    let c_real = a1 + dx*x;
    let c_imag = b1 + dy*y;
    
    let oldReal = real; let oldImag = imag;
    let newReal = real; let newImag = imag;
    
    let diverged = false;

    let maxMagnitude = 16;

    for (let i = 0; i < t; i++) {
        if (fakeMagnitude(oldReal, oldImag) > maxMagnitude) {
            const colors = HSLtoRGB((180 + 180 * (i / 25)) % 360, 0.35, Math.min((i / 25), 0.75))
            this.color(colors[0], colors[1], colors[2], 1);
            diverged = true;
            break;
            // return [(180 + 180 * (i / 25)) % 360, 0.35, Math.min((i / 25), 0.75), 1];
        } 
        else {
            newReal = ((oldReal * oldReal * oldReal) - (3 * oldReal * oldImag * oldImag)) + c_real
            newImag = ((3 * oldReal * oldReal * oldImag) - (oldImag * oldImag * oldImag)) + c_imag
            
            oldReal = newReal; oldImag = newImag;
        }
    }

    if (!diverged) { this.color(1, 1, 1, 1); }
})
.setGraphical(true)
.setOutput([512, 512]);

const tetrabrotSet = gpu.createKernel(function (a1, b1, a2, b2, t) {
    let y = this.thread.y; let x = this.thread.x;

    let dx = (a2 - a1) / 512;
    let dy = (b2 - b1) / 512;
    
    let real = 0; let imag = 0;

    let c_real = a1 + dx*x;
    let c_imag = b1 + dy*y;
    
    let oldReal = real; let oldImag = imag;
    let newReal = real; let newImag = imag;
    
    let diverged = false;

    let maxMagnitude = 16;

    for (let i = 0; i < t; i++) {
        if (fakeMagnitude(oldReal, oldImag) > maxMagnitude) {
            const colors = HSLtoRGB((180 + 180 * (i / 25)) % 360, 0.35, Math.min((i / 25), 0.75))
            this.color(colors[0], colors[1], colors[2], 1);
            diverged = true;
            break;
            // return [(180 + 180 * (i / 25)) % 360, 0.35, Math.min((i / 25), 0.75), 1];
        } 
        else {
            newReal = ((oldReal * oldReal * oldReal * oldReal) - (6 * oldReal * oldReal * oldImag * oldImag) + (oldImag * oldImag * oldImag * oldImag)) + c_real
            newImag = ((4 * oldReal * oldReal * oldReal * oldImag) - (4 * oldReal * oldImag * oldImag * oldImag)) + c_imag

            oldReal = newReal; oldImag = newImag;
        }
    }

    if (!diverged) { this.color(1, 1, 1, 1); }
})
.setGraphical(true)
.setOutput([512, 512]);

const burningShip = gpu.createKernel(function (a1, b1, a2, b2, t) {
    let y = this.thread.y; let x = this.thread.x;

    let dx = (a2 - a1) / 512;
    let dy = (b2 - b1) / 512;
    
    let real = 0; let imag = 0;

    let c_real = a1 + dx*x;
    let c_imag = b1 + dy*y;
    
    let oldReal = real; let oldImag = imag;
    let newReal = real; let newImag = imag;
    
    let diverged = false;

    let maxMagnitude = 16;

    for (let i = 0; i < t; i++) {
        if (fakeMagnitude(oldReal, oldImag) > maxMagnitude) {
            const colors = HSLtoRGB((180 + 180 * (i / 25)) % 360, 0.35, Math.min((i / 25), 0.75))
            this.color(colors[0], colors[1], colors[2], 1);
            diverged = true;
            break;
            // return [(180 + 180 * (i / 25)) % 360, 0.35, Math.min((i / 25), 0.75), 1];
        } 
        else {
            newReal = Math.abs(oldReal); newImag = Math.abs(oldImag);
            oldReal = newReal; oldImag = newImag;
            
            newReal = ((oldReal * oldReal) - (oldImag * oldImag)) + c_real
            newImag = (2 * oldReal * oldImag) + c_imag    
            
            oldReal = newReal; oldImag = newImag;
        }
    }

    if (!diverged) { this.color(1, 1, 1, 1); }
})
.setGraphical(true)
.setOutput([512, 512]);

const tricorn = gpu.createKernel(function (a1, b1, a2, b2, t) {
    let y = this.thread.y; let x = this.thread.x;

    let dx = (a2 - a1) / 512;
    let dy = (b2 - b1) / 512;
    
    let real = 0; let imag = 0;

    let c_real = a1 + dx*x;
    let c_imag = b1 + dy*y;
    
    let oldReal = real; let oldImag = imag;
    let newReal = real; let newImag = imag;
    
    let diverged = false;

    let maxMagnitude = 16;

    for (let i = 0; i < t; i++) {
        if (fakeMagnitude(oldReal, oldImag) > maxMagnitude) {
            const colors = HSLtoRGB((180 + 180 * (i / 25)) % 360, 0.35, Math.min((i / 25), 0.75))
            this.color(colors[0], colors[1], colors[2], 1);
            diverged = true;
            break;
            // return [(180 + 180 * (i / 25)) % 360, 0.35, Math.min((i / 25), 0.75), 1];
        } 
        else {
            newImag = -oldImag; oldImag = newImag;

            newReal = ((oldReal * oldReal) - (oldImag * oldImag)) + c_real
            newImag = (2 * oldReal * oldImag) + c_imag    
            
            oldReal = newReal; oldImag = newImag;
        }
    }

    if (!diverged) { this.color(1, 1, 1, 1); }
})
.setGraphical(true)
.setOutput([512, 512]);

const sawtooth = gpu.createKernel(function (a1, b1, a2, b2, t) {
    let y = this.thread.y; let x = this.thread.x;

    let dx = (a2 - a1) / 512;
    let dy = (b2 - b1) / 512;
    
    let real = 0; let imag = 0;

    let c_real = a1 + dx*x;
    let c_imag = b1 + dy*y;
    
    let oldReal = real; let oldImag = imag;
    let newReal = real; let newImag = imag;
    
    let diverged = false;

    let maxMagnitude = 62500;

    for (let i = 0; i < t; i++) {
        if (fakeMagnitude(oldReal, oldImag) > maxMagnitude) {
            const colors = HSLtoRGB((180 + 180 * (i / 25)) % 360, 0.35, Math.min((i / 25), 0.75))
            this.color(colors[0], colors[1], colors[2], 1);
            diverged = true;
            break;
            // return [(180 + 180 * (i / 25)) % 360, 0.35, Math.min((i / 25), 0.75), 1];
        } 
        else {
            newReal = e_z_real(oldReal, oldImag) + c_real;
            newImag = e_z_imag(oldReal, oldImag) + c_imag;

            oldReal = newReal; oldImag = newImag;
        }
    }

    if (!diverged) { this.color(1, 1, 1, 1); }
})
.setGraphical(true)
.setOutput([512, 512]);

const teardrop = gpu.createKernel(function (a1, b1, a2, b2, t) {
    let y = this.thread.y; let x = this.thread.x;

    let dx = (a2 - a1) / 512;
    let dy = (b2 - b1) / 512;
    
    let real = 0; let imag = 0;

    let c_real = a1 + dx*x;
    let c_imag = b1 + dy*y;
    
    let oldReal = real; let oldImag = imag;
    let newReal = real; let newImag = imag;
    
    let diverged = false;

    let maxMagnitude = 62500;

    for (let i = 0; i < t; i++) {
        if (fakeMagnitude(oldReal, oldImag) > maxMagnitude) {
            const colors = HSLtoRGB((180 + 180 * (i / 25)) % 360, 0.35, Math.min((i / 25), 0.75))
            this.color(colors[0], colors[1], colors[2], 1);
            diverged = true;
            break;
            // return [(180 + 180 * (i / 25)) % 360, 0.35, Math.min((i / 25), 0.75), 1];
        } 
        else {
            newReal = ab_cd_real(oldReal, oldImag, magnitude(oldReal, oldImag), 0) + c_real;
            newImag = ab_cd_imag(oldReal, oldImag, magnitude(oldReal, oldImag), 0) + c_imag;

            oldReal = newReal; oldImag = newImag;
        }
    }

    if (!diverged) { this.color(1, 1, 1, 1); }
})
.setGraphical(true)
.setOutput([512, 512]);

const screamingSoul = gpu.createKernel(function (a1, b1, a2, b2, t) {
    let y = this.thread.y; let x = this.thread.x;

    let dx = (a2 - a1) / 512;
    let dy = (b2 - b1) / 512;
    
    let real = 0; let imag = 0;

    let c_real = a1 + dx*x;
    let c_imag = b1 + dy*y;
    
    let oldReal = real; let oldImag = imag;
    let newReal = real; let newImag = imag;
    
    let diverged = false;

    let maxMagnitude = 62500;

    for (let i = 0; i < t; i++) {
        if (fakeMagnitude(oldReal, oldImag) > maxMagnitude) {
            const colors = HSLtoRGB((180 + 180 * (i / 25)) % 360, 0.35, Math.min((i / 25), 0.75))
            this.color(colors[0], colors[1], colors[2], 1);
            diverged = true;
            break;
            // return [(180 + 180 * (i / 25)) % 360, 0.35, Math.min((i / 25), 0.75), 1];
        } 
        else {
            newReal = Math.abs(oldReal); newImag = Math.abs(oldImag);
            oldReal = newReal; oldImag = newImag;

            newReal = ab_cd_real(oldReal, oldImag, magnitude(oldReal, oldImag), 0) + c_real;
            newImag = ab_cd_imag(oldReal, oldImag, magnitude(oldReal, oldImag), 0) + c_imag;

            oldReal = newReal; oldImag = newImag;
        }
    }

    if (!diverged) { this.color(1, 1, 1, 1); }
})
.setGraphical(true)
.setOutput([512, 512]);