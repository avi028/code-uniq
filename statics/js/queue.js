/* Code lines numbers for animation change */
var enqueue_begin = 1;
var overflow_check = 2;
var enqueue_ret_err = 3;
var else_begin = 4;
var front_check = 5;
var front_update =6;
var rear_ptr_incr = 7;
var rear_value = 8;
var else_end = 9
var enque_end = 10;
var deque_begin = 12;
var underflow_check = 13;
var deque_ret_err = 14;
var else2_begin = 15;
var front_rear_condition_check = 16;
var front_rear_update = 17;
var else3 = 18;
var front_ptr_incr = 19;
var else2_end = 20;
var deque_end = 21;


// ace editor configuration
var editor;

//Max stack size
var queue_size =0;

// Total line number of code
code_line_count=21;

//current code line number
var code_line_itr = 0;

// assigning unique element id's to any new div 
var id_count=0;

// FUNCTION VARIABLE TO store the interval function
var interval;

// stores last highlighted line number to remove
var line_rem_highlight =0;

// Queue object
var queue_obj=null;

// Enqueue Value
var val;

// Dequeue value
var val2;


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

//heap  parent id
var heap = 'heap';

//constant parent id
var constants = 'constants';

//enqueue html element 
var enqValElm;

//dequeue html element
var deqValElm;

// size of queue
var sizeElm = null;
//paarent id 
var parent_id = 'variable_set';


/**
 * This function loops over each line of code in editor by checking 
 * cases according to line number. Every case highlights particular 
 * line of code, does some opeartion on data structure and changes 
 * animations accordingly.
 */
function loop() {
     if (code_line_itr != enqueue_begin && code_line_itr != deque_begin && code_line_itr!=0) {
         document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar');
    }
    queue_obj.removeHighlight();
    document.getElementById("enqueue").disabled = true;
    document.getElementById("dequeue").disabled = true;    

    switch(code_line_itr) {
        case enqueue_begin:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            enqValElm=draw_variable('value',' ',queue_obj.sizeElm.parentElement.parentElement.id);
            enqValElm.innerHTML = val;
            sizeElm=draw_variable('size',' ',queue_obj.sizeElm.parentElement.parentElement.id);
            sizeElm.innerHTML = queue_obj.size;
            code_line_itr++;
            break;
        case overflow_check:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            highlightBoxELement(queue_obj.size_val);
            highlightBoxELement(queue_obj.top_val);
            if ( queue_obj.rear == queue_obj.size -1) {
                highlightBoxELement(queue_obj.sizeElm);
                code_line_itr =enqueue_ret_err;     
            }
            else{
                code_line_itr+=2;
            }
            break;
        case enqueue_ret_err : 
             document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
             line_rem_highlight = code_line_itr;
             code_line_itr = enque_end;
             document.getElementById('id01').style.display='block';
             break;

        case else_begin:
             document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
             line_rem_highlight = code_line_itr;
             code_line_itr++;
             break;

        case front_check:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            highlightBoxELement(queue_obj.frontElm);
            if(queue_obj.front == -1)
               code_line_itr = front_update;
            else{
                code_line_itr =rear_ptr_incr;
            }  
             break;

        case front_update:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            queue_obj.front = 0;
            queue_obj.frontElm.innerHTML=queue_obj.front;
            var rectBox = queue_obj.arrElem[queue_obj.front].getBoundingClientRect();  
            queue_obj.front_pointer.style.top =rectBox['y']-queue_obj.faRectOrigin['y']+55+'px';
            queue_obj.front_pointer.style.left=rectBox['x']-queue_obj.faRectOrigin['x']+'px';         
            code_line_itr = rear_ptr_incr;
            break;
        case rear_ptr_incr:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            queue_obj.rear+=1;
            queue_obj.rearElm.innerHTML = queue_obj.rear;
            var rectBox = queue_obj.arrElem[queue_obj.rear].getBoundingClientRect();
            queue_obj.rear_pointer.style.top =(rectBox['y']-queue_obj.reRectOrigin['y'])+55+'px';
            queue_obj.rear_pointer.style.left=rectBox['x']-queue_obj.reRectOrigin['x']+'px';
            code_line_itr = rear_value;
            break;
        case rear_value:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            queue_obj.arr[queue_obj.rear]=val;
            queue_obj.arrElem[queue_obj.rear].innerHTML = val;
            highlightBoxELement(queue_obj.arrElem[queue_obj.rear]);
            code_line_itr  = else_end;
            
            break;
        case else_end:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case enque_end:
            document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar');
            line_rem_highlight = code_line_itr;
            removeBoxElm(enqValElm);
            removeBoxElm(sizeElm);
            clearInterval(interval);
            code_line_itr=0;
            playButton(0);
            disbaleCtrlButtons(play);
            disbaleCtrlButtons(step);
            document.getElementById("enqueue").disabled = false;
            document.getElementById("dequeue").disabled = false;    
            break;
        case deque_begin:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;

            deqValElm=draw_variable('deq_val',' ',queue_obj.sizeElm.parentElement.parentElement.id);
            code_line_itr++;
            break;
        case underflow_check:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            highlightBoxELement(queue_obj.frontElm);
            if(queue_obj.front==-1){
               code_line_itr++;
                }
            else {
                    code_line_itr+=2;
                }
            break;
        case deque_ret_err:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            code_line_itr = deque_end;
            //alert("Empty Queue");
            document.getElementById('id02').style.display='block';
            break;
        case else2_begin:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        
        case front_rear_condition_check:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
             if(queue_obj.front >= queue_obj.rear){
                highlightBoxELement(queue_obj.rearElm);
                code_line_itr = front_rear_update;
             }
             else{
                code_line_itr = else3;
             }
             break;
        case front_rear_update:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            queue_obj.arrElem[queue_obj.front].innerHTML = ' ';
            unhighlightBoxELement(queue_obj.arrElem[queue_obj.front]);
            val2 = queue_obj.arr[queue_obj.front];
            deqValElm.innerHTML = val2;
            
            queue_obj.front=queue_obj.rear=-1;
            queue_obj.frontElm.innerHTML=queue_obj.rear;
            queue_obj.rearElm.innerHTML=queue_obj.rear;
            var rectBox = queue_obj.arrElem[0].getBoundingClientRect();
            rectBox['x']-=60;
            queue_obj.rear_pointer.style.top =(rectBox['y']-queue_obj.reRectOrigin['y'])+55+'px';
            queue_obj.rear_pointer.style.left=rectBox['x']-queue_obj.reRectOrigin['x']+'px';
            queue_obj.front_pointer.style.top =rectBox['y']-queue_obj.faRectOrigin['y']+55+'px';
            queue_obj.front_pointer.style.left=rectBox['x']-queue_obj.faRectOrigin['x']+'px'; 
            code_line_itr = else2_end;
            break;
        case  else3:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            code_line_itr++;  
            break;
        case front_ptr_incr:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            val2 = queue_obj.arr[queue_obj.front];
            deqValElm.innerHTML = val2;
            queue_obj.arrElem[queue_obj.front].innerHTML = ' ';
            unhighlightBoxELement(queue_obj.arrElem[queue_obj.front]);
            queue_obj.front+=1;
            queue_obj.frontElm.innerHTML=queue_obj.front;
            var rectBox = queue_obj.arrElem[queue_obj.front].getBoundingClientRect();  
            queue_obj.front_pointer.style.top =rectBox['y']-queue_obj.faRectOrigin['y']+55+'px';
            queue_obj.front_pointer.style.left=rectBox['x']-queue_obj.faRectOrigin['x']+'px';  
            code_line_itr++;
            break;
        case else2_end:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case deque_end:
            document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar');
            code_line_itr=0;
            document.getElementById('dequeue_val').value = deqValElm.innerHTML;
            clearInterval(interval);
            removeBoxElm(deqValElm);
            playButton(0);
            disbaleCtrlButtons(play);
            disbaleCtrlButtons(step);
            document.getElementById("enqueue").disabled = false;
            document.getElementById("dequeue").disabled = false;    
            break;
        default:
             break;

    }  
} 


