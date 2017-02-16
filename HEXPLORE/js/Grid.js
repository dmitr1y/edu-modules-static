function Grid(length) {
    this.length = length;
    this.matrix = this.addGrid(length);
}

Grid.prototype.addGrid = function (length) {
    var matrix = new Array(length);

    for (var i = 0; i < length; i++) {
        matrix[i] = new Array(length);
        for (var j = 0; j < length; j++) {
            matrix[i][j] = new Cell();

            matrix[i][j].i = i;
            matrix[i][j].j = j;
            matrix[i][j].hidden = true;
            matrix[i][j].color = Math.round(Math.random());
        }
    }

    return matrix;
}

Grid.prototype.checkBorder = function (i, j) {
    return (i >= 0 && i < this.length) && (j >= 0 && j < this.length);
}

Grid.prototype.setXY = function (i, j, x, y) {
    this.matrix[i][j].x = x;
    this.matrix[i][j].y = y;
}

Grid.prototype.setIJ = function (i, j) {
    this.matrix[i][j].i = i;
    this.matrix[i][j].j = j;
}

Grid.prototype.setColorValue = function (i, j, value) {
    this.matrix[i][j].color = value;
}

Grid.prototype.setHidden = function (i, j, bool) {
    this.matrix[i][j].hidden = bool;
}

Grid.prototype.isHidden = function (i, j) {
    if (this.matrix[i][j].hidden) {
        return true;
    }
}

Grid.prototype.isColor_1 = function (i, j) {
    if (this.matrix[i][j].color == ColorValue.COLOR_1) {
        return true;
    }
}

Grid.prototype.isColor_2 = function (i, j) {
    if (this.matrix[i][j].color == ColorValue.COLOR_2) {
        return true;
    }
}

Grid.prototype.getSize = function () {
    return this.length;
}

Grid.prototype.getXY = function (i, j) {
    return {
        x: this.matrix[i][j].x,
        y: this.matrix[i][j].y,
    };
}

Grid.prototype.getColorValue = function (i, j) {
    return this.matrix[i][j].color;
}

Grid.prototype.getCell = function (i, j) {
    return this.matrix[i][j];
}

Grid.prototype.getNeighbors = function (i, j, check_hidden) {
    var neighbors = new Array();

    if (this.checkBorder(i + 1, j + 1) && (!this.isHidden(i + 1, j + 1) || check_hidden)) {
        neighbors.push(this.matrix[i + 1][j + 1]);
    }

    if (this.checkBorder(i - 1, j - 1) && (!this.isHidden(i - 1, j - 1) || check_hidden)) {
        neighbors.push(this.matrix[i - 1][j - 1]);
    }

    if (this.checkBorder(i + 1, j) && (!this.isHidden(i + 1, j) || check_hidden)) {
        neighbors.push(this.matrix[i + 1][j]);
    }

    if (this.checkBorder(i - 1, j) && (!this.isHidden(i - 1, j) || check_hidden)) {
        neighbors.push(this.matrix[i - 1][j]);
    }

    if (this.checkBorder(i, j - 1) && (!this.isHidden(i, j - 1) || check_hidden)) {
        neighbors.push(this.matrix[i][j - 1]);
    }

    if (this.checkBorder(i, j + 1) && (!this.isHidden(i, j + 1) || check_hidden)) {
        neighbors.push(this.matrix[i][j + 1]);
    }

    return neighbors;
}

Grid.prototype.resetVisit = function () {
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j < this.length; j++) {
            this.matrix[i][j].visit = null;
        }
    }
}

Grid.prototype.resetRelative = function () {
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j < this.length; j++) {
            this.matrix[i][j].relative = null;
        }
    }
}

Grid.prototype.BFS = function (is, js, ie, je, color) {
    var start;
    var end;
    var queue;

    if (!this.isHidden(is, js) && !this.isHidden(ie, je)) {
        switch (color) {
            case ColorValue.COLOR_1:
                if (this.isColor_1(is, js) && this.isColor_1(ie, je)) {
                    start = this.getCell(is, js);
                    end = this.getCell(ie, je);
                    queue = new Array();
                } else {
                    return false;
                }
                break;
            case ColorValue.COLOR_2:
                if (this.isColor_2(is, js) && this.isColor_2(ie, je)) {
                    start = this.getCell(is, js);
                    end = this.getCell(ie, je);
                    queue = new Array();
                } else {
                    return false;
                }
                break;
        }
    } else {
        return false;
    }

    start.visit = VisitValue.OPENED;
    queue.push(start);

    while (queue.length) {
        current = queue.shift();
        current.visit = VisitValue.CLOSED;

        if (current == end) {
            this.resetVisit();
            return this.returnPath(end);
        }

        var neighbors = this.getNeighbors(current.i, current.j, false);
        for (i = 0; i < neighbors.length; i++) {
            switch (color) {
                case ColorValue.COLOR_1:
                    if (neighbors[i].color == ColorValue.COLOR_2) {
                        continue;
                    }
                    break;
                case ColorValue.COLOR_2:
                    if (neighbors[i].color == ColorValue.COLOR_1) {
                        continue;
                    }
                    break;
            }

            if (neighbors[i].visit == VisitValue.OPENED || neighbors[i].visit == VisitValue.CLOSED) {
                continue;
            }

            neighbors[i].visit = VisitValue.OPENED;
            neighbors[i].relative = current;
            queue.push(neighbors[i]);
        }
    }
    this.resetVisit();
    this.resetRelative();

    return false;
}

Grid.prototype.findWinningPath = function () {
    var color_2_sort_3;
    var color_1_sort_3;
    var color_1_sort_2 = new Array();
    var color_2_sort_2 = new Array();
    var result = {
        path: null,
        color: null,
    };

    for (var js = 0; js < this.length; js++) {
        var color_1_sort1 = new Array();
        for (var je = 0; je < this.length; je++) {
            var path = this.BFS(0, js, this.length - 1, je, ColorValue.COLOR_1);
            if (path) {
                color_1_sort1.push(path);
            }
        }
        if (color_1_sort1.length) {
            color_1_sort_2.push(this.shortPath(color_1_sort1));
        }
    }
    color_1_sort_3 = this.shortPath(color_1_sort_2);

    for (var is = 0; is < this.length; is++) {
        var color_2_sort1 = new Array();
        for (var ie = 0; ie < this.length; ie++) {
            var path = this.BFS(is, 0, ie, this.length - 1, ColorValue.COLOR_2);
            if (path) {
                color_2_sort1.push(path);
            }
        }
        if (color_2_sort1.length) {
            color_2_sort_2.push(this.shortPath(color_2_sort1));
        }
    }
    color_2_sort_3 = this.shortPath(color_2_sort_2);

    if (color_1_sort_3) {
        result.path = color_1_sort_3;
        result.color = ColorValue.COLOR_1;
        return result;
    }

    if (color_2_sort_3) {
        result.path = color_2_sort_3;
        result.color = ColorValue.COLOR_2;
        return result;
    }

    return false;
}

Grid.prototype.returnPath = function (object) {
    var path = new Array();

    path.push(object);

    while (object.relative) {
        object = object.relative;
        path.push(object);
    }

    this.resetRelative();
    return path;
}

Grid.prototype.shortPath = function (matrix) {
    var min = matrix[0];

    for (var i = 0; i < matrix.length; i++) {
        if (min >= matrix[i]) {
            min = matrix[i];
        }
    }
    return min;
}