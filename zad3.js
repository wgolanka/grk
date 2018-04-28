var zad1 = new p5(function (c) {

    c.setup = function () {
        c.createCanvas(512, 512);
        c.background(255);
    };

    var x0 = -1;
    var y0 = -1;
    var x1 = -1;
    var y1 = -1;

    c.mouseInCanvas = function (mX, mY) {
        return (c.width >= mX && c.height >= mY) && (mX >= 0 && mY >= 0);
    };

    c.mousePressed = function () {
        if (c.mouseInCanvas(c.mouseX, c.mouseY)) {
            x0 = c.mouseX;
            y0 = c.mouseY;
        }
    };

    c.mouseDragged = function () {
        if (c.mouseInCanvas(c.mouseX, c.mouseY)) {
            x1 = c.mouseX;
            y1 = c.mouseY;
            c.background(255);
            c.noStroke();
            c.fill('red');
            c.ellipse(x0 - 3, y0 - 3, 6);
            c.fill('green');
            c.ellipse(x1 - 3, y1 - 3, 6);
        }
    };

    c.mouseReleased = function () {
        c.background(255);
        c.loadPixels();
        c.draw_line();
        c.updatePixels();
    };

    c.set_pixel = function (x, y, d) {
        idx = (y * 512 + x) * 4;
        c.pixels[idx] = d;
        c.pixels[idx + 1] = d;
        c.pixels[idx + 2] = d;
        c.pixels[idx + 3] = 255;
    };

    c.draw_line = function () {
        var dx = x1 - x0;
        var dy = y1 - y0;

        var Dp = 2 * dy - dx;
        var Deq = 2 * dy;
        var Dinc = 2 * (dy - dx);

        D = Dp;
        y = y0;

        for (x = x0; x <= x1; x++) {

            if (D < 0) {
                D += Deq;
            } else {
                D += Dinc;
                y += 1;
            }
            c.set_pixel(Math.round(x), Math.round(y), D);
        }
    };
}, "z3");