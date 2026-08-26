const taskInput=document.getElementById("taskInput");
const addButton=document.getElementById("addButton");
const taskList=document.getElementById("taskList");
const taskCount=document.getElementById("taskCount");
const clearButton=document.getElementById("clearButton");

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function displayTasks(){
taskList.innerHTML="";
if(tasks.length===0){
const emptyMessage=document.createElement("li");
emptyMessage.className="empty-message";
emptyMessage.textContent="🎉 Aucune tâche pour le moment !";
taskList.appendChild(emptyMessage);
}else{
tasks.forEach((task,index)=>{
const li=document.createElement("li");
li.className="task";
if(task.completed){
li.classList.add("completed");
}
const content=document.createElement("div");
content.className="task-content";
const checkbox=document.createElement("input");
checkbox.type="checkbox";
checkbox.className="task-checkbox";
checkbox.checked=task.completed;
checkbox.addEventListener("change",()=>{
tasks[index].completed=checkbox.checked;
saveTasks();
displayTasks();
});
const text=document.createElement("span");
text.className="task-text";
text.textContent=task.text;
content.appendChild(checkbox);
content.appendChild(text);
const deleteButton=document.createElement("button");
deleteButton.className="delete-button";
deleteButton.textContent="🗑️";
deleteButton.addEventListener("click",()=>{
tasks.splice(index,1);
saveTasks();
displayTasks();
});
li.appendChild(content);
li.appendChild(deleteButton);
taskList.appendChild(li);
});
}
updateCounter();
}

function addTask(){
const text=taskInput.value.trim();
if(text===""){
alert("⚠️ Écris une tâche avant de l'ajouter !");
return;
}
tasks.push({
text:text,
completed:false
});
saveTasks();
displayTasks();
taskInput.value="";
taskInput.focus();
}

function updateCounter(){
const remaining=tasks.filter(task=>!task.completed).length;
if(remaining===0){
taskCount.textContent="🎉 Toutes les tâches sont terminées !";
}else if(remaining===1){
taskCount.textContent="1 tâche restante";
}else{
taskCount.textContent=remaining+" tâches restantes";
}
}

addButton.addEventListener("click",addTask);

taskInput.addEventListener("keydown",(event)=>{
if(event.key==="Enter"){
addTask();
}
});

clearButton.addEventListener("click",()=>{
if(tasks.length===0){
return;
}
if(confirm("Voulez-vous vraiment supprimer toutes les tâches ?")){
tasks=[];
saveTasks();
displayTasks();
}
});

displayTasks();