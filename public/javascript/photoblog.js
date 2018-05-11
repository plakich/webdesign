

var photo = document.querySelectorAll(".photoblogIMG");
var description = document.querySelectorAll(".photoDescription");
var caption = document.getElementById("modalCaption");
var modalPhoto = document.querySelector("#modalPhoto");
var photoID = document.querySelectorAll(".photoID");
var ellipsis = document.querySelector("#modifyPhoto");
var left = document.querySelector(".fa-chevron-left");
var right = document.querySelector(".fa-chevron-right");

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
    photo[i].addEventListener("click", function(e) 
    {
        modalPhoto.src = this.src;
        caption.innerHTML = description[i].innerHTML;
        
        //append photoID (which changes depending on which photo is clicked,
        //so we cannot write a static href or action attribute) to edit and delete urls 
        //but first, we must reset the href and action atribs each time since if user clicks on more than
        //one photo, multipe repeated ids get appended to url string. 
        if (!!modalEdit) //if user is logged in and owns photoblog page, then modalEdit btn will not be undefined
        {
            modalEdit.href = modalEdit.href.substring(0, modalEdit.href.indexOf("photos/") + 7); // photos/ is 7 chars
            modalEdit.href += photoID[i].textContent.trim() + "/edit";            
            modalDelete.action = modalDelete.action.substring(0, modalDelete.action.indexOf("photos/") + 7);
            modalDelete.action += photoID[i].textContent.trim() + "/?_method=DELETE"; //using method_override, so our form action must make a delete request, not post 
        }
        
        temp = i; 
        
    }, false); 
    
   
}


    //if user clicks left arrow by photo then automatically display on modal the photo to the left 
    //of the current one
    left.addEventListener("click", function(e)
    {
        
        if (temp > 0) //if we're not on first array index then we can always move back left to display photo of previous one
        {
            modalPhoto.src = photo[temp-1].src;
            caption.innerHTML = description[temp-1].innerHTML;
            
            //append photoID (which changes depending on which photo is clicked,
            //so we cannot write a static href or action attribute) to edit and delete urls 
            //but first, we must reset the href and action atribs each time since if user clicks on more than
            //one photo, multipe repeated ids get appended to url string. 
            if (!!modalEdit) //if user is logged in and owns photoblog page, then modalEdit btn will defined
            {
                modalEdit.href = modalEdit.href.substring(0, modalEdit.href.indexOf("photos/") + 7); // photos/ is 7 chars
                modalEdit.href += photoID[temp-1].textContent.trim() + "/edit";            
                modalDelete.action = modalDelete.action.substring(0, modalDelete.action.indexOf("photos/") + 7);
                modalDelete.action += photoID[temp-1].textContent.trim() + "/?_method=DELETE"; //using method_override, so our form action must make a delete request, not post 
            }
            
            temp = temp - 1;
        }
        else //we're on the first photo of array so loop ahead to end of array and display last photo
        {
            modalPhoto.src = photo[photo.length - 1].src;
            caption.innerHTML = description[photo.length - 1].innerHTML;
            
            //append photoID (which changes depending on which photo is clicked,
            //so we cannot write a static href or action attribute) to edit and delete urls 
            //but first, we must reset the href and action atribs each time since if user clicks on more than
            //one photo, multipe repeated ids get appended to url string. 
            if (!!modalEdit) //if user is logged in and owns photoblog page, then modalEdit btn will not be undefined
            {
                modalEdit.href = modalEdit.href.substring(0, modalEdit.href.indexOf("photos/") + 7); // photos/ is 7 chars
                modalEdit.href += photoID[photo.length - 1].textContent.trim() + "/edit";            
                modalDelete.action = modalDelete.action.substring(0, modalDelete.action.indexOf("photos/") + 7);
                modalDelete.action += photoID[photo.length - 1].textContent.trim() + "/?_method=DELETE"; //using method_override, so our form action must make a delete request, not post 
            }
            temp = photo.length - 1;
        }
        
    }, false);
    
    //if user clicks right arrow by photo then automatically display on modal the photo to the right 
    //of the current one
    right.addEventListener("click", function(e)
    {
        
        if (temp < photo.length - 1) //if we're not on last array index then we can always move forward one to display photo ahead
        {
            modalPhoto.src = photo[temp + 1].src;
            caption.innerHTML = description[temp + 1].innerHTML;
            
            //append photoID (which changes depending on which photo is clicked,
            //so we cannot write a static href or action attribute) to edit and delete urls 
            //but first, we must reset the href and action atribs each time since if user clicks on more than
            //one photo, multipe repeated ids get appended to url string. 
            if (!!modalEdit) //if user is logged in and owns photoblog page, then modalEdit btn will defined
            {
                modalEdit.href = modalEdit.href.substring(0, modalEdit.href.indexOf("photos/") + 7); // photos/ is 7 chars
                modalEdit.href += photoID[temp + 1].textContent.trim() + "/edit";            
                modalDelete.action = modalDelete.action.substring(0, modalDelete.action.indexOf("photos/") + 7);
                modalDelete.action += photoID[temp + 1].textContent.trim() + "/?_method=DELETE"; //using method_override, so our form action must make a delete request, not post 
            }
            
            temp = temp + 1;
        }
        else //we're on the last photo of array so loop back to beginning of array and display first photo
        {
            modalPhoto.src = photo[0].src;
            caption.innerHTML = description[0].innerHTML;
            
            //append photoID (which changes depending on which photo is clicked,
            //so we cannot write a static href or action attribute) to edit and delete urls 
            //but first, we must reset the href and action atribs each time since if user clicks on more than
            //one photo, multipe repeated ids get appended to url string. 
            if (!!modalEdit) //if user is logged in and owns photoblog page, then modalEdit btn will not be undefined
            {
                modalEdit.href = modalEdit.href.substring(0, modalEdit.href.indexOf("photos/") + 7); // photos/ is 7 chars
                modalEdit.href += photoID[0].textContent.trim() + "/edit";            
                modalDelete.action = modalDelete.action.substring(0, modalDelete.action.indexOf("photos/") + 7);
                modalDelete.action += photoID[0].textContent.trim() + "/?_method=DELETE"; //using method_override, so our form action must make a delete request, not post 
            }
            temp = 0;
        }
        
    }, false);
        
    