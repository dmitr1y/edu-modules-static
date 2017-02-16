var selectedQ = 0;


var Q_list = [];
//t-1 create
Q_list[0] = {
    t: 1,
    text: "Текст задачи",
    u: {n: 8, reg: 3, dvud: false, fulldvud: false, planar: true},
    gui_t: {is_orient: 0, gui_buttons: [0, 1, 2, 3, 4, 5, 6, 7, 8]}
};
Q_list[1] = {
    t: 1,
    text: "Составьте планарный 4-регулярный граф.",
    u: {reg: 4, planar: true},
    gui_t: {is_orient: 0, gui_buttons: [0, 1, 2, 3, 4, 5]}
};
Q_list[2] = {
    t: 1,
    text: "Составьте планарный 4-регулярный граф на 8 вершинах.",
    u: {reg: 4, planar: true, n: 8},
    gui_t: {is_orient: 0, gui_buttons: [0, 1, 2, 3, 4, 5]}
};
Q_list[3] = {
    t: 1,
    text: "Составьте не планарный двудольный граф на 6 вершинах",
    u: {n: 6, dvud: true, planar: false},
    gui_t: {is_orient: 0, gui_buttons: [0, 1, 2, 3, 4, 5]}
};
Q_list[4] = {
    t: 1,
    text: "Составьте полный двудольный граф на 7 вершинах.",
    u: {n: 7, dvud: true, fulldvud: true},
    gui_t: {is_orient: 0, gui_buttons: [0, 1, 2, 3, 4, 5]}
};

//t-2 write
Q_list[5] = {
    t: 2,
    text: "Планарен ли данный граф? Введите Y если да. N если нет.",
    u: {text: ""},
    gui_t: {is_orient: 0, gui_buttons: [2]},
    exec: quest5
};
function quest5() {
    let gr, text;

    if (Math.random() < 0.5) {
        gr = gen_planar(10, 4);
        text = "Y";
    }
    else {
        gr = gen_not_planar(10, 4);
        text = "N";
    }

    return {gr: gr, text: text}
}
Q_list[6] = {
    t: 2,
    text: "Является ли данный граф двудольным? Введите Y если да. N если нет.",
    u: {text: ""},
    gui_t: {is_orient: 0, gui_buttons: [2]},
    exec: quest6
};
function quest6() {
    let gr, text;

    if (Math.random() < 0.5) {
        gr = gen_dvud(15, 6);
        text = "Y";
    }
    else {
        gr = gen_not_dvud(15, 6);
        text = "N";
    }

    return {gr: gr, text: text}
}

/*
 <SELECT name="Селект" id="quest_select" OnChange='quest_select()'>
 <OPTION VALUE="0">Задача?</OPTION>
 <OPTION VALUE="1">1(составить...)</OPTION>
 <OPTION VALUE="2">2</OPTION>
 <OPTION VALUE="3">3</OPTION>
 <OPTION VALUE="4">4</OPTION>
 </SELECT>
 */

function quest_select() {
    let sel = (document.getElementById("quest_select").options.selectedIndex);

    guist('g85n73u86', "init", JSON.stringify(Q_list[sel].gui_t));

    if (Q_list[sel].t == 2) {
        let resex;
        resex = Q_list[sel].exec();

        Q_list[sel].u.text = resex.text;
        guist('g85n73u86', "set", resex.gr);
    }
    //alert('okk');
    //guist('g85n73u86',"set",'');

    document.getElementById("quest_text").innerHTML = Q_list[sel].text;

}

quest_select();

function quest_test(_text) {
    let sel = (document.getElementById("quest_select").options.selectedIndex);
    let res = test_answer(guist('g85n73u86', 'get'), _text, JSON.stringify(Q_list[sel]));


    if (res)
        alert("Правильно");
    else
        alert("Неправильно");

}





































