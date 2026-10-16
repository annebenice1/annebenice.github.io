/*
	Dark mode toggle.
	Loaded in <head> so the saved theme is applied before the page paints,
	then adds the toggle button once the page is ready.
*/

(function() {

	var root = document.documentElement,
		key = 'theme';

	function getStored() {
		try { return localStorage.getItem(key); } catch (e) { return null; }
	}

	function store(theme) {
		try { localStorage.setItem(key, theme); } catch (e) {}
	}

	function apply(theme) {
		root.setAttribute('data-theme', theme);
	}

	// Saved choice wins; otherwise follow the visitor's system setting.
		var initial = getStored();

		if (!initial)
			initial = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';

		apply(initial);

	// Button.
		document.addEventListener('DOMContentLoaded', function() {

			var button = document.createElement('button');

			button.id = 'theme-toggle';
			button.type = 'button';

			function update() {
				var dark = root.getAttribute('data-theme') === 'dark';

				button.className = 'icon solid ' + (dark ? 'fa-sun' : 'fa-moon');
				button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
				button.setAttribute('title', dark ? 'Light mode' : 'Dark mode');
			}

			button.addEventListener('click', function() {
				var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

				apply(next);
				store(next);
				update();
			});

			update();
			document.body.appendChild(button);

		});

})();
