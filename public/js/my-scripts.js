var socket = io();


(function(w,h) {


    let config = {

        fieldClass: 'div-onclick',
        nameField_1: 'battlefield1',
        nameField_2: 'battlefield2',

    };

    let p1map = ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~"];

    let p2map = ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~"];


    let p1 = document.querySelector('#battlefield1');
    let p2 = document.querySelector('#battlefield2');
    for (i = 0;i < w;i++) {
        for (j = 0; j < h; j++) {
            div1 = document.createElement("div");
            div1.id = i + '-' + j + '-' + '1';
            if (p1map[i][j] === 's') {
                div1.classList.add('s');
            } else {
                div1.classList.add('none');
            }
            p1.appendChild(div1);
            div2 = document.createElement("div");
            if (p2map[i][j] === 's') {
                div2.classList.add('s');
            } else {
                div2.classList.add('none');
            }

            div2.id = i + '-' + j + '-' + '2';
            p2.appendChild(div2);
        }
    }


    function getElementForEvent(e) {
        if(window.event){
            return event.srcElement;
        }else {
            return e.target;
        }
        
    }

    function changeColorThisRed( e ) {
        let id = getAnotherElementId(e);
        let el = document.getElementById(e.id);
        console.log( id, el, 'element is red');
        el.classList.add( 'dead' );
    }

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

    function inputShip(e){
        let el = document.getElementById(e.id);
        if(el.classList.contains( 'none' )){
            el.classList.remove( 'none' );
            el.classList.add( 'ship' );
        }else{
            el.classList.add( 'none' );
        }
    }

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
