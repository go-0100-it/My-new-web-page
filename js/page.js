
$(function () { // wait for document ready
    // init

    // get all slides
    let title_letters = document.querySelectorAll("span.title-letter");
    let project_pages = document.querySelectorAll("div#panel-3-container > div.column-container.split");
    let panel_containers = document.querySelectorAll("div.panel-container");
    let slides = document.querySelectorAll("section.panel");
    let navBtns = document.querySelectorAll("h2.nav");
    let ind = 1;
    let project_pages_ind = 1;
    let start = document.getElementById('start');
    let text_input = document.getElementById('text-input');
    let main_header = document.getElementById('header_content');
    let panel_2_letters = document.querySelectorAll("span.panel-2-letter");
    let panel_3_letters = document.querySelectorAll("span.panel-3-letter");
    let panel_4_letters = document.querySelectorAll("span.panel-4-letter");
    let panel_5_letters = document.querySelectorAll("span.panel-5-letter");
    let panel_6_letters = document.querySelectorAll("span.panel-6-letter");
    let panel_titles = ['', '', panel_2_letters, panel_3_letters, panel_4_letters, panel_5_letters, panel_6_letters]
    let typing_sound = new Audio('keyboard.mp3');
    typing_sound.loop = true;

    console.dir(panel_2_letters);

    text_input.value = "";

    start.addEventListener('click', function(){
        text_input.focus();
        hide(start);
        stop_fade(fading_click_me, start);
        let start_delay = setTimeout(function(){
            relayMsg()
        }, 1250);
    });

    let animate_string = function(str, dir){
        let len = str.length;
        if(dir === "In"){
            for(i = 0; i < len; i++){
                animate_letter_in(str[i], i);
            }
        }
    }

    let animate_letter_in = function(char, i){
        let delay = setTimeout(function(){
            addClass(char, "animate-in-bordeaux");
            clearTimeout(delay);
        }, 200 + (150 * i));
    };

    let fade_in_out = function(el, int){
        return setInterval(function(){
            if (el.className.indexOf('opaque') !== -1){
                fadeIn(el);
            }
            else{
                fadeOut(el);
            }
        }, int);
    }

    let fading_click_me = fade_in_out(start, 1200);

    let stop_fade = function(interval, el){
        clearInterval(interval);
        fadeIn(el);
    };

    let show = function(el){
        el.style.visibility = "visible";
    };

    let hide = function(el){
        el.style.visibility = "hidden";
    };

    let fadeIn = function(el){
        removeClass(el, 'opaque');
    };

    let addClass = function(el, cls){
        if(el.className.indexOf(cls) === -1){
            el.classList.add(cls);
        }
    }

    let removeClass = function(el, cls){
        if(el.className.indexOf(cls) !== -1){
            el.classList.remove(cls);
        }
    }

    let fadeOut = function(el){
        addClass(el, 'opaque');
    };

    let msgs = ['You\'ve probably heard it said before,', '\nthat the future is what you make it.',  '\nWell...',
     '\nI\'m "programming" my future,', '\none keystroke at a time!', '\nTo see what I\'ve been up to,', '\nhave a look around.'];
    let msgNum = 0

    navBtns[0].addEventListener('click', function(){
        if(ind < slides.length-2){
            ind += 1;
            updateVisibility();
            if(ind > 1){
                animate_string(panel_titles[ind], 'In');
            }
            slides[ind].scrollIntoView({behavior: "instant"});
            route();
        }
    });
    navBtns[1].addEventListener('click', function(){
        if(ind > 1){
            ind -= 1;
            updateVisibility();
            if(ind > 1){
                animate_string(panel_titles[ind], 'In');
            }
            slides[ind].scrollIntoView({behavior: "instant"});
            route();
        } 
    });

    navBtns[2].addEventListener('click', function(){
        if(project_pages_ind < 3){
            project_pages_ind += 1;
        }
        index_projects("Right");
        updateVisibility();
    });

    navBtns[3].addEventListener('click', function(){
        if(project_pages_ind > 1){
            project_pages_ind -= 1;
        }
        index_projects("Left");
        updateVisibility();
    });

    let index_projects = function(dir){
        if(dir === "Right"){
            addClass(project_pages[project_pages_ind - 2], 'slide-left');
            removeClass(project_pages[project_pages_ind - 1], 'slide-right');
        }else{
            removeClass(project_pages[project_pages_ind - 1], 'slide-left');
            addClass(project_pages[project_pages_ind], 'slide-right');
        }
    };

    let mimicTyping = function(_msg, id, t) {
        typing_sound.play();
        let len = _msg.length;
        let i = 0;
        let upDateEl = function(msg, id, id2) {
            let tmr = setTimeout(
                function() {
                    let el = document.getElementById(id);
                    if (i === len) {
                        typing_sound.pause();
                        clearTimeout(tmr);
                        let tmr2 = setTimeout(function() {
                            msgNum++;
                            if (msgNum < msgs.length) {
                                relayMsg();	
                            }
                            else{
                                updateVisibility();
                            }
                        }, Math.ceil(Math.random() * 2500));
                    } else {
                        let txt = el.value;
                        el.value = txt + msg;
                        i++;
                        upDateEl(_msg[i], id);
                    }
                }, Math.ceil(Math.random() * t));
        };
        upDateEl(_msg[i], id);
    };

    let updateVisibility = function(){
        fade_panels();
        if(ind === slides.length-2){
            hide(navBtns[0]);
        }else{
            show(navBtns[0]);
        }
        if(ind === 1){
            hide(navBtns[1]);
        }else{
            show(navBtns[1]);
        }
        if(ind === 3){
            if(project_pages_ind < 3){
                show(navBtns[2]);
            }else{
                hide(navBtns[2]);
            }
            if(project_pages_ind > 1){
                show(navBtns[3]);
            }else{
                hide(navBtns[3]);
            }
        }else{
            hide(navBtns[2]);
            hide(navBtns[3]);
        }
        if(ind > 1){
            if(ind === 2){
                addClass(main_header, 'compressed-gone');
                removeClass(main_header, 'compressed');
            }else{
                removeClass(main_header, 'compressed-gone');
                addClass(main_header, 'compressed');
            }
            
        }else{
            removeClass(main_header, 'compressed-gone');
            removeClass(main_header, 'compressed');
        }
    };

    let fade_panels = function(num){
        let len = panel_containers.length;
        for(i = 0; i < len; i++){
            if(i+1 === ind){
                fadeIn(panel_containers[i]);
            }else{
                fadeOut(panel_containers[i]);
            }
        }
    };


    let addEl = function(targetEl, tag, id, classes, text) {
        let newEl = document.createElement(tag);
        let len = classes.length;
        for(i = 0; i < len; i++){
            newEl.classList.add(classes[i]);
        }
        newEl.id = id ? id : '';
        newEl.innerText = text ? text : '';
        let el = document.getElementById(targetEl);
        el.appendChild(newEl);
        return newEl;
    };

    let relayMsg = function() {
        mimicTyping(msgs[msgNum], 'text-input', 400);
    };
    
    let UrlParams = function(url) {
        // get query string from url (optional) or window
        return queryString = url ? url.split('#')[1] : window.location.search.slice(1);
    }

    let baseUrl = function(url) {
        if(url.indexOf('#') !== -1){
            return url.split('#')[0];
        }else{
            return url;
        }
        // get query string from url (optional) or window
        
    };

    let skipIntro = function(){
        let len = msgs.length;
        text_input.value = "";
        for(i = 0; i < len; i++){
            text_input.value += msgs[i];
        }
    };

    let routerHelper = function(){
        skipIntro();
        hide(start);
        stop_fade(fading_click_me, start);
        setTimeout(function(){
            updateVisibility();
            slides[ind].scrollIntoView({behavior: "instant"});
            animate_string(panel_titles[ind], 'In');
        }, 500);
    };

    let route = function(){
        switch(ind){
            case 1:
                document.location = baseUrl(document.URL) + "#Main";
                break;
            case 2:
                document.location = baseUrl(document.URL) + "#About%20me";
                break;
            case 3:
                document.location = baseUrl(document.URL) + "#Projects_1";
                break;
            case 4:
                document.location = baseUrl(document.URL) + "#Contact";
                break;
            default:
                document.location = baseUrl(document.URL) + "#Main";
                break;
        }
    };

    let router = function(req){
        switch(req){
            case "Main":
                ind = 1;
                routerHelper();
                break;
            case "About%20me":
                ind = 2;
                routerHelper();
                break;
            case "Projects_1":
                ind = 3;
                routerHelper();
                break;
            case "Contact":
                ind = 4;
                routerHelper();
                break;
            default:
                ind = 1;
                break;
        }
    };

    router(UrlParams(document.URL));
    animate_string(title_letters, "In");
});