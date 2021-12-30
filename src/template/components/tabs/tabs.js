function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class Tabs {
	selectCurrent(link) {
		var parent = link.parentElement;
		for (let item of parent.children) {
			item.classList.remove(this.classCurrent);
		}
		link.classList.add(this.classCurrent);
		var tabs = document.querySelectorAll(link.getAttribute('data-element'));

		tabs.forEach((tab) => {
			parent = tab.parentElement;
			for (let item of parent.children) {
				item.classList.remove(this.classCurrent);
			}
			tab.classList.add(this.classCurrent);
		})

	}

	constructor() {
		_defineProperty(this, "classCurrent", '--current');

		_defineProperty(this, "elemLink", '.tabs-link');

		_defineProperty(this, "elemTab", '.tabs-item');

		_defineProperty(this, "elemLinks", '.tabs-links');

		var links = document.querySelectorAll(this.elemLink),
			item = document.querySelectorAll(this.elemTab),
			listList = document.querySelectorAll(this.elemLinks);

		// if (!item) {
		// 	return false;
		// }
		
		listList.forEach((listListItem) => {
			var links = listListItem.children,
				currentElement = links[0];

			for (let i = 0; i < links.length; i++) {
				var link = links[i];
				if (link.classList.contains(this.classCurrent)) {
					currentElement = link;
				}
			}

			this.selectCurrent(currentElement);
		});
		links.forEach(link => {
			link.el = document.querySelector(link.getAttribute('data-element'));

			link.addEventListener('click', event => {
				event.preventDefault();
				if (!link.classList.contains(this.classCurrent)) {
					this.selectCurrent(link);
				}
			});
		});
	}

}