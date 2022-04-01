let socket = io();
let chat = document.getElementById('chat')
let user;
let log = document.getElementById('log');

Swal.fire(
    {
        title: "Identificate",
        input: "text",
        allowOutsideClick: false,
        inputValidator: (value) => {
            return !value && 'Escribe tu nombre de usuario'
        }
    }).then(result=>{
        user = result.value;
        console.log(user);
    })

    chat.addEventListener('keyup', evt=>{
        if(evt.key==="Enter"){
            if(chat.value.trim().length>0){
                socket.emit('message',{user, message:chat.value.trim()})
                    chat.value=('')
            }
        }
    })

    socket.on('log', data=>{
        let messages="";
        data.forEach(log=>{
            messages = messages + `${log.user} dice: ${log.message}</br>`
        })
        log.innerHTML=messages;
    })