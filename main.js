var CLIPBOARD = new CLIPBOARD_CLASS("my_canvas", true);

/**
 * image pasting into canvas
 *
 * @param {string} canvas_id - canvas id
 * @param {boolean} autoresize - if canvas will be resized
 */
function CLIPBOARD_CLASS(canvas_id, autoresize) {
	var _self = this;
	var canvas = document.getElementById(canvas_id);
	// var ctx = document.getElementById(canvas_id).getContext("2d");

	//handlers
	document.addEventListener('paste', function (e) { _self.paste_auto(e); }, false);

	//on paste
	this.paste_auto = function (e) {
		if (document.querySelector("main > img") || document.querySelector("main > .darkroom-container")) {
			console.log("only one paste is allowed");
			return false;
		}
		if (e.clipboardData) {
			var items = e.clipboardData.items;
			if (!items) return;

			//access data directly
			for (var i = 0; i < items.length; i++) {
				if (items[i].type.indexOf("image") !== -1) {
					//image
					var blob = items[i].getAsFile();
					var URLObj = window.URL || window.webkitURL;
					var source = URLObj.createObjectURL(blob);
					this.paste_createImage(source);
				}
			}
			e.preventDefault();
		}
	};
	//DONT DRAW IT ACTUALLY - CREATE AN IMG ELEMENT
	//draw pasted image to canvas
	// this.paste_createImage = function (source) {
	// 	var pastedImage = new Image();
	// 	pastedImage.onload = function () {
	// 		if(autoresize == true){
	// 			//resize
	// 			canvas.width = pastedImage.width;
	// 			canvas.height = pastedImage.height;
	// 		}
	// 		else{
	// 			//clear canvas
	// 			ctx.clearRect(0, 0, canvas.width, canvas.height);
	// 		}
	// 		ctx.drawImage(pastedImage, 0, 0);
	// 	};
	// 	pastedImage.src = source;
	// };

	this.paste_createImage = function (source) {
		if (document.querySelector("main > img")) {
			console.log("only one paste is allowed");
			return false;
		}
		var img = document.createElement('img');
		img.src = source;
		img.id = "target";
		document.querySelector("main").appendChild(img);
		console.log("appending img element to body");
		createDarkroom();
	};

}
var things={};
var dkrm;
function createDarkroom(){
	console.log("Creating darkroom");
	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	dkrm = new Darkroom('#target', {
		// Size options
		minWidth: 100,
		// minHeight: 100,
		maxWidth: w*0.9,
		// maxHeight: 500,
		// ratio: 4/3,
		backgroundColor: 'rgba(0,0,0,0)',

		// Plugins options
		plugins: {
			save: {
		      callback: function() {
							console.log("Save!");
		          this.darkroom.selfDestroy(); // Cleanup
		          var data = dkrm.canvas.toDataURL();
							console.log(dkrm.canvas.toDataURL());
							// var reader  = new FileReader();
							// reader.addEventListener("load", function () {
								$.post("upload.php",
								{
									// screen: reader.result
									screen: data
								},
								function(data, status){
									console.log("Data: " + data + "\nStatus: " + status);
									document.querySelector("main > #linkarea").innerHTML = "<a href=\"screens/" + data + ".png\">//" + SITENAME + "/" + SITEPATH + "screens/" + data + ".png</a>";
									if (document.querySelector("#pickedcolor")) {
										document.querySelector("#pickedcolor").remove();
									}
									// left_img.src = "screens/" + data + ".png";
									// if (left_img) {
									// 	left_img.parentElement.removeChild(left_img);
									// }
									// var img = document.createElement('img');
									// var img = document.querySelector("main > img");
									// img.src = "screens/" + data + ".png";
									// img.id = "target";
									// document.querySelector("main").appendChild(img);
									for (var i = 0; i < 25; i++) {
										setTimeout(function () {
											console.log("Replacing old img with new one.");
											var img = document.querySelector("main > img");
											img.src = "screens/" + data + ".png";
											img.id = "target";
										},100);
									}
									setTimeout(function () {
										console.log("Replacing old img with new one.");
										var img = document.querySelector("main > img");
										img.src = "screens/" + data + ".png";
										img.id = "target";
									},3333);

									// window.location = data;
								});
							// }, false);
							//
							// reader.readAsDataURL(blob);
		      }
		  },
			crop: {}
			//save: false,
			// crop: {
			// 	quickCropKey: 67, //key "c"
			// 	//minHeight: 50,
			// 	//minWidth: 50,
			// 	//ratio: 4/3
			// }
		},

		// Post initialize script
		initialize: function() {
			jsColorPicker('#pickedcolor',{renderCallback: colorpickerCalls});

			var cropPlugin = this.plugins['crop'];
			// cropPlugin.selectZone(170, 25, 300, 300);
			// cropPlugin.requireFocus();
			things.MAINOBJECT = dkrm.canvas.getObjects()[0];
			dkrm.canvas.freeDrawingBrush.width = 16;
			dkrm.toolbar.element.appendChild(document.querySelector("#pickedcolor"));
			document.querySelector("#pickedcolor").style.display = "inherit";
			var color = document.querySelector("#pickedcolor").value;
			document.querySelector("#pickedcolor").style.background = color;
			dkrm.canvas.freeDrawingBrush.color = color;

			things.DRAWBUTTON = dkrm.toolbar.createButtonGroup().createButton({});
			console.log(SITEPATH);
			things.DRAWBUTTON.element.innerHTML = "<img class=\"darkroom-button-icon\" src=\"octicons/lib/svg/pencil.svg.png\" alt=\"PEN\" />";
			things.DRAWBUTTON.element.id = "DRAWBUTTON";
			things.DRAWBUTTON.addEventListener('click', function () {
				dkrm.canvas.isDrawingMode = !dkrm.canvas.isDrawingMode;
				if (dkrm.canvas.isDrawingMode) {
					things.DRAWBUTTON.element.style.background = "#606c76";
				}	else {
					things.DRAWBUTTON.element.style.background = "transparent";
				}
				disableCropping();
			});
			things.TEXTBUTTON = dkrm.toolbar.createButtonGroup().createButton({});
			things.TEXTBUTTON.element.parentElement.class = "darkroom-button";
			things.TEXTBUTTON.element.innerHTML = "<img class=\"darkroom-button-icon\" src=\"octicons/lib/svg/text-size.svg.png\" alt=\"TXT\" />";
			things.TEXTBUTTON.addEventListener('click', function () {
				dkrm.canvas.isDrawingMode = false;
				if (dkrm.canvas.isDrawingMode) {
					things.DRAWBUTTON.element.style.background = "#606c76";
				}	else {
					things.DRAWBUTTON.element.style.background = "transparent";
				}

				var text= new fabric.IText("Your text...", {
				  fontSize: 64,
					fill: document.querySelector("#pickedcolor").value
				});
				dkrm.canvas.add(text);
				// text.enterEditing();
				// text.hiddenTextarea.focus();
				console.log("Adding text");
				disableCropping();
				// dkrm.canvas.sendToBack(things.MAINOBJECT);
				});
		}
	});
}

function disableCropping() {
	console.log("removing cropping button");
	if (dkrm.plugins.crop.cropButton.element.parentElement) {
		dkrm.plugins.crop.cropButton.element.parentElement.removeChild(dkrm.plugins.crop.cropButton.element)
	}
}

function colorpickerCalls(x){
	document.querySelector("#pickedcolor").value = "#" + x.HEX;
	document.querySelector("#pickedcolor").style.background = "#" + x.HEX;
	dkrm.canvas.freeDrawingBrush.color = "#" + x.HEX;
	if(dkrm.canvas.getActiveObject()) {
		console.log("Changing object fill value?");
		if (dkrm.canvas.getActiveObject().text) {
			dkrm.canvas.getActiveObject().set("fill","#" + x.HEX);
		} else {
			dkrm.canvas.getActiveObject().set("stroke","#" + x.HEX);
		}
		dkrm.canvas.renderAll();
	}
}
