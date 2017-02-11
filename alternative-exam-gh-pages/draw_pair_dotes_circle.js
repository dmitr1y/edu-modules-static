/* Ищёт закрывающую скобку для открывающей скобки i в массиве br */
function closing_bracket(br, i) {
    var n = 0;
    for (var j = i + 1; j < br.length; j++) {
        if (br[j] == 1)
            n++;
        else if (br[j] == 0 && n != 0)
            n--;
        else if (n == 0 && br[j] == 0)
            return j;
    }
}

function draw_a_dot(node, data, ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#6600cc";
    ctx.arc(node.x, node.y, radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
    ctx.font = "bold 14px sans";
    ctx.fillStyle = "white";
    if (data > 9)
        ctx.fillText(data, node.x - radius * 0.5 - 4, node.y + radius * 0.5 - 1);
    else
        ctx.fillText(data, node.x - radius * 0.5 + 1, node.y + radius * 0.5 - 1);
    // ctx.fillText(data, node.x-radius*0.5, node.y+radius*0.5);
}

function draw_pair(ctx, first, second) {
    ctx.beginPath();
    ctx.strokeStyle = "#6600cc";
    ctx.lineWidth = 4;
    ctx.moveTo(first.x, first.y);
    ctx.lineTo(second.x, second.y);
    ctx.stroke();
}

function draw_doted_circle(br, ctx) {
    var closing;
    // рисуй круг с точками. Первая точка тип правая
    coord_dotes = draw_polygon(ctx, 120, 120, br.length, 0, false, true, 100);
    ctx.translate(120, 120);
    for (i = 0; i < br.length; i++) {
        if (br[i] == 1) {
            closing = closing_bracket(br, i);
            draw_pair(ctx, coord_dotes[i], coord_dotes[closing]);

        }
        draw_a_dot(coord_dotes[i], i + 1, ctx);
    }
}

function draw_pair_dotes_circle(br, element, id) {
    var canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 250;
    canvas.height = 250;
    canvas.id = id;
    element.appendChild(canvas);
    draw_doted_circle(br, ctx);
}
