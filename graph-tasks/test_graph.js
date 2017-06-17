/*

 {"n":4,"a":[[null,{"c":0},{"c":0},{"c":0}],[{"c":0},null,{"c":0},{"c":0}],[{"c":0},{"c":0},null,{"c":0}],[{"c":0},{"c":0},{"c":0},null]],"point":[{"x":0.5979166666666667,"y":0.359375,"c":0},{"x":0.4354166666666667,"y":0.340625,"c":0},{"x":0.5083333333333333,"y":0.6625,"c":0},{"x":0.6729166666666667,"y":0.534375,"c":0}],"or":0}

 is_full
 is_tree

 */
function sleep(milliseconds) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start <= milliseconds) {
    }
}

function getrir(min, max) {
    return Math.floor(Math.random() * (max - min + 1 - 0.0001)) + min;
}

function gen_dvud(_n, _count) {
    let gr = new GRAPH();

    let x;
    let y;

    for (let o = 0; o < _n; o++) {
        x = Math.sin(o * 360 / 180.0 * 3.1415926 / _n) * 0.3 + 0.5;
        y = Math.cos(o * 360 / 180.0 * 3.1415926 / _n) * 0.4 + 0.45;
        gr.add_point({x: x, y: y});
    }

    let a = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];

    a[0][0] = 1;

    let j;
    j = 0;
    while (j <= _count) {
        let i;
        let r;
        i = getrir(0, _n - 1);
        r = getrir(0, _n - 1);

        if (i != r)
            if (gr.a[i][r] == null) {
                gr.add_edge(i, r);
                if (!test_dvudolnost(gr)) {
                    gr.del_edge(i, r);
                    j++;
                }
            }
    }

    //alert("okkkk");

    for (let i = 0; i < gr.n; i++)
        for (let r = 0; r < gr.n; r++)
            if (gr.a[i][r])
                gr.a[i][r].n = null;

    for (let i = 0; i < gr.n; i++)
        gr.point[i].n = null;

    return JSON.stringify(gr);
}

function gen_not_dvud(_n, _count) {
    let gr = new GRAPH();

    let x;
    let y;

    for (let o = 0; o < _n; o++) {
        x = Math.sin(o * 360 / 180.0 * 3.1415926 / _n) * 0.3 + 0.5;
        y = Math.cos(o * 360 / 180.0 * 3.1415926 / _n) * 0.4 + 0.45;
        gr.add_point({x: x, y: y});
    }

    let a = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];

    a[0][0] = 1;

    let j;
    j = 0;
    while (j <= _count) {
        let i;
        let r;
        i = getrir(0, _n - 1);
        r = getrir(0, _n - 1);

        if (i != r)
            if (gr.a[i][r] == null) {
                gr.add_edge(i, r);
                if (!test_dvudolnost(gr)) {
                    if (j < _count)
                        gr.del_edge(i, r);
                    j++;
                }
            }
    }

    for (let i = 0; i < gr.n; i++)
        for (let r = 0; r < gr.n; r++)
            if (gr.a[i][r])
                gr.a[i][r].n = null;

    for (let i = 0; i < gr.n; i++)
        gr.point[i].n = null;
    //alert("okkkk");

    return JSON.stringify(gr);
}


function gen_planar(_n, _count) {
    let gr = new GRAPH();

    let x;
    let y;

    for (let o = 0; o < _n; o++) {
        x = Math.sin(o * 360 / 180.0 * 3.1415926 / _n) * 0.3 + 0.5;
        y = Math.cos(o * 360 / 180.0 * 3.1415926 / _n) * 0.4 + 0.45;
        gr.add_point({x: x, y: y});
    }

    let a = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];

    a[0][0] = 1;

    let j;
    j = 0;
    while (j <= _count) {
        let i;
        let r;
        i = getrir(0, _n - 1);
        r = getrir(0, _n - 1);

        if (i != r)
            if (gr.a[i][r] == null) {
                gr.add_edge(i, r);
                if (!is_planar(gr)) {
                    gr.del_edge(i, r);
                    j++;
                }
            }
    }

    //alert("okkkk");

    for (let i = 0; i < gr.n; i++)
        for (let r = 0; r < gr.n; r++)
            if (gr.a[i][r])
                gr.a[i][r].n = null;

    for (let i = 0; i < gr.n; i++)
        gr.point[i].n = null;

    return JSON.stringify(gr);
}

