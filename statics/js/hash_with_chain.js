/* Code lines numbers for animation change */
var insertintoHash_func = 12;
var index_cal_1 = 13;
var insert_into_LL_func_call = 14;
var insertintoHash_func_end = 15;

var deletefromHash_func = 17;
var index_cal_2 = 18;
var delete_from_LL_func_call = 19;
var deletefromHash_func_end = 20;

// ace editor configuration
var editor;

//Max stack size
var hashtable_size = 0;

//current code line number
var code_line_itr = 0;

// Total line number of code
code_line_count=20;

// assigning unique element id's to any new div 
var id_count=0;

// FUNCTION VARIABLE TO store the interval function
var interval;

// stores last highlighted line number to remove
var line_rem_highlight =0;

// Linked List Array
var linkedlist_arr = [];

// size of queue
var size=hashtable_size;

// Key to be inserted
var key_elem = null;
var key_val = 0;

// index of hashtable
var index_elem = null;
var index_val = 0;

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

/**
 * This function loops over each line of code in editor by checking 
 * cases according to line number. Every case highlights particular 
 * line of code, does some opeartion on data structure and changes 
 * animations accordingly.
 */
function loop() {
    if (code_line_itr != insertintoHash_func && code_line_itr != deletefromHash_func && code_line_itr != 0) {
        document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar');
    }
    unhighlightBoxELement(index_elem);
    unhighlightBoxELement(key_elem);
    unhighlightBoxELement(linkedlist_arr[index_val].box_list[linkedlist_arr[index_val].box_list.length-1]);
    document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
    switch (code_line_itr) {
        case insertintoHash_func:
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case index_cal_1:
            line_rem_highlight = code_line_itr;
            index_val = key_val % hashtable_size;
            index_elem.innerHTML = index_val;
            highlightBoxELement(index_elem);
            code_line_itr++;
            break;
        case insert_into_LL_func_call:
            line_rem_highlight = code_line_itr;
            linkedlist_arr[index_val].insert(key_val);
            highlightBoxELement(linkedlist_arr[index_val].box_list[linkedlist_arr[index_val].box_list.length-1]);
            code_line_itr++;
            break;
        case insertintoHash_func_end:
            line_rem_highlight = code_line_itr;
            key_elem.innerHTML = '';
            index_elem.innerHTML = '';
            code_line_itr = 0;
            document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar');
            playButton(0);
            disbaleCtrlButtons(play);
            disbaleCtrlButtons(step);
            break;
        case deletefromHash_func:
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case index_cal_2:
            line_rem_highlight = code_line_itr;
            index_val = key_val % hashtable_size;
            index_elem.innerHTML = index_val;
            highlightBoxELement(linkedlist_arr[index_val].box_list[linkedlist_arr[index_val].box_list.length-1]);
            highlightBoxELement(index_elem);
            code_line_itr++;
            break;
        case delete_from_LL_func_call:
            line_rem_highlight = code_line_itr;
            linkedlist_arr[index_val].delete(key_val);
            code_line_itr++;
            break;
        case deletefromHash_func_end:
            line_rem_highlight = code_line_itr;
            key_elem.innerHTML = '';
            index_elem.innerHTML = '';
            code_line_itr = 0;
            document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar');
            playButton(0);
            disbaleCtrlButtons(play);
            disbaleCtrlButtons(step);
            break;
    }
}

/**
 * Inserts value provided by user into chain. Uses modular hashing to find right chain.
 */
function insertVal() {
    let val = parseInt(document.getElementById("insert_val").value);
    if (!isNaN(val)) {
        key_elem.innerHTML = val;
        key_val = val;
        code_line_itr = insertintoHash_func;
        highlightBoxELement(key_elem);
        EnableCtrlButtons();
    } 
}

/**
 * Deletes value provided by user from chain. Chain is found out by modular hashing.
 */
function deleteVal() {
    let val = parseInt(document.getElementById("delete_val").value);
    if (!isNaN(val)) {
        key_elem.innerHTML = val;
        key_val = val;
        code_line_itr = deletefromHash_func;
        highlightBoxELement(key_elem);
        EnableCtrlButtons();
    }
}

/**
 * Creates HashTable if not present already. 
 * Enables insert and delete buttons.
 * Enables reset button.
 */
function createHashTable(){
    if (!linkedlist_arr[0]) {
        hashtable_size = parseInt(document.getElementById("max_size").value);
        if(isNaN(hashtable_size) || hashtable_size==0)
        document.getElementById('id03').style.display='block';
        else{
            for (let i=0; i<hashtable_size; i++) {
                var div = document.createElement('div');
                div.setAttribute('id',"hc_"+i);
                div.setAttribute('class', "hc_");
                div.style = "text-align:left;";
                document.getElementById("animation_box").appendChild(div);
                let linkedlist_obj = new linkedList("hc_"+i, ' ');
                linkedlist_obj.linkedListField.style.borderBottom = '1px solid black';
                linkedlist_obj.head.innerHTML = i;
                linkedlist_obj.linkedListField.legend = "Index";
                linkedlist_arr.push(linkedlist_obj);
            } 
            key_elem = draw_variable("Key",'',"temp");
            index_elem = draw_variable("Index",'',"temp");
            document.getElementById("insert").disabled = false;
            document.getElementById("delete").disabled = false;    
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
 * Removes linked list animation. Disables insert and delete buttons. 
 */
function reset(){
    if(linkedlist_arr[0]!=null) {
        for (let i=0; i<hashtable_size; i++) {
            linkedlist_arr[i].linkedListField.remove();
        }
    }
    removeBoxElm(index_elem);
    removeBoxElm(key_elem);
    index_val = 0;
    key_val = 0;
    document.getElementById("insert").disabled = true;
    document.getElementById("delete").disabled = true;
    linkedlist_arr =[];
    if(line_rem_highlight!=0)
    document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar'); 
}