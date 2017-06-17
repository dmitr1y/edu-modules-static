/*
 Выводит скобочное представление в человеческом виде. Функция для тестирования.
 */
function print_brackets(br) {
    document.open();
    for (var i = 0; i < br.length; i++) {
        if (br[i] == 1) {
            document.write("(");
        } else {
            document.write(")");
        }
    }
    document.write("<br/>");
    document.close();
}

/*
 Сравнение двух скобочных представлений
 */
function compare_brackets(br1, br2) {
    for (var i = 0; i < br1.length; i++) {
        if (br1[i] != br2[i]) return false;
    }
    return true;
}

/*
 Копирование двухмерного массива
 */
function copy_brackets(br) {
    var newbr = [];
    for (var i = 0; i < br.length; i++) {
        newbr[i] = [];
        for (var j = 0; j < br[i].length; j++) {
            newbr[i][j] = br[i][j];
        }
    }
    return newbr;
}

/*
 Перемешивание массива. Тасование Фишера-Йетса.
 */
function shuffle(br) {
    for (var i = br.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = br[i];
        br[i] = br[j];
        br[j] = temp;
    }
}

/*
 Генерирует массив всех возможных правильных скобочных представлений в лексикографическом порядке c n открывающих скобочек
 */
function gen(n) {
    var brackets = [];
    brackets[0] = []; // первое представление это ((...))
    for (var i = 0; i < n; i++) {
        brackets[0][i] = 1; // открывающие
    }
    for (; i < 2 * n; i++) {
        brackets[0][i] = 0; // закрывающие
    }
    var cat = gen_catalan(n);
    for (var i = 1; i < cat; i++) {
        brackets[i] = next_sequence(brackets[i - 1]);
    }

    return brackets;
}

/*
 Следующая в лексикографическом порядке скобочная последовательность
 */
function next_sequence(last) {
    var n = last.length;
    var next_br = [];
    for (var i = n - 1, depth = 0; i >= 0; i--) {
        if (last[i] == 1) {
            depth--;
        } else {
            depth++;
        }
        if (last[i] == 1 && depth > 0) {
            depth--;
            var open = (n - i - 1 - depth) / 2;
            var close = n - i - 1 - open;
            next_br = last.slice(0, i);
            next_br.push(0);
            next_br = next_br.concat(Array.apply(null, Array(open)).map(Number.prototype.valueOf, 1), Array.apply(null, Array(close)).map(Number.prototype.valueOf, 0));
            break;
        }
    }
    console.log(next_br);
    return next_br;
}


