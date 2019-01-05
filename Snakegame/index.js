(function () {
    var snakeObj = {
        x : 49,
        y : 30,
        direction:'',
        length:1
    }
    var eggObj = {
        y:70,
        x : 49
    }
    var activeCells = [getObjId({x:snakeObj.x,y:snakeObj.y-2}), getObjId({x:snakeObj.x,y:snakeObj.y-1}), getObjId(snakeObj)];
    var keys = {'ArrowUp' : 1, 'ArrowLeft' : -2, 'ArrowDown' : -1,'ArrowRight' : 2}
    function checkEgg(tempObj) {
        if(tempObj.x === eggObj.x && tempObj.y === eggObj.y){
            snakeObj.length++;
            var eggId = getObjId(eggObj);
            document.getElementById(eggId).className = 'cell';
            eggObj = getEggObj();
            eggId = getObjId(eggObj);
            document.getElementById(eggId).className = 'eggCell';
        }
    }
    function getEggObj() {
        var x = Math.floor(Math.random() * 100);
        var y = Math.floor(Math.random() * 100);
        var tempId = getObjId({x,y});
        if((eggObj.x == x && eggObj.y == y) || activeCells.indexOf(tempId) > -1){
            return getEggObj();
        }
        return {x,y};
    }
    function getObjId(obj) {
        return 'row#' + obj.x + 'col#' + obj.y
    }
    function setCells(tempObj) {
        var tempId = getObjId(tempObj);
        if(activeCells.indexOf(tempId) > -1){
            snakeObj.direction = '';
            alert('you lost!!');
            return;
        }
        checkEgg(tempObj);
        document.getElementById(tempId).className = 'activeCell';
        activeCells.push(tempId);

        if(snakeObj.length < activeCells.length){
            var id = activeCells.shift();
            document.getElementById(id).className = 'cell';
        }
        snakeObj.x = tempObj.x;
        snakeObj.y = tempObj.y;
    }
    window.addEventListener('keydown',function (event) {
        var keyDirection = keys[event.key];
        if(keyDirection && Math.abs(keyDirection) !== Math.abs(snakeObj.direction)){
            snakeObj.direction = keys[event.key];
            render();
        }
        if(event.key == " "){
            snakeObj.direction = '';
        }
    })
    var render = function () {
        var tempObj = {...snakeObj};
        switch (snakeObj.direction) {
            case 1: //up
                tempObj.x--;
                if(tempObj.x < 0){
                    tempObj.x += 100;
                }
                setCells(tempObj);
            break;
            case -1: //down
                tempObj.x++;
                if(tempObj.x > 99){
                    tempObj.x -= 100;
                }
                setCells(tempObj);
            break;
            case -2: //left
                tempObj.y--;
                if(tempObj.y < 0){
                    tempObj.y += 100;
                }
                setCells(tempObj);
            break;
            case 2: //right
                tempObj.y++;
                if(tempObj.y > 99){
                    tempObj.y -= 100;
                }
                setCells(tempObj);
            break;
            default:
                break;
        }
    };
    setInterval(render,100)
    window.addEventListener('load',function () {
        var board = document.getElementById('board');
        var eggId = getObjId(eggObj);
        for (let row = 0; row < 100; row++) {
            var rowElement = document.createElement('tr');            
           for (let column = 0; column < 100; column++) {
            var cell = document.createElement('td')
            var id = getObjId({x:row,y:column});
            cell.setAttribute('id',id);
            if(activeCells.indexOf(id) !== -1){
                cell.setAttribute('class','activeCell');
            }else if(id == eggId){
                cell.setAttribute('class','eggCell');
            }else{
                cell.setAttribute('class','cell');
            }
            rowElement.appendChild(cell);
           }
           board.appendChild(rowElement);
        }
    })
})();
