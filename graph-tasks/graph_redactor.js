var array_of_models;


class GRAPH {

    constructor(_obj) {
        if (_obj == undefined) {
            this.n = 0;
            this.a = [];
            this.point = [];
            this.or = 0;
        }
        else {
            this.n = _obj.n;
            this.a = [];
            this.point = [];

            for (var i = 0; i < this.n; i++) {
                this.point[i] = _obj.point[i];
                this.a[i] = _obj.a[i];
                for (var r = 0; r < this.n; r++) {
                    this.a[i][r] = _obj.a[i][r];
                }
            }

            this.or = _obj.or;
        }
    };

    add_point(_pos) {
        for (var i = 0; i < this.n; i++)
            this.a[i][this.n] = undefined;
        this.a[this.n] = [];
        for (var i = 0; i <= this.n; i++)
            this.a[this.n][i] = undefined;

        this.point[this.n] = _pos;
        this.point[this.n].c = 0;

        this.n++;

    }

    del_point(_i) {
        for (var i = 0; i < this.n; i++)
            this.a[i][_i] = this.a[i][this.n - 1];
        this.a[_i] = this.a[this.n - 1];
        this.point[_i] = this.point[this.n - 1];
        this.n--;

    }

    add_edge(_p1, _p2) {
        this.a[_p1][_p2] = {c: 0};
        if (this.or == 0)
            this.a[_p2][_p1] = {c: 0};
    }

    del_edge(_p1, _p2) {
        this.a[_p1][_p2] = undefined;
        if (this.or == 0)
            this.a[_p2][_p1] = undefined;
    }

}


function draw_rotated_text(text, x, y, angle) {
    this.save();

    this.translate(x, y);

    this.rotate(angle / 180 * Math.PI);

    //this.drawImage(image, -(image.width/2), -(image.height/2));
    let x1 = this.measureText(text).width + 10;
    let y1 = 14;

    this.clearRect(-x1 / 2, -y1 / 2, x1, y1);

    this.textBaseline = "middle";
    this.textAlign = "center";

    this.fillText(text, 0, 0);


    this.restore();
}


function draw_rotated_text_pos(text, x, y, angle) {
    let x1 = this.measureText(text).width + 10;
    let y1 = 14;

    return {x: x, y: y, r: Math.sqrt(x1 * x1 / 4 + y1 * y1 / 4) + 1}
}


