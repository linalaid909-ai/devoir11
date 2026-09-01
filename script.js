const taskInput=document.getElementById("taskInput");

const addButton=document.getElementById("addButton");

const taskList=document.getElementById("taskList");

const taskCount=document.getElementById("taskCount");

const clearButton=document.getElementById("clearButton");

//  Bonne pratique : les différents éléments HTML nécessaires sont récupérés au début du script.

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

//  Excellent bonus : utilisation de localStorage pour conserver les tâches après actualisation de la page.

function saveTasks(){

localStorage.setItem("tasks",JSON.stringify(tasks));

}

//  Bonne séparation des responsabilités : une fonction dédiée à la sauvegarde.

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

//  Bonne gestion de l'état terminé/non terminé grâce à la propriété completed.

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

//  Très bonne utilisation de l'événement "change" pour gérer la case à cocher.

const text=document.createElement("span");

text.className="task-text";

text.textContent=task.text;

//  Bonne utilisation de textContent pour insérer le texte de la tâche.

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

//  La suppression est correctement synchronisée avec localStorage.

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

//  Très bonne vérification : une tâche vide ne peut pas être ajoutée.

tasks.push({

text:text,

completed:false

});

saveTasks();

displayTasks();

taskInput.value="";

taskInput.focus();

//  Très bonne attention à l'expérience utilisateur : le focus revient automatiquement dans le champ.

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

//  Excellent : le compteur est dynamique et prend en compte uniquement les tâches restantes.

addButton.addEventListener("click",addTask);

taskInput.addEventListener("keydown",(event)=>{

if(event.key==="Enter"){

addTask();

}

});

//  Bonus très intéressant : l'utilisateur peut également ajouter une tâche avec la touche Entrée.

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

//  Très bonne protection avec confirm() avant de supprimer toutes les tâches.

displayTasks();

/*
 Félicitations !

Votre JavaScript est particulièrement réussi.
Vous avez largement dépassé les fonctionnalités minimales demandées dans le devoir :

✔ Ajout des tâches
✔ Suppression individuelle
✔ Suppression de toutes les tâches
✔ Tâches terminées
✔ Compteur dynamique
✔ localStorage
✔ Ajout avec la touche Entrée
✔ Vérification des champs vides
✔ Message lorsque la liste est vide

Le code montre une très bonne compréhension de la manipulation du DOM et des événements JavaScript.

Continuez dans cette direction : vous avez de très bonnes bases pour réaliser des applications JavaScript encore plus complètes !
*/