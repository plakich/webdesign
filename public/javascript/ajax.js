/* global $ */

$('#commentForm').on('submit', function(e)
{
	
	e.preventDefault();
    alert(this.action);
	var comment = $(this).serialize();
	var url = this.action.substring(this.action.indexOf('/userpages/'), this.action.length);
	url += "/";
	alert(url + '\n' + comment);

	$.post(url, comment, function(data) {
	    alert("here2");
		$('#commentList').prepend(
			`
			<li>
            	<strong>${data.owner.username}</strong>
                         
                	<p class="comments">
                     
                    	${data.text}
 
                     
                    </p> 
                        
                    
            </li>
			`
			);
		$('#userComment').val('').height('25px');
	});
	
	
    
});
