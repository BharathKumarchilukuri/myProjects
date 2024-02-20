fetch("all_Tasks.json")
    .then((response) => response.json())
    .then((data) => {
        data.allTasks.forEach(element => {
            func(element);
        });
    })

    // import 'fs';
    // var data = fs.readFileSync('all_Tasks.json');
    // var jsonData = JSON.parse(data);
    // jsonData.allTasks.push({
    //     "task" : "James",
    //     "Completed" : true,
    //     "Routine" : false
    // })
//-----------------------------------------------------------------------------------------------------------------------------------
//Date-Time
var DAYS = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function date_load() {
    var date = new Date();
    let t_date = document.getElementById("t_date");
    //date
        let date_t = date.getDate() + ' ' + MONTHS[date.getMonth()] + ' ' + date.getFullYear();
    let t_day = document.getElementById("t_day");
        let day_t = DAYS[date.getDay()];
    let t_time = document.getElementById("t_time");
    let t_sec = document.getElementById("t_timesec");
    //day
        // let time_t = date.getHours() + ':' + date.getMinutes();
    //time
    t_date.innerHTML = date_t;
    t_day.innerHTML = day_t;
    setInterval(
        function(){
            var date = new Date();
            t_time.innerHTML = date.toLocaleTimeString();
            // t_time.innerHTML = date.getHours() + ':' + date.getMinutes();
            // t_sec.innerHTML = date.getSeconds();
        },1000
    );
}

function update_Phase(){
    let date = new Date();
    let greet = document.getElementById("t_day_Phase");
    let phase = "";
    if(date.getHours() < 12){
        phase = "Good Morning";
    } else if(date.getHours() > 12 && date.getHours() < 17){
        phase = "Good Afternoon";
    } else {
        phase = "Good Evening";
    }
    greet.innerHTML += phase;
    setInterval(
        function(){
            let date_phase = document.getElementsByClassName("date_phase");
            date_phase[0].style.display = "none";
        },5000
    );
}
//-------------------------------------------------------------------------------------------------------------------------------
//All Tasks

var all_Tasks = [];/*localStorage.getItem('tasks') || {
    ["Wake up!", "Gym"];
};*/
function func(data){
    var ele = JSON.stringify(data);
    ele = JSON.parse(ele);
    all_Tasks.push(ele);
}

function load(){
    let inte = setInterval(() => {
        if(all_Tasks.length != 0){
            clearInterval(inte);
            display_AllTasks();
        }
    },500);
}

function display_AllTasks(){
    var div = document.getElementById("d_AllTasks");
    div.innerHTML = "";
    if(all_Tasks.length == 0){
        let p = document.createElement("p");
        p.className = "p-2 m-2 rounded-2 text-center";
        p.id = "No_Tasks";
        p.style.fontStyle = "Italic";
        p.style.fontWeight = "thin";
        p.innerHTML = "No Tasks for you....";
        div.appendChild(p);
    } else {
        for (var t = 0; t < all_Tasks.length; t++) {
            let in_div = document.createElement('div');
            in_div.style.display = 'flex';
            in_div.className = "";
            let p = document.createElement("p");
            p.style.width = "85%";
            p.className = " p-2 border border-3 border-primary m-2 rounded-2 me-0";
            p.id = "Task" + (t+1);
            p.innerHTML = all_Tasks[t].task;
            in_div.appendChild(p);
            var btn_p = add_TaskButtons(p.id, t);
            in_div.appendChild(btn_p);
            div.appendChild(in_div);
    
            let vid = "completed_" + t;
            var c = document.getElementById(vid);
    
            if(all_Tasks[t].Completed){
                let del = document.createElement("del");
                del.className = "d-flex";
                let in_html = p.innerHTML;
                del.innerHTML = in_html;
    
                p.innerHTML = "";
                p.appendChild(del);
                if (c.classList != null) {
                    c.classList.remove("bg-danger");
                }
                c.classList.add("bg-warning");
            } else {
                let del = (p.getElementsByTagName("del"))[0];
                if(del != null){
                    let in_html = del.innerHTML;
                    p.innerHTML = in_html;
                }
                if(c.classList != null){
                    c.classList.remove("bg-warning");
                }
                c.classList.add("bg-danger");
            }
    
            vid = "routine_" + t;
            c = document.getElementById(vid);
            if(all_Tasks[t].Routine){
                if (c.classList != null) {
                    c.classList.remove("bg-danger");
                }
                c.classList.add("bg-warning");
            } else {
                if(c.classList != null){
                    c.classList.remove("bg-warning");
                }
                c.classList.add("bg-danger");
            }
        }
    }
}

