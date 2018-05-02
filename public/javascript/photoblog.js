

var photo = document.querySelectorAll(".photo");
var description = document.querySelectorAll(".photoDescription");
var modalPhoto = document.querySelector("#modalPhoto");

for(let i = 0; i < photo.length; i++)
{
    photo[i].addEventListener("click", function(e) {
        modalPhoto.innerHTML = this.innerHTML;
    })
}