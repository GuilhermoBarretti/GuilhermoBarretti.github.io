---
title: "Granola Jumps"
showthedate: false
---

<div id="gamePage" class="not-prose" style="width:100%; text-align: center;">

<img src="/images/GranolaJumps.png" class="center max300 rounded-lg">

<a href="https://apps.apple.com/app/granola-jumps/id6479206004?platform=iphone" target="_blank">
	<img src="/images/apple.png" class="center max300">
</a>
<a href="https://play.google.com/store/apps/details?id=com.Guilhermo.GranolaJumps" target="_blank">
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
		window.location.href = "https://play.google.com/store/apps/details?id=com.Guilhermo.GranolaJumps";
	}
	else if(isMobile.iOS())
	{
		window.location.href = "https://apps.apple.com/app/granola-jumps/id6479206004?platform=iphone";
	}

</script>
