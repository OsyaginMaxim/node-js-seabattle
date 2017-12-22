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
                div1.classList.add('w');
            }
            p1.appendChild(div1);
            div2 = document.createElement("div");
            if (p2map[i][j] === 's') {
                div2.classList.add('s');
            } else {
                div2.classList.add('w');
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

    function changeColor( e ) {
        let id = getAnotherElementId(e);
        console.log(document.querySelector("body"));
        let el = document.getElementById(id);

        console.log( id, el, 'element');


        if(el.classList.contains( 'm' )){
            el.classList.remove( 'm' );
            el.classList.add( 'd' )
        }else{
            el.classList.add( 'g' );
        }
    }

    function changeColorThis( e ) {
        let id = getAnotherElementId(e);
        console.log(document.querySelector("body"));
        let el = document.getElementById(e.id);

        console.log( id, el, 'element');


        if(el.classList.contains( 's' )){
            el.classList.remove( 's' );
        }else{
            el.classList.add( 'd' );
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

    socket.on('changeColor', function (data) {
        let dat = document.getElementById(data);
        changeColor( dat );
    });

    function inputShip(e){
        console.log(document.querySelector("body"));
        let el = document.getElementById(e.id);

        console.log( el, 'element');

        if(el.classList.contains( 'w' )){
            el.classList.remove( 'w' );
            el.classList.add( 'm' );
        }else{
            el.classList.add( 'w' );
        }
    }

    document.body.onclick = function ( e ) {
        let el = getElementForEvent(e);
        switch(isDivClick(el)){
            case "1": // ввод караблей
                inputShip(el);
                break;
            case "2": //атака противника
                let data = el.id;
                socket.emit('attack',data);
                changeColorThis(el);
                break;
            case "0":
                break;

        }
        
    }

})(10,10);
