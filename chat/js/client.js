console.log("file is connected");
const socket=io('http://localhost:8000');
const form = document.getElementById("sendcontainer");
const messageinput = document.getElementById("messageinp");
const messagecontainer = document.querySelector(".bigcontainer");
const contactcontainer = document.querySelector(".contactcontainer");
var sound=new Audio("sound.mp3");
let number=+91-807-788-2109;
var contact;
//populating the contacts
var contacts=["jatin","shambhavi","aditya","abhishek","saral"];

contacts.forEach((element)=>{
    const contactelement=document.createElement("a");
    contactelement.addEventListener("click",(e)=>{
        contact=element;
        socket.emit("getchat",contact);
    });
    contactelement.innerText=element;
    contactelement.classList.add('contact');
    contactelement.classList.add('my-1');
    contactcontainer.append(contactelement);
    console.log("appendcontact");
});


//socket.io work
const name=prompt("enter your name to join");
document.getElementById("topname1").innerHTML=`${name}`;

const append=(message,position)=>{
    const messageelement=document.createElement('div')
    messageelement.innerText=message;
    if(position!="main"){
        messageelement.classList.add('message');
        messageelement.classList.add('my-1');
        messageelement.classList.add(position);
        messagecontainer.append(messageelement);
        if(position=='left'){
            sound.play();
        }
    }
    else{
        messageelement.classList.add('topname');
        messagecontainer.append(messageelement);

    }

};

document.getElementById("call").addEventListener('click',e=>{

    e.href=`tel:${number}`;
});

form.addEventListener('submit',(e)=>{
    e.preventDefault;
    // const message=messageinput.value;
    append(`You: ${messageinput.value}`,"right");
    //console.log(message);
    socket.emit('send',{message:messageinput.value,name:contact});
    messageinput.value="";

});


socket.emit('new-user-joined',name);

// socket.on('user-joined',name =>{
//     append(`${name} joined the chat`,"center");

// })
socket.on('takethis',function(array){

        // first remove everything
        var bigcontainer=document.getElementById("bigcontainer");
        console.log(bigcontainer.childElementCount);
        bigcontainer.innerHTML="";
        append(`${contact}`,"main");
    
        array.forEach(element=>{
            if(element.position=="left"){
                append(`${element.with}: ${element.message}`,"left");
    
            }
            else{
                append(`you:${element.message}`,"right");
    
            }
        })
    
    })

socket.on('receive',data =>{
    if(data.name==contact){
    append(`${data.name}: ${data.messages}`,"left");
    }

})
// socket.on('leave',data =>{
//     append(`${data} has left the chat`,"center");

// })

