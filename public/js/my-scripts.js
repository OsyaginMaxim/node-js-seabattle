var socket = io();


(function(w,h) {


    let config = { /// <---- вот тут вот моно прописы классы и id на который строяться твои поля

        fieldClass: 'div-onclick', /// Класс который ты присвоил полям,
        nameField_1: 'battlefield1', /// ID который вы дали первому полю,
        nameField_2: 'battlefield2', /// ID который вы дали второму полю,

    }

    let p1map = ["~", "~", "s", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~"];

    let p2map = ["~", "s", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~",
        "~", "~", "~", "~", "~", "~", "~", "~", "~", "~"];

    /*var isnotkillship = function(point){
        var p = JSON.parse(point);
        //console.log(p);
        var str = p.pound;
        //console.log(str);
        var arr = str.split('');
        var i1 = arr.slice(0,1);
        var j1 = arr.slice(2,3);
        if(p1map[i1][j1] === 's'){
            //console.log(p1map[i1][j1]);
            return false;
        }else{
            //console.log(p1map[i1][j1]);
            return true;
        }

    };*/

    // if p1map[i][j] === 's'
    //let drowshipkill =


    let p1 = document.querySelector('#battlefield1');//.player1 > #battlefield1');
    let p2 = document.querySelector('#battlefield2');//.player2 > #battlefield2');
    //console.log(p2map);
    for (i = 0;i < w;i++)
        for (j = 0;j < h;j++){
            div1 = document.createElement("div");
            div1.id = i + '-' +j + '-' + '1';
            //div1.className = (p1map[i][j] === 's') ? 's': 'w'; //p1map[i*w+j]
            if (p1map[i][j] === 's'){
                div1.classList.add('s');
            }else{
                div1.classList.add('w');
            }
            //на div1 нужно поставить обработчик onclick,
            // который будет устанавливать значения палуб т.е. p1map[i][j] = 's';
            p1.appendChild(div1);
            div2 = document.createElement("div");
            //div2.classList.add('div-onclick');
            // p2map.splice(1,1,'~'); - удаление эл-та на месте i=0,j=1 и замена его на другое значение
            /*div2.className = (p2map[i][j] === 's') ? 's': 'w'; //p2map[i*w+j]*/
            if (p2map[i][j] === 's'){
                div2.classList.add('s');
            }else{
                div2.classList.add('w');
            }

            div2.id = i + '_' +j + '-' + '2';
            p2.appendChild(div2);
          /*  div2.onclick = function () {
                let ship = {};
                ship ['pound'] = this.id;
                //console.log(ship);
                let stringJSON = JSON.stringify(ship);
                //console.log(stringJSON);
                socket.emit('fire', stringJSON);
                socket.on('isKill', function (data) {
                    console.log(isnotkillship(data));
                    if(isnotkillship(data)){
                        socket.emit('notkill', data);
                        console.log(data);
                    }else {
                        console.log(data);
                        socket.emit('kill', data);
                    }
                });
                socket.on('drowshipkill', function (data) {
                    console.log('kill');
                    drowshipkill(data);


                });
                socket.on('drowshipnotkill', function (data) {


                });



            };*/  //first onclick
        }



        /*let drowshipkill = function (data) {
            let p = JSON.parse(data);
            let str = p.pound;
            var arr = str.split('');
            console.log(arr);
            arr.splice(4,1,'1');
            console.log(arr);
            str = arr.join('');

            console.log(typeof(str));
            console.log(str);
            let divC = document.getElementById(str);
            //divC.className = 'd';
            console.log(divC.className);
            return true;

        }*/  // drowshipkiil function

    //another way
    function getElementForEvent(e) {
        if(window.event){
            return event.srcElement;
        }else {
            return e.target;
        }
        
    }

    function changeColor( e ) {  /// Функция которая меняет цвет, можешь назвать ее по другому но думаю логику поймешь
        let id = getAnotherElementId(e);
        let el = document.getElementById(id);
        console.log(el);


        if(el.classList.contains( 's' )){ /// Проверяем на наличие
            el.classList.remove( 's' ); /// Удаляем класс
        }else{
            el.classList.add( 'd' ); /// Добавляем класс
        }
    }


    function isDivClick( e ) {
        let elParent = e.parentNode;
        if( elParent.className && (elParent.className.indexOf( config.fieldClass ) != -1) ) return true;
    }

    function getAnotherElementId( e ) { /// <--- ВСЯ МАГИЯ ТУТ. Меняем id с первого на второй или на обарот.
        return (e.parentNode.id === config.nameField_1) ? /// Условие
            e.id.replace(config.nameField_1, config.nameField_2): /// Если
            e.id.replace(config.nameField_2, config.nameField_1); /// Иначи
    }

    document.body.onclick = function ( e ) {
        let el = getElementForEvent(e);

        if(isDivClick(el)){

            let data = JSON.stringify(el);
            console.log(el);
            socket.emit('attack',data);
            socket.on('changeColor', function (data) {
                JSON.parse(data);
                changeColor( el );
            });
            //перед всем этим необходимо передать все это на сервер, чтоб менять цвет палубы не у нападающего,
            //а у соперника
            //сделать эмит и его обработчик
            //он будет создавать объект JSON и отправлять полученный елемент длугому игроку,
            //затем его обработкик будет получать этот элемент и парсить его
        }
        
    }

})(10,10);
