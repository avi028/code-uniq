/* Code lines numbers for animation change */
insert_func_begin = 1;
insert_while_start=2;
head_to_headNext = 4;
decrement_pos_val = 5;
insert_while_end=6;
if_pos_val_check = 7;
if_pos_val_check_true = 8;
if_pos_val_check_end=9;
create_new_node = 10;
set_new_node_data = 11;
set_new_node_next = 12;
set_head_new_node=13;
insert_func_return = 14;
insert_func_end=15;


del_func_start =17;
del_while_start =18;
del_while_head_to_head_next=19;
del_while_end=20;
del_if_head_null=21;
del_if_head_null_true=22;
del_temp_to_head=23;
del_head_to_head_next=24;
del_free_temp=25;
del_return=26;
del_func_end = 27;
// ace editor configuration
var editor;

//current code line number
var code_line_itr = 0;

line_rem_highlight=0;
// Total line number of code
var code_line_count=32;

// assigning unique element id's to any new div 
var id_count=0;

// FUNCTION VARIABLE TO store the interval function
var interval;

// stores last highlighted line number to remove
var line_rem_highlight;

// parent id initialisation
var parent_id = 'variable_set';

//parent id temp
var temp = 'temp';

//parent id heap
var heap = 'heap';

//parent id constants
var constants = 'constants'

// linked list object initialisation
var linkedListObj = null;

//insert value variable
var insert_val;

//insert position variable
var insert_pos;

// insert value html element 
var insert_valElm;

//inser value position element 
var insert_posElm;

//delete value variable
var del_var;

// delete value html element
var del_varElm;

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
// insert between iteration variable
var insert_while_itr;

// delete between iteration variable
var del_while_itr;

//insert position variable
var insert_pos_storage;

//delete position variable
var del_pos_storage;

// header pos identifier
var header_pos ;
/**
 * This function loops over each line of code in editor by checking 
 * cases according to line number. Every case highlights particular 
 * line of code, does some opeartion on data structure and changes 
 * animations accordingly.
 */