function guist(_id, _action, j_args) {

    /*
     var selected_tool=0;
     var pressed_button=-1;
     var selected_button=0;

     var selected_point=-1;

     var graph;

     var cid;
     var cursor={x:0,y:0,l_up:0,l_down:0,ch:0};

     var img_buttons;

     var razokx,razoky;
     */

    var timer;


    function handle(e) {
        //if (form.elements[e.type + 'Ignore'].checked) return;

        if (e.type == 'keydown') {
            var ch = String.fromCharCode(e.keyCode);
            if (ch >= 'A' && ch <= 'Z' || ch >= '0' && ch <= '9') {
                let arrid;
                for (let i = 0; i < array_of_models.length; i++)
                    if (array_of_models[i].cid == this.id) {
                        arrid = i;
                    }

                array_of_models[arrid].keys[ch.charCodeAt(0)] = 1;
                array_of_models[arrid].is_need_draw = 1;

                //alert(JSON.stringify(array_of_models[arrid].keys));
                //upd.call(array_of_models[arrid]);
            }
        }
    }


    function get_gr() {
        let razoky = document.getElementById(this.cid).height;
        let razokx = document.getElementById(this.cid).width;

        let graph = this.graph;
        for (let i = 0; i < graph.point.length; i++) {
            graph.point[i].x /= razokx;
            graph.point[i].y /= razoky;
        }
        let res = JSON.stringify(graph);
        for (let i = 0; i < graph.point.length; i++) {
            graph.point[i].x *= razokx;
            graph.point[i].y *= razoky;
        }
        return res;
    }

    function set_gr(_graph) {
        let razoky = document.getElementById(this.cid).height;
        let razokx = document.getElementById(this.cid).width;

        this.graph = new GRAPH(JSON.parse(_graph));
        let graph = this.graph;
        for (let i = 0; i < graph.point.length; i++) {
            graph.point[i].x *= razokx;
            graph.point[i].y *= razoky;
        }
    }


    function on_move(e) {
        var cv = document.getElementById(this.id);
        var cx = document.getElementById(this.id).getContext("2d");

        let arrid = 0;

        for (let i = 0; i < array_of_models.length; i++)
            if (array_of_models[i].cid == this.id) {
                arrid = i;
            }

        array_of_models[arrid].cursor.x = e.pageX - cv.offsetLeft;
        array_of_models[arrid].cursor.y = e.pageY - cv.offsetTop;

        array_of_models[arrid].is_need_draw = 1;

        //cx.beginPath();
        //cx.arc(array_of_models[arrid].cursor.x, array_of_models[arrid].cursor.y, 2, 0, 2 * Math.PI);
        //cx.stroke();


        //upd.call(array_of_models[arrid]);
    }

    function on_m_down(e) {
        let arrid = 0;


        var cv = document.getElementById(this.id);
        var cx = document.getElementById(this.id).getContext("2d");

        for (let i = 0; i < array_of_models.length; i++)
            if (array_of_models[i].cid == this.id) {
                arrid = i;
            }

        array_of_models[arrid].cursor.x = e.pageX - cv.offsetLeft;
        array_of_models[arrid].cursor.y = e.pageY - cv.offsetTop;
        array_of_models[arrid].cursor.l_down = 1;
        array_of_models[arrid].cursor.ch = 1;


        cx.beginPath();
        cx.arc(array_of_models[arrid].cursor.x, array_of_models[arrid].cursor.y, 2, 0, 2 * Math.PI);
        cx.stroke();
        array_of_models[arrid].is_need_draw = 1;

        //upd.call(array_of_models[arrid]);
    }


    function on_m_up(e) {
        var cv = document.getElementById(this.id);
        var cx = document.getElementById(this.id).getContext("2d");

        let arrid;
        for (let i = 0; i < array_of_models.length; i++)
            if (array_of_models[i].cid == this.id) {
                arrid = i;
            }


        array_of_models[arrid].cursor.x = e.pageX - cv.offsetLeft;
        array_of_models[arrid].cursor.y = e.pageY - cv.offsetTop;
        array_of_models[arrid].cursor.l_up = 1;
        array_of_models[arrid].cursor.ch = 0;
        cx.beginPath();
        cx.arc(array_of_models[arrid].cursor.x, array_of_models[arrid].cursor.y, 2, 0, 2 * Math.PI);
        cx.stroke();
        array_of_models[arrid].is_need_draw = 1;

        //upd.call(array_of_models[arrid]);
    }

    function add_point(_pos) {
        let graph = this.graph;

        graph.add_point(_pos);
    }

    function del_point(_pos) {
        let graph = this.graph;
        let main_settings = this.main_settings;

        for (var i = graph.n - 1; i >= 0; i--) {
            if ((_pos.x - graph.point[i].x) * (_pos.x - graph.point[i].x) + (_pos.y - graph.point[i].y) * (_pos.y - graph.point[i].y) < main_settings.vertex_size * main_settings.vertex_size) {
                graph.del_point(i);
            }
        }
    }

    function get_near_point(_pos) {
        let graph = this.graph;

        var res = -1;
        var ras = 100 * 100;


        for (var i = 0; i < graph.n; i++)
            if (ras > (_pos.x - graph.point[i].x) * (_pos.x - graph.point[i].x) + (_pos.y - graph.point[i].y) * (_pos.y - graph.point[i].y)) {
                res = i;
                ras = (_pos.x - graph.point[i].x) * (_pos.x - graph.point[i].x) + (_pos.y - graph.point[i].y) * (_pos.y - graph.point[i].y);
            }

        return res;
    }

    function set_edge(_i1, _i2) {
        let graph = this.graph;

        if (_i1 == _i2)
            return;

        if (graph.a[_i1][_i2] != undefined) {
            graph.del_edge(_i1, _i2);
        }
        else {
            graph.add_edge(_i1, _i2);
        }
    }

    function add_edge(_i1, _i2) {
        if (_i1 == _i2)
            return;
        let graph = this.graph;

        graph.add_edge(_i1, _i2);
    }

    function del_edge(_i1, _i2) {
        if (_i1 == _i2)
            return;
        let graph = this.graph;

        graph.del_edge(_i1, _i2);
    }

    function dd(c, d) {
        var x, y;
        x = Math.cos(c / 180.0 * Math.PI) * d;
        y = Math.sin(c / 180.0 * Math.PI) * d;
        return {x: x, y: y};
    }

    function ss(x1, y1, x2, y2) {
        var u;

        if (x1 - x2 == 0) {
            x1 = x1 + 0.0003;
        }
        ;
        u = Math.atan((y1 - y2) / (x1 - x2)) * 180 / Math.PI;
        if (x2 - x1 > 0) {
            u = u + 180;
        }
        ;

        return u;
    }

    function ras(x, y) {
        return Math.sqrt(x * x + y * y);
    }

    function can_add_node(_pos) {
        let graph = this.graph;
        let main_settings = this.main_settings;

        var can_place = 1;
        for (var i = 0 + 0; i < graph.n && can_place == 1; i++)
            for (var r = i + 1; r < graph.n && can_place == 1; r++)
                if (graph.a[i][r] != undefined) {
                    var px;
                    var py;
                    px = graph.point[i].x;
                    py = graph.point[i].y;

                    var l = ras(px - graph.point[r].x, py - graph.point[r].y);

                    var u = ss(px, py, graph.point[r].x, graph.point[r].y);

                    var l1 = ras(px - _pos.x, py - _pos.y);

                    var u1 = ss(px, py, _pos.x, _pos.y);

                    var new_pos = dd(u1 - u, l1);

                    if (new_pos.x > 0)
                        if (new_pos.y > -main_settings.vertex_size)
                            if (new_pos.x < l)
                                if (new_pos.y < main_settings.vertex_size) {
                                    can_place = 0;
                                }
                }
        return can_place;
    }

    function min(a, b) {
        if (a > b)
            return b;
        return a;
    }

    function get_near_edge(_pos) {
        let graph = this.graph;
        let min_r = 30 * 30;

        let res = undefined;

        var can_place = 1;
        for (let i = 0 + 0; i < graph.n && can_place == 1; i++)
            for (let r = i + 1; r < graph.n && can_place == 1; r++)
                if (graph.a[i][r] != undefined) {
                    let curr = min(ras(graph.point[i].x - _pos.x, graph.point[i].y - _pos.y), ras(graph.point[r].x - _pos.x, graph.point[r].y - _pos.y));


                    var px;
                    var py;
                    px = graph.point[i].x;
                    py = graph.point[i].y;

                    var l = ras(px - graph.point[r].x, py - graph.point[r].y);

                    var u = ss(px, py, graph.point[r].x, graph.point[r].y);

                    var l1 = ras(px - _pos.x, py - _pos.y);

                    var u1 = ss(px, py, _pos.x, _pos.y);

                    var new_pos = dd(u1 - u, l1);

                    if (new_pos.x > 0)
                        if (new_pos.x < l)
                            curr = Math.min(Math.abs(new_pos.y), curr);

                    if (curr < min_r) {
                        res = {i: i, r: r};
                        min_r = curr;
                    }


                }


        return res;
    }

    function can_add_edge(_i1, _i2) {
        let graph = this.graph;
        let main_settings = this.main_settings;

        var can_place = 1;
        for (var i = 0 + 0; i < graph.n && can_place == 1; i++)
            if (i != _i1 && i != _i2) {
                var px;
                var py;
                var pos = graph.point[i];
                px = graph.point[_i1].x;
                py = graph.point[_i1].y;

                var l = ras(px - graph.point[_i2].x, py - graph.point[_i2].y);

                var u = ss(px, py, graph.point[_i2].x, graph.point[_i2].y);

                var l1 = ras(px - pos.x, py - pos.y);

                var u1 = ss(px, py, pos.x, pos.y);
                //document.getElementById("logs").innerHTML ="";
                //document.getElementById("logs").innerHTML = document.getElementById("logs").innerHTML+"<br>"+JSON.stringify({l:l,u:u,l1:l1,u1:u1});

                var new_pos = dd(u1 - u, l1);

                //document.getElementById("logs").innerHTML = document.getElementById("logs").innerHTML+"<br>"+JSON.stringify(new_pos);

                if (new_pos.x > 0)
                    if (new_pos.y > -main_settings.vertex_size)
                        if (new_pos.x < l)
                            if (new_pos.y < main_settings.vertex_size) {
                                can_place = 0;
                            }
            }
        return can_place;
    }

    function upd() {

        if (this.is_drawing_now == 1)
            return;
        if (this.is_need_draw == 0)
            return;

        this.is_need_draw = 0;

        this.is_drawing_now = 1;
        //document.getElementById("logs").innerHTML = document.getElementById("logs").innerHTML+"<br>"+"1 upd";

        var cx = document.getElementById(this.cid).getContext("2d");

        //alert(this.cid);
        //return;

        //PROC

        let pressed_button = this.pressed_button;
        let selected_button = this.selected_button;
        let selected_tool = this.selected_tool;
        let selected_point = this.selected_point;


        let razoky = document.getElementById(this.cid).height;
        let razokx = document.getElementById(this.cid).width;

        let cursor = this.cursor;
        let keys = this.keys;
        let main_settings = this.main_settings;
        let img_buttons = this.img_buttons;
        let graph = this.graph;
        let cid = this.cid;

        //alert(JSON.stringify(main_settings));

        pressed_button = -1;

        if (cursor.y >= razoky - 34) {
            //alert("you clicked gui");
            for (var i = 0; i < main_settings.button.length; i++)
                if (cursor.x <= 3 + i * 34 + 32)
                    if (cursor.x >= 3 + i * 34)
                        if (cursor.y <= razoky - 34 + 32)
                            if (cursor.y >= razoky - 34) {
                                if (cursor.l_up == 1) {
                                    selected_tool = main_settings.button[i];//alert(selected_tool);
                                    selected_button = i;
                                    selected_point = -1;
                                }
                                if (cursor.ch == 1) {
                                    pressed_button = i;
                                }
                            }
        }
        else if (cursor.l_down == 1) {
            if (selected_tool == 0) {
                var n_p = get_near_point.call(this, {x: cursor.x, y: cursor.y});
                var is_add = 0;

                if (n_p != -1) {
                    if ((graph.point[n_p].x - cursor.x) * (graph.point[n_p].x - cursor.x) + (graph.point[n_p].y - cursor.y) * (graph.point[n_p].y - cursor.y) > 30 * 30)
                        is_add = 1;
                }
                else {
                    is_add = 1;
                }
                if (cursor.x < 15)
                    is_add = 0;
                if (cursor.y < 15)
                    is_add = 0;
                if (cursor.x > razokx - 15)
                    is_add = 0;
                if (cursor.y > razoky - 32 - 15)
                    is_add = 0;

                if (is_add == 1)
                    if (can_add_node.call(this, {x: cursor.x, y: cursor.y})) {
                        add_point.call(this, {x: cursor.x, y: cursor.y});
                    }
            }

            if (selected_tool == 1) {
                //is_planar(graph);
                del_point.call(this, {x: cursor.x, y: cursor.y});
                //get_gr();
            }

            if (selected_tool == 2) {
                if (selected_point == -1) {
                    selected_point = get_near_point.call(this, {x: cursor.x, y: cursor.y});
                }
                else {
                    graph.point[selected_point].x = cursor.x;
                    graph.point[selected_point].y = cursor.y;

                    selected_point = -1;
                }
            }

            if (selected_tool == 3) {
                if (selected_point == -1) {
                    selected_point = get_near_point.call(this, {x: cursor.x, y: cursor.y});
                }
                else {
                    var np = get_near_point.call(this, {x: cursor.x, y: cursor.y});
                    if (np != -1)
                        if (!can_add_edge.call(this, selected_point, np))
                            np = -1;
                    if (np != -1) {
                        add_edge.call(this, selected_point, np);
                        selected_point = -1;
                    }
                }
            }


            if (selected_tool == 4) {
                if (selected_point == -1) {
                    selected_point = get_near_point.call(this, {x: cursor.x, y: cursor.y});
                }
                else {
                    var np = get_near_point.call(this, {x: cursor.x, y: cursor.y});
                    if (np != -1) {
                        del_edge.call(this, selected_point, np);
                        selected_point = -1;
                    }
                }
            }


            if (selected_tool == 5) {
                if (selected_point == -1) {
                    selected_point = get_near_point.call(this, {x: cursor.x, y: cursor.y});
                }
                else {
                    var np = get_near_point.call(this, {x: cursor.x, y: cursor.y});
                    if (np != -1)
                        if (!can_add_edge.call(this, selected_point, np))
                            np = -1;
                    if (np != -1) {
                        set_edge.call(this, selected_point, np);
                        selected_point = -1;
                    }
                }
            }

            if (selected_tool == 6) {
                let n_p = get_near_point.call(this, {x: cursor.x, y: cursor.y});

                if (n_p != -1) {
                    graph.point[n_p].c = (graph.point[n_p].c + 1) % 7;
                }

            }

            if (selected_tool == 7) {
                //is_planar(graph);
                let edges = get_near_edge.call(this, {x: cursor.x, y: cursor.y});


                if (edges != undefined) {
                    graph.a[edges.i][edges.r].c = (graph.a[edges.i][edges.r].c + 1) % 7;
                    if (graph.a[edges.r][edges.i] != undefined)
                        graph.a[edges.r][edges.i].c = (graph.a[edges.r][edges.i].c + 1) % 7;

                }
            }

            if (selected_tool == 8) {
                if (selected_point == -1)
                    selected_point = get_near_point.call(this, {x: cursor.x, y: cursor.y});
            }
        }

        let setkey = -1;
        for (let i = 0; i < 256; i++)
            if (keys[i] == 1) {

                setkey = String.fromCharCode(i);

                if (selected_tool == 8)
                    if (selected_point != -1) {
                        graph.point[selected_point].n = setkey;
                        selected_point = -1;
                    }

            }

        for (let i = 0; i < 256; i++)
            keys[i] = 0;

        cursor.l_down = 0;
        cursor.l_up = 0;


        //DRAWS

        cx.clearRect(0, 0, razokx, razoky);

        if (selected_tool == 2)
            if (selected_point != -1) {
                //alert("ok");
                let i = selected_point;
                cx.beginPath();
                cx.arc(graph.point[i].x, graph.point[i].y, main_settings.vertex_size * 1.4, 0, 2 * Math.PI);
                cx.closePath();
                cx.fillStyle = "#3A3";
                cx.fill();

            }

        if (selected_tool == 5 || selected_tool == 4 || selected_tool == 3)
            if (selected_point != -1) {
                cx.beginPath();
                cx.arc(graph.point[selected_point].x, graph.point[selected_point].y, 8, 0, 7);
                cx.stroke();

                cx.beginPath();
                cx.moveTo(graph.point[selected_point].x, graph.point[selected_point].y);
                cx.lineTo(cursor.x, cursor.y);
                cx.stroke();
            }

        cx.strokeRect(0, 0, razokx, razoky);
        for (var i = 0; i < main_settings.button.length; i++) {
            if (i == selected_button) {
                //cx.strokeRect(5+i*34,razoky-32,28,28);
            }
            //cx.strokeRect(3+i*34,razoky-34,32,32);
            let r = 0;

            if (i == selected_button)
                r = 2;

            if (pressed_button == i)
                r = 1;


            cx.drawImage(img_buttons, 0 + main_settings.button[i] * 32, 0 + r * 32, 32, 32, 3 + i * 34, razoky - 34, 32, 32);


        }

        cx.beginPath();
        cx.moveTo(0, razoky - 36);
        cx.lineTo(razokx, razoky - 36);
        cx.stroke();


        for (var i = 0; i < graph.n; i++)
            for (var r = 0; r < graph.n; r++)
                if (graph.a[i][r] != undefined) {
                    if (i < r || graph.a[r][i] == undefined) {
                        let pos;
                        let u;

                        u = ss(graph.point[i].x, graph.point[i].y, graph.point[r].x, graph.point[r].y);
                        pos = dd(u + 90, 2);

                        cx.strokeStyle = "rgbа(0, 0, 0, 0)";

                        cx.beginPath();
                        cx.moveTo(graph.point[i].x + pos.x, graph.point[i].y + pos.y);
                        cx.lineTo(graph.point[i].x - pos.x, graph.point[i].y - pos.y);
                        cx.lineTo(graph.point[r].x - pos.x, graph.point[r].y - pos.y);
                        cx.lineTo(graph.point[r].x + pos.x, graph.point[r].y + pos.y);
                        cx.closePath();

                        if (graph.a[r][i].c >= 0)
                            cx.fillStyle = color_num[graph.a[r][i].c];
                        else
                            cx.fillStyle = "#777";
                        cx.fill();

                        if (i == r) {
                            cx.beginPath();
                            cx.arc(graph.point[i].x + 20, graph.point[i].y, 20, 0, 7);
                            cx.stroke();
                        }
                    }
                }

        let posarray = [];

        for (var i = 0; i < graph.n; i++)
            for (var r = 0; r < graph.n; r++)
                if (i < r)
                    if (graph.a[i][r] != undefined)
                        if (graph.a[i][r].n != undefined) {
                            let u = ss(graph.point[i].x, graph.point[i].y, graph.point[r].x, graph.point[r].y);
                            if (u > 90 && u < 270)
                                u -= 180;
                            if (u > 180)
                                u -= 360;

                            if (u > 70)
                                u -= 90;
                            if (u < -70)
                                u += 90;

                            //outputToLog(JSON.stringify(posarray));

                            let k;
                            k = 0.5;
                            let pos = draw_rotated_text_pos.call(cx, graph.a[i][r].n, (graph.point[i].x * k + graph.point[r].x * (1 - k)), (graph.point[i].y * k + graph.point[r].y * (1 - k)), 0);
                            for (let o = 0; o < posarray.length; o++) {
                                //outputToLog(JSON.stringify(pos)+" "+JSON.stringify(posarray[o])+
                                //	"  rasr:"+((pos.x-posarray[o].x)*(pos.x-posarray[o].x)+(pos.y-posarray[o].y)*(pos.y-posarray[i].y))+
                                //	"  rasmin:"+((pos.r+posarray[o].r)*(pos.r+posarray[o].r))+"  pos:");
                                if ((pos.x - posarray[o].x) * (pos.x - posarray[o].x) + (pos.y - posarray[o].y) * (pos.y - posarray[o].y) < (pos.r + posarray[o].r) * (pos.r + posarray[o].r)) {
                                    //alert(k+" : "+o+" :r "+(pos.r)+"  rp:"+posarray[o].r );
                                    if (k < 0.5)
                                        k = 1 - k;
                                    else
                                        k = 1 - k - 0.05;


                                    pos = draw_rotated_text_pos.call(cx, graph.a[i][r].n, (graph.point[i].x * k + graph.point[r].x * (1 - k)), (graph.point[i].y * k + graph.point[r].y * (1 - k)), 0);
                                    o = -1;

                                    if (k > 0.85) {
                                        //alert("!!!!!!!!!!!!!!!!!!!!!!");
                                        k = 0.5;
                                        o = posarray.length;
                                        k = 0;
                                        pos = draw_rotated_text_pos.call(cx, graph.a[i][r].n, (graph.point[i].x * k + graph.point[r].x * (1 - k)), (graph.point[i].y * k + graph.point[r].y * (1 - k)), 0);
                                    }
                                }

                            }
                            //alert(k);
                            posarray.push(pos);

                            cx.fillStyle = "#000";
                            if (graph.a[i][r].n != undefined)
                                draw_rotated_text.call(cx, graph.a[i][r].n, pos.x, pos.y, 0);
                            //draw_rotated_text.call(cx,"12345",graph.point[i].x/2+graph.point[r].x/2,graph.point[i].y/2+graph.point[r].y/2,u);


                        }


        for (var i = 0; i < graph.n; i++) {
            cx.beginPath();
            cx.arc(graph.point[i].x, graph.point[i].y, main_settings.vertex_size, 0, 2 * Math.PI);
            cx.closePath();
            cx.fillStyle = color_num[graph.point[i].c];
            cx.fill();

            cx.textBaseline = "middle";
            cx.textAlign = "center";
            cx.fillStyle = "#FFF";
            if (graph.point[i].n)
                cx.fillText("(" + i + ")" + graph.point[i].n, graph.point[i].x, graph.point[i].y);
            else
                cx.fillText("(" + i + ")", graph.point[i].x, graph.point[i].y);

        }

        if (selected_tool == 8)
            if (selected_point != -1) {
                cx.clearRect(razokx / 2 - 200, razoky / 2 - 10, 400, 20);
                cx.strokeStyle = "rgbа(0, 0, 0, 0)";
                cx.strokeRect(razokx / 2 - 200, razoky / 2 - 10, 400, 20);

                cx.textBaseline = "middle";
                cx.textAlign = "center";
                cx.fillStyle = "#000";
                cx.fillText("Нажмите букву или цифру для наименования вершины.", razokx / 2, razoky / 2);
            }

        this.pressed_button = pressed_button;
        this.selected_button = selected_button;
        this.selected_tool = selected_tool;
        this.selected_point = selected_point;
        this.is_drawing_now = 0;
        //document.getElementById("logs").innerHTML = document.getElementById("logs").innerHTML+"<br>"+"0 upd";

    }


    if (array_of_models == undefined) {
        //alert(JSON.stringify(array_of_models));
        array_of_models = [];
    }

    var timer = setInterval(run_upd, 100);

    var color_num = [
        "#000000",
        "#FF0000",
        "#00FF00",
        "#0000FF",
        "#FFFF00",
        "#FF00FF",
        "#00FFFF"
    ];


    function run_upd() {
        for (let i = 0; i < array_of_models.length; i++) {
            upd.call(array_of_models[i]);
        }
    }


    if (_action == "set") {

        let arrid = -1;

        for (let i = 0; i < array_of_models.length; i++)
            if (array_of_models[i].cid == _id) {
                arrid = i;
            }

        if (arrid != -1) {
            //alert("set ok");
            array_of_models[arrid].is_need_draw = 1;
            set_gr.call(array_of_models[arrid], j_args);

        }
    }

    if (_action == "get") {

        //alert(JSON.stringify(array_of_models));

        let arrid = -1;

        for (let i = 0; i < array_of_models.length; i++)
            if (array_of_models[i].cid == _id) {
                arrid = i;
            }

        if (arrid != -1) {
            //alert(get_gr.call(array_of_models[arrid]));
            return get_gr.call(array_of_models[arrid]);
        }
    }

    if (_action == "del") {

        //alert(JSON.stringify(array_of_models));

        let arrid = -1;

        for (let i = 0; i < array_of_models.length; i++)
            if (array_of_models[i].cid == _id) {
                arrid = i;
            }

        if (arrid != -1) {
            array_of_models.splice(arrid, 1);
        }
    }

    if (_action == "init") {


        let arrid = array_of_models.length;
        array_of_models[arrid] = {};


        let args = JSON.parse(j_args);

        if (args.is_orient == undefined)
            args.is_orient = 0;
        if (args.gui_buttons == undefined)
            args.gui_buttons = [0, 1, 2];

        array_of_models[arrid].img_buttons = new Image();

        array_of_models[arrid].img_buttons.src = 'icons.png';

        //alert("id:"+_id);
        array_of_models[arrid].cid = _id;


        array_of_models[arrid].selected_tool = args.gui_buttons[0];
        array_of_models[arrid].pressed_button = -1;
        array_of_models[arrid].selected_button = 0;

        array_of_models[arrid].selected_point = -1;
        array_of_models[arrid].is_drawing_now = 0;
        array_of_models[arrid].is_need_draw = 1;

        //alert("1:"+graph);
        array_of_models[arrid].graph = new GRAPH();
        //alert("2:"+graph);


        array_of_models[arrid].cursor = {x: 0, y: 0, l_up: 0, l_down: 0, ch: 0};
        array_of_models[arrid].keys = [];


        array_of_models[arrid].main_settings =
            {
                button: args.gui_buttons,
                vertex_size: document.getElementById(_id).height / 40
            };


        document.getElementById(_id).onmousedown = on_m_down;
        document.getElementById(_id).onmouseup = on_m_up;
        document.getElementById(_id).onmousemove = on_move;
        document.getElementById(_id).addEventListener('keydown', handle, true);

    }

}


//guist('g85n73u86',JSON.stringify({is_orient:1, gui_buttons:[0,1,2,2,1,0]}));
/*
 define(function()
 {return {

 init: guist

 };});

 */