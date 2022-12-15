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
search_num = 5;
search_numElm=null;
mid=0;
midElem=null;
high=0;
highElem=null;
low=0;
lowElem=null;
nElem=null;


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
var line_rem_highlight=0;

// id of the animation box
parent_id='animation_box';

// last known array value 
last_arr_itr = -1;

/**
 * This function loops over each line of code in editor by checking 
 * cases according to line number. Every case highlights particular 
 * line of code, does some opeartion on data structure and changes 
 * animations accordingly.
 */
function loop()
{
    //remove highlight from code line      
    if(code_line_itr != 0 && code_line_itr != main)
    {
        document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar');
    }
     
    unhighlightBoxELement(search_numElm);
    unhighlightBoxELement(lowElem);
    unhighlightBoxELement(midElem);
    unhighlightBoxELement(highElem);

    if(last_arr_itr!=-1){
        grayLightBoxElement(arrElmSet[last_arr_itr]);
    }
     
    if(code_line_itr<=code_line_count){
        document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');    
    }

    switch(code_line_itr){
        case code_end:
            line_rem_highlight = code_line_itr;
            resetCanvas();
            break;
        case main:
            line_rem_highlight = code_line_itr;
            code_line_itr+=2;
            break;
        case array_creation:
            arrElmSet =  draw_array('arr',arr,arr_n,parent_id); 
            line_rem_highlight = code_line_itr;
            code_line_itr++;     
            break;
        case x_creation:
            search_numElm = draw_variable('x',search_num,parent_id);
            line_rem_highlight = code_line_itr;
            code_line_itr++;  
            break;
        case n_calculate:
            nElem = draw_variable('n',arr_n,parent_id);
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case function_call:
            line_rem_highlight = code_line_itr;
            code_line_itr = function_name;
            break;
        case function_name:
            line_rem_highlight = code_line_itr;
            code_line_itr+=2;
            break;

        case var_declare:
             lowElem = draw_variable('low',index_low,parent_id);
             highElem = draw_variable('high',index_high,parent_id);
             line_rem_highlight = code_line_itr;
             code_line_itr++;
              break;
        case cond1_check:
            line_rem_highlight = code_line_itr;
            highlightBoxELement(lowElem);
            highlightBoxELement(highElem);
            removeBoxElm(midElem);
            if(index_low<=index_high){
                  code_line_itr = mid_calc;
                }
            else{
                 code_line_itr = false_return ;
                }
                break;
        case mid_calc:
             index_mid = Math.floor((index_low + index_high)/2); 
             line_rem_highlight = code_line_itr;
             highlightBoxELement(lowElem);
             highlightBoxELement(highElem);
             midElem = draw_variable('mid',index_mid,parent_id);
             highlightBoxELement(midElem);
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
            highlightBoxELement(search_numElm);
            highlightBoxELement(arrElmSet[index_mid]);
            line_rem_highlight = code_line_itr;
            if(search_num<arr[index_mid])
            {
                code_line_itr = new_high;                
            }
            else
            {
                code_line_itr = new_low;
            }
            last_arr_itr=index_mid;
            break;
        case new_high:
            index_high = index_mid - 1;
            highlightBoxELement(midElem);
            highlightBoxELement(highElem);
            highElem.innerHTML = index_high;
            line_rem_highlight = code_line_itr;
            code_line_itr = cond1_check;  
            break ;
        case new_low:
            index_low = index_mid + 1;
            highlightBoxELement(lowElem);
            highlightBoxELement(midElem);
            lowElem.innerHTML = index_low;
            line_rem_highlight = code_line_itr;
            code_line_itr = cond1_check;  
            break ;
        case true_return:
            highlightBoxELement(midElem);
            line_rem_highlight = code_line_itr;
            code_line_itr=code_end;    
            document.getElementById('idModal').style.display='block';            
            document.getElementById('idModalText').innerHTML = 'YES!! You Found IT';
           break;
        case false_return:
            line_rem_highlight=code_line_itr;
            code_line_itr=code_end;
            document.getElementById('idModal').style.display='block';            
            document.getElementById('idModalText').innerHTML = 'Could not find the Number';
            break;
        default:
            line_rem_highlight =code_line_itr;
            break;
    }
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

function insertionSort(){
    for(i=0;i<arr_n;i++){
        j=i;
        while(j>0 && arr[j-1]>arr[j]){
            tmp = arr[j-1];
            arr[j-1]=arr[j];
            arr[j]=tmp;
            j--;
        }
    }
}

/**
 * set size of a array
 */
function setSize(){
    size_arr = parseInt(document.getElementById('max_size_array').value);
    reset();
    if(Number.isInteger(size_arr) && size_arr>0){
        arr_n = size_arr;
        document.getElementById('max_size_array').value = arr_n;

        index_high = arr_n-1;
        arr=[];
        for(i=0;i<arr_n;i++){
            arr.push(Math.floor(Math.random()*100));
        }

        insertionSort();

        for(i=0;i<arr_n;i++){
            elm = create_html_element('input','input_array_set');
            elm.setAttribute('class','array_value_input');
            elm.setAttribute('id','arr_input_search'+i);
            elm.value=arr[i];
            set_arr_list_Elm.push(elm);
        }
        editor.setValue(searchCode+arr_n+arraySize+arr+arrayValue+'_'+searchValue);
        editor.gotoLine(0);   
        document.getElementById('set_Array_value').disabled = false;
        document.getElementById('SetSearchVal').disabled = false;
        EnableCtrlButtons(rst);
    }
    else{
        document.getElementById('idModal').style.display = 'block';
        document.getElementById('idModalText').innerHTML = 'Please enter a number greater than zero';
    }
}


/**
 * set value of a array
 */
function set_Array_value(){
    arr=[];
    if(arrElmSet!=null){
        for(i=0;i<arrElmSet.length;i++)
            removeBoxElm(arrElmSet[i]);
    }    
    for(itr=0;itr<arr_n;itr++){
        temp = parseInt(document.getElementById('arr_input_search'+itr).value);
        if(!Number.isInteger(temp)){
            document.getElementById('idModal').style.display = 'block';
            document.getElementById('idModalText').innerHTML = 'Please enter a number;'
            temp=0;
        }
        document.getElementById('arr_input_search'+itr).value = temp;
        arr[itr]=temp;
    }
    editor.setValue(searchCode+arr_n+arraySize+arr+arrayValue+search_num+searchValue);
    editor.gotoLine(0);   
    document.getElementById('SetSearchVal').disabled = false;
    
}


/**
  * set search value in  array  and  enables control buttons .
 */
function SetSearchVal(){
    temp = parseInt(document.getElementById('search_val').value);
    if(!Number.isInteger(temp)){
        document.getElementById('idModal').style.display = 'block';
        document.getElementById('idModalText').innerHTML = 'Please enter a number;'
    }
    else{
        document.getElementById('search_val').value= temp;
        search_num = temp
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
        code_line_itr = main;
        editor.gotoLine(code_line_itr);   
        loop();
        document.getElementById('set_Array_value').disabled = true;
        document.getElementById('SetSearchVal').disabled = true;
        EnableCtrlButtons();  
    }
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


function resetCanvas(){
    clearInterval(interval);
    last_arr_itr = -1;
    code_line_itr=main;
    if(line_rem_highlight!=0)
        document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar'); 
    removeBoxElm(search_numElm);
    while(arrElmSet!=null && arrElmSet.length>0){
        removeBoxElm(arrElmSet[0]);
        arrElmSet.shift();
    }    
    index_mid=0;
    removeBoxElm(midElem);
    index_low=0;
    removeBoxElm(lowElem);
    index_high=arr_n;
    removeBoxElm(highElem);

    removeBoxElm(nElem);
    EnableCtrlButtons();
    document.getElementById('set_Array_value').disabled = false;
    document.getElementById('SetSearchVal').disabled = false;
}
/**
 * Removes binary search animation. Disables setarray and search  
 * buttons. and set the all indexes to zero.
 */
function reset(){
    resetCanvas();
    while(set_arr_list_Elm!=null && set_arr_list_Elm.length>0) {
            set_arr_list_Elm[0].remove();
            set_arr_list_Elm.shift();
            arr.shift();
    }        
    document.getElementById('search_val').value='';
    document.getElementById('max_size_array').value='';
    document.getElementById('set_Array_value').disabled = true;
    document.getElementById('SetSearchVal').disabled = true;
    disbaleCtrlButtons();

    editor.setValue(searchCode+'_ '+arraySize+'_ _ _ _ _ _ '+arrayValue+'_ '+searchValue);
    editor.gotoLine(0);   
}