function loop() {
    if (code_line_itr != insert_func_begin && code_line_itr != 0 && code_line_itr!=del_func_start) {
        document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar');
    }
    unhighlightBoxELement(insert_posElm);
    unhighlightBoxELement(insert_valElm);
    unhighlightBoxELement(del_varElm);
    linkedListObj.removeHighlight();
    
    if(code_line_itr<=code_line_count){
        document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');        
    }

    switch(code_line_itr) {
        case insert_func_begin:
            line_rem_highlight=code_line_itr;
            insert_valElm = draw_variable('new_data',insert_val,temp);
            insert_posElm = draw_variable('pos',insert_pos,temp);
            if(insert_pos > linkedListObj.size)
                insert_pos_storage = linkedListObj.size;
            else
                insert_pos_storage = insert_pos;
            code_line_itr=insert_while_start;
            insert_while_itr=0;
            break;
        case insert_while_start:
            line_rem_highlight=code_line_itr;
            highlightBoxELement(insert_posElm);
            highlightBoxELement(linkedListObj.box_list[insert_while_itr]);

            if(insert_pos<=0){
                code_line_itr=insert_while_end;
            }
            else if(insert_while_itr==linkedListObj.size){
                code_line_itr=insert_while_end;
            }
            else{
                code_line_itr=head_to_headNext;
                header_pos = insert_while_itr;
            }
            break;
        case head_to_headNext:
            line_rem_highlight=code_line_itr;
            highlightBoxELement(linkedListObj.box_list[insert_while_itr]);
            highlightBoxELement(linkedListObj.box_list[insert_while_itr+1]);
            code_line_itr = decrement_pos_val;
            break;
        case decrement_pos_val:
            line_rem_highlight=code_line_itr;
            insert_pos-=1;
            insert_posElm.innerHTML = insert_pos;
            highlightBoxELement(insert_posElm);
            insert_while_itr+=1;
            code_line_itr=insert_while_start;
            break;
        case insert_while_end:
            line_rem_highlight=code_line_itr;
            code_line_itr = if_pos_val_check;            
            break;
        case if_pos_val_check:
            line_rem_highlight=code_line_itr;
            highlightBoxELement(insert_posElm);
            if(insert_pos==0)
                code_line_itr = create_new_node;            
            else{
                code_line_itr = if_pos_val_check_true;
            }
            break;
        case if_pos_val_check_true:
            line_rem_highlight=code_line_itr;
            code_line_itr = if_pos_val_check_end;            
            break;
        case if_pos_val_check_end:
            removeBoxElm(insert_posElm);
            removeBoxElm(insert_valElm);
            code_line_itr=insert_func_end+1;
            document.getElementById('id01').style.display='block';
            document.getElementById('id01p').innerHTML='pos out of bound';
            resetCanvas();
            break;
        case create_new_node:
            line_rem_highlight=code_line_itr;

            linkedListObj.insertAtPos_noappend(insert_val,insert_pos_storage);
            linkedListObj.box_list[linkedListObj.box_list.length-1].classList.add('hide_box');
            linkedListObj.arrow_list[linkedListObj.arrow_list.length-1].classList.add('hide_box');
            linkedListObj.insertTempAtPos(insert_pos_storage);
            highlightBoxELement(linkedListObj.tempBox);

            code_line_itr = set_new_node_data;
            break;
        case set_new_node_data:
            line_rem_highlight=code_line_itr;

            linkedListObj.tempBox.innerHTML = insert_val;
            highlightBoxELement(linkedListObj.tempBox);
            highlightBoxELement(insert_valElm);            

            code_line_itr=set_new_node_next;
            break;
        case set_new_node_next:
            line_rem_highlight=code_line_itr;

            linkedListObj.box_list[linkedListObj.box_list.length-1].classList.remove('hide_box');
            linkedListObj.arrow_list[linkedListObj.arrow_list.length-1].classList.remove('hide_box');
            linkedListObj.appendArray();
            linkedListObj.setArrowPost(insert_pos_storage);
            linkedListObj.box_list[insert_pos_storage].classList.add('hide_box');
            if(linkedListObj.size-1<insert_pos_storage+1)
                linkedListObj.arrow_list[insert_pos_storage-1].classList.add('hide_box');

            highlightBoxELement(linkedListObj.box_list[header_pos]);
            code_line_itr=set_head_new_node;
            break;
        case set_head_new_node:
            line_rem_highlight=code_line_itr;

            linkedListObj.setArrowPre(insert_pos_storage);
            if(linkedListObj.size-1<insert_pos_storage+1)
                linkedListObj.arrow_list[insert_pos_storage-1].classList.remove('hide_box');

            highlightBoxELement(linkedListObj.box_list[header_pos]);
            code_line_itr=insert_func_return;
            break;
        case insert_func_return:
            line_rem_highlight=code_line_itr;

            linkedListObj.resetArrowPre(insert_pos_storage);
            linkedListObj.resetArrowPost(insert_pos_storage);
            linkedListObj.tempBox.remove();
            linkedListObj.box_list[insert_pos_storage].classList.remove('hide_box');

            code_line_itr = insert_func_end;
            break;
        case insert_func_end:

            removeBoxElm(insert_posElm);
            removeBoxElm(insert_valElm);
            code_line_itr=insert_func_end+1;
            clearInterval(interval);
            playButton(0);
            disbaleCtrlButtons(play);
            disbaleCtrlButtons(step);
            break;
        case del_func_start:
            line_rem_highlight=code_line_itr;
            del_varElm = draw_variable('data',del_var,temp);
            
            del_while_itr=1;
            del_pos_storage=0;
            code_line_itr = del_while_start;
            break;
        case del_while_start:
            line_rem_highlight=code_line_itr;
            highlightBoxELement(linkedListObj.box_list[del_while_itr]);
            highlightBoxELement(del_varElm);
            if(del_while_itr==linkedListObj.size)
                code_line_itr = del_while_end;
            else if(linkedListObj.arr[del_while_itr-1]==del_var){
                del_pos_storage = del_while_itr;
                code_line_itr = del_while_end;
            }
            else
                code_line_itr = del_while_head_to_head_next;
            break;
        case del_while_head_to_head_next:
            line_rem_highlight=code_line_itr;
            highlightBoxELement(linkedListObj.box_list[del_while_itr]);
            highlightBoxELement(linkedListObj.box_list[del_while_itr+1]);
            del_while_itr+=1;

            code_line_itr = del_while_start;
            break;
        case del_while_end:
            line_rem_highlight=code_line_itr;

            code_line_itr = del_if_head_null;
            break;
        case del_if_head_null:
            line_rem_highlight=code_line_itr;
            highlightBoxELement(linkedListObj.box_list[del_while_itr]);

            if(del_while_itr==linkedListObj.size)
                code_line_itr = del_if_head_null_true;
            else
                code_line_itr = del_temp_to_head;
            break;
        case del_if_head_null_true:
            removeBoxElm(del_varElm);
            document.getElementById('id01p').innerHTML='data not found';
            document.getElementById('id01').style.display='block';
            resetCanvas();
            break;
        case del_temp_to_head:
            line_rem_highlight=code_line_itr;

            linkedListObj.insertTempAtPos(del_pos_storage-1);
            highlightBoxELement(linkedListObj.tempBox);
            highlightBoxELement(linkedListObj.box_list[del_while_itr]);
            linkedListObj.tempBox.innerHTML = linkedListObj.box_list[del_pos_storage-1].innerHTML;
            linkedListObj.setArrowPost(del_pos_storage-1);

            code_line_itr = del_head_to_head_next;
            break;
        case del_head_to_head_next:
            line_rem_highlight=code_line_itr;
            highlightBoxELement(linkedListObj.box_list[del_while_itr-1]);
            if(linkedListObj.box_list.length >(del_while_itr+1))
               highlightBoxELement(linkedListObj.box_list[del_while_itr+1]);        
            linkedListObj.resetArrowPost(del_pos_storage-1);
            linkedListObj.box_list[del_pos_storage].classList.add('hide_box');
            if(linkedListObj.arrow_list.length == del_pos_storage)
                linkedListObj.arrow_list[del_pos_storage-1].classList.add('hide_box');
            code_line_itr = del_free_temp;
            break;
        case del_free_temp:
            line_rem_highlight=code_line_itr;
            linkedListObj.box_list[del_pos_storage].classList.remove('hide_box');
            linkedListObj.delete(del_var);
            linkedListObj.tempBox.remove();
            code_line_itr = del_return;
            break;
        case del_return:
            line_rem_highlight=code_line_itr;
            code_line_itr = del_func_end;
            break;
        case del_func_end:
            removeBoxElm(del_varElm);
            resetCanvas();
            break;
        default:
            break;
    }  
}


