var searchForm = document.querySelector(".hotel-search-form");
var searchButton = document.querySelector(".hotel-search-button");
var children = searchForm.querySelector("[name=number-children]");
var adults = searchForm.querySelector("[name=number-adults]");
var arrivalDate = searchForm.querySelector("[name=arrival-date]");
var departureDate = searchForm.querySelector("[name=departure-date]");

var isStorageSupport = true;
var storageChildren = "";
var storageAdults = "";

searchForm.classList.add("form-hide");

try {
	storageChildren = localStorage.getItem("children");
	storageAdults = localStorage.getItem("adults");
} catch (err) {
	isStorageSupport = false;
}

searchButton.addEventListener("click", function(evt) {
	evt.preventDefault();

	if(searchForm.classList.contains("form-show")) {
		searchForm.classList.remove("form-show");
		searchForm.classList.remove("form-error");
	} else {
		searchForm.classList.add("form-show");

		if(storageChildren) {
			children.value = storageChildren;
		}
		if(storageAdults) {
			adults.value = storageAdults;
		}

		arrivalDate.focus();
	}
});


searchForm.addEventListener("submit", function (evt) {
	if (!arrivalDate.value || !departureDate.value || !adults.value || !children.value || adults <= 0 || children < 0) {
		evt.preventDefault();
		
		searchForm.classList.remove("form-error");
		searchForm.offsetWidth = searchForm.offsetWidth;
		searchForm.classList.add("form-error");
	} else {
		if (isStorageSupport) {
			localStorage.setItem("children", children.value);
			localStorage.setItem("adults", adults.value);
		}
	}
});

window.addEventListener("keydown", function(evt) {
	if(evt.keyCode === 27) {
		if(searchForm.classList.contains("form-show")) {
			evt.preventDefault();

			searchForm.classList.remove("form-show");
			searchForm.classList.remove("form-error");
		}
	}
});