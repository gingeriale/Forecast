$(document).ready(function(){
	$("input[type=text]").keypress(function(enter) {
		var key = enter.which;
		if(key == 13)
		{
			$("#searcher").click();
			return false;
		}
	});
	$("#searcher").click(function(){
		$(".final").remove();
		var city = $("input[type=text]").val();

		if (city === '')  {
			$(".answer").append('<div class="final">' + 'city not entered' + '</div>');
		}

		else {

		var xhr = new XMLHttpRequest;
		xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=2de143494c0b295cca9337e1e96b00e0", false);
		xhr.send();
		var answer = xhr.responseText;

		/*alert(answer.slice('main":{"temp','7.63,'));*/

		var vhozh = answer.indexOf('temp')+6;
		
		/*alert(answer[vhozh]+answer[vhozh+1]);*/
		
		var kelvinString = answer[vhozh]+answer[vhozh+1]+answer[vhozh+2];
		var kelvin = parseInt(kelvinString, 10);
		/*alert(kelvin);*/

		if (isNaN(kelvin)) {
			$(".answer").append('<div class="final">' + 'city not found' + '</div>');
		}

		else {
		var celsius = kelvin-273;
		$(".answer").append('<div class="final">' + celsius + '  <sup>o</sup>C</div>');

		}

		}

		$(document).on('click','.clear',function(){
			$(".final").remove();
			$("input:text").val('');
		});

		$('input:text').click(function(){
        $(this).val('');
        $(".final").remove();
    	});

	});


});