/**
 * create linked list and enable control buttons.
 */
function createLinkedList(){
    if(!linkedListObj){
        linkedListObj = new linkedList(heap);
        document.getElementById('animation_box').style.verticalAlign='top';
        document.getElementById('insertInLinkedLIst').disabled = false;
        document.getElementById('deleteFromLinkedList').disabled = false;
    }
    EnableCtrlButtons('reset');
}  



/**
 * insert value in linked list and enable control buttons.
 */
function insertInLinkedLIst(){
    resetCanvas();

    insert_val = parseInt(document.getElementById('insert_val').value);
    if(Number.isInteger(insert_val)){
        document.getElementById('insert_val').value = insert_val;
        insert_pos = parseInt(document.getElementById('insert_pos').value);
        if(Number.isInteger(insert_pos) && insert_pos > 0){
            document.getElementById('insert_pos').value = insert_pos;
            code_line_itr=insert_func_begin;
            EnableCtrlButtons();        
        }
        else{
            console.log('error in insert_pos');
            document.getElementById('id01p').innerHTML='position value must be positive integer';
            document.getElementById('id01').style.display='block';    
        }
    }
    else{
        console.log('error in insert_val');
        document.getElementById('id01p').innerHTML='insert_val blank';
        document.getElementById('id01').style.display='block';
    }
}



/**
 * delete values from linked list and enable control buttons.
 */
function deleteFromLinkedList(){
    resetCanvas();
    del_var = parseInt(document.getElementById('del_val').value);
    if(Number.isInteger(del_var)){
        document.getElementById('del_val').value = del_var;
        code_line_itr = del_func_start;
        EnableCtrlButtons();    
    }
    else{
        console.log('error in del_val');
        document.getElementById('id01p').innerHTML='del value Must be an integer';
        document.getElementById('id01').style.display='block';
    }
}


/**
 * Runs loop function every 1000 milliseconds.
 */
function loop_color(){
    interval = setInterval(loop,1000);
}

function resetCanvas(){
    clearInterval(interval);
    removeBoxElm(insert_posElm);
    removeBoxElm(insert_valElm);
    removeBoxElm(del_varElm);
    if(line_rem_highlight!=0)    
        document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar'); 
    code_line_itr=0;
    editor.gotoLine(code_line_itr);
    EnableCtrlButtons();
}

/**
 * Removes linked list animation. Disables insert and delete buttons. 
 */

function reset(){
    resetCanvas();
    if(linkedListObj!=null){
        linkedListObj.remove();
    }
    linkedListObj=null;
    document.getElementById('insert_val').value='';
    document.getElementById('insert_pos').value='';
    document.getElementById('del_val').value='';
    document.getElementById('insertInLinkedLIst').disabled = true;
    document.getElementById('deleteFromLinkedList').disabled = true;

    if(line_rem_highlight!=0)    
        document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar'); 
    disbaleCtrlButtons();
}
