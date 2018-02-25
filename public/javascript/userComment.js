var tx = document.getElementById('userComment');

tx.setAttribute('style', 'height:' + (tx.scrollHeight) + 'px;overflow-y:hidden;');  
tx.addEventListener("input", OnInput, false); //when contents of textarea are changed
tx.addEventListener("click", OnClick, false);


function OnInput(e) 
{
  this.style.height = '25px'; //set to 25px so bottom of content always touches border-bottom
  this.style.height = (this.scrollHeight) + 'px'; //now set textarea to scrollHeight so nothing is hidden under scroll
}

function OnClick(e)
{
    this.classList.toggle('commentSlide');
}
