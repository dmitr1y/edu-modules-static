/*function draw_yung_table (br){
 var x=0,y=0,len=20,fontsize=30,n=br.length/2;
 var t=0,b=0;
 ctx.font = fontsize+"px sans normal";
 var num = ctx.measureText("1");
 ctx.strokeRect(x,y,n*(2*len+num.width), 2*(len/2 + fontsize));
 y=y+30;
 for (var i=0; i<br.length; i++){
 if (br[i] == 1){
 ctx.fillText(i+1, x+len*t, y);
 t++;
 }else{
 ctx.fillText(i+1, x+len*b, y+len);
 b++;
 }
 }
 }
 Рисованию - нет
 Сделать обычную таблицу
 Значительно проще
 */

function gen_yung_table(br, el, id) {
    var table = document.createElement("table");
    el.appendChild(table);
    table.border = "1";
    table.className = "yung";
    table.style = "font-size: 20px";

    table.rules = "groups";
    table.id = id;

    var tr1 = null, tr2 = null, td;
    for (var i = 0; i < br.length; i++) {

        if (br[i] == 1) {
            if (tr1 == null) {
                tr1 = document.createElement("tr");
                tr1 = table.appendChild(tr1);
            }
            td = document.createElement("td");
            td.innerHTML = i + 1;
            tr1.appendChild(td);

        } else {
            if (tr2 == null) {
                tr2 = document.createElement("tr");
                tr2 = table.appendChild(tr2);
            }
            td = document.createElement("td");

            td.innerHTML = i + 1;
            tr2.appendChild(td);
        }
    }
}

