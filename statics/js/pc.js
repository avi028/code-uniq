/* Code lines numbers for animation change */
var prod_func = 1;
var mutex_lock_1 = 2;
var if_cond_1 = 3;
var sleep_1 = 4;
var if_cond_1_end = 5;
var enqueue_func_call = 6;
var if_cond_2 = 7;
var wakeup_1 = 8;
var if_cond_2_end = 9;
var mutex_unlock_1 = 10;
var prod_func_end = 11;

var cons_func = 13;
var mutex_lock_2 = 14;
var dequeue_func_call = 15;
var if_cond_3 = 16;
var sleep_2 = 17;
var if_cond_3_end = 18;
var if_cond_4 = 19;
var wakeup_2 = 20;
var if_cond_4_end = 21;
var mutex_unlock_2 = 22;
var cons_func_end = 23;

// ace editor configuration
var editor;

//Max stack size
var queue_size = 0;

//current code line number
var code_line_itr = 0;

// Total line number of code
code_line_count=23;

// assigning unique element id's to any new div 
var id_count=0;

// FUNCTION VARIABLE TO store the interval function
var interval;

// stores last highlighted line number to remove
var line_rem_highlight =0;

// Queue object
var queue_obj=null;

// size of queue
var size=queue_size;



/**
 * Setup the editor.
 */
function setUpEditor(){
    editor = ace.edit("editor");    //the html tag with id 'editor' contains the code to be highlighted
    editor.setTheme("ace/theme/cobalt");   // set the background theme to cobalt0
    editor.getSession().setMode("ace/mode/c_cpp");  // sets the langugage for key highlight as c_cpp (both c and c++)
    editor.setReadOnly(true);   // make the code section as read only
    Range = ace.require('ace/range').Range;    // Range Object to be used to identity line of code.
    
    // removing initial line markers :: removeMarker(Marker id)
    editor.session.removeMarker(1);
    editor.session.removeMarker(2);
    
    // adding marker to each line of code.
    const r = [];
    
    for(itr=0;itr<code_line_count;itr++)
    {   
        r[itr] = new Range(itr, 0,itr, 100);    // marking the range for  code line no <itr>
        r[itr].id = editor.session.addMarker(r[itr],"foo"+(itr+1),"fullLine");  // class foo<id_count> will act as an identifire for each line
        // console.log(itr);
    }
}

// temp parent id
var temp = 'temp';

// heap parent id
var heap = 'heap';

// producer's array to hold buttons
var prod_arr=[];

// consumer array to hold buttons
var cons_arr=[];

//mutex html element
var mutex=null;

// mutex val element
var mutex_val = '';


/**
 * This function loops over each line of code in editor by checking 
 * cases according to line number. Every case highlights particular 
 * line of code, does some opeartion on data structure and changes 
 * animations accordingly.
 */