function gen_not_planar(_n, _count) {
    let gr = new GRAPH();

    let x;
    let y;

    for (let o = 0; o < _n; o++) {
        x = Math.sin(o * 360 / 180.0 * 3.1415926 / _n) * 0.3 + 0.5;
        y = Math.cos(o * 360 / 180.0 * 3.1415926 / _n) * 0.4 + 0.45;
        gr.add_point({x: x, y: y});
    }

    let a = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];

    a[0][0] = 1;

    let j;
    j = 0;
    while (j <= _count) {
        let i;
        let r;
        i = getrir(0, _n - 1);
        r = getrir(0, _n - 1);

        if (i != r)
            if (gr.a[i][r] == null) {
                gr.add_edge(i, r);
                if (!is_planar(gr)) {
                    if (j < _count)
                        gr.del_edge(i, r);
                    j++;
                }
            }
    }

    for (let i = 0; i < gr.n; i++)
        for (let r = 0; r < gr.n; r++)
            if (gr.a[i][r])
                gr.a[i][r].n = null;

    for (let i = 0; i < gr.n; i++)
        gr.point[i].n = null;
    //alert("okkkk");

    return JSON.stringify(gr);
}

function test_dvudolnost(_gr)//return true false
{
    let ma = [];
    let col = [];

    let ray_unch = 0;

    let checked = 0;
    let last_free = 0;
    while (checked < _gr.n) {
        if (ma[checked] == undefined) {
            for (; ray_unch < _gr.n && ma[checked] == undefined; ray_unch++)
                if (col[ray_unch] == undefined) {
                    ma[checked] = ray_unch;
                    last_free = checked + 1;
                    col[ray_unch] = 1;
                    //_gr.point[ray_unch].c=4;
                }
        }

        let cur_col = col[ma[checked]];

        for (let i = 0; i < _gr.n; i++)
            if (ma[checked] != i)
                if (_gr.a[ma[checked]][i] != null) {
                    if (col[i] == undefined) {
                        col[i] = (cur_col + 1) % 2;
                        //_gr.point[i].c=col[i];
                        ma[last_free] = i;
                        last_free++;
                    }
                    if (cur_col == col[i])
                        return false;
                }
        checked++;
    }
    return true;
}

function Log(text) {
    document.getElementById("logs").innerHTML =
        document.getElementById("logs").innerHTML + "<br>" + text;
}

function test_polnaia_dvudolnost(_gr)//return true false
{
    //alert("is_full_dv gr:"+JSON.stringify(_gr));
    let ma = [];
    let col = [];

    let ray_unch = 0;

    if (_gr.n < 2)
        return false;

    let is_reb = false;

    let checked = 0;
    let last_free = 0;
    while (checked < _gr.n) {
        if (ma[checked] == undefined) {
            for (; ray_unch < _gr.n && ma[checked] == undefined; ray_unch++)
                if (col[ray_unch] == undefined) {
                    ma[checked] = ray_unch;
                    last_free = checked + 1;
                    col[ray_unch] = 1;
                    //_gr.point[ray_unch].c=4;
                }
        }

        let cur_col = col[ma[checked]];

        for (let i = 0; i < _gr.n; i++)
            if (ma[checked] != i)
                if (_gr.a[ma[checked]][i] != null) {
                    is_reb = true;
                    if (col[i] == undefined) {
                        col[i] = (cur_col + 1) % 2;

                        ma[last_free] = i;
                        last_free++;
                    }
                    if (cur_col == col[i])
                        return false;
                }
                else {
                    if (col[i] !== undefined)
                        if (col[i] !== cur_col) {
                            //alert("is_full_dv[]:"+i+","+ma[checked]);
                            return false;
                        }
                }

        checked++;
    }

    return is_reb;

}


function test_gr_reg(_gr) {
    let graph = _gr;
    let res;
    let ver = -1;
    for (let i = 0; i < graph.n; i++) {
        let o;
        o = 0;
        for (let r = 0; r < graph.n; r++)
            if (graph.a[i][r] != undefined) {
                o++;
            }
        Log("O:" + o);

        if (ver == -1) {
            ver = o;
        }
        else {
            if (o != ver)
                return -1;
        }
    }

    return ver;
}


//????????????????????????
function test_gr_st(_gr, _st) {
    let graph = JSON.parse(_gr);
    let res = {};


    res.numv = [];
    for (let i = 0; i < graph.n; i++) {
        let o;
        o = 0;
        for (let r = 0; r < graph.n; r++)
            if (graph.a[i][r] != undefined) {
                o++;
            }

        res.numv[i] = o;
    }

    let j = res.numv[0];
    for (let i = 0; i < graph.n; i++) {
        if (j != res.numv[i])
            j = -1;
    }

    if (j != -1) {
        res.k_sv = j;
    }

}


class CYCLE {

    constructor(cycle) {
        this.node = [];
        if (cycle != undefined) {
            for (let i = 0; i < cycle.node.length; i++)
                this.node[i] = cycle.node[i];
        }
    };

    init(_mas) {
        this.node = new Array(_mas.length);
        for (let i = 0; i < _mas.length; i++)
            this.node[i] = _mas[i];
    };