function display_ComTasks(){
    display_Com_PendTasks(true);
}

function display_PendTasks(){
    display_Com_PendTasks(false);
}

function display_Com_PendTasks(status){
    var div = document.getElementById("d_AllTasks");
    div.innerHTML = "";
    //change below statement

    for (var t = 0; t < all_Tasks.length; t++) {
        if(all_Tasks[t].Completed == status){
            let in_div = document.createElement('div');
            in_div.style.display = 'flex';
            in_div.className = "";
            let p = document.createElement("p");
            p.style.width = "85%";
            p.className = " p-2 border border-3 border-primary m-2 rounded-2 me-0";
            p.id = "Task" + (t+1);
            p.innerHTML = all_Tasks[t].task;
            in_div.appendChild(p);

            var in_p = document.createElement("p");
            in_p.className = "btn btn-group p-1 m-1";
            
            // var revert_button = document.createElement('button');
            // var delete_button = document.createElement('button');

            // delete_button.className = "bi bi-trash bg-danger rounded-1";
            // revert_button.className = "bi bi-box-arrow-up-left bg-danger rounded-2";
            
            // if(status){
            //     revert_button.onclick = (t) => {
            //         console.log(t);
            //         all_Tasks[t].Completed = !(status);
            //         all_Tasks[t].Routine = status; 
            //         display_Com_PendTasks(true);
            //     }
            //     delete_button.onclick = (t) =>{
            //         console.log(t);
            //         all_Tasks.splice(t,1);
            //         display_Com_PendTasks(true);
            //     }
            // } else {
            //     revert_button.onclick = (t) => {
            //         console.log(t);
            //         all_Tasks[t].Completed = !(status);
            //         all_Tasks[t].Routine = status;
            //         display_Com_PendTasks(false);
            //     }
            //     delete_button.onclick = (t) =>{
            //         console.log(t);
            //         all_Tasks.splice(t,1);
            //         display_Com_PendTasks(false);
            //     }
            // }

            // in_p.appendChild(revert_button);
            // in_p.appendChild(delete_button);
            
            in_div.appendChild(in_p);
            div.appendChild(in_div);
        }
    }
}

function display_Routns(){
    var div = document.getElementById("d_AllTasks");
    div.innerHTML = "";
    
    var count = 0;
    for (var t = 0; t < all_Tasks.length; t++) {
        if(all_Tasks[t].Routine){
            count++;
            let in_div = document.createElement('div');
            in_div.style.display = 'flex';
            in_div.className = "";
            let p = document.createElement("p");
            p.style.width = "85%";
            p.className = " p-2 border border-3 border-primary m-2 rounded-2 me-0";
            p.id = "Task" + (t+1);
            p.innerHTML = all_Tasks[t].task;
            in_div.appendChild(p);

            var in_p = document.createElement("p");
            in_p.className = "btn btn-group p-1 m-1";
            
            var remove_ComButtons = document.createElement('button');
            remove_ComButtons.className = "bi bi-x-lg rounded-1";
            in_p.appendChild(remove_ComButtons);
            
            in_div.appendChild(in_p);
            div.appendChild(in_div);

            let vid = "routine_" + t;
            var c = document.getElementById(vid);
        }
    }
    
    if (count == 0) {
        let p = document.createElement("p");
        p.style.fontStyle = "Italic";
        p.style.fontWeight = "thin";
        p.className = " p-2 m-2 rounded-2 text-center";
        p.innerHTML = "No Daily Routines ...."
        div.appendChild(p);
    }
}

