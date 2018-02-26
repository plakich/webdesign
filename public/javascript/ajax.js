/* global $ */

$('#commentForm').submit(function(e)
{
    e.preventDefault();
    alert("here");
	var comment = $(this).serialize();

	$.post('/userpages/:id/comments', comment, function(data) {
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