    //Крутим цикл до стопа
    sort_cycle(_stop) {
        let i;
        for (i = 0; this.node[i] != _stop; ++i);
        this.node.unshift(this.node.splice(i, this.node.length - i));
        this.node = this.node.join();
        this.node = this.node.split(',').map(Number);
    };

    //режем цикл цепью
    form_cycle(_chain, _is_invert) {
        if (_is_invert) {
            this.node.reverse();
        }


        let end = _chain[_chain.length - 1];
        let top = _chain[0];

        this.sort_cycle(end);
        if (end != top) {
            let end_to_top = 1;
            for (let i = 0; this.node[i] != top && i < 1000; i++)
                end_to_top++;

            let part = new Array(end_to_top);
            for (let i = 0; i < end_to_top; i++)
                part[i] = this.node[i];


            this.node = [];

            let chain = [].concat(_chain);
            chain.shift();
            chain.pop();
            this.node = this.node.concat(part, chain);
        }
        else {
            if (!_is_invert) {
                this.node = [];
                let chain = [].concat(_chain);
                chain.shift();
                this.node = this.node.concat(chain);
                //alert(this.node);
            }
            else {
                let chain = [].concat(_chain);
                chain.pop();
                this.node = this.node.concat(chain);
                //alert(this.node);
            }
        }
    };

    //hmmm
    get_shattered_cycle(_end, _top) {
        let chain_1 = [];
        let chain_2 = [];

        this.sort_cycle(_end);
        if (_end != _top) {
            chain_1 = this.node.slice(1, this.node.indexOf(_top));
            chain_2 = this.node.slice(this.node.indexOf(_top) + 1);
        }
        else {
            chain_1 = [];
            chain_2 = this.node.slice(this.node.indexOf(_top) + 1);
        }
        //chain_2.push(_end);

        return [chain_1, chain_2];
    };

}

//Делает из цикла и цепи 2 чикла и выдаёт массивы вершин обшие для циков и не общие
function full_divide(_cycle, _chain) {
    let c1 = new CYCLE({node: _cycle});
    let c2 = new CYCLE({node: _cycle});

    let top = _chain[_chain.length - 1];
    let end = _chain[0];

    let c1v = c1.get_shattered_cycle(top, end)[0];
    let c2v = c1.get_shattered_cycle(top, end)[1];

    c1 = new CYCLE({node: _cycle});
    c2 = new CYCLE({node: _cycle});

    c1.form_cycle(_chain, 0);
    c2.form_cycle(_chain, 1);


    return {c1: c1.node, c2: c2.node, c1v: c1v, c2v: c2v, c0v: [].concat(_chain)};
}

//                                  [1,2]
//                           граф стартовая_линия закрашиваемый_цвет красящий_цвет
function graph_fill_part_line(_gr, _start_id, _fillold_col, _fill_col) {
    let ray_vertex = []
    let ray_end = _gr.n * 3 + 7;
    let frontv = 1;
    let lastv = 0;
    ray_vertex[0] = _start_id[0];

    //alert("ok+"+_start_id);

    while (frontv != lastv) {
        let cur = ray_vertex[lastv];
        if (cur != _start_id[0]) {
            for (let i = 0; i < _gr.n; i++)
                if (_gr.a[cur][i] != undefined)
                    if (_gr.a[cur][i].n == _fillold_col) {
                        //_gr.a[cur][i].c=1;
                        _gr.a[cur][i].n = _fill_col;
                        _gr.a[i][cur].n = _fill_col;
                        if (_gr.point[i].n != -1) {
                            ray_vertex[frontv] = i;
                            frontv = (frontv + 1) % ray_end;
                        }
                    }
        }
        else {
            let i = _start_id[1];
            if (_gr.a[cur][i] != undefined)
                if (_gr.a[cur][i].n == _fillold_col) {
                    //_gr.a[cur][i].c=1;
                    _gr.a[cur][i].n = _fill_col;
                    _gr.a[i][cur].n = _fill_col;

                    if (_gr.point[i].n != -1) {
                        ray_vertex[frontv] = i;
                        frontv = (frontv + 1) % ray_end;
                    }
                }

        }


        lastv = (lastv + 1) % ray_end;
    }

}

//                      граф стартовая_точка закрашиваемый_цвет красящий_цвет
function graph_fill_part(_gr, _start_id, _fillold_col, _fill_col) {
    let ray_vertex = []
    let ray_end = _gr.n * 3 + 7;
    let frontv = 1;
    let lastv = 0;
    ray_vertex[0] = _start_id;

    //alert("ok");

    while (frontv != lastv) {
        let cur = ray_vertex[lastv];

        for (let i = 0; i < _gr.n; i++)
            if (_gr.a[cur][i] != undefined)
                if (_gr.a[cur][i].n == _fillold_col) {
                    //_gr.a[cur][i].c=1;
                    _gr.a[cur][i].n = _fill_col;
                    _gr.a[i][cur].n = _fill_col;
                    if (_gr.point[i].n != -1) {
                        ray_vertex[frontv] = i;
                        frontv = (frontv + 1) % ray_end;
                    }
                }


        lastv = (lastv + 1) % ray_end;
    }

}

