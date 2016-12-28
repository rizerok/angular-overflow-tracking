'use strict';
HtmlOverflowTracking.prototype.deleteLastWord = function(text){
    return text.replace(/\s*\S+\s*$/,'');
};
HtmlOverflowTracking.prototype.deletingLastWords = function (textNode){
    while (this.trackingElem.scrollHeight - this.trackingElem.offsetHeight > 0 && textNode.textContent) {
        textNode.textContent = this.deleteLastWord(textNode.textContent);
    }
    return textNode.textContent;
};
HtmlOverflowTracking.prototype.cutTextByLastWord = function(container){
    var lastChild = container.lastChild;
    if(lastChild){//no empty
        switch(lastChild.nodeType){
            case 1://element
                if(lastChild.childNodes.length){
                    this.cutTextByLastWord(lastChild);//recursive
                }else{//0 => empty tag
                    lastChild.parentNode.removeChild(lastChild);
                }
                break;
            case 3://text
                if(lastChild.textContent.replace(/\s*/,'')){
                    var handledText = this.deletingLastWords(lastChild);
                    if(handledText==='' && container.childNodes.length===1){
                        container.parentNode.removeChild(container);
                    }
                }else{//empty string
                    lastChild.parentNode.removeChild(lastChild);
                }
                break;
            case 8://comment
                lastChild.parentNode.removeChild(lastChild);
            break;
        }
    }
};
HtmlOverflowTracking.prototype.cutTextByLastWordStatic = function(container){
    var lastChild = container.lastChild;
    if(lastChild){//no empty
        switch(lastChild.nodeType){
            case 1://element
                if(lastChild.childNodes.length){
                    this.cutTextByLastWordStatic(lastChild);//recursive
                }else{//0 => empty tag
                    lastChild.parentNode.removeChild(lastChild);
                }
                break;
            case 3://text
                if(lastChild.textContent.replace(/\s*/,'')){
                    var handledText = this.deleteLastWord(lastChild.textContent);
                    lastChild.textContent = handledText;
                    if(handledText==='' && container.childNodes.length===1){
                        container.parentNode.removeChild(container);
                    }
                }else{//empty string
                    lastChild.parentNode.removeChild(lastChild);
                }
            break;
            case 8://comment
                lastChild.parentNode.removeChild(lastChild);
            break;
        }
    }
};
HtmlOverflowTracking.prototype.deleteUnnecessaryHtml = function(trackingElem,container){
    //while overflow and no empty container
    while(trackingElem.scrollHeight-trackingElem.offsetHeight>0 && container.lastChild){
        this.cutTextByLastWord(container);
    }
    if(container.lastChild){
        trackingElem.classList.remove('is-empty');
    }else{
        trackingElem.classList.add('is-empty');
    }
};
HtmlOverflowTracking.prototype.toString = function(){
    return this.trackingElem.textContent;
};
HtmlOverflowTracking.prototype.valueOf = function(){
    return this.trackingElem.textContent.length;
};
HtmlOverflowTracking.prototype.addNode = function(trackingElem,container,addedNode){
    //only trackingElem or root container
    container.appendChild(addedNode);
    while(trackingElem.scrollHeight-trackingElem.offsetHeight>0 && container.childNodes.length > 1){
        container.removeChild(addedNode);
        this.cutTextByLastWordStatic(container);
        container.appendChild(addedNode);
    }
    if(trackingElem.scrollHeight-trackingElem.offsetHeight>0 && container.childNodes.length===1){
        container.removeChild(addedNode);
    }
};
function HtmlOverflowTracking(trackingElem,container,addedWord){
    var that = this;
    this.addedNode = addedWord?document.createTextNode(' '+addedWord):false;
    container = container || trackingElem;

    this.originalHtml = container.cloneNode(true);
    this.trackingElem = trackingElem;
    this.container = container;

    this.destroy = function(){
        //window.removeEventListener('resize',fullHandle);
        container.innerHTML = '';
        cloneChildren();
    };
    this.refresh = function(){
        fullHandle();
    };
    
    function handleText(){
        that.deleteUnnecessaryHtml(trackingElem,container);
        if(that.addedNode){
            that.addNode(trackingElem,container,that.addedNode);
        }
    }
    function fullHandle() {
        //console.time('eventListenerHot');
        container.innerHTML = '';
        cloneChildren();
        handleText();
       // console.timeEnd('eventListenerHot');
    }
    function cloneChildren(){
        for(var i=0;i<that.originalHtml.childNodes.length;i++){
            container.appendChild(that.originalHtml.childNodes[i].cloneNode(true));
        }
    }
    handleText();
    //window.addEventListener('resize',fullHandle);
}
var defineParameters = {
    enumerable: false,
    configurable: false,
    writable: false
};
for(var key in HtmlOverflowTracking.prototype){
    if(typeof HtmlOverflowTracking.prototype[key] === 'function'){
        Object.defineProperty(HtmlOverflowTracking.prototype,key,defineParameters)
    }
}
export default HtmlOverflowTracking;