/* global $ */

$('#commentForm').submit(function(e)
{
    e.preventDefault();
    alert(this.action);
	var comment = $(this).serialize();
	var url = this.action.substring(this.action.indexOf('/userpages/'), this.action.length);
	url += "/";
	alert(url);

	$.post(url, comment, function(data) {
	    alert("here2");
		$('#commentList').append(
			`
			<li>
                  <div class="row">
                     <div class="col-md-12">
                         <strong>${data.author.username}</strong>
                         
                         <p>
                     
                            ${data.text}
 
                     
                        </p> 
                        
                     </div>
                  </div>
            </li>
			`
			)
		$('#userComment').val('');
	})
});