function get_chain(_gr, _cyc, _id) {
    for (let i = 0; i < _gr.n; i++)
        _gr.point[i].cid = -1;

    let startp = -1;
    for (let i = 0; i < _cyc.length && startp == -1; i++) {
        let b = 0;
        for (let r = 0; r < _gr.n; r++)
            if (_gr.a[_cyc[i]][r] != undefined)
                if (_gr.a[_cyc[i]][r].n == _id)
                    b = 1;
        if (b == 1)
            startp = _cyc[i];
    }

    if (startp == -1)
        return;


    let ray_vertex = []
    let ray_end = _gr.n * 3 + 7;
    let frontv = 1;
    let lastv = 0;
    ray_vertex[0] = startp;
    _gr.point[startp].cid = 0;


    let baaaad_chain = [startp, -1, startp];


    for (let i = 0; i < _gr.n; i++)
        if (i != startp)
            if (_gr.a[startp][i] != undefined)
                if (_gr.a[startp][i].n == _id)
                    if (_gr.point[i].cid < 0) {
                        baaaad_chain[1] = i;
                    }

    while (frontv != lastv) {
        let cur = ray_vertex[lastv];

        for (let i = 0; i < _gr.n; i++)
            if (i != cur)
                if (_gr.a[cur][i] != undefined)
                    if (_gr.a[cur][i].n == _id)
                        if (_gr.point[i].cid < 0) {
                            _gr.point[i].cid = _gr.point[cur].cid + 1;
                            ray_vertex[frontv] = i;
                            frontv = (frontv + 1) % ray_end;
                        }


        lastv = (lastv + 1) % ray_end;
    }


    let endp = -1;
    for (let i = 0; i < _cyc.length; i++)
        if (_gr.point[_cyc[i]].cid > 0 && (endp == -1 || _gr.point[_cyc[i]].cid < _gr.point[endp].cid)) {
            endp = _cyc[i];
        }

    if (endp == -1) {
        if (baaaad_chain[1] != -1)
            return baaaad_chain;
        return;
    }
    //alert(startp+" "+endp);

    let b = 0;

    let chain = [endp];

    let lastp = 0;

    while (b == 0) {
        let leve = _gr.point[endp].cid;

        if (leve > 1) {
            for (let i = 0; i < _gr.n; i++)
                if (i != endp)
                    if (_gr.a[endp][i] != undefined)
                        if (_gr.point[i].cid == leve - 1) {
                            lastp++;
                            chain[lastp] = i;
                            endp = i;
                            i = _gr.n;

                        }

        }
        else {
            chain[lastp + 1] = startp;
            b = 1;
        }
    }

    //alert(JSON.stringify(chain));
    //надо доделать 1 крайний случай цепей 4-0-6-7-4   5-7-8-5  (вроде можно просто 5-7-5 выдать как ответ)
    if (startp == -1)
        return;


    //for(let i=0;i<_gr.n;i++)
    //	_gr.point[i].n=JSON.stringify(_gr.point[i].cid);


    return chain;
}

//                  [[],[],[]], [1,2,5,7]
function tear_shmatki(_shmatki, _id_tears) {
    //!!! все точки разрыва должны быть в 1 шматке
    //шматок надо анализировать как цикл
    //цикл разрывается сразу по всем точкам
    //цикл надо прокрутить до точки разрыва, тогда можно считать что мы рвём цепь

    //456789,745
    //789456,745
    //7894,5,6
    //7894,45,567


    let sh_to_tear_id;

    for (let o = 0; o < _id_tears.length; o++) {
        for (let i = 0; i < _shmatki.length; i++) {
            for (let r = 0; r < _shmatki[i].length; r++) {
                if (_shmatki[i][r] == _id_tears[o]) {
                    sh_to_tear_id = i;
                }
            }
        }
    }

    if (sh_to_tear_id == undefined)
        return;

    let sh_to_tear = [].concat(_shmatki[sh_to_tear_id]);

    let u;
    for (u = 0; sh_to_tear[u] != _id_tears[0] && u < sh_to_tear.length; ++u);
    let res = sh_to_tear.splice(u, sh_to_tear.length - u);
    sh_to_tear = [].concat(res, sh_to_tear);

    //alert("sh_tear  "+JSON.stringify(sh_to_tear));

    let shm_sh = [];
    let last_div_point = 0;
    for (let i = 1; i < sh_to_tear.length; i++) {
        for (let r = 0; r < _id_tears.length; r++) {
            if (sh_to_tear[i] == _id_tears[r]) {
                shm_sh[shm_sh.length] = sh_to_tear.slice(last_div_point, i + 1);
                last_div_point = i;
            }
        }
    }

    if (shm_sh.length > 0) {
        shm_sh[shm_sh.length] = sh_to_tear.slice(last_div_point);
        shm_sh[shm_sh.length - 1].push(sh_to_tear[0]);

        //alert(JSON.stringify(shm_sh));

        //узнали какой шматок рубиться и зазрубили его на шматочечки теперь правим исходные данные

        _shmatki[sh_to_tear_id] = shm_sh[0];//записываем нулевой шматочек вместо порванного
        for (let i = 1; i < shm_sh.length; i++) {
            _shmatki[_shmatki.length] = shm_sh[i];//дописываем в массив шматков остальные шматочки
        }
    }


    //return shm_sh;
}

