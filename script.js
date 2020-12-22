const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

//* Unsplash API
const count = 30;
const apiKey = 'HnPe2mUlJfRn7LSd0UgRx-QhqdlmDCS2mamJtPfqBGk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}
`;

//* check if all images were loaded
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded == totalImages) {
		ready = true;
		loader.hidden = true;
	}
}

//* set attributes
const setAttributes = (element, attributes) => {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
};

//* create elements for links and photos, and add them to the DOM
const displayPhotos = () => {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	console.log('total images', totalImages);
	photosArray.forEach(photo => {
		//* creating an <a> link
		const item = document.createElement('a');
		//item.setAttribute('href', photo.links.html);
		//item.setAttribute('target', '_blank');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});
		//* creating an <img> tag
		const img = document.createElement('img');
		//img.setAttribute('src', photo.urls.regular);
		//img.setAttribute('alt', photo.alt_description);
		//img.setAttribute('title', photo.alt_description);
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
		//* event listener, check if image is isLoaded
		img.addEventListener('load', imageLoaded);
		//* putting the <img> in the <a>
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
};

//* get photos from Unsplash API

const getPhotos = async () => {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {
		console.log(error);
	}
};

//* check if we are scrolling near the bottom of the page
window.addEventListener('scroll', () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});

//* On Load
getPhotos();
