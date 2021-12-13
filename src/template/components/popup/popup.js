class Popup {
	constructor(options = {
		name: 'popup',
		sep: '__',
		child: {
			wrap: 'wrap',
			item: 'item',
			bg: 'bg'
		},
		btns: {
			open: '[data-popup], .popup-show',
			close: '.popup-close, [data-popup-close]'
		},
		mods: {
			show: '--show',
			block: '--block',
			img: '--img',
			video: '--video',
		},
		bodyClassOpen: 'popup-show'
	}) {
		Popup.options = this.options = options;
		document.html = document.querySelector('html');

		this.groups = {};
		this.wrapClass = null;
		this.createDefaultElements();
		this.initBtns();

	}

	createDefaultElements() {
		this.createElement(this.options.name);
		this.createElement(this.options.child.wrap);
		this.createElement(this.options.child.bg);

		document.body.append(this.popup);
		this.popup.append(this.bg);
		this.popup.append(this.wrap);
	}

	createElement(name) {
		this[name] = document.createElement('div');
		if (name != this.options.name) {
			this[name].className = this.options.name + this.options.sep + name;
		} else {
			this[name].className = name;
		}
	}

	createImg(src) {
		let img = document.createElement('img');
		img.src = src;

		return img;
	}

	initBtns() {
		this.btns = {};
		this.btns.open = document.querySelectorAll(this.options.btns.open);
		// this.btns.close = document.querySelectorAll(this.options.btns.close);

		if (this.btns.open) {
			this.btns.open.forEach((btn) => {
				let href = btn.getAttribute('href'),
					src = btn.getAttribute('data-src'),
					el = src ? src : href,
					isImage = /\.jpg|\.png|\.jpeg$/.test(el),
					isVideo = /youtube/.test(el);

				btn.wrapClass = btn.getAttribute('data-popup-wrap-class');

				if (isImage) {
					let img = this.createImg(el);
					img.className = this.options.mods.img;
					btn.group = btn.getAttribute('data-group');

					if (btn.group) {
						if (!(btn.group in this.groups)) {
							this.groups[btn.group] = [];
						}
						this.groups[btn.group].push(img);
					}
					btn.addEventListener('click', (event) => {
						event.preventDefault();
						this.show('img', img, '--center');
					});
					return false;
				}

				if (isVideo) {
					let videoSrc = /(http(s|):|)\/\/(www\.|)yout(.*?)\/(embed\/|watch.*?v=|)([a-z_A-Z0-9\-]{11})/i.exec(el);
					videoSrc = videoSrc[6];

					let video = document.createElement('iframe');
					video.src = 'https://www.youtube.com/embed/' + videoSrc + '/';
					video.frameborder = 0;
					video.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
					video.className = this.options.mods.video;

					btn.addEventListener('click', (event) => {
						event.preventDefault();
						this.show('video', video, '--center');
					});
					return false;
				}

				el = document.querySelector(el);


				if (el) {
					el.classList.add(this.options.mods.block);

					btn.addEventListener('click', (event) => {
						event.preventDefault();
						this.show('block', el, btn.wrapClass);
					});
				}
			});
		}

		this.popup.addEventListener('click', (event) => {
			if (!event.target.closest('.' + this.options.name + this.options.sep + this.options.child.item) || event.target.closest('.popup-close')) {
				this.close();
			}
		});

		if (this.btns.close) {
			this.btns.close.forEach((btn) => {
				btn.addEventListener('click', () => {
					this.close();
				});
			});
		}

	}

	show(type = null, object, wrapClass) {
		let bodyCW1 = document.body.clientWidth;

		this.object = object;
		object.removeAttribute('style');
		this.object.style.display = 'block';
		object.classList.add(this.options.name + this.options.sep + this.options.child.item);

		if (wrapClass) {
			this.wrap.classList.add(wrapClass);
			this.wrapClass = wrapClass;
		}

		if (type == 'img') {

		} else if (type == 'video') {
			this.wrap.append(object);
		} else if (type == 'block') {
			this.wrap.append(object);
			this.popup.id = 'popup-' + this.object.id;
		}

		this.popup.classList.add(this.options.mods.show);

		document.html.classList.add(this.options.bodyClassOpen);
		document.body.classList.add(this.options.bodyClassOpen);
		// disableScroll();

		let bodyCW2 = document.body.clientWidth;

		document.body.style.marginRight = bodyCW2 - bodyCW1 + 'px';

		let item = this.wrap.querySelector('.popup__item');


		if (item.scrollHeight != item.clientHeight) {
			this.wrap.classList.add('--add-touch');
		}
	}

	close() {
		document.body.removeAttribute('style');
		
		document.body.append(this.object);
		this.object.style.display = 'none';

		if (this.wrapClass) {
			this.wrap.classList.remove(this.wrapClass);
			this.wrapClass = null;
		}
		this.popup.classList.remove(this.options.mods.show);

		document.html.classList.remove(this.options.bodyClassOpen);
		document.body.classList.remove(this.options.bodyClassOpen);

		this.wrap.classList.remove('--add-touch');
	}
}