//                     [[],[],[]], [1,2,5,7]
function _shmatki_can_segm(_shmatki, _id_tears) {
    //alert("shm test: "+JSON.stringify(_shmatki)+"   "+JSON.stringify(_id_tears));
    for (let i = 0; i < _shmatki.length; i++) {
        let q_ok = 0;
        for (let r = 0; r < _shmatki[i].length; r++) {
            for (let o = 0; o < _id_tears.length; o++)
                if (_shmatki[i][r] == _id_tears[o])
                    q_ok++;
        }
        //alert("qok:"+q_ok);
        if (q_ok == _id_tears.length)
            return true;
    }
    return false;
}

let arrgr = [];

function is_planar(_gr) {
    arrgr = [];

    let chrcolor = 0;

    //Log("sdel:"+JSON.stringify(_gr));

    let last_gr;

    for (let i = 0; i < _gr.n; i++)
        for (let r = 0; r < _gr.n; r++) {
            if (_gr.a[i][r] != undefined)
                _gr.a[i][r].n = 0;
        }

    let cyclohran = [];

    for (let i = 0; i < _gr.n; i++)
        for (let r = 0; r < _gr.n; r++)
            if (i != r)
                if (_gr.a[i][r] != undefined) {
                    cyclohran[0] = {cyc: [i, r], end: 0};
                    cyclohran[1] = {cyc: [i, r], end: 1};
                }

    //alert(JSON.stringify(_gr));
    if (cyclohran[0] === undefined) return true;
    _gr.a[cyclohran[0].cyc[0]][cyclohran[0].cyc[1]].n = -1;
    //_gr.a[cyclohran[0].cyc[0] ][cyclohran[0].cyc[1] ].c=2;
    _gr.a[cyclohran[0].cyc[1]][cyclohran[0].cyc[0]].n = -1;
    //_gr.a[cyclohran[0].cyc[1] ][cyclohran[0].cyc[0] ].c=2;


    for (let i = 0; i < _gr.n; i++)
        _gr.point[i].n = 0;

    //_gr.point[cyclohran[0].cyc[0]].c=2;
    //_gr.point[cyclohran[0].cyc[1]].c=2;
    _gr.point[cyclohran[0].cyc[0]].n = -1;
    _gr.point[cyclohran[0].cyc[1]].n = -1;

    let end = 0;

    while (end == 0) {
        end = 1;

        for (let nc = 0; nc < cyclohran.length; nc++) {
            if (cyclohran[nc].end == 0) {

                document.getElementById("logs").innerHTML = document.getElementById("logs").innerHTML + "<br>" + JSON.stringify(cyclohran[nc]);
                //1-find chain
                let cha = get_chain(_gr, cyclohran[nc].cyc, nc);


                document.getElementById("logs").innerHTML = document.getElementById("logs").innerHTML + "<br>" + "chain: " + JSON.stringify(cha);

                if (cha != undefined) {
                    //2-color middle vertex
                    for (let i = 0; i < cha.length; i++) {
                        _gr.point[cha[i]].n = -1;
                    }

                    for (let i = 0; i < cha.length - 1; i++) {
                        _gr.a[cha[i]][cha[i + 1]].n = -1;
                        _gr.a[cha[i + 1]][cha[i]].n = -1;
                        //alert(cha[i+1]+" + "+cha[i]);
                    }


                    let div_res = full_divide(cyclohran[nc].cyc, cha);

                    //c1-c1v c2-c2v

                    let col1 = cyclohran.length;
                    let col2 = cyclohran.length + 1;

                    for (let i = 0; i < div_res.c1v.length; i++) {
                        graph_fill_part(_gr, div_res.c1v[i], nc, col1);
                    }

                    for (let i = 0; i < div_res.c2v.length; i++) {
                        graph_fill_part(_gr, div_res.c2v[i], nc, col2);
                    }


                    //test
                    //если получилось так, что после деления цикла на 2 из одиноких вершин одного можно до одиноких другого добраться то не планарный граф

                    for (let i = 0; i < div_res.c1v.length; i++) {
                        for (let r = 0; r < _gr.n; r++)
                            if (_gr.a[div_res.c1v[i]][r] != null) {
                                if (_gr.a[div_res.c1v[i]][r].n == col2) {
                                    document.getElementById("logs").innerHTML = document.getElementById("logs").innerHTML + "<br>" + "foll not planar ";
                                    return false;
                                }
                            }
                    }

                    for (let i = 0; i < div_res.c2v.length; i++) {
                        for (let r = 0; r < _gr.n; r++)
                            if (_gr.a[div_res.c2v[i]][r] != null) {
                                if (_gr.a[div_res.c2v[i]][r].n == col1) {
                                    document.getElementById("logs").innerHTML = document.getElementById("logs").innerHTML + "<br>" + "foll not planar ";
                                    return false;
                                }
                            }
                    }


                    let col3 = cyclohran.length + 10;

                    let segmdel = [[0], [0]];
                    //let test1=[[0,1,2,3,4,5]];
                    //let test2=[1,2];
                    //tear_shmatki(test1,test2);
                    //alert(JSON.stringify(test1));  сейчас [[1,2],[2,3,4,5,0,1]]   надо [[2,3,4,5,0,1]]
                    let segment = [];
                    //[[1,5,4,6]]

                    for (let i = 0; i < cha.length; i++) {
                        let curr = cha[i];
                        for (let r = 0; r < _gr.n; r++)
                            if (curr != r) {
                                if (_gr.a[curr][r] != undefined) {
                                    if (_gr.a[curr][r].n == nc) {
                                        //alert(_gr.a[curr][r].n);
                                        graph_fill_part_line(_gr, [curr, r], nc, col3 + segment.length);
                                        segment[segment.length] = [i];
                                    }
                                    else {
                                        let iid = _gr.a[curr][r].n - col3;
                                        if (iid >= 0) {
                                            segment[iid][segment[iid].length] = i;
                                        }
                                        if (_gr.a[curr][r].n == col1 && i > 0 && i < cha.length - 1) {
                                            segmdel[0].push(i);
                                        }
                                        if (_gr.a[curr][r].n == col2 && i > 0 && i < cha.length - 1) {
                                            segmdel[1].push(i);
                                        }
                                    }
                                }
                            }
                    }


                    let segmentcol = new Array(segment.length);//массив принадлежности сегмента к внутренности цикла

                    //alert(JSON.stringify(segment));
                    //Log("sdel:"+JSON.stringify(segmdel));


                    let shmatki1 = [[]];
                    for (let i = 0; i < cha.length; i++)
                        shmatki1[0][i] = i;

                    let shmatki2 = [[]];
                    for (let i = 0; i < cha.length; i++)
                        shmatki2[0][i] = i;

                    tear_shmatki(shmatki1, segmdel[0]);
                    tear_shmatki(shmatki2, segmdel[1]);

                    if (shmatki1.length > 1)
                        shmatki1[shmatki1.length - 1].length--;
                    if (shmatki2.length > 1)
                        shmatki2[shmatki2.length - 1].length--;


                    let b = 0;


                    while (b == 0) {
                        b = 1;

                        let last_segm = segment.length;
                        for (let i = 0; i < segment.length; i++)
                            if (segmentcol[i] == null) {
                                last_segm = i;
                            }

                        for (let i = 0; i < segment.length; i++)
                            if (segmentcol[i] == null) {

                                let can1 = true;
                                let can2 = true;

                                if (segment[i].length > 0)
                                    b = 0;
                                can1 = _shmatki_can_segm(shmatki1, segment[i]);
                                can2 = _shmatki_can_segm(shmatki2, segment[i]);

                                document.getElementById("logs").innerHTML = document.getElementById("logs").innerHTML + "<br>" + "sh1:" + JSON.stringify(shmatki1) + " sh2:" + JSON.stringify(shmatki2) + "<br>segm:" + JSON.stringify(segment[i]) + " i:" + i;
                                document.getElementById("logs").innerHTML = document.getElementById("logs").innerHTML + "<br>" + "can1:" + can1 + "  can2:" + can2;

                                if (!can1 && !can2) {
                                    document.getElementById("logs").innerHTML = document.getElementById("logs").innerHTML + "<br>" + "try past parts not planar ";
                                    return false;
                                }
                                if (!can1 && can2 || can1 && !can2 || i == last_segm) {
                                    if (can1) {
                                        tear_shmatki(shmatki1, segment[i]);
                                        segmentcol[i] = 1;
                                    }
                                    else {
                                        tear_shmatki(shmatki2, segment[i]);
                                        segmentcol[i] = 2;
                                    }
                                }
                                //alert("segments:"+segment.length+"  now:"+i+"  segm:"+can1+","+can2 + "   new col:"+segmentcol[i]);
                            }

                    }


                    //3 fill segments for join new cycles(c1,c2)
                    //
                    //
                    //
                    //

                    for (let i = 0; i < segmentcol.length; i++)
                        if (segment[i].length > 0) {
                            if (segmentcol[i] == 1)
                                graph_fill_part(_gr, cha[segment[i][0]], col3 + i, col1);
                            else
                                graph_fill_part(_gr, cha[segment[i][0]], col3 + i, col2);
                        }


                    //end=0;
                    let new_cych = {cyc: div_res.c1, end: 0};
                    cyclohran.push(new_cych);
                    new_cych = {cyc: div_res.c2, end: 0};
                    cyclohran.push(new_cych);

                    document.getElementById("logs").innerHTML = document.getElementById("logs").innerHTML + "<br>" + "c1: " + JSON.stringify(div_res.c1);
                    document.getElementById("logs").innerHTML = document.getElementById("logs").innerHTML + "<br>" + "c2: " + JSON.stringify(div_res.c2);

                    if (cha[0] != cha[cha.length - 1])
                        cyclohran[nc].end = 2;
                }
                else {
                    document.getElementById("logs").innerHTML = document.getElementById("logs").innerHTML + "<br>Это грань:" + JSON.stringify(cyclohran[nc]);
                    cyclohran[nc].end = 1;
                }

            }


            if (cyclohran.length == nc + 1) {
                //alert("-");
                for (let i = 0; i < _gr.n; i++)
                    for (let r = 0; r < _gr.n; r++)
                        if (i != r)
                            if (_gr.a[i][r] != undefined)
                                if (_gr.a[i][r].n == chrcolor) {
                                    _gr.a[i][r].n = nc + 1;
                                    cyclohran[nc + 1] = {cyc: [i, r], end: 0};
                                }

                //alert(JSON.stringify(_gr));
                if (cyclohran[nc + 1] === undefined) return true;
                _gr.a[cyclohran[nc + 1].cyc[0]][cyclohran[nc + 1].cyc[1]].n = -1;
                //_gr.a[cyclohran[0].cyc[0] ][cyclohran[0].cyc[1] ].c=2;
                _gr.a[cyclohran[nc + 1].cyc[1]][cyclohran[nc + 1].cyc[0]].n = -1;


                chrcolor = nc + 1;

            }

        }
    }

    //for(let i=0;i<_gr.n;i++)
    //for(let r=0;r<_gr.n;r++)
    //if(_gr.a[i][r]!=null)
    //	_gr.a[i][r].c=_gr.a[i][r].n;

    //for(let i=0;i<_gr.n;i++)
    //	_gr.point[i].n=i;
    return true;
}


