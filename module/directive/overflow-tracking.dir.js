import HtmlOverflowTracking from '../classes/HtmlOverflowTracking.cls';
import {directiveName} from '../name.const';

function setHot(element,container,addedWord){
    //console.log(element);
    var elementStyle = window.getComputedStyle(element, null);
    if(elementStyle.getPropertyValue('overflow')!=='hidden'){
        element.style.overflow = 'hidden'
    }
    if(parseInt(elementStyle.getPropertyValue('height'))===0){
        console.warn('height === 0 for '+element.className,element);
    }
    if(addedWord){
        return new HtmlOverflowTracking(element,container,addedWord);
    }else{
        return new HtmlOverflowTracking(element,container);
    }
}
function getBackground(element){
    var bg = getComputedStyle(element,null).getPropertyValue('background-color');
    if(bg === 'rgba(0, 0, 0, 0)' && element.parentNode){
        return getBackground(element.parentNode);//recursive
    }else{
        if(element.parentNode){
            return bg;
        }else{
            console.warn('not define background-image');
            return 'rgba(255,255,255,1)';
        }
    }
}
function getLineHeight(element){
    var span = document.createElement('span');
    span.innerHTML = 't';//test;
    span.style.display = 'inline-block';
    element.appendChild(span);
    var lineHeight = span.getBoundingClientRect().height;
    element.removeChild(span);
    return lineHeight;
}
function setGradient(element,position,size){
    (!size || size<0 && size>1)?size=0.2:null;
    position = position || 'hor';
    //line height
    var lineHeight = getLineHeight(element);
    var elementStyle = window.getComputedStyle(element, null);
    //overflow
    if(elementStyle.getPropertyValue('overflow')!=='hidden'){
        element.style.overflow = 'hidden'
    }
    //position
    if(elementStyle.getPropertyValue('position')==='static'){
       element.style.position = 'relative';
    }
    //gradient
    var gradient = document.createElement('div');
    gradient.className = 'ot-gradient';
    gradient.style.position = 'absolute';
    var bg = getBackground(element);

    if(position==='hor'){
        var bottom = elementStyle.getPropertyValue('padding-bottom');
        gradient.style.bottom = bottom;
        gradient.style.right = '0px';
        gradient.style.height = lineHeight+'px';
        gradient.style.width = Math.ceil(element.offsetWidth * size)+'px';
        gradient.style.backgroundImage = 'linear-gradient(to left, '+bg+' 0%,'+bg+' 60%,rgba(0,0,0,0) 100%)';
    }else{//ver
        gradient.style.bottom = '0px';
        gradient.style.right = '0px';
        gradient.style.left = '0px';
        gradient.style.height = Math.ceil(element.offsetHeight * size)+'px';
        gradient.style.backgroundImage = 'linear-gradient(to top, '+bg+' 0%,'+bg+' 60%,rgba(0,0,0,0) 100%)';
    }
    element.appendChild(gradient);
    return {
        el:gradient,
        destroy:function(){
            this.el.parentNode.removeChild(this.el);
        }
    };
}

export default ()=>{
    return {
        scope:{
            //hot
            addedWord:'@',
            container:'@',
            resize:'@',//refresh on resize
            //gradient
            position:'@',
            size:'@'
        },
        restrict:'A',
        controller:function($scope, $element, $attrs,$timeout){
            'ngInject';
            $timeout(function(){
                var mode = $attrs[directiveName];
                switch(mode){
                    case 'html':
                        //console.time('initHot');
                        var hot;
                        if($scope.container){
                            hot = setHot($element[0],$element[0].querySelector($scope.container),$scope.addedWord);
                        }else{
                            hot = setHot($element[0],$element[0],$scope.addedWord);
                        }
                        var timeout;
                        $scope.resize = +$scope.resize || 100;
                        var refresh = function(){
                            clearTimeout(timeout);
                            timeout = setTimeout(function(){
                                hot.refresh();
                            },$scope.resize)
                        };
                        if(+$scope.resize!==0){
                            window.addEventListener('resize',refresh);
                        }
                        //console.timeEnd('initHot');
                        $scope.$on('$destroy',function(){
                            hot.destroy();
                            window.removeEventListener('resize',refresh);
                        });
                        break;
                    case 'gradient':
                        $scope.position!=='ver'?$scope.position = 'hor':null;
                        if($scope.size){
                            setGradient($element[0],$scope.position,+$scope.size);
                        }else{
                            setGradient($element[0],$scope.position);
                        }
                        break;
                }
                $element.addClass('is-tracking');
            });
        }
    }
}