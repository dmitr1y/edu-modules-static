function draw_brackets(br, element, id) {
    var table = document.createElement("table");
    element.appendChild(table);
    var tr1 = document.createElement("tr");
    var tr2 = document.createElement("tr");
    table.appendChild(tr1);
    table.appendChild(tr2);
    tr1.className = "br-tb";
    tr2.className = "br-n";
    table.id = id;
    table.className = "br-ts";
    table.border = "none";

    for (var i = 0; i < br.length; i++) {
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        td1.innerHTML = (br[i]) ? "(" : ")";
        td2.innerHTML = i + 1;
        tr1.appendChild(td1);
        tr2.appendChild(td2);
    }
}