function compareNumbers(a, b) {
    return b - a;
}

function compareNumbers_0(a, b) {
    return b[0] - a[0];
}

function Gswap(vert, a, b) {
    let v = vert[a];
    vert[a] = vert[b];
    vert[b] = v;
}

function next_set(n, vert, grold) {
    let j = n - 2;
    while (j != -1 && vert[j] >= vert[j + 1])
        j--;
    if (j == -1)
        return false; //больше перестановок нет
    let k = n - 1;
    while (vert[j] >= vert[k])
        k--;
    Gswap(vert, j, k);
    let l = j + 1, r = n - 1;
    while (l < r)
        Gswap(vert, l++, r--);
    //alert(vert);
    //alert(compareMtrx(grold, grold.length, vert));
    return true;
}

function compareMtrx(gr, n, vert) {

    for (let ugol = 0; ugol < n; ugol++) {
        for (let r = 0; r <= ugol; r++)
            if (gr[vert[ugol]][vert[r]] != gr[ugol][r])
                if (gr[vert[ugol]][vert[r]] == null || gr[ugol][r] == null) {

                    return ugol;
                }
        for (let i = 0; i <= ugol; i++)
            if (gr[vert[i]][vert[ugol]] != gr[i][ugol])
                if (gr[vert[i]][vert[ugol]] == null || gr[i][ugol] == null) {

                    return ugol;
                }
    }
    return -1;
}

