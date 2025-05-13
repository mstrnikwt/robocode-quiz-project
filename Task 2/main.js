let timeStorage = localStorage
let time

if (timeStorage. getItem("time") != null) {
	time = parseInt(timeStorage.getItem("time"))
} else {
	time = 300
	timeStorage.setItem("time", time)
}

console.log(time)

let answer = [
	["Harry potter"],
	["Sponge bob"],
	["Pirates of the caribbean"],
	["Frozen"],
	["Star Wars"],
	["Rocky"],
	["Lion king"],
	["Home Alone"],
	["Indiana Jones"],
	["The Simpsons"],
	["Ghostbusters"],
	["Back to the Future"],
	["Shrek"],
	["Terminator 2"]
]
let was = []
let progress = 0
let num = Math.floor(1 + Math.random() * 10)
console.log(answer[num - 1])

$(document).ready(function() {
	$(".progress").knob({
		"min": 0,
		"max": 10,
		"angleOffset": -60,
		"angleArc": 120,
		"readOnly": true

	})

	$(".time").knob({
		"min": 0,
		"max": 300,
		"angleOffset": -60,
		"angleArc": 120,
		"readOnly": true

	})

	$(".start").click(function() {
		$(".start").css('display','none')
		$(".taskProgress, .timeProgress, .sound, .answer").css('display','block')
		startRebus(num)
		startTime()
	})
	$("#btnTask1").click(function(){
		if(answer[num - 1].indexOf($("#inputTask1").val()) != -1) {
			alertify.success("Correct!")
			$("#inputTask1").val("")
			progress++
			$(".progress").val(progress).trigger('change')
			was.push(num)
			console.log(was)
			if (progress < 10) {
				do {
					num = Math.floor(1 + Math.random() * 10)
				} while (was.includes(num))
				console.log(answer[num - 1])
				startRebus(num)
			} else {
				$(".img, .answer, .taskProgress").css({
					'display': 'none'
				})

				$("#nextTask").css({
					'display': 'flex'
				})
			}
		} else {
			alertify.error("Wrong answer, try again")
		}
	})
})



function startRebus(arg) {
	$("#melody").attr("src", `sound/${arg}.mp3`)
}

function startTime() {
	setInterval(function() {
		time = parseInt(localStorage.getItem("time")) - 1
		$(".time").val(time).trigger('change')
		if (time == 0) {
			alertify.error("Time's up!")
			setTimeout(()=>window.open("../Task 1/index.html", "_self", false), 2000)
			localStorage.removeItem("time")
		}
		else if (time > 0) {
			localStorage.setItem("time", time)
		} 
	}, 1000)
}
