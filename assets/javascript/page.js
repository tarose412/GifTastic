$(document).ready(function() {

	var buttons = [ 'dexter morgan', 'heisenberg', 'jesse pinkman', 'khaleesi', 'jon snow' ];
	var key = "bEOeuErhPvzkghlGxQahBs86Pn9Gt1I9";

	function renderButtons() {
		$("#button-div").empty();
		for (var i = 0; i < buttons.length; i++) {
			$("#button-div").append($("<button>").text(buttons[i]).val(buttons[i]).addClass("gif-button"));
		}
	};

	function addGifs(response) {
        $("#gif-div").empty();

        var results = response.data;
        for (var i = 0; i < results.length; i++) {
        	console.log(results[i]);
        	var div = $("<div>").addClass("gif-box col-auto");
        	var rating = $("<h3>").text(results[i].rating).addClass("rating");
        	var gif = $("<img>")
        	.attr("src", results[i].images.fixed_height_still.url)
        	.attr("data-still", results[i].images.fixed_height_still.url)
        	.attr("data-active", results[i].images.fixed_height.url)
        	.attr("data-state", "still")
        	.addClass("gif");

        	div.append(gif);
        	div.append(rating);
        	$("#gif-div").append(div);
        }
	}

	$(document).on("click", ".gif", function(event) {
		var gif = $(this);

		if (gif.attr("data-state") === "still") {
			gif.attr("src", gif.attr("data-active"));
			gif.attr("data-state", "active");
		} else {
			gif.attr("src", gif.attr("data-still"));
			gif.attr("data-state", "still");
		}
	});

	$(document).on("click", ".gif-button", function(event) {
		var button = $(this);

		var val = button.val();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + val + "&api_key=" + key + "&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            addGifs(response);
        });
	});

	$("#add-button").on("click", function(event) {
		event.preventDefault();

		var val = $("#button-input").val().trim();

		if (val.length > 0 && !buttons.includes(val)) {
			buttons.push(val);
			renderButtons();
		}
	});

	renderButtons();

});