function compareMtrxINV(gr, n, vert, minv) {

    for (let ugol = 0; ugol < n; ugol++) {
        if (minv[vert[ugol]] != minv[ugol])
            return ugol;
    }
    return -1;
}


function get_automorphs(_grm) {
    //let grm=JSON.parse(_grm);
    //grm-двумерный массив
    //grm.length-размер матрицы(количество вершин)
    //alert(_grm.a[0][1].c);
    let res = [];
    let vert = {};

    let arrinv = [];
    for (let i = 0; i < _grm.n; i++) {
        arrinv[i] = 0;
        for (let r = 0; r < _grm.n; r++)
            if (_grm.a[i][r] != null)
                arrinv[i]++;

    }


    vert.a = [];
    for (let i = 0; i < _grm.n; i++)
        vert.a[i] = i;
    let taboo = {};
    taboo.a = [];
    while (next_set(_grm.n, vert.a, _grm.a)) {
        //alert(JSON.stringify(grm));
        //alert(compareMtrx(_grm.a, _grm.n, vert.a, taboo.a));
        //alert(vert.a);
        /*if(compareMtrx(_grm.a, _grm.n, vert.a, taboo.a))
         {
         res[res.length]=[].concat(vert.a);
         }	*/

        let resfu;

        //resfu = compareMtrxINV(_grm.a, _grm.n, vert.a,arrinv);

        //if (resfu == -1)
        resfu = compareMtrx(_grm.a, _grm.n, vert.a);


        if (resfu == -1) {


            let m = [];
            for (let i = 0; i < vert.a.length; i++)
                m[i] = 0;
            let b = 0;
            let prres = [];

            for (let i = 0; i < vert.a.length; i++)
                if (m[i] == 0) {
                    prres[prres.length] = [i];
                    let st = i;
                    m[i] = 1;
                    for (let r = vert.a[st]; r != st; r = vert.a[r]) {
                        m[r] = 1;
                        prres[prres.length - 1][prres[prres.length - 1].length] = r;
                    }


                }

            res[res.length] = prres;
            //res[res.length]=[].concat(vert.a);


        }
        else {
            //alert(vert.a);
            //alert(resfu);
            let numbers = [];
            for (let grr = resfu + 1; grr < vert.a.length; grr++)
                numbers[numbers.length] = vert.a[grr];
            numbers.sort(compareNumbers);
            //alert(numbers);
            for (let grr = resfu + 1, ni = 0; grr < vert.a.length; grr++, ni++)
                vert.a[grr] = numbers[ni];
            //alert(vert.a);
        }
    }


    Log(JSON.stringify(res));
    return res;
}


