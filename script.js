function addItem(event){
    event.preventDefault();
    let text = document.getElementById("todo-input");
    db.collection("todo-items").add({
        text : text.value,
        status : "active"
    }).then((docRef)=>{
        console.log("Id Add : ", docRef.id);
    })
    .catch((error)=>{
        console.log("error add document", error);
    })
}

function getItems(){
    db.collection("todo-items").onSnapshot((snapshot)=>{
        let items = [];
        snapshot.docs.forEach((doc)=>{
            items.push({
                id : doc.id,
                ...doc.data()
            })
        })
        generateItems(items);
    })
}

function generateItems(items){
    let itemHTML = "";
    items.forEach((item)=>{
        itemHTML += `
        <div class="todo-item">
        <div class="check">
            <div class="check-mark ${item.status == "completed" ? "checked" : ""}" data-id="${item.id}" >
                <img src="./assets/icon-check.svg" >
            </div>
        </div>
        <div class="todo-text ${item.status == "completed" ? "checked" : ""}">
            ${item.text}
        </div>
    </div>
        `
    })
    document.querySelector('.todo-items').innerHTML = itemHTML;
    createEventListeners();
}

function createEventListeners(){
    let todoCheckMarks = document.querySelectorAll('.todo-item .check-mark');
    todoCheckMarks.forEach((checkmark)=>{
        checkmark.addEventListener("click", ()=>{
            markComplated(checkmark.dataset.id);
        })
    })
}

function markComplated(id){
    let item = db.collection("todo-items").doc(id);
    item.get().then((doc)=>{
        if(doc.exists){
            let status = doc.data().status;
            if(status == "active"){
                item.update({
                    status : "completed"
                })
                getItems();
            }else if(status == "completed"){
                item.update({
                    status : "active"
                })
                getItems();
            }
        }else{
            console.log("data tidak ada");
        }
    })
}

getItems();