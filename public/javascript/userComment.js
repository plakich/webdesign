/*
    for userpages show page:
    this code is meant to manipulate the dom to achieve a look
    for the comment box similar to youtube's comment box (expanding from center black bottom-border)
    and textarea box that grows with content. Youtube uses an element from 
    webcomponents.org called <iron-autogrow-textarea>. 

*/

var tx = document.getElementById('userComment');
var txContainer = document.getElementById('commentContainer');
var btn = document.querySelector('.text-right > a.disabled');

tx.setAttribute('style', 'height:' + (tx.scrollHeight) + 'px;overflow-y:hidden;');  
tx.addEventListener("input", OnInput, false); //when contents of textarea are changed
document.body.addEventListener("click", OnClick, false);

//grows textarea box with newlines and shrinks with deletions and backspace on line start
function OnInput(e) 
{
  this.style.height = '25px'; //set to 25px so bottom of content always touches border-bottom
  this.style.height = (this.scrollHeight) + 'px'; //now set textarea to scrollHeight so nothing is hidden under scroll
}


function OnClick(e)
{
  if (event.target === tx) //if textarea was clicked, expand new black border-bottom from center by chaning attr of pseudo elmnt
  {
    txContainer.classList.toggle('commentSlide');
    document.styleSheets[1].addRule('#commentContainer::after', 'transform:scaleX(1);'); //stylesheets[0] is bootstrap link
    btn.classList.remove('disabled');
  }
  else //(event.target !== tx )
  {
    document.styleSheets[1].addRule('#commentContainer::after', 'transform:scaleX(0);');
    btn.classList.add('disabled');
  }
}