function test_answer(_gr, _text, _usl) {
    let gr = JSON.parse(_gr);
    let usl = JSON.parse(_usl);
    //alert("ttt");
    if (usl.t == 1)//create graph with...
    {
        if (gr.n <= 0)
            return false;
        /*
         n-versh[1,2,3,4...]
         reg-regular[0,1,2,3,4,5,-1(isnt reg),-2(any reg)]
         dvud-dvudolnost[true,false]
         fulldvud-full dfudoln[true,false]
         planar-[true,false]
         */
        if (usl.u.n !== undefined) {
            //alert("Need n:"+usl.u.n);
            let res = gr.n;
            //alert("res:"+res);
            if (usl.u.n != res)
                return false;
        }
        if (usl.u.reg !== undefined) {
            //alert("Need reg:"+usl.u.reg);
            let res = test_gr_reg(gr);
            alert("res:" + res);
            if (usl.u.reg == -2) {
                if (res == -1)
                    return false;
            }
            else {
                if (usl.u.reg != res)
                    return false;
            }
        }
        if (usl.u.dvud !== undefined) {
            //alert("Need dvud:"+usl.u.dvud);
            let res = test_dvudolnost(gr);
            //alert("res:"+res);
            if (usl.u.dvud != res)
                return false;
        }
        if (usl.u.fulldvud !== undefined) {
            //alert("Need fulldvud:"+usl.u.fulldvud);
            let res = test_polnaia_dvudolnost(gr);
            //alert("res:"+res);
            if (usl.u.fulldvud != res)
                return false;
        }
        if (usl.u.planar !== undefined) {
            //alert("Need planar:"+usl.u.planar);
            let res = is_planar(gr);
            //alert("res:"+res);
            if (usl.u.planar != res)
                return false;
        }
        return true;
    }
    if (usl.t == 2)//check text
    {
        return usl.u.text == _text;
    }
}


//test_answer('{"n":6,"a":[[null,null,null,{"c":0},{"c":0},{"c":0},null],[null,null,null,{"c":0},{"c":0},{"c":0},null],[null,null,null,{"c":0},{"c":0},{"c":0},null],[{"c":0},{"c":0},{"c":0},null,null,null,null],[{"c":0},{"c":0},{"c":0},null,null,null,null],[{"c":0},{"c":0},{"c":0},null,null,null,null]],"point":[{"x":0.404,"y":0.4083333333333333,"c":0},{"x":0.496,"y":0.66,"c":0},{"x":0.573,"y":0.775,"c":0},{"x":0.422,"y":0.7983333333333333,"c":0},{"x":0.576,"y":0.36666666666666664,"c":0},{"x":0.493,"y":0.5066666666666667,"c":0}],"or":0}',
//'{"t":1,"text":"Составьте планарный 4-регулярный граф","u":{"n":8,"reg":3,"dvud":false,"fulldvud":false,"planar":true}}');


//var res=full_divide([4,9],[4,8,6,9]);
//var res=(new CYCLE({node:[3,4,5,1,2]}));
//res.sort_cycle(1);
//alert(JSON.stringify(res));