/**
 * Calls enqueue method of queue_obj type
 */
function enqueue(){
    val = parseInt(document.getElementById('enqueue_val').value);
    if(Number.isInteger(val) ){
        code_line_itr = enqueue_begin;
        loop();
        EnableCtrlButtons();
    }   
    else{
        document.getElementById('idModalp').innerHTML = 'PLease enter a valid integer';        
        document.getElementById('idModal').style.display='block';
    }     
}


/**
 * Calls dequeue method of queue_obj type
 */
function dequeue(){
   code_line_itr = deque_begin;
   document.getElementById("dequeue_val").value = '';
   loop();
   EnableCtrlButtons();
}



/**
 * Creates array of Max_size and enable enqueue dequeue and reset button.
 */
function createQueue(){
    if (!queue_obj) {
        queue_size = parseInt(document.getElementById("max_size").value);
        if(isNaN(queue_size) || queue_size <=0){
            document.getElementById('idModalp').innerHTML = 'size of the queue has to be a positive integer';
            document.getElementById('idModal').style.display='block';    
        }
        else{
            queue_obj = new Queue(heap, queue_size,'queue');
            document.getElementById("enqueue").disabled = false;
            document.getElementById("dequeue").disabled = false;    
        }
    }
  
}


/** 
* this function puts the loop() function  on interval call of 1000 milli sec
* i.e it is called after every 1000 milli sec of 1 sec
*/
function loop_color(){
    interval = setInterval(loop,1000);
}

/**
 * remove queue_obj
 * Removes queue animation. Disables enqueue dequeue buttons. 
 */
function reset(){
    if(queue_obj!=null)
        queue_obj.remove();
    queue_obj=null;
    removeBoxElm(enqValElm);
    removeBoxElm(sizeElm);
    removeBoxElm(deqValElm);
    document.getElementById("max_size").value = '';
    document.getElementById("enqueue_val").value = '';
    document.getElementById("dequeue_val").value = '';

    document.getElementById("enqueue").disabled = true;
    document.getElementById("dequeue").disabled = true;   
    if(line_rem_highlight!=0)
        document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar'); 
}
