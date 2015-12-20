(function ($){
	$.fn.profile_widget = function(profile){
		this.load('widget.html', function(){
			$('#collapsed-view').hide();
			$('.exitImg').click(function(){
				$('#profile-widget').hide();
				$('#collapsed-view').show();
			})
			$('.open').click(function(){
				$('#profile-widget').show();
				$('#collapsed-view').hide();
			})
			var ctx = document.getElementById("myChart").getContext("2d");
			var tasks = [];
			getProfileStatus(profile, tasks);
		  	var taskCount = 1;
		  	$('.nextTip').click(function(){
		  		displayTask(taskCount);
		  	})
			function getProfileStatus(profile, tasks){
			  	var totalWeight = 0;
			  	var completedWeight = 0;
			  	for (var i = 0; i < profile.length; i++){
			  		totalWeight += profile[i].taskWeight;
			  		if(profile[i].taskDone == true){
			  			completedWeight += profile[i].taskWeight;
			  		}else{
			  			tasks.push(profile[i]);
			  		}
			  	}
			  	$('.title').html(tasks[0].taskTitle);
			  	$('.description').html(tasks[0].taskDesc);
			  	var percent = 100*completedWeight/totalWeight;
			  	$('.percentage').html(Math.round(percent)+'%')
			  	$('.inner-donut').html(Math.round(percent)+'%');
			  	var data = [
				  	{
				  		value: Math.round(percent),
				  		color: "blue",
				  	},
				  	{
				  		value: 100-Math.round(percent),
				  		color: 'gray',
				  	}
			  	]
			  	var chart = new Chart(ctx).Doughnut(data, {
			  		animation: false,
			  		percentageInnerCutout: 75
			  	});
			}
			function displayTask(count){
				if(tasks.length == count){
					$('.title').html(tasks[0].taskTitle);
				  	$('.description').html(tasks[0].taskDesc);
					taskCount = 1;
				}else{
					$('.title').html(tasks[count].taskTitle);
				  	$('.description').html(tasks[count].taskDesc);
				  	taskCount++;	
				}
			}
		});
	}
}(jQuery));
$(document).ready(function(){
	var profile = [
		{
			taskID: 1,
			taskTitle: "What To Do Next",
			taskDesc: "Review and edit your <a href=’#’>Resources & Addons</a> so you and customers can book specific rooms and request things like chairs, tables, catering, and more.",
			taskWeight: 2,
			taskDone: false
		},
		{
			taskID: 2,
			taskTitle: "Add Food & Drink Menus",
			taskDesc: "Create your <a href=’#’>Food & Drink</a> menus so that customers can pre-order let you know in advance what they would like to consume.",
			taskWeight: 1,
			taskDone: false
		}
	];
	$('#profileDiv').profile_widget(profile);  	
});