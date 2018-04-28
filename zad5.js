var zad5 = new p5(function (c) {

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
        idx = (y * c.width + x) * 4;
        c.pixels[idx] = d;
        c.pixels[idx + 1] = d;
        c.pixels[idx + 2] = d;
        c.pixels[idx + 3] = 255;
    };

    c.swapVals = function (x, y) {
        return [y, x];
    };

    c.draw_line = function () {
        var swap = 0;
        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);

        if (dx < dy) {
            [x0, y0] = c.swapVals(x0, y0);
            [x1, y1] = c.swapVals(x1, y1);
            [dx, dy] = c.swapVals(dx, dy);
            swap = 1;
        }

        var Dp = 2 * dy - dx;
        var Deq = 2 * dy;
        var Dinc = 2 * (dy - dx);

        var D = Dp;
        var _y = y0;

        for (var xx = 0; xx <= dx; xx++) {
            var _x = (x0 < x1) ? x0 + xx : x0 - xx;

            if (!swap)
                c.set_pixel(_x, _y, 0);
            else
                c.set_pixel(_y, _x, 0);

            if (D < 0) {
                D += Deq;
            } else {
                D += Dinc;
                if (y0 < y1) {
                    _y++;
                } else {
                    _y--;
                }
            }
        }

        if (swap) {
            [x0, y0] = c.swapVals(x0, y0);
            [x1, y1] = c.swapVals(x1, y1);
            [dx, dy] = c.swapVals(dx, dy);
        }
    };
}, "z5");