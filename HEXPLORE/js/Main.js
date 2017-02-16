window.addEventListener('load', init, false);
document.onkeydown = document.onkeyup = document.onkeypresults = keyEvents;

var LOCK_EVENT_LISTENER = true;
var LOCK_SEARCH = false;
var LOCK_SHOW_ALL = false;

var INTERSECTED;
var SELECTED;

var grid;
var scene;
var camera;
var renderer;
var light;
var field;
var cursor;

var fieldMeshes = new Array();
var cellMeshes = new Array();
var allMeshes = new Array();

var mouseXY = new THREE.Vector2();
var centerXY = new THREE.Vector2();

var Player = {
    CELLS: 4,

    HARMFUL_MODE: false,
    COLOR_1: DefaultColor.RED,
    COLOR_2: DefaultColor.BLUE,
    COLOR_MASK: DefaultColor.GRAY,
    COLOR_CURSOR: DefaultColor.BLACK,
    WIN_COLOR: DefaultColor.WHITE,

    COLOR_1_STATE: true,
    COLOR_2_STATE: true,

    NUMBER_OF_GAMES: 0,
    CELLS_INSPECTED: 0,
    PATH_LENGTH: 0,
    CELLS_INSPECTED_AVERAGE: 0,
    PATH_LENGTH_AVERAGE: 0,
    TOTAL_PATH_LENGTH: 0,
    TOTAL_CELLS_INSPECTED: 0,

    START: function () {
        LOCK_EVENT_LISTENER = false;
        LOCK_SEARCH = false;
        LOCK_SHOW_ALL = false;

        Player.WIN_COLOR = DefaultColor.WHITE;
        Player.PATH_LENGTH = 0;
        Player.CELLS_INSPECTED = 0;

        if (Player.CELLS != grid.getSize()) {
            Player.NUMBER_OF_GAMES = 0;
            Player.TOTAL_PATH_LENGTH = 0;
            Player.TOTAL_CELLS_INSPECTED = 0;
            Player.PATH_LENGTH_AVERAGE = 0;
            Player.CELLS_INSPECTED_AVERAGE = 0;
        }

        for (var i = 0; i < allMeshes.length; i++) {
            scene.remove(allMeshes[i]);
        }

        allMeshes.length = 0;
        cellMeshes.length = 0;
        fieldMeshes.length = 0;

        allMeshes = new Array();
        cellMeshes = new Array();
        fieldMeshes = new Array();

        addCells();
        addField();
        addCursor();

        grid.resetVisit();
        grid.resetRelative();
    },
};

function init() {
    showInfo();
    addScene();
    addCells();
    addField();
    addControlPanel();
    addCursor();

    animate();

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mousedown", mouseDown);
    document.addEventListener("mouseup", mouseUp);
    document.addEventListener("wheel", mouseWheel);
    window.addEventListener("resize", resizeWindow);
}

function addControlPanel() {
    var controller = new dat.GUI({
        "width": 300,
    });

    var mapEditor = controller.addFolder("РЕДАКТОР КАРТЫ");
    var pallete = controller.addFolder("ПАЛИТРА");

    mapEditor.add(Player, "CELLS", 2, 30).name("КОЛИЧЕСТВО СОТ").onChange(function (value) {
        Player.CELLS = Math.round(value);
    });
    mapEditor.add(Player, "COLOR_1_STATE").name("ЦВЕТ #1");
    mapEditor.add(Player, "COLOR_2_STATE").name("ЦВЕТ #2");
    mapEditor.add(Player, "HARMFUL_MODE").name("БЛОКИРОВАТЬ ПУТИ");

    pallete.addColor(Player, "COLOR_1").name("ПАЛИТРА #1").onChange(function (value) {
        var color = new THREE.Color(Player.COLOR_1);
        if (color.getHex() != Player.COLOR_MASK && color.getHex() != Player.COLOR_2 && color.getHex() != Player.COLOR_CURSOR) {
            Player.COLOR_1 = color.getHex();
        } else {
            Player.COLOR_1 = Math.random() * 0xffffff;
        }
    });

    pallete.addColor(Player, "COLOR_2").name("ПАЛИТРА #2").onChange(function (value) {
        var color = new THREE.Color(Player.COLOR_2);
        if (color.getHex() != Player.COLOR_MASK && color.getHex() != Player.COLOR_1 && color.getHex() != Player.COLOR_CURSOR) {
            Player.COLOR_2 = color.getHex();
        } else {
            Player.COLOR_2 = Math.random() * 0xffffff;
        }
    });

    pallete.addColor(Player, "COLOR_MASK").name("ПАЛИТРА #3").onChange(function (value) {
        var color = new THREE.Color(Player.COLOR_MASK);

        if (color.getHex() != Player.COLOR_1 && color.getHex() != Player.COLOR_2 && color.getHex() != Player.COLOR_CURSOR) {
            Player.COLOR_MASK = color.getHex();
        } else {
            Player.COLOR_MASK = Math.random() * 0xffffff;
        }
    });

    pallete.addColor(Player, "COLOR_CURSOR").name("ПАЛИТРА #4").onChange(function (value) {
        var color = new THREE.Color(Player.COLOR_CURSOR);

        if (color.getHex() != Player.COLOR_1 && color.getHex() != Player.COLOR_2 && color.getHex() != Player.COLOR_MASK) {
            Player.COLOR_CURSOR = color.getHex();
        } else {
            Player.COLOR_CURSOR = Math.random() * 0xffffff;
        }
    });
    controller.add(Player, "START").name("СТАРТ");
}

