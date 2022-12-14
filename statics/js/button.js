var play = 'play';
var step = 'step';
var rst = 'reset';

function playButton(val=1){
    p = document.getElementById('play_btn');
    s = document.getElementById('step_btn');
    r = document.getElementById('reset_btn');
    if(p.innerHTML=="PLAY" ){
        if(val==1){
            s.disabled= true;
            r.disabled= true;
            p.innerHTML= "PAUSE";    
            p.classList.add('button_pause');
            loop_color();
        }
    }
    else{
        s.disabled= false;
        r.disabled= false;
        p.classList.remove('button_pause');
        p.innerHTML= 'PLAY';
        clearInterval(interval);
    }
}

function stepButton(){
    loop();
}

function resetButton(){
    reset();
}

function disbaleCtrlButtons(val='all')
{
    p = document.getElementById('play_btn');
    s = document.getElementById('step_btn');
    r = document.getElementById('reset_btn');
    if(val=='all'){
        s.disabled= true;
        r.disabled= true;
        p.disabled= true;
        p.classList.remove('button_pause');
        p.innerHTML= 'PLAY';
        clearInterval(interval);
    }else if(val==rst){
        r.disabled=true;
    }else if(val==play){
        p.disabled=true;
        p.classList.remove('button_pause');
        p.innerHTML= 'PLAY';
    }else if(val==step){
        s.disabled=true;
    }
}

function EnableCtrlButtons(val='all')
{
    p = document.getElementById('play_btn');
    s = document.getElementById('step_btn');
    r = document.getElementById('reset_btn');
    if(val=='all'){
        s.disabled= false;
        r.disabled= false;
        p.disabled= false;    
        p.classList.remove('button_pause');
        p.innerHTML= 'PLAY';
    }else if(val==rst){
        r.disabled=false;

    }else if(val==play){
        p.classList.remove('button_pause');
        p.innerHTML= 'PLAY';
        p.disabled=false;

    }else if(val==step){
        s.disabled=false;
    }
}
