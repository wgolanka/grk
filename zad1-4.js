var zad1_4 = new p5(function (c) {
    var imgOriginal;
    var imgI;
    var imgT;
    var imgS;
    var imgR;
    var imgSh;
    var imgMulti1;
    var imgMulti2;
    var imgMulti3;
    var imgMulti4;
    c.setup = function () {
        c.createCanvas(512, 512);
        c.background(255);
        imgOriginal = c.createImage(512, 512);
        imgI = c.createImage(512, 512);
        imgT = c.createImage(512, 512);
        imgS = c.createImage(512, 512);
        imgR = c.createImage(512, 512);
        imgSh = c.createImage(512, 512);
        imgMulti1 = c.createImage(512, 512);
        imgMulti2 = c.createImage(512, 512);
        imgMulti3 = c.createImage(512, 512);
        imgMulti4 = c.createImage(512, 512);

        imgOriginal.loadPixels();
        imgI.loadPixels();
        imgT.loadPixels();
        imgS.loadPixels();
        imgR.loadPixels();
        imgSh.loadPixels();
        imgMulti1.loadPixels();
        imgMulti2.loadPixels();
        imgMulti3.loadPixels();
        imgMulti4.loadPixels();

        var d = c.pixelDensity();
        for (var i = 0; i < 512 * 512 * 4 * d; i += 4) {
            c.changeImagePixelColor(imgOriginal, i, 255, 255, 255, 255);
            c.changeImagePixelColor(imgI, i, 200, 255, 255, 255);
            c.changeImagePixelColor(imgT, i, 255, 200, 255, 255);
            c.changeImagePixelColor(imgS, i, 255, 255, 200, 255);
            c.changeImagePixelColor(imgR, i, 200, 200, 255, 255);
            c.changeImagePixelColor(imgSh, i, 255, 200, 200, 255);

            c.changeImagePixelColor(imgMulti1, i, 200, 255, 200, 255);
            c.changeImagePixelColor(imgMulti2, i, 200, 200, 200, 255);
            c.changeImagePixelColor(imgMulti3, i, 150, 255, 255, 255);
            c.changeImagePixelColor(imgMulti4, i, 255, 150, 255, 255);
        }
        imgOriginal.updatePixels();
        imgI.updatePixels();
        imgT.updatePixels();
        imgS.updatePixels();
        imgR.updatePixels();
        imgSh.updatePixels();
        imgMulti1.updatePixels();
        imgMulti2.updatePixels();
        imgMulti3.updatePixels();
        imgMulti4.updatePixels();
    };
    c.changeImagePixelColor = function (img, i, r, g, b, a) {
        img.pixels[i] = r;
        img.pixels[i + 1] = g;
        img.pixels[i + 2] = b;
        img.pixels[i + 3] = a;
    };

    c.makeVector = function (x, y) {
        return [x, y, 1];
    };
    c.makeIdentity = function () {
        return [[1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]];
    };
    c.makeTransition = function (tx, ty) {
        return [[1, 0, tx],
            [0, 1, ty],
            [0, 0, 1]];
    };
    c.makeScale = function (sx, sy) {
        return [[sx, 0, 0],
            [0, sy, 0],
            [0, 0, 1]];
    };

    c.makeRotate = function (o) {
        _o = Math.PI * (o / 180);
        return [[Math.cos(_o), Math.sin(_o) * -1, 0],
            [Math.sin(_o), Math.cos(_o), 0],
            [0, 0, 1]];
    };

    c.makeShear = function (shx, shy) {
        return [[1, shx, 0],
            [shy, 1, 0],
            [0, 0, 1]];
    };

    c.drawVector = function (img, vec) {
        img.set(vec[0], vec[1], vec[2]);
        img.updatePixels();
    };

    c.matrixByMatrixMultiplication = function (matrix_a, matrix_b) {
        var aRows = matrix_a.length, aCols = matrix_a[0].length,
            bRows = matrix_b.length, bCols = matrix_b[0].length,
            ret = [];
        for (var r = 0; r < aRows; r++) {
            ret[r] = [];
            for (var c = 0; c < bCols; c++) {
                ret[r][c] = 0;
                for (var i = 0; i < aCols; i++) {
                    ret[r][c] += matrix_a[r][i] * matrix_b[i][c];
                }
            }
        }
        return ret;
    };
    c.matrixByVectorMultiplication = function (matrix, vec) {
        var ret = [];
        for (var i = 0; i < matrix.length; i++) {
            ret[i] = 0;
            for (var j = 0; j < matrix[i].length; j++) {
                ret[i] += matrix[i][j] * vec[j];
            }
        }
        return ret;
    };

    var _tx = 70,
        _ty = 55,
        _sx = 1.5,
        _sy = 0.3,
        _r = 30,
        _shx = 1.5,
        _shy = 0;
    c.mouseDragged = function () {
        vector = c.makeVector(c.mouseX, c.mouseY);
        c.drawVector(imgOriginal, vector);

        c.drawVector(imgI, c.matrixByVectorMultiplication(c.makeIdentity(), vector));

        c.drawVector(imgT, c.matrixByVectorMultiplication(c.makeTransition(_tx, _ty), vector));
        c.drawVector(imgS, c.matrixByVectorMultiplication(c.makeScale(_sx, _sy), vector));
        c.drawVector(imgR, c.matrixByVectorMultiplication(c.makeRotate(_r), vector));
        c.drawVector(imgSh, c.matrixByVectorMultiplication(c.makeShear(_shx, _shy), vector));

        multi1 = c.matrixByMatrixMultiplication(c.makeTransition(_tx, _ty), c.makeScale(_sx, _sy));
        multi2 = c.matrixByMatrixMultiplication(c.makeScale(_sx, _sy), c.makeTransition(_tx, _ty));
        multi3 = c.matrixByMatrixMultiplication(c.matrixByMatrixMultiplication(c.makeTransition(_tx, _ty), c.makeScale(_sx, _sy)), c.makeShear(_shx, _shy));
        multi4 = c.matrixByMatrixMultiplication(c.matrixByMatrixMultiplication(c.makeScale(_sx, _sy), c.makeShear(_shx, _shy)), c.makeTransition(_tx, _ty));
        c.drawVector(imgMulti1, c.matrixByVectorMultiplication(multi1, vector));
        c.drawVector(imgMulti2, c.matrixByVectorMultiplication(multi2, vector));
        c.drawVector(imgMulti3, c.matrixByVectorMultiplication(multi3, vector));
        c.drawVector(imgMulti4, c.matrixByVectorMultiplication(multi4, vector));
    };

    c.draw = function () {
        if (c.keyIsDown(49)) {
            c.image(imgI, 0, 0);
            c.text('Identity Matrix', 10, 20);
            return;
        }
        if (c.keyIsDown(50)) {
            c.image(imgT, 0, 0);
            c.text('Transition Matrix (' + _tx + ', ' + _ty + ')', 10, 20);
            return;
        }
        if (c.keyIsDown(51)) {
            c.image(imgS, 0, 0);
            c.text('Scale Matrix (' + _sx + ', ' + _sy + ')', 10, 20);
            return;
        }
        if (c.keyIsDown(52)) {
            c.image(imgR, 0, 0);
            c.text('Rotate Matrix (' + _r + ')', 10, 20);
            return;
        }
        if (c.keyIsDown(53)) {
            c.image(imgSh, 0, 0);
            c.text('Shear Matrix (' + _shx + ', ' + _shy + ')', 10, 20);
            return;
        }
        if (c.keyIsDown(54)) {
            c.image(imgMulti1, 0, 0);
            c.text('Multi 1 - Transition Matrix (' + _tx + ', ' + _ty + ') * Scale Matrix (' + _sx + ', ' + _sy + ')', 10, 20);
            return;
        }
        if (c.keyIsDown(55)) {
            c.image(imgMulti2, 0, 0);
            c.text('Multi 1 - Scale Matrix (' + _sx + ', ' + _sy + ') * Transition Matrix (' + _tx + ', ' + _ty + ')', 10, 20);
            return;
        }
        if (c.keyIsDown(56)) {
            c.image(imgMulti3, 0, 0);
            c.text('Multi 2 - Transition Matrix (' + _tx + ', ' + _ty + ') * Scale Matrix (' + _sx + ', ' + _sy + ') * Shear Matrix (' + _shx + ', ' + _shy + ')', 10, 20);
            return;
        }
        if (c.keyIsDown(57)) {
            c.image(imgMulti4, 0, 0);
            c.text('Multi 2 - Scale Matrix (' + _sx + ', ' + _sy + ') * Shear Matrix (' + _shx + ', ' + _shy + ') * Transition Matrix (' + _tx + ', ' + _ty + ')', 10, 20);
            return;
        }

        c.image(imgOriginal, 0, 0);
        c.text('Original Image', 10, 20);
    }
}, 'z1-4');