function addScene() {
    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;
    var ASPECT_RATIO = WIDTH / HEIGHT;
    var FIELD_OF_VIEW = 45;
    var NEAR_PLANE = 1;
    var FAR_PLANE = 10000;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(FIELD_OF_VIEW, ASPECT_RATIO, NEAR_PLANE, FAR_PLANE);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);

    light = new THREE.HemisphereLight(DefaultColor.WHITE, DefaultColor.WHITE, 1);

    var container = document.getElementById("hexplore-id");
    container.insertBefore(renderer.domElement, null);

    scene.add(camera);
    scene.add(light);
}

function addField() {
    field = new Field();
    field.mesh.position.set(centerXY.x, centerXY.y, 0);

    camera.position.set(centerXY.x, centerXY.y, 500);

    allMeshes.push(field.mesh);

    scene.add(field.mesh);
}

function addCursor() {
    cursor = new Point(Player.COLOR_CURSOR, 3);

    var coordinates = grid.getXY(0, 0);
    cursor.mesh.position.set(coordinates.x, coordinates.y, 1);

    allMeshes.push(cursor.mesh);

    scene.add(cursor.mesh);
}

var Point = function (color, value) {
    var RADIUS = Math.round(((6 * (window.innerWidth / 8)) / Player.CELLS) / 4 * (Math.sqrt(3) / 2));

    this.mesh = new THREE.Object3D();

    var geom_border = new THREE.CircleGeometry(RADIUS / value + 1, 32);
    var geom_circle = new THREE.CircleGeometry(RADIUS / value, 32);

    var mat_border = new THREE.MeshLambertMaterial({
        color: DefaultColor.BLACK,
    });

    var mat_circle = new THREE.MeshLambertMaterial({
        color: color,
    });

    var mesh_border = new THREE.Mesh(geom_border, mat_border);
    var mesh_circle = new THREE.Mesh(geom_circle, mat_circle);

    this.mesh.add(mesh_border);
    this.mesh.add(mesh_circle);
}

var Field = function () {
    this.mesh = new THREE.Object3D();

    geom = new THREE.PlaneGeometry(2000, 2000, 1, 1);

    var mat_color_1 = new THREE.MeshLambertMaterial({
        color: Player.COLOR_1,
    });

    var mat_color_2 = new THREE.MeshLambertMaterial({
        color: Player.COLOR_2,
    });

    var mesh_top_left = new THREE.Mesh(geom, mat_color_1);
    mesh_top_left.position.set(-1000, 1000, 0);
    this.mesh.add(mesh_top_left);

    var mesh_top_right = new THREE.Mesh(geom, mat_color_2);
    mesh_top_right.position.set(1000, 1000, 0);
    this.mesh.add(mesh_top_right);

    var mesh_bottom_left = new THREE.Mesh(geom, mat_color_2);
    mesh_bottom_left.position.set(-1000, -1000, 0);
    this.mesh.add(mesh_bottom_left);

    var mesh_bottom_right = new THREE.Mesh(geom, mat_color_1)
    mesh_bottom_right.position.set(1000, -1000, 0);
    this.mesh.add(mesh_bottom_right);
}

