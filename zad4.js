var zad4 = new p5(function (c) {

    c.setup = function () {
        c.createCanvas(512, 512);
        c.background(255);
    };

    var last_x = -1;
    var last_y = -1;

    c.mouseDragged = function () {
        if (c.mouseButton !== c.LEFT)
            return;

        if (last_x > 0) {
            c.line(last_x, last_y, c.mouseX, c.mouseY)
        }

        last_x = c.mouseX;
        last_y = c.mouseY;
    };

    c.mouseReleased = function () {

        last_x = last_y = -1;

        if (c.mouseButton === c.RIGHT) {
            c.loadPixels();
            c.flood_fill(c.mouseX, c.mouseY);
            c.updatePixels();
        }
    };

    c.set_pixel = function (x, y, d) {
        idx = (y * 512 + x) * 4;
        c.pixels[idx] = d;
        c.pixels[idx + 1] = d;
        c.pixels[idx + 2] = d;
        c.pixels[idx + 3] = 255;
    };

    c.get_pixel = function (x, y) {
      idx = (y* 512 + x) * 4;
      return c.pixels[idx];
    };

    c.flood_fill = function (x, y) {
      stos = [];
      stos.push([x, Math.round(y)]);

      while (stos.length > 0) {
          [x, y]  = stos.pop();
          if (x > c.width || x < 0 || y > c.height || y < 0)
              continue;

          if (c.get_pixel(x, y) !== 255)
              continue;

          c.set_pixel(x, y, 75);

          stos.push([x, y -1]);
          stos.push([x, y + 1]);
          stos.push([x - 1, y]);
          stos.push([x + 1, y]);
      }
    };
}, "z4");