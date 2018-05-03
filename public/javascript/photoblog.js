

var photo = document.querySelectorAll(".photoblogIMG");
var description = document.querySelectorAll(".photoDescription");
var caption = document.getElementById("modalCaption");
var modalPhoto = document.querySelector("#modalPhoto");

for(let i = 0; i < photo.length; i++)
{
    photo[i].addEventListener("click", function(e) {
        modalPhoto.src = this.src;
        caption.innerHTML = description[i].innerHTML;
    })
}