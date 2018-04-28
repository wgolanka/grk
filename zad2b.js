var zad2b = new p5(function (c) {

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
            c.ellipse(x0, y0, 1);
            c.fill('green');
            c.ellipse(x1, y1, 1);
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
        c.pixels[idx] = -d;
        c.pixels[idx + 1] = d;
        c.pixels[idx + 2] = 0;
        c.pixels[idx + 3] = 255;
    };

    c.draw_line = function () {

        dx = x1 - x0;
        dy = y1 - y0;

        var a = dy / dx;

        for (x = 0; x < c.width; x++) {
            for (y = 0; y < c.height; y++) {
                D = a * (x - x0) - (y - y0);
                D1 = D * 2 * dx;
                c.set_pixel(x, y, D1);
            }
        }
    };
}, "z2b");