function loop() {
    if (code_line_itr != prod_func && code_line_itr != cons_func && code_line_itr != 0) {
        document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar');
    }
    queue_obj.removeHighlight();
    unhighlightBoxELement(mutex);
    document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
    switch(code_line_itr) {
        case prod_func:
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case mutex_lock_1:
            line_rem_highlight = code_line_itr;
            highlightBoxELement(mutex);
            code_line_itr++;
            break;
        case if_cond_1:
            line_rem_highlight = code_line_itr;
            highlightBoxELement(queue_obj.frontElm);
            highlightBoxELement(queue_obj.rearElm);
            if ((queue_obj.front == 0 && queue_obj.rear == queue_obj.size-2) || ((queue_obj.rear+1)%(queue_obj.size) == queue_obj.front)) {
                code_line_itr++;
            }
            else {
                code_line_itr = if_cond_1_end;
            }
            break;
        case sleep_1:
            line_rem_highlight = code_line_itr;
            for (let i=0; i<prod_arr.length; i++) {
                prod_arr[i].disabled = true;
            }
            code_line_itr++;
            break;
        case if_cond_1_end:
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case enqueue_func_call:
            line_rem_highlight = code_line_itr;
            enqueue();
            code_line_itr++;
            break;
        case if_cond_2:
            highlightBoxELement(queue_obj.frontElm);
            line_rem_highlight = code_line_itr;
            if (queue_obj.front==0) {
                code_line_itr++;
            }
            else {
                code_line_itr = if_cond_2_end;
            }
            break;
        case wakeup_1:
            line_rem_highlight = code_line_itr;
            for (let i=0; i<cons_arr.length; i++) {
                cons_arr[i].disabled = false;
            }
            code_line_itr++;
            break;
        case if_cond_2_end:
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case mutex_unlock_1:
            line_rem_highlight = code_line_itr;
            mutex.innerHTML = '';
            mutex_val = '';
            highlightBoxELement(mutex);
            code_line_itr++;
            break;
        case prod_func_end:
            line_rem_highlight = code_line_itr;
            document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar');
            code_line_itr = 0;
            playButton(0);
            disbaleCtrlButtons(play);
            disbaleCtrlButtons(step);
            break;
        case cons_func:
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case mutex_lock_2:
            line_rem_highlight = code_line_itr;
            highlightBoxELement(mutex);
            code_line_itr++;
            break;
        case dequeue_func_call:
            line_rem_highlight = code_line_itr;
            dequeue();
            code_line_itr++;
            break;
        case if_cond_3:
            highlightBoxELement(queue_obj.frontElm);
            line_rem_highlight = code_line_itr;
            if (queue_obj.front==-1) {
                code_line_itr++;
            }
            else {
                code_line_itr = if_cond_3_end;
            }
            break;
        case sleep_2:
            line_rem_highlight = code_line_itr;
            for (let i=0; i<cons_arr.length; i++) {
                cons_arr[i].disabled = true;
            }
            code_line_itr++;
            break;
        case if_cond_3_end:
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case if_cond_4:
            highlightBoxELement(queue_obj.frontElm);
            highlightBoxELement(queue_obj.rearElm);
            line_rem_highlight = code_line_itr;
            if ((queue_obj.front == 0 && queue_obj.rear == queue_obj.size-2) || ((queue_obj.rear+1)%(queue_obj.size) == queue_obj.front-1)) {
                code_line_itr++;
            }
            else {
                code_line_itr = if_cond_4_end;
            }
            break;
        case wakeup_2:
            line_rem_highlight = code_line_itr;
            for (let i=0; i<prod_arr.length; i++) {
                prod_arr[i].disabled = false;
            }
            code_line_itr++;
            break;
        case if_cond_4_end:
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case mutex_unlock_2:
            line_rem_highlight = code_line_itr;
            mutex.innerHTML = '';
            mutex_val = '';
            highlightBoxELement(mutex);
            code_line_itr++;
            break;
        case cons_func_end:
            line_rem_highlight = code_line_itr;
            document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar');
            // code_line_itr = 0;
            playButton(0);
            disbaleCtrlButtons(play);
            disbaleCtrlButtons(step);
            break;
    }  
}



/**
 * Calls enqueue method of queue_obj type
 */
function enqueue(){
    queue_obj.enqueue("x");
}



/**
 * Calls dequeue method of queue_obj type
 */
function dequeue(){
    queue_obj.dequeue();
}



/**
 * Creates array of n producer buttons and disables create producer button.
 */
function createProd() {
    var n_prod = parseInt(document.getElementById('nProd').value);
    if(Number.isInteger(n_prod) && n_prod>=0){
        prod_arr = createButtonArr(n_prod, "Producer", "pbutton", producer, "temp2", false);
        document.getElementById("nprod").disabled = true;
    }
    else{
        document.getElementById('idModalp').innerHTML = 'PLease enter a valid integer';        
        document.getElementById('idModal').style.display='block';
    }
}


/**
 * Creates array of n consumers buttons and disables create consumer button.
 */
function createCons() {
    var n_cons = parseInt(document.getElementById('nCons').value);
    if(Number.isInteger(n_cons) && n_cons>=0){
        cons_arr = createButtonArr(n_cons, "Consumer", "cbutton", consumer, "temp1", true);
        document.getElementById("ncons").disabled = true;    
    }
    else{
        document.getElementById('idModalp').innerHTML = 'PLease enter a valid integer';        
        document.getElementById('idModal').style.display='block';
    }
}


 /**
 * Sets free mutex to producer asking for it and starts code execution 
 * at start of producer function. Enables control buttons.
 * @param {string} producer - Id of producer that wants to produce item
 */
function producer(producer) {
    if (mutex.innerHTML === '') {
        mutex.innerHTML = producer;
        mutex_val = producer;
    }
    if (mutex_val === producer) {
        code_line_itr = prod_func;
    }
    EnableCtrlButtons();
}


/**
 * Sets free mutex to consumer asking for it and starts code execution 
 * at start of consumer function. Enables control buttons
 * @param {string} consumer - Id of consumer that wants to consume item.
 */
function consumer(consumer) {
    if (mutex.innerHTML === '') {
        mutex.innerHTML = consumer;
        mutex_val = consumer;
    }
    if (mutex_val === consumer) {
        code_line_itr = cons_func;
    }
    EnableCtrlButtons();
}


