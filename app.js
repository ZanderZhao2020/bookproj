"use strict";
fetch("world.svg").then(res => res.text()).then(worldSrc => {
	fetch("countries.json").then(res => res.json()).then(countries => {
		var element = document.createElement("div");
		element.innerHTML = worldSrc;
		var world = element.children[0];
		var name = document.getElementById("name");
		var info = document.getElementById("info");
		var code;
		world.onclick = evt => {
			if (code) {
				info.innerHTML = countries[code].html;
				info.style.left = evt.pageX + 10 + "px";
				info.style.top = evt.pageY + 10 + "px";
				info.style.display = "block";
			} else {
				info.style.display = "none";
			}
		};
		document.body.appendChild(world);
		var src = "<style>";
		for (var [key, val] of Object.entries(countries)) {
			src += "." + key + "{fill:rgb(" + (1 - val.score) * 255 + "," + val.score * 255 + ",0)}";
			for (var element of document.getElementsByClassName(key)) {
				element.onmouseover = evt => {
					code = evt.target.className.baseVal;
					name.innerText = countries[code].name;
				};
				element.onmouseout = evt => {
					name.innerText = "";
					code = undefined;
				};
			}
			val.html = "<h3>" + val.name + "</h3><p>Score: " + val.score + "</p><img src=\"flags/" + key + ".svg\"/><p>Achievements</p><ul>" + val.achievements.map(str => "<li>" + str + "</li>").join("") + "</ul><p>Work needed</p><ul>" + val.workNeeded.map(str => "<li>" + str + "</li>").join("") + "</ul>";
		}
		element.innerHTML = src + "</style>";
		document.body.appendChild(element.children[0]);
		window.onmousemove = evt => {
			name.style.left = evt.pageX + 10 + "px";
			name.style.top = evt.pageY + 10 + "px";
		};
	});
});