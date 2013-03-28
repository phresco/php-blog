/*
 * PHR_PhpBlog
 *
 * Copyright (C) 1999-2013 Photon Infotech Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
if(!jQuery.fn.slider){jQuery.fn.slider=function(options){var $this=this;var $=jQuery;options=$.extend({effect:function(options,images){var $=jQuery;images.each(function(Index){if(!Index){$(this).show();}else{$(this).hide();}});this.go=function(new_index,curIdx){$(images.get(new_index)).fadeIn(options.duration);$(images.get(curIdx)).fadeOut(options.duration);return new_index;};},prev:"",next:"",duration:1000,delay:2000,captionDuration:1000,outWidth:960,outHeight:360,width:960,height:360,caption:true,controls:true,autoPlay:true,bullets:true,onStep:function(){},stopOnHover:0,preventCopy:1},options);options.loop=options.loop||Number.MAX_VALUE;var $Elements=$this.find(".ws_images>*");var elementsCount=$Elements.length;options.stopOn=((options.stopOn||0)+elementsCount)%elementsCount;var cover;if(options.preventCopy){cover=$("<div><a href=\"#\" style=\"display:none;position:absolute;left:0;top:0;width:100%;height:100%\"></a></div>").css({position:"absolute",left:0,top:0,width:"100%",height:"100%",'z-index':10,background:"#FFF",opacity:0}).appendTo($this).find("A").get(0);}$Elements.each(function(index){var inner=$(this).html()||"";var pos=inner.indexOf(">",inner);if(pos>=0){$(this).data("descr",inner.substr(pos+1));if(pos<inner.length-1){$(this).html(inner.substr(0,pos+1));}}$(this).css({'font-size':0});});var images=$Elements.find("IMG");var curIdx=0;function go(index,dx,dy){index=(index%elementsCount+elementsCount)%elementsCount;if(curIdx==index){return;}var index=effect.go(index,curIdx,dx,dy);if(index<0){return;}go2(index);if(options.caption){setTitle($Elements[index]);}options.onStep(index);curIdx=index;}var startX,startY,isMoving=0;var _this=$this.get(0);if(_this.addEventListener){_this.addEventListener("touchmove",function(e){if(isMoving){var dx=(startX-e.touches[0].pageX)/20;var dy=(startY-e.touches[0].pageY)/20;if(Math.abs(dx)>1||Math.abs(dy)>1){startX=startY=isMoving=0;forceGo(e,curIdx+(dx+dy>0?1:-1),dx,dy);}}},false);_this.addEventListener("touchstart",function(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=1;}else{isMoving=0;}},false);_this.addEventListener("touchend",function(e){isMoving=0;},false);}function go2(index){if(options.bullets){setBullet(index);}if(cover){var href=$Elements.get(index).href;if(href){cover.setAttribute("href",href);cover.setAttribute("target",$Elements.get(index).target);cover.style.display="block";}else{cover.style.display="none";}}}var autoPlayTimer;function restartPlay(){stopPlay();if(options.autoPlay){autoPlayTimer=setTimeout(function(){go(curIdx<elementsCount-1?curIdx+1:0);if(curIdx==options.stopOn&&!--options.loop){options.autoPlay=0;}restartPlay();},options.delay+options.duration);}}function stopPlay(){if(autoPlayTimer){clearTimeout(autoPlayTimer);}autoPlayTimer=null;}function forceGo(event,index,dx,dy){stopPlay();event.preventDefault();go(index,dx,dy);restartPlay();}$(images.get(0)).css("z-index",1);images.css("position","absolute");if(typeof options.effect=="string"){options.effect=window["ws_"+options.effect];}var effect=new options.effect(options,images,$(".ws_images",$this));$Elements.find("IMG").css("visibility","visible");var ic=c=$(".ws_images",$this);var t="";c=t?$("<div></div>"):0;if(c){c.css({position:"absolute",right:"2px",bottom:"2px",padding:"0 0 0 0"});ic.append(c);}if(c&&document.all){var f=$("<iframe src=\"javascript:false\"></iframe>");f.css({position:"absolute",left:0,top:0,width:"100%",height:"100%",filter:"alpha(opacity=0)"});f.attr({scrolling:"no",framespacing:0,border:0,frameBorder:"no"});c.append(f);}var d=c?$(document.createElement("A")):c;if(d){d.css({position:"relative",display:"block",'background-color':"#E4EFEB",color:"#837F80",'font-family':"Lucida Grande,sans-serif",'font-size':"11px",'font-weight':"normal",'font-style':"normal",'-moz-border-radius':"5px",'border-radius':"5px",padding:"1px 5px",width:"auto",height:"auto",margin:"0 0 0 0",outline:"none"});d.attr({href:"ht"+"tp://"+t.toLowerCase()});d.html(t);d.bind("contextmenu",function(eventObject){return false;});c.append(d);}if(options.controls){var $next_photo=$("<a href=\"#\" class=\"ws_next\">"+options.next+"</a>");var $prev_photo=$("<a href=\"#\" class=\"ws_prev\">"+options.prev+"</a>");$this.append($next_photo);$this.append($prev_photo);$next_photo.bind("click",function(e){forceGo(e,curIdx+1);});$prev_photo.bind("click",function(e){forceGo(e,curIdx-1);});}function initBullets(){var $bullets_cont=$this.find(".ws_bullets>div");var $bullets=$("a",$bullets_cont);$bullets.click(function(e){forceGo(e,$(e.target).index());});var $thumbs=$bullets.find("IMG");if($thumbs.length){var mainFrame=$("<div class=\"ws_bulframe\"/>").appendTo($bullets_cont);var imgContainer=$("<div/>").css({width:$thumbs.length+1+"00%"}).appendTo($("<div/>").appendTo(mainFrame));$thumbs.appendTo(imgContainer);$("<span/>").appendTo(mainFrame);var curIndex=-1;function moveTooltip(index){if(index<0){index=0;}$($bullets.get(curIndex)).removeClass("ws_overbull");$($bullets.get(index)).addClass("ws_overbull");mainFrame.show();var mainCSS={left:$bullets.get(index).offsetLeft-mainFrame.width()/2};var contCSS={left:-$thumbs.get(index).offsetLeft};if(curIndex<0){mainFrame.css(mainCSS);imgContainer.css(contCSS);}else{if(!document.all){mainCSS.opacity=1;}mainFrame.stop().animate(mainCSS,"fast");imgContainer.stop().animate(contCSS,"fast");}curIndex=index;}$bullets.hover(function(){moveTooltip($(this).index());});var hideTime;$bullets_cont.hover(function(){if(hideTime){clearTimeout(hideTime);hideTime=0;}moveTooltip(curIndex);},function(){$bullets.removeClass("ws_overbull");if(document.all){if(!hideTime){hideTime=setTimeout(function(){mainFrame.hide();hideTime=0;},400);}}else{mainFrame.stop().animate({opacity:0},{duration:"fast",complete:function(){mainFrame.hide();}});}});$bullets_cont.click(function(e){forceGo(e,$(e.target).index());});}}function setBullet(new_index){$(".ws_bullets A",$this).each(function(index){if(index==new_index){$(this).addClass("ws_selbull");}else{$(this).removeClass("ws_selbull");}});}if(options.caption){$caption=$("<div class='ws-title' style='display:none'></div>");$this.append($caption);$caption.bind("mouseover",function(e){stopPlay();});$caption.bind("mouseout",function(e){restartPlay();});}function setTitle(A){var title=$("img",A).attr("title");var descr=$(A).data("descr");var $Title=$(".ws-title",$this);$Title.stop(1,1).stop(1,1).fadeOut(options.captionDuration/3,function(){if(title||descr){$Title.html((title?"<span>"+title+"</span>":"")+(descr?"<div>"+descr+"</div>":""));showWithSlide($Title,{direction:"left",easing:"easeInOutExpo",complete:function(){if($.browser.msie){$Title.get(0).style.removeAttribute("filter");}},duration:options.captionDuration});}});}if(options.bullets){initBullets();}go2(0);if(options.caption){setTitle($Elements[0]);}if(options.stopOnHover){this.bind("mouseover",function(e){stopPlay();});this.bind("mouseout",function(e){restartPlay();});}restartPlay();function showWithSlide(element,options){var bkp_prop={};var props=["position","top","bottom","left","right"];for(var i=0;i<props.length;i++){bkp_prop[props[i]]=element[0].style[props[i]];}element.show();var wrap_props={width:element.outerWidth(true),height:element.outerHeight(true),'float':element.css("float"),overflow:"hidden",opacity:0},wrapper=$("<div></div>").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0});element.wrap(wrapper);wrapper=element.parent();if(element.css("position")=="static"){wrapper.css({position:"relative"});element.css({position:"relative"});}else{$.extend(wrap_props,{position:element.css("position"),zIndex:element.css("z-index")});$.each(["top","left","bottom","right"],function(i,pos){wrap_props[pos]=element.css(pos);if(isNaN(parseInt(wrap_props[pos],10))){wrap_props[pos]="auto";}});element.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"});}wrapper.css(wrap_props).show();var direction=options.direction||"left";var ref=direction=="up"||direction=="down"?"top":"left";var pos_neg=direction=="up"||direction=="left";var distance=options.distance||(ref=="top"?element.outerHeight({margin:true}):element.outerWidth({margin:true}));element.css(ref,pos_neg?isNaN(distance)?"-"+distance:-distance:distance);var animation={};animation[ref]=(pos_neg?"+=":"-=")+distance;wrapper.animate({opacity:1},{duration:options.duration,easing:options.easing});element.animate(animation,{queue:false,duration:options.duration,easing:options.easing,complete:function(){for(var p in bkp_prop){element[0].style[p]=bkp_prop[p];}element.parent().replaceWith(element);if(options.complete){options.complete();}}});}return this;};}jQuery.extend(jQuery.easing,{easeInOutExpo:function(x,t,b,c,d){if(t==0){return b;}if(t==d){return b+c;}if((t/=d/2)<1){return c/2*Math.pow(2,10*(t-1))+b;}return c/2*(-Math.pow(2,-10*--t)+2)+b;}});