function addCells() {
    var RADIUS = Math.round(((6 * (window.innerWidth / 8)) / Player.CELLS) / 4 * (Math.sqrt(3) / 2));
    grid = new Grid(Player.CELLS);

    var dx = Math.round(RADIUS + RADIUS / 2);
    var dy = Math.round((Math.sqrt(3) / 2) * RADIUS);

    for (var i = 1, x = 0, y = 0; i <= Player.CELLS; i++) {
        for (var j = 1; j <= Player.CELLS; j++) {
            var mesh_cell;


            var mesh_border = new THREE.Mesh(new THREE.CircleGeometry(RADIUS + 1, 6), new THREE.MeshLambertMaterial({
                color: DefaultColor.BLACK,
            }));

            var mesh_cell = new THREE.Mesh(new THREE.CircleGeometry(RADIUS, 6), new THREE.MeshLambertMaterial({
                color: Player.COLOR_MASK,
            }));

            /*
             if (grid.getColorValue(i - 1, j - 1) == ColorValue.COLOR_1) {
             var mesh_cell = new THREE.Mesh(new THREE.CircleGeometry(RADIUS, 6), new THREE.MeshLambertMaterial({
             color: Player.COLOR_1,
             }));
             } else {
             var mesh_cell = new THREE.Mesh(new THREE.CircleGeometry(RADIUS, 6), new THREE.MeshLambertMaterial({
             color: Player.COLOR_2,
             }));

             }
             */

            mesh_cell.position.set(x, y, 1);
            mesh_border.position.set(x, y, 1);

            grid.setXY(i - 1, j - 1, mesh_cell.position.x, mesh_cell.position.y);
            grid.setIJ(i - 1, j - 1);

            fieldMeshes.push(mesh_cell, mesh_border);
            cellMeshes.push(mesh_cell);
            allMeshes.push(mesh_cell, mesh_border);

            scene.add(mesh_border);
            scene.add(mesh_cell);

            x += dx;
            y += dy;
        }
        x = -dx * i;
        y = dy * i;
    }

    centerXY.y = (cellMeshes[Player.CELLS * Player.CELLS - 1].position.y - cellMeshes[0].position.y) / 2;
}

function addPath(array, color, value) {
    for (var i = 0; i < array.length; i++) {
        var point = new Point(color, value);
        point.mesh.position.set(array[i].x, array[i].y, 1);

        allMeshes.push(point.mesh);

        scene.add(point.mesh);
    }
}

function keyEvents(event) {
    switch (event.keyCode) {
        case 9:
            showStatistics();
            break;

        case 32:
            showAllCells();
            break;

        case 27:
            showInfo();
            break;

        case 87:
            if (camera.position.y < 500 + centerXY.y) {
                camera.position.y += 20;
            }
            break;

        case 65:
            if (camera.position.x > -500 + centerXY.x) {
                camera.position.x -= 20;
            }
            break;

        case 83:
            if (camera.position.y > -500 + centerXY.y) {
                camera.position.y -= 20;
            }
            break;

        case 68:
            if (camera.position.x < 500 + centerXY.x) {
                camera.position.x += 20;
            }
            break;
    }
}

function mouseWheel(event) {
    var delta = event.deltaY;

    if (camera.position.z + delta <= 100) {
        camera.position.z = 100;
    } else {
        if (camera.position.z + delta >= 500) {
            camera.position.z = 500;
        } else {
            if (delta > 0) {
                document.body.style.cursor = "zoom-out";
                camera.position.z += delta;
            } else {
                document.body.style.cursor = "zoom-in";
                camera.position.z += delta;
            }
        }
    }
}

function mouseMove(event) {
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouseXY, camera);

    var intersects = raycaster.intersectObjects(fieldMeshes);

    mouseXY.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseXY.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (intersects.length > 0 && !LOCK_EVENT_LISTENER) {
        INTERSECTED = intersects[0].object;
        cursor.mesh.position.set(INTERSECTED.position.x, INTERSECTED.position.y, 1);
        document.body.style.cursor = "default";
    } else {
        document.body.style.cursor = "default";
    }
}

function checkChoiceOfColor() {
    if (Player.COLOR_1_STATE && Player.COLOR_2_STATE) {
        return 1;
    } else {
        if (Player.COLOR_1_STATE && !Player.COLOR_2_STATE) {
            return 2;
        } else {
            if (!Player.COLOR_1_STATE && Player.COLOR_2_STATE) {
                return 3;
            }
        }
    }
}