/**
 * Creates queue if not present already. Creates mutex box and enables 
 * create producer and consumer buttons. Enables reset button.
 */
function createQueue(){
    if (!queue_obj) {
        queue_size = parseInt(document.getElementById("max_size").value);
        if(isNaN(queue_size) && queue_size <= 0)
            alert('Error in size');
        else{
            queue_obj = new Queue(heap, queue_size,'queue');
            mutex = draw_variable("mutex",'',queue_obj.sizeElm.parentElement.parentElement.id); 
            document.getElementById("nprod").disabled = false;
            document.getElementById("ncons").disabled = false;    
        }
    }
    EnableCtrlButtons(rst);
}  



/**
 * Runs loop function every 1000 milliseconds.
 */
function loop_color(){
    interval = setInterval(loop,1000);
}



/**
 * Removes queue animation. Disables create producer and consumer 
 * buttons. Remove producers and consumers. Remove mutex element.
 */
function reset(){
    if(queue_obj!=null)
        queue_obj.remove();
    queue_obj=null;
    document.getElementById("nprod").disabled = true;
    document.getElementById("ncons").disabled = true;  
    for (let i=0; i<prod_arr.length; i++) {
        prod_arr[i].remove();
    }
    for (let i=0; i<cons_arr.length; i++) {
        cons_arr[i].remove();
    }
    document.getElementById("nprod").disabled = false;
    document.getElementById("ncons").disabled = false;
    if (mutex) {
        mutex.remove();
    }
    if(line_rem_highlight!=0)
    document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar'); 
}
// var timeout;
// window.addEventListener('resize', function(event) {
//     if(queue_obj!=null){
//  //       this.clearTimeout(timeout);
//         timeout = setTimeout(queue_obj.set_arrow_position(),1000);
//     }
// }, true);

// window.addEventListener('scroll', function (event) {
//     if (queue_obj!=null) {
//         queue_obj.front_pointer.remove();
//         queue_obj.rear_pointer.remove();
//         var arr_box_id_front;
//         var arr_box_id_rear;
//         if (queue_obj.rear == -1 || queue_obj.front == -1) {
//             arr_box_id_front = queue_obj.arrElem[0].parentElement.parentElement.id;
//             arr_box_id_rear = queue_obj.arrElem[0].parentElement.parentElement.id;    
//         }
//         else {
//             arr_box_id_front = queue_obj.arrElem[queue_obj.front].parentElement.parentElement.id;
//             arr_box_id_rear = queue_obj.arrElem[queue_obj.rear].parentElement.parentElement.id;
//         }
        
//         queue_obj.front_pointer = draw_arrow_color(arr_box_id_front,'red','red');
//         queue_obj.front_pointer.style.position='relative';        
//         queue_obj.front_pointer.style.transform = 'rotate(270deg)';

        
//         queue_obj.rear_pointer = draw_arrow_color(arr_box_id_rear,'green','green');
//         queue_obj.rear_pointer.style.position='relative';        
//         queue_obj.rear_pointer.style.transform = 'rotate(270deg)';
//         /**/ 

//         /*arrow position setting */
//         var rectBox_front;
//         var rectBox_rear;
//         if (queue_obj.rear == -1 || queue_obj.front == -1) {
//             rectBox_front = queue_obj.arrElem[0].getBoundingClientRect();
//             rectBox_rear = queue_obj.arrElem[0].getBoundingClientRect();    
//         }
//         else {
//             rectBox_front = queue_obj.arrElem[queue_obj.front].getBoundingClientRect();
//             rectBox_rear = queue_obj.arrElem[queue_obj.rear].getBoundingClientRect();
//         }
//         rectBox_front['x']-=60;
//         rectBox_rear['x']-=60;
//         queue_obj.faRectOrigin = queue_obj.front_pointer.getBoundingClientRect();
//         queue_obj.front_pointer.style.top =(rectBox_front['y']-queue_obj.faRectOrigin['y'])+55+'px';
//         queue_obj.front_pointer.style.left=rectBox_front['x']-queue_obj.faRectOrigin['x']+'px';
        
//         queue_obj.reRectOrigin = queue_obj.rear_pointer.getBoundingClientRect();
//         queue_obj.rear_pointer.style.top =(rectBox_rear['y']-queue_obj.reRectOrigin['y'])+55+'px';
//         queue_obj.rear_pointer.style.left=rectBox_rear['x']-queue_obj.reRectOrigin['x']+'px';
//     }
// });