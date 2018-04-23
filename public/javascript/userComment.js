/*
    for userpages show page:
    this code is meant to manipulate the dom to achieve a look
    for the comment box similar to youtube's comment box (expanding from center black bottom-border)
    and textarea box that grows with content. Youtube uses an element from 
    webcomponents.org called <iron-autogrow-textarea>. I sought to recreate something similar 
    from scratch. 
    
    Also, this code is responsible for handling the expansion of the user's picture when 
    the expand icon is clicked. It also handles creating menus for
    editing and deleting when the ellipsis icons are clicked. 

*/

//these 4 vars declared on their own line may be 
//returned as undefined from querySelector because the user
//has to be logged in to see these. This is why 
//we check for !!ellipsis_v and such before  each if statement

var dropdown = document.querySelector('#dropdown');

var dropdown2 = document.querySelectorAll('.dropdown2');

var ellipsis_v = document.querySelector('.fa-ellipsis-v');

var ellipsis_v2 = document.querySelectorAll('.glyphicon-option-vertical');


var userpic = document.querySelector('.userpic');
var expandIcon = document.querySelector('.fa-expand');
var tx = document.getElementById('userComment');
var txContainer = document.getElementById('commentContainer');
//var commentForm = document.getElementById('commentForm'); 
var btn = document.querySelector('#Button');

if (btn.textContent === 'Login To Comment') //if user is not logged in, make btn active so user can click to login
{
    btn.disabled = false;
}
else 
{
    btn.disabled = true; //page starts in state of blank comment textbox with submit btn disabled
}
tx.setAttribute('style', 'height:' + (tx.scrollHeight) + 'px;overflow-y:hidden;'); 

tx.addEventListener("input", OnInput, false); //for when contents of textarea are changed
window.addEventListener("click", OnClick, false); //listen for clicks in window

//old code for adding event listeners to array of dom elements
//may have to change icon position at later time
// for(let i = 0; i < ellipsis_v.length; i++) 
// {
//     ellipsis_v[i].addEventListener('mouseenter', function(e)
//     {
//         this.classList.add('fa-rotate-45');
//     }, false);
//     ellipsis_v[i].addEventListener('mouseleave', function(e)
//     {
//         this.classList.remove('fa-rotate-45');
//     }, false);
// }



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
  
  if (!!ellipsis_v && event.target !== ellipsis_v)
  {
      dropdown.classList.remove('show');
  }
  if (!!ellipsis_v2)
  {
      for(let i = 0; i < dropdown2.length; i++)
      {
          if (event.target !== ellipsis_v2[i])
          {
                dropdown2[i].classList.remove('show');    
          }
          
      }
  }
  
  if (event.target === tx) //if textarea was clicked, expand new black border-bottom from center by changing attr of pseudo elmnt
  {
    txContainer.classList.toggle('commentSlide');
    document.styleSheets[1].addRule('#commentContainer::after', 'transform:scaleX(1);'); //stylesheets[0] is bootstrap link
    
  }
  else //(event.target !== tx )
  {
    document.styleSheets[1].addRule('#commentContainer::after', 'transform:scaleX(0);'); //user clicked outside txarea, so collapse bottom border
    
    if (event.target === expandIcon) //user clicked on expand icon to expand userpic
    {
        userpic.classList.toggle('expand-userpic');
    }
    else if (!!ellipsis_v && event.target === ellipsis_v) //show edit and delete menu options for userpage
    {
        dropdown.classList.toggle('show');
    }
    else if (!!ellipsis_v2 && !!dropdown2) 
    {
        
        for(let i = 0; i < ellipsis_v2.length; i++)
        {
            if (event.target === ellipsis_v2[i])
            {
               
                dropdown2[i].classList.toggle('show');
                //code below adjusts dropdown2 menu position, may be needed for later additions
                // var adjustY = e.clientY + 10; 
                // dropdown2[i].style.top = adjustY + 'px';
                
          
                
            }
        }
    }
    
    
  }
}

//check str for whitespaces/returns/newlines/ and ignore
//function borrowed from this post on stackoverflow: https://stackoverflow.com/a/28485815
function isEmpty(str){
    return !str.replace(/^\s+/g, '').length; // returns true if field is empty
}