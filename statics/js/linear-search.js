/* Code lines numbers for animation change */
code_begin=12;
code_line_itr=code_begin-1;
for_loop_start =4;
cond_check=6;
true_return =7;
for_loop_end=8;
exit_return =9;
array_creation=14;
x_creation=15;
function_call= 16;
code_end=17;

// Total line number of code
code_line_count=17;

// ace editor configuration
var editor;

//Max stack size
var stack_size = 0;

//current code line number
var code_line_itr = code_begin-1;

// assigning unique element id's to any new div 
var id_count=0;

// FUNCTION VARIABLE TO store the interval function
var interval;

// stores last highlighted line number to remove
var line_rem_highlight =0;


/**
 * Setup the editor.
 */
function setUpEditor(){
    editor = ace.edit("editor");    //the html tag with id 'editor' contains the code to be highlighted
    editor.setTheme("ace/theme/cobalt");   // set the background theme to coba+lt0
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


// array and search numbers
arr_itr=0;
arr=[];
arrElmSet=null;
arr_n=0;
arr_nElm=null;
search_num = 5;
search_numElm=null;

// converting search number to array to make the box creation function "set-div" generic 
search_num_arr=[search_num];

// assigning unique element id's to any new div 
id_count=0;

// FUNCTION VARIABLE TO store the interval function
var interval;

// stores last highlighted line number to remove
var line_rem_highlight=-1;



/**
 * This function loops over each line of code in editor by checking 
 * cases according to line number. Every case highlights particular 
 * line of code, does some opeartion on data structure and changes 
 * animations accordingly.
 */
function loop()
{
    parent_id='animation_box';
    unhighlightBoxELement(search_numElm);
    unhighlightBoxELement(arr_nElm);

    //remove highlight from code line 
    if((line_rem_highlight!=-1))
    {
        document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar');
    }
    // increment of the current code line
    code_line_itr++;
    line_rem_highlight=-1;
    // check for end of code
    if(code_line_itr<=code_line_count){
        document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
    }

    // if code line is condition line 
    switch(code_line_itr){
        case (code_end+1):
            reset();
            break;
        case cond_check:
            highlightBoxELement(search_numElm);
            highlightBoxELement(arrElmSet[arr_itr]);
            line_rem_highlight = code_line_itr;
            if(arr[arr_itr]==search_num){
                code_line_itr = true_return-1;
            }
            else{
                code_line_itr = for_loop_end-1;    
            }
            arr_itr++;
            break;
        case true_return:
            line_rem_highlight = code_line_itr;
            code_line_itr=function_call;    
            break;
        case for_loop_start:
            break;
        case for_loop_end:
            line_rem_highlight = code_line_itr;
            if(arr_itr==arr_n)
            {
                code_line_itr = exit_return-1;    
            }
            else
            {
                code_line_itr = for_loop_start-1;
            }
        break;
        case exit_return:
            line_rem_highlight=code_line_itr;
            code_line_itr = function_call;
            document.getElementById('id01').style.display='block';
        break;
        case array_creation:
            arrElmSet =  draw_array('arr',arr,arr_n,parent_id);        
        break;
        case x_creation:
            search_numElm = draw_variable('x',search_num,parent_id);
            break;
        case function_call:
            line_rem_highlight = code_line_itr;
            code_line_itr=0;
            break;
        default:
            line_rem_highlight =code_line_itr;
            break;
    }
    if(line_rem_highlight==-1)
        line_rem_highlight=code_line_itr;
} 


/** 
* this function puts the loop() function  on interval call of 1000 milli sec
* i.e it is called after every 1000 milli sec of 1 sec
*/
function loop_color(){
        interval = setInterval(loop,1000);
}

// array intialisation
set_arr_list_Elm=[];

/**
 * set size of a array
 */
function setSize(){
    arr_n = parseInt(document.getElementById('max_size_array').value);
    arr=[];
    for(i=0;i<arr_n;i++){
        elm = create_html_element('input','input_array_set');
        elm.setAttribute('class','array_value_input');
        elm.setAttribute('id','arr_input_search'+i);
        elm.value=i+1;
        arr.push(parseInt(document.getElementById('arr_input_search'+i).value));
        set_arr_list_Elm.push(elm);
    }
    editor.setValue(searchCode+arr_n+arraySize+arr+arrayValue+'_'+searchValue1+arr_n+searchValue2);
    document.getElementById('set_Array_value').disabled = false;
    document.getElementById('SetSearchVal').disabled = false;
    editor.gotoLine(0);     
    EnableCtrlButtons(rst);
}

/**
 * set value of a array
 */
function set_Array_value(){
    arr=[];
    for(itr=0;itr<arr_n;itr++){
        arr.push(parseInt(document.getElementById('arr_input_search'+itr).value));
    }
    editor.setValue(searchCode+arr_n+arraySize+arr+arrayValue+'_'+searchValue1+arr_n+searchValue2);
    editor.gotoLine(0);     
    document.getElementById('SetSearchVal').disabled = false;
}


/**
 * set search value in  array and call the loop function and  enables control buttons .
 */
function SetSearchVal(){
    search_num = parseInt(document.getElementById('search_val').value);
    search_num_arr=[search_num];
    editor.setValue(searchCode+arr_n+arraySize+arr+arrayValue+search_num+searchValue1+arr_n+searchValue2);

    // adding marker to each line of code.
    const r = [];
    
    for(itr=0;itr<code_line_count;itr++)
    {   
        r[itr] = new Range(itr, 0,itr, 100);    // marking the range for  code line no <itr>
        r[itr].id = editor.session.addMarker(r[itr],"foo"+(itr+1),"fullLine");  // class foo<id_count> will act as an identifire for each line
        // console.log(itr);
    }
    editor.gotoLine(0);     
    loop();
    EnableCtrlButtons();
}


 // set array value and search element  which are given at run time  in the editor.
 

searchCode=`int linear_search(int x,int *arr,int n)
{
    int i=0;
    for (i=0;i < n;i++)
    {
        if(arr[i] == x)
            return 0;
    }
    return -1;
}

int main()
{
    int arr[`;
    
arraySize = `] = {`;

arrayValue=`};
    int x = `;
searchValue1=`;
    linear_search(x,&(arr[0]),`
searchValue2=`);
    return 0;
}`;


/**
 * Removes linear search animation. Disables setarray and search  
 * buttons.
 */
function reset(){
    removeBoxElm(search_numElm);
    code_line_itr=code_begin-1;
    for(i=0;i<arr_n;i++){
        if(arrElmSet!=null)
            removeBoxElm(arrElmSet[i]);
        if(set_arr_list_Elm!=null)
            set_arr_list_Elm[i].remove();
    }
    document.getElementById('search_val').value='';
    document.getElementById('max_size_array').value='';
    document.getElementById('set_Array_value').disabled = true;
    document.getElementById('SetSearchVal').disabled = true;
    disbaleCtrlButtons();
    if(line_rem_highlight!=0)
    document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar'); 
}