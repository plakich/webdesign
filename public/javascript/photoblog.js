

var photo = document.querySelectorAll(".photoblogIMG");
var description = document.querySelectorAll(".photoDescription");
var caption = document.getElementById("modalCaption");
var modalPhoto = document.querySelector("#modalPhoto");
var photoID = document.querySelectorAll(".photoID");
var ellipsis = document.querySelector("#modifyPhoto");

var modalEdit = document.querySelector("#modalEdit");
var modalDelete = document.querySelector("#modalDelete");
var dropdownModal = document.querySelector("#dropdownModal");
var temp = "";

if (!!ellipsis) //if ellipsis on page (i.e., user logged in so ellipsis icon btn is shown)
{
    ellipsis.addEventListener("click", function(e) 
    {
        dropdownModal.classList.toggle("show");
    }, false);
}

window.addEventListener("click", function(e)  
{
    if (!!ellipsis && event.target !== ellipsis) //if clicked anywhere in window besides ellipsis, remove edit/delete menu
    {
        dropdownModal.classList.remove("show");
    }
    
}, false);

for(let i = 0; i < photo.length; i++)
{
    photo[i].addEventListener("click", function(e) {
        modalPhoto.src = this.src;
        caption.innerHTML = description[i].innerHTML;
        
        //append photoID (which changes depending on which photo is clicked,
        //so we cannot write a static href or action attribute) to edit and delete urls 
        //but first, we must reset the href and action atribs each time since if user clicks on more than
        //one photo, multipe repeated ids get appended to url string. 
        modalEdit.href = modalEdit.href.substring(0, modalEdit.href.indexOf("photos/") + 7); // photos/ is 7 chars
        modalEdit.href += photoID[i].textContent.trim() + "/edit";            
        modalDelete.action = modalDelete.action.substring(0, modalDelete.action.indexOf("photos/") + 7);
        modalDelete.action += photoID[i].textContent.trim() + "/?_method=DELETE"; //using method_override 
    }, false); 
}