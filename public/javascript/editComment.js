/*
    for comment edit page:
    this code is meant to manipulate the dom to achieve a look
    for the comment box similar to youtube's comment box (expanding from center black bottom-border)
    and textarea box that grows with content. Youtube uses an element from 
    webcomponents.org called <iron-autogrow-textarea>. I sought to recreate something similar 
    from scratch. 
    
    This code is essentially the same as userComment.js with small tweaks so it targets the 
    new form on the edit page. 

*/

var tx = document.getElementById('userCommentEdit');
var txContainer = document.getElementById('commentContainerEdit');
var btn = document.querySelector('#Button');


btn.disabled = true; //page starts in state of blank comment textbox with submit btn disabled

tx.setAttribute('style', 'height:' + (tx.scrollHeight) + 'px;overflow-y:hidden;'); 

tx.addEventListener("input", OnInput, false); //for when contents of textarea are changed
window.addEventListener("click", OnClick, false); //listen for clicks in window



//grows textarea box with newlines and shrinks with deletions and backspace on line start
function OnInput(e) 
{
  // 'this' refers here to tx
  
  this.style.height = '25px'; //set to 25px so bottom of content always touches border-bottom
  this.style.height = (this.scrollHeight) + 'px'; //now set textarea to scrollHeight so nothing is hidden under scroll
  
  if ( !isEmpty(this.value) ) //if user has entered something in textarea box, keep the btn active
  {
      btn.disabled = false;
  }
  else if ( btn.textContent !== 'Login To Comment') //textarea box is empty, so deactivate submit btn
  {
      btn.disabled = true;
  }
}

//this function is mainly for checking if textarea box was clicked
//but it also checks for clicks on the ellipsis icons used for editing and deleting
function OnClick(e) 
{
  
  if (event.target === tx) //if textarea was clicked, expand new black border-bottom from center by changing attr of pseudo elmnt
  {
    txContainer.classList.toggle('commentSlide');
    document.styleSheets[1].addRule('#commentContainerEdit::after', 'transform:scaleX(1);'); //stylesheets[0] is bootstrap link
    
  }
  else //(event.target !== tx )
  {
    document.styleSheets[1].addRule('#commentContainerEdit::after', 'transform:scaleX(0);'); //user clicked outside txarea, so collapse bottom border
    
   
    
    
  }
}

//check str for whitespaces/returns/newlines/ and ignore
//function borrowed from this post on stackoverflow: https://stackoverflow.com/a/28485815
function isEmpty(str){
    return !str.replace(/^\s+/g, '').length; // returns true if field is empty
}