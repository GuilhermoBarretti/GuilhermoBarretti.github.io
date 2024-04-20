---
showthedate: false
---

<div id="gamePage" class="not-prose" style="width:100%; text-align: center;">

<p>Save The Planets: Meteor Storm</p>
<img src="/images/STP.png" class="center max300 rounded-lg">

<a href="https://apps.apple.com/app/id6459537872" target="_blank">
	<img src="/images/apple.png" class="center max300">
</a>
<a href="https://play.google.com/store/apps/details?id=com.Guilhermo.SaveThePlanets" target="_blank">
	<img src="/images/google.png" class="center max300">
</a>

</div>

<script  type="text/javascript">
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}

	};

	if (isMobile.Android())
	{
		window.location.href = "https://play.google.com/store/apps/details?id=com.Guilhermo.SaveThePlanets";
	}
	else if(isMobile.iOS())
	{
		window.location.href = "https://apps.apple.com/app/id6459537872";
	}

</script>
