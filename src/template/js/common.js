var html = document.querySelector('html'),
		body = document.querySelector('body'),
		wrap = document.querySelector('.wrap');

document.addEventListener('DOMContentLoaded', ()=>{
	// Popup
	let popup = new Popup();

	// Fields
	let fields = document.querySelectorAll('.field');
	 
	if (fields) {
		fields.forEach((field)=>{
			new Field(field);
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
			loop: true,
			navigation: {
				nextEl: '.intro__arrow.btn.--next',
				prevEl: '.intro__arrow.btn.--prev',
			},
			pagination: {
				el: '.intro__dots.swiper-pagination.dots',
				clickable: true
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
		calendarDays.current = null;
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
			loop: true,
			navigation: {
				nextEl: '.caev__arrow.btn.--next',
				prevEl: '.caev__arrow.btn.--prev',
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
			loop: true,
			navigation: {
				nextEl: '.a__arrow.btn.--next',
				prevEl: '.a__arrow.btn.--prev',
			},
		})
	}

});