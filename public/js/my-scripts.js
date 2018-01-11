var socket = io();


(function(w,h) {

    let countForInputShips = 20;
    let countOfDeadSips = 20;

    let config = {

        fieldClass: 'div-onclick',
        nameField_1: 'battlefield1',
        nameField_2: 'battlefield2',

    };

    let p1 = document.querySelector('#battlefield1');
    let p2 = document.querySelector('#battlefield2');
    for (i = 0;i < w;i++) {
        for (j = 0; j < h; j++) {
            div1 = document.createElement("div");
            div1.id = i + '-' + j + '-' + '1';
            div1.classList.add('none');
            p1.appendChild(div1);
            div2 = document.createElement("div");
            div2.classList.add('none');
            div2.id = i + '-' + j + '-' + '2';
            p2.appendChild(div2);
        }
    }
    //input(paint) ship on the 1 player's table
    //if the square is white then add class 'ship' in current square
    function inputShip(e){
        let el = document.getElementById(e.id);
        if(countForInputShips){
            if(el.classList.contains( 'none' )){
                el.classList.remove( 'none' );
                el.classList.add( 'ship' );
                countForInputShips = countForInputShips - 1;
            }else if(el.classList.contains( 'ship' )){
                el.classList.remove( 'ship' );
                el.classList.add( 'none' );
                countForInputShips = countForInputShips + 1;
            }
        }else if(el.classList.contains( 'ship' )){
            el.classList.remove( 'ship' );
            el.classList.add( 'none' );
            countForInputShips = countForInputShips + 1;
        }
    }
    //paint the square on 1 player's table('red' if other player hits, else 'gray' if other player loose)
    //if the square has class 'ship' then remove 'ship' and add class 'dead'
    //return true (hit)
    //if the square has class 'none' then remove 'none' and add class'miss'
    //return false (loose)
    function changeColor( e ) {
        let id = getAnotherElementId(e);
        let el = document.getElementById(id);
        console.log( id, el, 'element');
        if(el.classList.contains( 'ship' )){
            el.classList.remove( 'ship' );
            el.classList.add( 'dead' );
            return true;
        }else{
            el.classList.remove( 'none' );
            el.classList.add( 'miss' );
            return false;
        }
    }
    //paint the square on 2 player's table if current player hit
    function changeColorThisRed( e ) {
        let id = getAnotherElementId(e);
        let el = document.getElementById(e.id);
        console.log( id, el, 'element is red');
        el.classList.add( 'dead' );
        countOfDeadSips = countOfDeadSips - 1;
        if(countOfDeadSips === 0){
            socket.emit('win');
            alert("You wins!");
        }
    }
    //paint the square on 2 player's table if current player miss
    function changeColorThisGray( e ) {
        let id = getAnotherElementId(e);
        let el = document.getElementById(e.id);
        console.log( id, el, 'element is gray');
        if(el.classList.contains( 'none' )) {
            el.classList.remove('none');
            el.classList.add('miss');
        }
    }

    function isDivClick( e ) {
        let elParent = e.parentNode;
        if( elParent.className && (elParent.className.indexOf( config.fieldClass ) != -1) )
            if(elParent.id === config.nameField_1)
                return "1";//1 - мы находимся в battlefield1
            if(elParent.id === config.nameField_2)
                return "2";
            return "0";
    }

    function getElementForEvent(e) {
        if(window.event){
            return event.srcElement;
        }else {
            return e.target;
        }

    }

    function getAnotherElementId( e ) {
        if(e.parentNode.id === config.nameField_1){
            let eid = e.id.split("");
            eid.splice(4,1,"2");
            let id = eid.join("");
            console.log( "1->2");
            return id;
        }else{
            let eid2 = e.id.split("");
            eid2.splice(4,1,"1");
            let id2 = eid2.join("");
            console.log("2->1");
            return id2;
        }
    }



    socket.on('changeColor', function (data) {
        let dat = document.getElementById(data);
        if(changeColor( dat )) {
            console.log('if dead');
            socket.emit('dead', data);
        }else{
            console.log('if loose');
            socket.emit('loose', data);
        }
    });

    socket.on('colorRed', function (data) {
        console.log('colorRed work');
        let dataElement = document.getElementById(data);
        changeColorThisRed(dataElement);
    });

    socket.on('colorGray', function (data) {
        console.log('colorGray work');
        let dataElement = document.getElementById(data);
        changeColorThisGray(dataElement);
    });

    socket.on('gameOver', function () {
        alert('you loose!');
    });



    document.body.onclick = function ( e ) {
        let el = getElementForEvent(e);
        switch(isDivClick(el)){
            case "1": // ввод кораблей
                inputShip(el);
                break;
            case "2": //атака противника
                let data = el.id;
                socket.emit('attack',data);
                break;
            case "0":
                break;
        }
    }

})(10,10);