function mouseDown(event) {
    switch (event.which) {
        case 1:
            var raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouseXY, camera);

            var intersects = raycaster.intersectObjects(cellMeshes);

            if (intersects.length > 0 && !LOCK_EVENT_LISTENER) {
                SELECTED = intersects[0].object;

                var i = Math.floor(cellMeshes.indexOf(SELECTED) / Player.CELLS);
                var j = cellMeshes.indexOf(SELECTED) % Player.CELLS;

                if (grid.isHidden(i, j) && (Player.COLOR_1_STATE || Player.COLOR_2_STATE)) {
                    switch (Player.HARMFUL_MODE) {
                        case false:
                            switch (checkChoiceOfColor()) {
                                case 1:
                                    grid.getColorValue(i, j) == ColorValue.COLOR_1 ? SELECTED.material.color.set(Player.COLOR_1) : SELECTED.material.color.set(Player.COLOR_2);
                                    break;
                                case 2:
                                    SELECTED.material.color.set(Player.COLOR_1);
                                    grid.setColorValue(i, j, ColorValue.COLOR_1);
                                    break;
                                case 3:
                                    SELECTED.material.color.set(Player.COLOR_2);
                                    grid.setColorValue(i, j, ColorValue.COLOR_2);
                                    break;
                            }
                            break;

                        case true:
                            switch (checkChoiceOfColor()) {
                                case 1:
                                    var count1 = 0;
                                    var count2 = 0;
                                    var neighbors = grid.getNeighbors(i, j, true);

                                    for (var k = 0; k < neighbors.length; k++) {
                                        if (neighbors[k].color == ColorValue.COLOR_1) {
                                            count1++;
                                        }

                                        if (neighbors[k].color == ColorValue.COLOR_2) {
                                            count2++;
                                        }
                                    }

                                    switch (grid.getColorValue(i, j)) {
                                        case ColorValue.COLOR_1:
                                            if (count1 > count2) {
                                                grid.setColorValue(i, j, ColorValue.COLOR_2);
                                                SELECTED.material.color.set(Player.COLOR_2)
                                            }

                                            if (count1 < count2 || count1 == count2) {
                                                grid.setColorValue(i, j, ColorValue.COLOR_1);
                                                SELECTED.material.color.set(Player.COLOR_1)
                                            }
                                            break;

                                        case ColorValue.COLOR_2:
                                            if (count2 > count1) {
                                                grid.setColorValue(i, j, ColorValue.COLOR_1);
                                                SELECTED.material.color.set(Player.COLOR_1)
                                            }

                                            if (count2 < count1 || count1 == count2) {
                                                grid.setColorValue(i, j, ColorValue.COLOR_2);
                                                SELECTED.material.color.set(Player.COLOR_2)
                                            }
                                            break;
                                    }
                                    break;

                                case 2:
                                    SELECTED.material.color.set(Player.COLOR_1);
                                    grid.setColorValue(i, j, ColorValue.COLOR_1);
                                    break;

                                case 3:
                                    SELECTED.material.color.set(Player.COLOR_2);
                                    grid.setColorValue(i, j, ColorValue.COLOR_2);
                                    break;
                            }
                            break;
                    }

                    grid.setHidden(i, j, false);
                    Player.CELLS_INSPECTED += 1;
                }
            }
            break;

        case 3:
            document.onmousemove = function (event) {
                document.body.style.cursor = "move";

                var dx = ((event.clientX / window.innerWidth) * 2 - 1) * 10;
                var dy = (-(event.clientY / window.innerHeight) * 2 + 1) * 10;

                if (camera.position.x + dx < 500 && camera.position.x + dx > -500) {
                    if (camera.position.y + dy < 500 && camera.position.y + dy > -500) {
                        camera.position.x += dx;
                        camera.position.y += dy;
                    }
                }
            }
            break;
    }
}

