var html = document.querySelector('html'),
		body = document.querySelector('body'),
		wrap = document.querySelector('.wrap');

document.addEventListener('DOMContentLoaded', ()=>{
	// Popup
	new Tabs();
	let popup = new Popup();

	// Fields
	let fields = document.querySelectorAll('.field');
	 
	if (fields) {
		fields.forEach((field)=>{
			new Field(field);

			if (field.classList.contains('--num')) {
				field.area.addEventListener('input', ()=>{
					// field.area.value = 1;
					field.area.value = field.area.value.replace(/[^\d]/g, '')
				})
			}

			if (field.classList.contains('--date')) {
				IMask(field.area, {
					mask: Date
				});
			}

			if (field.classList.contains('--time')) {
				IMask(field.area, {
					mask: '00:00'
				});
			}

			if (field.classList.contains('--password')) {
				field.passSwitch = field.querySelector('.field__pass-switch');
				if (field.passSwitch) {
					field.passSwitch.addEventListener('click', ()=>{
						field.classList.toggle('--showed');
						field.area.type = field.area.type == 'password' ? 'text' : 'password';
					});
				}
			}
		});
	}


	// Checks
	let checks = document.querySelectorAll('.check');
	 
	if (checks) {
		checks.forEach((check)=>{
			new Check(check);
		});
	}


	// Selects
	var selects = document.querySelectorAll('.select');
	if (selects) {
			selects.forEach(select => {
			new Select(select);
		});

		document.addEventListener('click', (event)=>{
			let openSelects = document.querySelectorAll('.select.--open');
			if (!event.target.closest('.select') && openSelects) {
				openSelects.forEach((select)=> {
					select.classList.remove(Select.classOpen);
				});
			}
		})
	}


	// intro
	let introSlider = document.querySelector('.intro__inner');
	if (introSlider) {
		new Swiper(introSlider, {
			loop: false,
			spaceBetween: 8,
			navigation: {
				nextEl: '.intro__arrow.btn.--next',
				prevEl: '.intro__arrow.btn.--prev',
			},
			pagination: {
				el: '.intro__dots.swiper-pagination.dots',
				clickable: true
			},
			breakpoints: {
				0: {
					loop: false,
				},
				992: {
					loop: true,
				}
			}
		});
	}

	let calendarSlider = document.querySelector('.calendar__inner');
	if (calendarSlider) {
		new Swiper(calendarSlider, {
			loop: true,
			initialSlide: 1,
			navigation: {
				nextEl: '.calendar__arrow.btn.--next',
				prevEl: '.calendar__arrow.btn.--prev',
			},
			// pagination: {
			// 	el: '.intro__dots.swiper-pagination.dots',
			// 	clickable: true
			// }
		})
	}
	let calendarDays = document.querySelectorAll('.calendar__day');
	if (calendarDays) {
		calendarDays.current = document.querySelector('.calendar__day.--current');
		calendarDays.forEach((day)=>{
			day.addEventListener('click', ()=>{
				if (calendarDays.current) {
					calendarDays.current.classList.remove('--current');
				}
				calendarDays.current = day;
				calendarDays.current.classList.add('--current');
			});
		})
	}
	


	let caevSlider = document.querySelector('.caev__inner');
	if (caevSlider) {
		new Swiper(caevSlider, {
			slidesPerView: 3,
			spaceBetween: 0,
			loop: false,
			navigation: {
				nextEl: '.caev__arrow.btn.--next',
				prevEl: '.caev__arrow.btn.--prev',
			},
			breakpoints: {
				0: {
					loop: false,
					slidesPerView: 1,
					spaceBetween: 8,
				},
				540: {
					loop: false,
					slidesPerView: 2,
					spaceBetween: 8,
				},
				768: {
					loop: true,
					slidesPerView: 2,
					spaceBetween: 0,
				},
				1170: {
					loop: true,
					slidesPerView: 3,
					spaceBetween: 0,
				}
			}
		})
	}

	let anoncesSlider = document.querySelector('.anonces__wrap');
	if (anoncesSlider) {
		new Swiper(anoncesSlider, {
			loop: true,
			navigation: {
				nextEl: '.anonces__arrow.btn.--next',
				prevEl: '.anonces__arrow.btn.--prev',
			},
			pagination: {
				el: '.anonces__dots.swiper-pagination.dots',
				clickable: true
			}
		})
	}


	let ads = document.querySelector('.a__wrap');
	if (ads) {
		new Swiper(ads, {
			slidesPerView: 2,
			spaceBetween: 20,
			loop: false,
			navigation: {
				nextEl: '.a__arrow.btn.--next',
				prevEl: '.a__arrow.btn.--prev',
			},
			breakpoints: {
				0: {
					loop: false,
					spaceBetween: 8,
					slidesPerView: 1,
				},
				1170: {
					loop: true,
					spaceBetween: 20,
					slidesPerView: 2,
				}
			}
		})
	}


	let imgs = document.querySelector('.imgs');
	if (imgs) {
		imgs.main = imgs.querySelector('.imgs__main');
		imgs.nav  = imgs.querySelector('.imgs__nav');


		imgs.nav.swiper = new Swiper(imgs.nav, {
			slidesPerView: 5,
			spaceBetween: 8,
			watchSlidesProgress: true,
			breakpoints: {
				0: {
					spaceBetween: 5,
					// slidesPerView: 4,
				},
				580: {
					spaceBetween: 8,
					// slidesPerView: 5,
				}
			}
		});

		new Swiper(imgs.main, {
			thumbs: {
				swiper: imgs.nav.swiper
			}
		});


	}


	let incdecs = document.querySelectorAll('.incdec');
	if (incdecs) {
		incdecs.forEach((incdec)=>{
			incdec.btnMinus = incdec.querySelector('.incdec__btn.btn.--minus');
			incdec.btnPlus  = incdec.querySelector('.incdec__btn.btn.--plus');
			incdec.input    = incdec.querySelector('.incdec__field .field__area');
			
			incdec.btnMinus.addEventListener('click', ()=>{
				if (incdec.input.value > 1 && incdec.input.value <= 999) {
					incdec.input.value = Number(incdec.input.value) - 1;
				}
			});

			incdec.btnPlus.addEventListener('click', ()=>{
				if (incdec.input.value > 0 && incdec.input.value < 999) {
					incdec.input.value = Number(incdec.input.value) + 1;
				}
			});

			incdec.input.addEventListener('input', ()=>{
				incdec.input.value = incdec.input.value.replace(/[^\d]/g, '')
			});
		});
	}


	let files = document.querySelectorAll('.file');
	if (files) {
		files.forEach((file, i)=>{
			file.input = file.querySelector('.file__input');
			file.btn   = file.querySelector('.file__btn');
			file.desc  = file.querySelector('.file__desc');

			file.input.setAttribute('id', 'file-' + i);
			file.btn.setAttribute('for', 'file-' + i);

			file.input.addEventListener('change', (e)=>{
				console.log(file.input.files[0]);
				file.desc.innerText = file.input.files[0].name;
			});
		});
	}


	let calendars = document.querySelectorAll('.cal');
	if (calendars) {

		calendars.forEach((calendar)=>{
			calendar.ev = {};
			calendar.ev.block = calendar.querySelector('.calev');
			calendar.ev.img   = calendar.ev.block.querySelector('.calev__img img');
			calendar.ev.close = calendar.ev.block.querySelector('.calev__close');
			calendar.ev.data  = calendar.ev.block.querySelector('.calev__data');
      calendar.ne = calendar.querySelector('.ne');
      calendar.ne.close = calendar.ne.querySelector('.ne__close');
      calendar.ne.btn = calendar.ne.querySelector('.ne__btn');

			calendar.addEventListener('click', (e)=>{
				
				let event = e.target.closest('.cal__event');
        let d = e.target.closest('.cal__day')
				if (event) {
					calendar.ev.block.classList.add('--show');
					let img  = event.querySelector('.cal__event-img img');
					let data = event.querySelector('.cal__event-data');

					calendar.ev.img.src = img.src;
					calendar.ev.data.innerHTML = data.innerHTML;
				}

        if (d && !event) {
          calendar.ne.classList.add('--show');
        }
			});

			calendar.ev.close.addEventListener('click', ()=>{
				calendar.ev.block.classList.remove('--show');
			})
      
      calendar.ne.close.addEventListener('click', ()=>{
        calendar.ne.classList.remove('--show');
      });

      calendar.ne.btn.addEventListener('click', ()=>{
        calendar.ne.classList.remove('--show');
      });
		});
	}

	let modalCloseBtns = document.querySelectorAll('.modal__close');
	if (modalCloseBtns) {
		modalCloseBtns.forEach((btn)=>{
			btn.addEventListener('click', ()=>{
				Fancybox.close();
			});
		});
	}


	let toggleNavBtns = document.querySelectorAll('.toggle-nav');
	let nav = document.querySelector('.nav');
	let mnav = document.querySelector('.mnav');
	let navClass = '--show';
	toggleNavBtns.forEach((btn)=>{
		btn.addEventListener('click', (e)=>{
			e.preventDefault();
			nav.classList.toggle(navClass);
			mnav.classList.toggle(navClass);
			html.classList.toggle('overflow-hidden-992');
			body.classList.toggle('overflow-hidden-992');
		});
	});


	// let pageWrap = document.querySelector('.page__wrap');
	// let pageAside = document.querySelector('.page__aside');
	// let header = document.querySelector('.header')
	// if (pageWrap && pageAside) {
	// 	function addPaddingToAside() {
	// 		let y = pageWrap.getBoundingClientRect().y
	// 		if (y <= header.offsetHeight) {
	// 			console.log(y * -1)
	// 			pageAside.style.top =  ((y * -1) + header.offsetHeight) + 'px';
	// 		}
	// 	}

	// 	window.addEventListener('load', addPaddingToAside);
	// 	window.addEventListener('scroll', addPaddingToAside);
		
	// }
  let photos = document.querySelectorAll('.photos__img');
  if (photos) {
    photos.forEach((photo)=>{
      photo.addEventListener('click', (e)=>{
        if (window.innerWidth < 768) {
          e.preventDefault();
        }
      });
    });
  }


  let comments = document.querySelector('.comments');
  let btnToComments = document.querySelectorAll('.btn-go-comment');
  if (btnToComments) {
    btnToComments.forEach((btn)=>{
      btn.addEventListener('click', (e)=>{
        e.preventDefault();
        comments.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });

    });
  }

  let review = document.querySelector('.review');
  let btnToReview = document.querySelectorAll('.btn-go-review')
  if (btnToReview) {
    btnToReview.forEach((btn)=>{
      btn.addEventListener('click', (e)=>{
        e.preventDefault();
        btn.style.display = 'none';
        review.classList.add('--show');
      });
    });
  }
}); 
