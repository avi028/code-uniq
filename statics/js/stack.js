/* Code lines numbers for animation change */
var push_begin = 1;
var overflow_check = 2;
var push_ret_err = 3;
var add_value = 4;
var push_head_move = 5;
var retpush = 6;
var pushend = 7;
var pop_begin = 10;
var underflow_check = 11;
var pop_ret_err = 12;
var pop_head_move = 14;
var pop_value = 13;
var retpop = 15;
var popend = 16;

// ace editor configuration
var editor;

//Max stack size
var stack_size = 0;

//current code line number
var code_line_itr = 0;

// Total line number of code
code_line_count=22;

    // assigning unique element id's to any new div 
var id_count=0;

// FUNCTION VARIABLE TO store the interval function
var interval;

// stores last highlighted line number to remove
var line_rem_highlight =0;

//stack object
var stk_obj=null;

//stack content array
var stack_content = [];

//top initialisation
var top1=0; 

//size variable initialisation
var size=stack_size;


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


// push value
var pushVal; 

// push html element
var pushValElm;

//pop value
var popVal;

//pop html element
var popValElm;

//parent id
var parent_id = 'variable_set';

//temp parent id
var temp = 'temp';

//heap parent id
var heap = 'heap';

//constant parent id
var constants = 'constants'



/**
 * This function loops over each line of code in editor by checking 
 * cases according to line number. Every case highlights particular 
 * line of code, does some opeartion on data structure and changes 
 * animations accordingly.
 */
function loop() {
    if (code_line_itr != push_begin && code_line_itr != pop_begin && code_line_itr != 0) {
        document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar');
    }
    // if (stk_obj.top_val.classList.contains('box_label_active')) {
    //     stk_obj.top_val.classList.remove('box_label_active');
    // }
    stk_obj.removeHighlight();
    switch(code_line_itr) {
        case push_begin:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            
            pushValElm = draw_variable('push_val',pushVal,temp);
            code_line_itr++;
            break;
        case overflow_check:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            highlightBoxELement(stk_obj.size_val);
            highlightBoxELement(stk_obj.top_val);
            if (top1 == size) {
                code_line_itr++;    
            }
            else {
                code_line_itr+=2;
            }
            break;
        case push_ret_err:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            code_line_itr = pushend;
            document.getElementById('id01').style.display='block';
            break;
        case push_head_move:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            stk_obj.top_pointer.style.top = 55*(Math.ceil(size/2)-(top1+1))+'px';
            stk_obj.top_val.innerHTML = top1;
            highlightBoxELement(stk_obj.top_val);           
            code_line_itr++;
            break;
        case add_value:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            stk_obj.arr_list[size-(top1+1)].innerHTML = pushVal;
            highlightBoxELement(stk_obj.arr_list[size-(top1+1)]);
            highlightBoxELement(pushValElm);
            code_line_itr++;
            break;
        case retpush:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            // removeBoxElm(pushValElm);
            code_line_itr++;
            break;
        case pushend:
            document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar');
            removeBoxElm(pushValElm);
            clearInterval(interval);
            code_line_itr=0;
            playButton(0);
            disbaleCtrlButtons(play);
            disbaleCtrlButtons(step);
            document.getElementById("push").disabled = false;
            document.getElementById("pop").disabled = false;       
            break;
        case pop_begin:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            popValElm=draw_variable('pop_val',' ',temp);
            code_line_itr++;
            break;
        case underflow_check:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            highlightBoxELement(stk_obj.top_val);
            if (top1 == -1) {
                code_line_itr++;    
            }
            else {
                code_line_itr+=2;
            }
            break;
        case pop_ret_err:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            code_line_itr = popend;
            document.getElementById('id02').style.display='block';
            break;
        case pop_head_move:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            top1 = top1-1;
            stk_obj.top_val.innerHTML = top1;
            stk_obj.top_val.classList.add('box_label_active');
            stk_obj.top_pointer.style.top = 55*(Math.ceil(size/2)-(top1+1))+'px';
            highlightBoxELement(stk_obj.top_val);
            code_line_itr++;
            break;
        case pop_value:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            popVal = stk_obj.arr_list[size-(top1+1)].innerHTML;
            popValElm.innerHTML = popVal;
            unhighlightBoxELement(stk_obj.arr_list[size-(top1+1)]);
            highlightBoxELement(popValElm);
            stk_obj.arr_list[size-(top1+1)].innerHTML=' ';
            document.getElementById('pop_val').value=popVal;
            code_line_itr++;
            break;
        case retpop:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case popend:
            document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar');
            code_line_itr=0;
            removeBoxElm(popValElm);
            clearInterval(interval);
            playButton(0);
            disbaleCtrlButtons(play);
            disbaleCtrlButtons(step);
            document.getElementById("push").disabled = false;
            document.getElementById("pop").disabled = false;       
            break;
    }  
}


/**
 * Calls push method of stk_obj type
 */
function pushStack(){
    var input = checkInput('push_val',false);
    if(input != null){
        code_line_itr = push_begin;
        top1 = parseInt(stk_obj.top_val.innerHTML)+1;
        size = parseInt(stk_obj.size_val.innerHTML);
        stack_content.push(input);
        pushVal=input;
        loop();
        EnableCtrlButtons();    
        document.getElementById("push").disabled = true;
        document.getElementById("pop").disabled = true;       
    }
}



/**
 * Calls pop method of stk_obj type
 */
function popStack(){
    document.getElementById('pop_val').value='';
    code_line_itr = pop_begin;
    top1 = parseInt(stk_obj.top_val.innerHTML);
    size = parseInt(stk_obj.size_val.innerHTML);
    loop();
    EnableCtrlButtons();
    document.getElementById("push").disabled = true;
    document.getElementById("pop").disabled = true;       
}

/**
 * Creates array of stack_max_size and enable push pop and reset button.
 */
function createStack(){
    if (!stk_obj) {
        var size_val = checkInput('stack_max_size',true);
        reset();
        if(size_val!=null){
            stack_size = size_val;
            document.getElementById("stack_max_size").value = size_val;
            stk_obj = new Stack(heap, stack_size,'stack');
            document.getElementById("push").disabled = false;
            document.getElementById("pop").disabled = false;    
            EnableCtrlButtons('reset');
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
 * remove stk_obj
 * Removes stack animation. Disables push pop buttons. 
 */
function reset(){
    if(stk_obj!=null)
    {
        stk_obj.remove();
    }
    removeBoxElm(popValElm);
    removeBoxElm(pushValElm);
    editor.gotoLine(1);
    document.getElementById('push_val').value='';
    document.getElementById('pop_val').value='';
    document.getElementById('stack_max_size').value='';
    disbaleCtrlButtons();
    document.getElementById("push").disabled = true;
    document.getElementById("pop").disabled = true; 
    stk_obj=null;  
    if(line_rem_highlight!=0) 
        document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar'); 
}