function createInput(){
    if(all_Tasks.length == 0){
        document.getElementById("No_Tasks").style.display = "none";
    }
    var p = document.createElement("p");
    p.style.width = "85%";
    p.className = "border border-3 border-primary m-2 rounded-2";
    // var button_span = document.createElement("span");
    // button_span.className = "bi bi-body-text ps-2 p-1 pe-2 bg-light";
    var input = document.createElement("input");
    input.className = "border-0 p-1 rounded-2";
    input.placeholder = "Enter your Task Here";
    input.style.width = "100%";
    input.style.backgroundColor = "aquamarine";
    // p.appendChild(button_span);
    p.appendChild(input);
    document.getElementById("d_AllTasks").appendChild(p);
    
    input.focus();
    input.onblur = function (){
        var value = input.value;
        if(value == ""){
            p.remove();
            document.getElementById("No_Tasks").style.display = "block";
        } else {
            var temp_task = {
                "task" : value,
                "Completed" : false,
                "Routine" : false
            }
            // let jsonData = JSON.parse(fs.readFileSync("all_Tasks.json"));
            // jsonData.newData = 'temp_task';
            // fs.writeFileSync("all_Tasks.json", JSON.stringify(jsonData));
            all_Tasks.push(temp_task);
            display_AllTasks();
        }
    }
}

function add_TaskButtons(task_Id, task){
    var p = document.createElement("p");
    p.className = "btn btn-group p-1 m-1";
    p.style.borderStyle = 'none';
    
    var vid = "completed_" + task;

    var c = document.createElement("button");
    c.style.borderStyle = "none";
    c.style.width = '4vw';
    c.id = vid;

    vid = "routine_" + task;

    var r = document.createElement("button");
    r.style.borderStyle = "none";
    r.style.width = '4vw';
    r.id = vid;

    vid = "delete_" + task;
    
    var d = document.createElement("button");
    d.style.borderStyle = "none";
    d.style.width = '4vw';
    d.id = vid;

    c.title = "Task 'COMPLETED'";
    c.className = "bg-danger rounded-1 bi bi-check-circle";
    c.onclick = () => {
        var tid = document.getElementById(task_Id);
        if(!(all_Tasks[task].Completed)){
            all_Tasks[task].Completed = true;
            let del = document.createElement("del");
            let in_html = tid.innerHTML;
            del.innerHTML = in_html;

            tid.innerHTML = "";
            tid.appendChild(del);
            c.classList.remove("bg-danger");
            c.classList.add("bg-warning");
            let date = new Date();
            c.title = "Task 'COMPLETED' At " + date.toLocaleTimeString().toLocaleUpperCase() + ', ' + date.toLocaleDateString().toLocaleUpperCase();
        } else {
            all_Tasks[task].Completed = false;
            let del = (tid.getElementsByTagName("del"))[0];
            if(del != null){
                let in_html = del.innerHTML;
                tid.innerHTML = in_html;
                let date = new Date();
                c.title = "Task Marked 'UNCOMPLETED' at " + date.toLocaleTimeString().toLocaleUpperCase() + ', ' + date.toLocaleDateString().toLocaleUpperCase();
            }
            c.classList.remove("bg-warning");
            c.classList.add("bg-danger");
        }
    }

    r.title = "ADD task to routine";
    r.className = "bg-danger rounded-1 bi bi-arrow-repeat";
    r.onclick = () => {
        if(r.classList.contains("bg-danger")){
            all_Tasks[task].Routine = true;
            let date = new Date();
            r.title = "Task 'ADDED' to 'ROUTINE' at " + date.toLocaleTimeString().toLocaleUpperCase() + ', ' + date.toLocaleDateString().toLocaleUpperCase();
            r.classList.remove("bg-danger");   
            r.classList.add("bg-warning");
        } else {
            all_Tasks[task].Routine = false;
            let date = new Date();
            r.title = "Task 'REMOVED' from 'ROUTINES' at " + date.toLocaleTimeString().toLocaleUpperCase() + ', ' + date.toLocaleDateString().toLocaleUpperCase();
            r.classList.remove("bg-warning");
            r.classList.add("bg-danger"); 
        }
    }

    d.title = "DELETE task";
    d.className = "bg-danger rounded-1 bi bi-trash";
    d.onclick = () => {
        all_Tasks.splice(task,1);
        display_AllTasks();
    }

    p.appendChild(c);
    p.appendChild(r);
    p.appendChild(d);
    return p;
}