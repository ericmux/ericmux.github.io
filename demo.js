
function playSFX(sfx){
	new Audio(sfx.currentSrc).play();
}


$(function() {
	  var bgMusic = new Audio('jorah_the_andal.ogg');
	  var effect = new Audio('sfx.wav');

	  bgMusic.loop = true;
	  bgMusic.play();

	  var type = 'webgl';
	  var two = new Two({
	    type: Two.Types[type],
	    fullscreen: true,
	    autostart: true
	  }).appendTo(document.body);

	  var characters = [];
	  var gravity = new Two.Vector(0, 0.66);

	  var styles = {
	    family: 'proxima-nova, sans-serif',
	    size: 70,
	    leading: 50,
	    weight: 900
	  };

	  var directions = two.makeText('Type anything at all!', two.width / 2, two.height / 2, styles);
	  directions.fill = 'white';

	  $(window)
	    .bind('keydown', function(e) {
	      var character = String.fromCharCode(e.which);
	      add(character);
	    })
	    .bind('touchstart', function() {
	      var r = Math.random();
	      var character = String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65));
	      add(character);
	    });

	  two
	    .bind('resize', function() {
	      directions.translation.set(two.width / 2, two.height / 2);
	    })
	    .bind('update', function() {
	      for (var i = 0; i < characters.length; i++) {
	        var text = characters[i];
	        text.translation.addSelf(text.velocity);
	        text.rotation += text.velocity.r;

	        text.velocity.addSelf(gravity);
	        if (text.velocity.y > 0 && text.translation.y > two.height)  {
	          two.scene.remove(text);
	          characters.splice(i, 1);
	        }

	      }

	    });

	  function add(msg) {

	    var x = Math.random() * two.width / 2 + two.width / 4;
	    var y = two.height * 1.25;

	    var text = two.makeText(msg, x, y, styles);
	    text.size *= 2;
	    text.fill = 'red';

	    text.velocity = new Two.Vector();
	    text.velocity.x = 10 * (Math.random() - 0.5);
	    text.velocity.y = - (20 * Math.random() + 13);
	    text.velocity.r = Math.random() * Math.PI / 8;

	    characters.push(text);
	    playSFX(effect);
	  }
});