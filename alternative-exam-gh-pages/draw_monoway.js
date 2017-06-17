var x = 0, y = 0; // начальные координаты
var len = 50; // длина одной клетки

/* Рисует квадрат в клетку */
function draw_a_square(n) {
    ctx.strokeRect(x, y, len * n, len * n);
    for (var i = 1; i < n; i++) {
        ctx.moveTo(x + i * len, y);
        ctx.lineTo(x + i * len, y + len * n);
    }
    for (var i = 1; i < n; i++) {
        ctx.moveTo(x, y + i * len);
        ctx.lineTo(x + len * n, y + i * len);
    }
    ctx.stroke();
    ctx.save();
    ctx.setLineDash([4, 2]);
    ctx.moveTo(x + len * n, y);
    ctx.lineTo(x, y + len * n);
    ctx.stroke();
    ctx.restore();
}

/* Рисует в квадрате монотонный путь */
function draw_a_monoway(br, ctx) {
    var n = br.length / 2;
    var x = 0, y = len * n;
    draw_a_square(n);
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 4;
    for (var i = 0; i < br.length; i++) {
        ctx.moveTo(x, y);
        if (br[i] == 1) {
            // _
            x = x + len;
            ctx.lineTo(x, y);
        } else {
            y = y - len;
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
    ctx.restore();
}

/* Рисует интерпретацию по скобкам br, в элементе element, присваивает интерпретации id=id*/
function draw_a_monoway_canvas(br, element, id) {
    var canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = len * br.length / 2 + 1;
    canvas.height = len * br.length / 2 + 1;
    canvas.id = id;
    element.appendChild(canvas);
    draw_a_monoway(br, ctx);
}
