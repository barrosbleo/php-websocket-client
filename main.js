'use-strict'

const frame = document.getElementById("screen");
const ctx = frame.getContext("2d");
const USER_ID = document.querySelector('#USER_ID').value;

const IDSelector = document.getElementById("IDSelector");

// std variables
var onlineUsers = [];

// player vars
var player_X;
var player_Y;
var isLoaded = 0;

function initPlayer(){
    onlineUsers.forEach(function (user){
        if(user[0] == USER_ID && isLoaded == 0){
            player_X = parseInt(user[3]);
            player_Y = parseInt(user[4]);
            isLoaded = 1;
            console.log(player_X, player_Y);
        }
    });
}

function updatePlayer(){
    onlineUsers.forEach(function (user){
        if(user[0] == USER_ID && (player_X != user[3] || player_Y != user[4])){
            connection('updateUser', [player_X,player_Y,USER_ID]);
            // player_X = user[3];
            // player_Y = user[4];
        }
    });
}




// main functionalities

function clear(){
    ctx.clearRect(0, 0, frame.width, frame.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, frame.width, frame.height);

}

function draw(){
    populate();
}

function populate(){
    onlineUsers.forEach(function(user){
        // create div for display infos
        if(!document.getElementById(user[0])){
            let div = document.createElement("div");
            div.id = user[0];
            div.style.position = "absolute";
            div.style.width = "32px";
            div.style.zIndex = "1000";
            div.style.color = "#FFFFFF";
            div.style.left = user[3] + "px";
            div.style.top = (parseInt(user[4]) - 25) + "px";
            div.style.textAlign = "center";
            let content =   '<div class="userInfos" style="margin:-50%">';
            content +=          '<p>';
            content +=              user[1];
            content +=          '</p>';
            content +=      '</div>';
            div.innerHTML= content;
            document.body.appendChild(div);
            if(user[0] == USER_ID){
                div.style.color = "green";
            }
        }else{ // update div
            let div = document.getElementById(user[0]);
            div.style.left = user[3] + "px";
            div.style.top = (parseInt(user[4]) - 25) + "px";
        }
        if(user[0] != USER_ID){
            ctx.fillStyle="#9B3AB5";

        }else{
            ctx.fillStyle="#1F3aF5";
        }
        
        ctx.fillRect(user[3], user[4], 32, 32);
        // ctx.fillRect(player_X, player_Y, 32, 32);
    });
}

function animate(){
    initPlayer();
    console.log(player_X, player_Y)
}

function cycle(){
    clear();
    draw();
    animate();
}

function keyDown(event){
    //console.log(event.keyCode);
    switch(event.keyCode){
        case 87: // w
            player_Y -= 1;
            break;
        case 83: // s
            player_Y += 1;
            break;
        case 65: // a
            player_X -= 1;
            break;
        case 68: // d
            player_X += 1;
            break;
    }
}

function connection(order, params){
    //console.log('conn');
    if(params != undefined){
        params = params.toString();
    }else{
        params = "";
    }
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        switch(order){
            case 'getUsersOnline':
                onlineUsers = [];
                let parseUsers = this.responseText.split('/');
                parseUsers.forEach(function(row){
                    onlineUsers.push(row.split('-'));
                });
                //console.log(onlineUsers[0]);
            break;
            case 'updateUser':
                //console.log(this.response);
                //console.log(params);
            break;
        }
    }
    xhttp.open("GET", "client.php/?func=" + order + "&params=" + params, true);
    xhttp.send();
}

setInterval(cycle, 100);
setInterval(function(){
    connection('getUsersOnline');
}, 100);
setInterval(function(){
    updatePlayer();
}, 100);
addEventListener('keydown', keyDown);