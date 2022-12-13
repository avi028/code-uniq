/* Code lines numbers for animation change */
function_name =1;
var_declare = 3;
mid_calc = 6;
cond1_check = 4;
cond2_check=7;
while_loop_end = 16;
cond3_check=10;
true_return=8;
false_return=17;
main = 20;
function_call= 25;
array_creation=22;
x_creation=23;
n_calculate=24;
code_end=27;
new_high = 11;
new_low=14;


// Total line number of code
code_line_count=27;

//Max stack size
var stack_size = 0;

//current code line number
var code_line_itr = main;

// assigning unique element id's to any new div 
var id_count=0;

// FUNCTION VARIABLE TO store the interval function
var interval;

// stores last highlighted line number to remove
var line_rem_highlight=0;



/**
 * Setup the editor.
 */
function setUpEditor(){
    editor = ace.edit("editor");    //the html tag with id 'editor' contains the code to be highlighted
    editor.setTheme("ace/theme/cobalt");   // set the background theme to coba lt0
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



//mid index initialisation
var index_mid=0;

//low index initialisation
var index_low=0;

//high index initialisation
var index_high=0;


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
     
     line_rem_highlight=-1;
    // check for end of code
    if(code_line_itr<=code_line_count){
        document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
    }

    // if code line is condition line 
     
    switch(code_line_itr){
        case (code_end):
            line_rem_highlight = code_line_itr;
            reset();
            break;
        case main:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            code_line_itr+=2;
            break;
        case array_creation:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            arrElmSet =  draw_array('arr',arr,arr_n,parent_id); 
            line_rem_highlight = code_line_itr;
            code_line_itr++;     
            break;

        case x_creation:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            search_numElm = draw_variable('x',search_num,parent_id);
            line_rem_highlight = code_line_itr;
            code_line_itr++;  
            break;

        case n_calculate:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case function_call:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            code_line_itr = function_name;
            break;
        case function_name:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            code_line_itr+=2;
            break;

        case var_declare:
             document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
             line_rem_highlight = code_line_itr;
             code_line_itr++;
              break;
        case cond1_check:
            line_rem_highlight = code_line_itr;
            if(index_low<=index_high){
                  code_line_itr = mid_calc;
                }
            else{
                 code_line_itr = false_return ;
                }
                break;
        case mid_calc:
             document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
             index_mid = Math.floor((index_low + index_high)/2); 
             line_rem_highlight = code_line_itr;
             code_line_itr++;
               break;
        case cond2_check:
            highlightBoxELement(search_numElm);
            highlightBoxELement(arrElmSet[index_mid]);
            line_rem_highlight = code_line_itr;
            if(arr[index_mid]==search_num){
                code_line_itr = true_return;
            }
            else{
                code_line_itr = cond3_check;
            }
            break;
        case cond3_check:
            if(search_num<arr[index_mid]){
                line_rem_highlight = code_line_itr;
                code_line_itr = new_high;
                
            }
            else{
                line_rem_highlight = code_line_itr;
                code_line_itr = new_low;
                
            }
            break;
        case new_high:
            index_high = index_mid - 1;
            line_rem_highlight = code_line_itr;
            code_line_itr = cond1_check;  
            break ;
        case new_low:
            index_low = index_mid + 1;
            line_rem_highlight = code_line_itr;
            code_line_itr = cond1_check;  
            break ;
        case true_return:
            line_rem_highlight = code_line_itr;
            code_line_itr=code_end;    
            break;
        case false_return:
            line_rem_highlight=code_line_itr;
            code_line_itr=code_end;
            document.getElementById('id01').style.display='block';            
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
    index_high = arr_n-1;
    arr=[];
    for(i=0;i<arr_n;i++){
        elm = create_html_element('input','input_array_set');
        elm.setAttribute('class','array_value_input');
        elm.setAttribute('id','arr_input_search'+i);
        elm.value=i+1;
        arr.push(parseInt(document.getElementById('arr_input_search'+i).value));
        set_arr_list_Elm.push(elm);
    }
    editor.setValue(searchCode+arr_n+arraySize+arr+arrayValue+'_'+searchValue);
    editor.gotoLine(0);   
    document.getElementById('set_Array_value').disabled = false;
    document.getElementById('SetSearchVal').disabled = false;
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
    editor.setValue(searchCode+arr_n+arraySize+arr+arrayValue+search_num+searchValue);
    editor.gotoLine(0);   
    document.getElementById('SetSearchVal').disabled = false;
    
}


/**
  * set search value in  array  and  enables control buttons .
 */
function SetSearchVal(){
    search_num = parseInt(document.getElementById('search_val').value);
    search_num_arr=[search_num];
    editor.setValue(searchCode+arr_n+arraySize+arr+arrayValue+search_num+searchValue);

    // adding marker to each line of code.
    const r = [];
    
    for(itr=0;itr<code_line_count;itr++)
    {   
        r[itr] = new Range(itr, 0,itr, 100);    // marking the range for  code line no <itr>
        r[itr].id = editor.session.addMarker(r[itr],"foo"+(itr+1),"fullLine");  // class foo<id_count> will act as an identifire for each line
        // console.log(itr);
    }
    editor.gotoLine(0);   
    //loop();
    EnableCtrlButtons();  
    
    
}


/**
 * set array value and search element  which are given at run time .
 */

searchCode=`int binarySearch(int arr[], int n, int x)
{
  int low = 0, high = n-1;
  while (low <= high)
    {
        int mid = (low + high)/2;
        if (x == arr[mid]) {
            return mid;
        }
        else if (x < arr[mid]) {
            high = mid - 1;
        }
        else {
            low = mid + 1;
        }
    }
 return -1;
}

int main()
{
    int arr[`;
    
arraySize = `] = {`;

arrayValue=`};
    int x = `;
searchValue=`;
 int n = sizeof(arr) / sizeof(arr[0]);
 binarySearch(arr,n, x);
    return 0;
}`;



/**
 * Removes binary search animation. Disables setarray and search  
 * buttons. and set the all indexes to zero.
 */
function reset(){
    removeBoxElm(search_numElm);
    code_line_itr=main;
    for(i=0;i<arr_n;i++){
        if(arrElmSet!=null){
            removeBoxElm(arrElmSet[i]);
            document.getElementById('arr_input_search'+i).remove();
        }
        if(set_arr_list_Elm!=null) {
            set_arr_list_Elm[i].remove();
        }        
    }
    index_mid=0;
    index_low=0;
    index_high=0;
    document.getElementById('search_val').value='';
    document.getElementById('max_size_array').value='';
    document.getElementById('set_Array_value').disabled = true;
    document.getElementById('SetSearchVal').disabled = true;
    disbaleCtrlButtons();
    clearInterval(interval);
    if(line_rem_highlight!=-1)
        document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar'); 

    editor.setValue(searchCode+'_ '+arraySize+'_ _ _ _ _ _ '+arrayValue+'_ '+searchValue);
    editor.gotoLine(0);   
}
