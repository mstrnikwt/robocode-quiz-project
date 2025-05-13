let timeStorage = localStorage
let time

if (timeStorage. getItem("time") != null) {
	time = parseInt(timeStorage.getItem("time"))
} else {
	time = 300
	timeStorage.getItem("time", time)
}

let cards = [
	{
		name: "yt",
		img: "./img/yt.png.jpg",
		id: 1
	},
	{
		name: "rbc",
		img: "./img/rbc.png.png",
		id: 2
	},
	{
		name: "js",
		img: "./img/js.png.png",
		id: 3
	},
	{
		name: "jq",
		img: "./img/jq.png.png",
		id: 4
	},
	{
		name: "stm",
		img: "./img/stm.png.jpg",
		id: 5
	},
	{
		name: "inst",
		img: "./img/inst.png.jpg",
		id: 6
	},
	{
		name: "fls",
		img: "./img/fls.png.jpg",
		id: 7
	},
	{
		name: "fb",
		img: "./img/fb.png.png",
		id: 8
	},
	{
		name: "spo",
		img: "./img/spo.png.png",
		id: 9
	},
	{
		name: "sc",
		img: "./img/sc.png.jpg",
		id: 10
	},
	{
		name: "cc",
		img: "./img/cc.png.png",
		id: 11
	},
	{
		name: "pth",
		img: "./img/pth.png.png",
		id: 12
	}
]
let progress = 0
let firstCard = null
let secondCard = null

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
		"max": 5,
		"angleOffset": -60,
		"angleArc": 120,
		"readOnly": true

	})

	$(".start").click(function() {
		$(".start").css('display','none')
		$(".taskProgress, .timeProgress, .sound, .answer").css('display','block')
		startTime()
		fillboard()
		$(".card").on("click", cardClicked)
	})
})

function fillboard() {
	let board = shuffle([...cards, ...cards])
	for (i = 0; i < board.length; i++) {
		let cardHTML = 
		`<div class="card" data-id="${board[i].id}">
				<div class="front">ROBOCODE</div>
				<div class="back"><img src="${board[i].img}"></div>
			</div>`
			$('.gameBoard').append(cardHTML)
	}
}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function cardClicked(event) {
	console.log(event)
	if (secondCard || $(this).hasClass('matched')) {
		return
	}

	if (!firstCard) {
		firstCard = $(this)
		firstCard.addClass("flip")
		return
	}

	if (firstCard) {
		secondCard = $(this)
		secondCard.addClass("flip")
		if (firstCard.attr("data-id") == secondCard.attr("data-id")) {
			firstCard.addClass("matched")
			secondCard.addClass("matched")
			firstCard = null
			secondCard = null
			progress++
			$(".progress").val(progress).trigger('change')
			if (progress == 12) {
				alertify.alert("Win")
			}
			return
		} else {
			setTimeout(function () {
				firstCard.removeClass("flip")
				secondCard.removeClass("flip")
				firstCard = null
				secondCard = null
			}, 600)
		}
	}
}

function startTime() {
	setInterval(function() {
		console.log("1")
	}, 1000)
}

