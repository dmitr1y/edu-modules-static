var len = 30; // длинна одной грани


function draw_polygon(ctx, x, y, sides, startAngle, anticlockwise, no_lines, radius) {
    if (sides < 3) return;
    if (sides == 3)
        var radius_text = 0.75 * radius;
    else if (sides == 4)
        var radius_text = 0.9 * radius;
    else if (sides > 4)
        var radius_text = 1.1 * radius;
    else
        var radius_text = radius;
    var a = (Math.PI * 2) / sides;
    a = anticlockwise ? -a : a;
    if (no_lines) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
    }
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(startAngle);
    ctx.moveTo(radius, 0);
    var coord_dotes = [];
    coord_dotes[0] = {x: radius, y: 0, n: 0};
    ctx.textBaseline = "middle";
    for (var i = 0; i < sides; i++) {
        if (!no_lines) {
            ctx.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i));
            ctx.font = "14px serif";
            var x1 = (radius_text) * Math.cos(a * (i)) - 5;
            var y1 = (radius_text) * Math.sin(a * (i));
            ctx.fillText(i, x1, y1);
        }
        if (i != 0) {
            coord_dotes[i] = {x: radius * Math.cos(a * i), y: radius * Math.sin(a * i), n: i};
        }
    }
    ctx.closePath();
    ctx.restore();
    ctx.stroke();
    return coord_dotes;
}

function draw_a_line_inside(from, to) {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
}

var base = 0;
function num_pair_brackets(br) {
    var n = 0;
    for (var i = 0; i < br.length; i++) {
        if (br[i] == 1)
            n++;
    }
    return n;
}

ang = 5;
// возвращает i mod g
function mod_ar(i, g) {
    if (i >= 0 && i < g)
        return i;
    else if (i == g) {
        return 0;
    } else if (i < g) {
        return g + i;
    } else if (i > g) {
        return i - Math.floor(i / g) * g;
    }
}
var n;

function draw_triang(br, element, id) {
    var vertex = [];
    /*
     for (var i=0; i<br.length/2 +2; i++){
     vertex[i] = i;
     }*/
    var n = br.length / 2 - 2;
    base = 0;
    var canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 250;
    canvas.height = 250;
    canvas.id = id;
    element.appendChild(canvas);
    vertex = draw_polygon(ctx, 120, 120, br.length / 2 + 2, 0, false, false, 100);
    ctx.save();
    ctx.translate(120, 120);
    draw_triangulated_ntangle(br, vertex.slice());
    ctx.restore();
}
function draw_triangulated_ntangle(br, vertex) {
    ang = vertex.length;
    console.log(vertex);

    if (br == null || br.length == 0 || vertex.length == 3) {
        // треугольник, триангулировать нечего

        return;
    }

    if (closing_bracket(br, 0) == br.length - 1) {
        //закрывающая в конце
        //соединяем две вершины, соседние с базовой

        //console.log(vertex[mod_ar(base-1, ang)], vertex[mod_ar(base+1,ang)], " vertexe connected");
        draw_a_line_inside(vertex[vertex.length - 1], vertex[1]);
        //draw_a_line_inside(vertex[mod_ar(base-1, ang)], vertex[mod_ar(base+1,ang)]);

        vertex1 = vertex.slice();
        vertex1.splice(base, 1);

        n--;
        //base++;
//	console.log(vertex, vertex1);
        draw_triangulated_ntangle(br.slice(1, closing_bracket(br, 0)), vertex1);
        //console.log(vertex, vertex1);
    } else {
        // парная скобка не в конце
        // рисуем отрезок из базовой вершины в вершину базовая+q, где q=числов внутренних пар+2
        var q = num_pair_brackets(br.slice(1, closing_bracket(br, 0))) + 2;
//	console.log(vertex[base], vertex[base+q], " vertexes connected");
        draw_a_line_inside(vertex[base], vertex[base + q]);
//	n--;
        /*if (mod_ar(base+q, ang) == 2){
         console.log("удалена вершина", vertex[base+q-1]);
         vertex.splice(base+q-1, 1);


         }else if(base+q == vertex.length-2){
         console.log("удалена вершина", vertex[base+q+1]);
         vertex.splice(base+q+1,1);
         }*/

        var vertex1 = vertex.slice();
        vertex1 = vertex1.slice(base, q + 1);


        var vertex2 = vertex.slice();

        //console.log(vertex2, q-1);
        console.log(base, q);
        vertex2.splice(base + 1, q - 1);
        console.log(vertex2, "vertex2");
        //console.log(vertex1, vertex2);
        draw_triangulated_ntangle(br.slice(1, closing_bracket(br, 0)), vertex1);


        draw_triangulated_ntangle(br.slice(closing_bracket(br, 0) + 1, br.length), vertex2.slice());
        return;
    }
    return;
}