function mouseUp(event) {
    switch (event.which) {
        case 1:
            if (SELECTED && !LOCK_SEARCH && !LOCK_SHOW_ALL) {
                var result = grid.findWinningPath();

                if (result) {
                    switch (result.color) {
                        case ColorValue.COLOR_1:
                            Player.WIN_COLOR = Player.COLOR_1;
                            addPath(result.path, Player.COLOR_2, 3);
                            break;

                        case ColorValue.COLOR_2:
                            Player.WIN_COLOR = Player.COLOR_2;
                            addPath(result.path, Player.COLOR_1, 3);
                            break;
                    }

                    LOCK_SEARCH = true;
                    LOCK_EVENT_LISTENER = true;

                    scene.remove(cursor.mesh);

                    Player.NUMBER_OF_GAMES += 1;
                    Player.TOTAL_CELLS_INSPECTED += Player.CELLS_INSPECTED;
                    Player.TOTAL_PATH_LENGTH += result.path.length;
                    Player.PATH_LENGTH = result.path.length;
                    Player.CELLS_INSPECTED_AVERAGE = (Player.TOTAL_CELLS_INSPECTED / Player.NUMBER_OF_GAMES).toFixed(2);
                    Player.PATH_LENGTH_AVERAGE = (Player.TOTAL_PATH_LENGTH / Player.NUMBER_OF_GAMES).toFixed(2);

                    switch (result.color) {
                        case ColorValue.COLOR_1:
                            showStatistics(Player.COLOR_1);
                            break;

                        case ColorValue.COLOR_2:
                            showStatistics(Player.COLOR_2);
                            break;
                    }
                }
            }
            SELECTED = null;
            break;

        case 3:
            document.onmousemove = null;
            document.body.style.cursor = "default";
            break;
    }
}

function showAllCells() {
    if (grid.getSize() == Player.CELLS) {
        for (var k = 0; k < cellMeshes.length; k++) {
            var i = Math.floor(k / Player.CELLS);
            var j = k % Player.CELLS;

            if (grid.isHidden(i, j) && (Player.COLOR_1_STATE || Player.COLOR_2_STATE)) {
                switch (checkChoiceOfColor()) {
                    case 1:
                        grid.getColorValue(i, j) == ColorValue.COLOR_1 ? cellMeshes[k].material.color.set(Player.COLOR_1) : cellMeshes[k].material.color.set(Player.COLOR_2);
                        grid.setHidden(i, j, false);
                        break;
                    case 2:
                        cellMeshes[k].material.color.set(Player.COLOR_1);
                        grid.setColorValue(i, j, ColorValue.COLOR_1);
                        grid.setHidden(i, j, false);
                        break;
                    case 3:
                        cellMeshes[k].material.color.set(Player.COLOR_2);
                        grid.setColorValue(i, j, ColorValue.COLOR_2);
                        grid.setHidden(i, j, false);
                        break;
                }
            }
        }

        if (!LOCK_SHOW_ALL) {
            var result = grid.findWinningPath();
            if (result) {
                if (result.path.length != Player.PATH_LENGTH) {
                    LOCK_SHOW_ALL = true;
                    switch (result.color) {
                        case ColorValue.COLOR_1:
                            addPath(result.path, Player.COLOR_2, 5);
                            break;
                        case ColorValue.COLOR_2:
                            addPath(result.path, Player.COLOR_1, 5);
                            break;
                    }

                    scene.remove(cursor.mesh);
                    LOCK_EVENT_LISTENER = true;
                }
            }
        }

        if (!LOCK_SEARCH) {
            Player.CELLS_INSPECTED = 0;
            Player.PATH_LENGTH = 0;
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.render(scene, camera);
}

function resizeWindow() {
    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;

    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

function showInfo() {
    var info = document.getElementById("info-id");
    var close = document.getElementById("info-close-id");

    LOCK_EVENT_LISTENER = true;
    document.getElementById("info-id").style.display = "block";

    close.onclick = function () {
        info.style.display = "none";
        LOCK_EVENT_LISTENER = false;
    }
}

function showStatistics() {
    var statistics = document.getElementById("statistics-id");
    var close = document.getElementById("statistics-close-id");
    var color = new THREE.Color(Player.WIN_COLOR);

    document.getElementById("statistics-header-id").style.backgroundColor = color.getStyle();
    document.getElementById("area-size-id").innerText = Player.CELLS * Player.CELLS;
    document.getElementById("number-of-games-id").innerText = Player.NUMBER_OF_GAMES;
    document.getElementById("path-length-id").innerText = Player.PATH_LENGTH;
    document.getElementById("path-length-average-id").innerText = Player.PATH_LENGTH_AVERAGE;
    document.getElementById("cells-inspected-id").innerText = Player.CELLS_INSPECTED;
    document.getElementById("cells-inspected-average-id").innerText = Player.CELLS_INSPECTED_AVERAGE;
    document.getElementById("total-path-length-id").innerText = Player.TOTAL_PATH_LENGTH;
    document.getElementById("total-cells-inspected-id").innerText = Player.TOTAL_CELLS_INSPECTED;

    statistics.style.display = "block";
    close.onclick = function () {
        statistics.style.display = "none";
    }
}