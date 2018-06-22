const curateButton = document.getElementById('curatePaintingsButton'),
      curateSportsButton = document.getElementById('curateSportsButton'),
      curateVacationsButton = document.getElementById('curateVacationsButton'),
      curateFashionButton = document.getElementById ('curateFashionButton'),
      gallery = document.getElementById('gallery');

const tags = ['drawing', 'portrait'],
      tagsSports = ['athelets'],
      tagsVacations = ['vacations'],
      tagsFashion = ['fashion'],
      numberOfImages = 4;
      

function curateGallery(requestedTags) {
  // retrieve 20 images based on our tags
  getFlickrImages('https://api.flickr.com/services/feeds/photos_public.gne?tags=' + requestedTags.join() + '&format=json', function(data){  
  
  const images = data.items;  
  
  // empty the gallery
  gallery.innerHTML= '';
    
  for(let i=0; i < numberOfImages;i ++) {
    if (images.length > 0) {
      let randomIndex = Math.floor(Math.random() * images.length);
      let image = images[randomIndex];
      // put these images in our gallery
      let img = `<img src='${image.media.m}'>`;

      gallery.innerHTML += img;
      console.log(image);
      images.splice(randomIndex, 1);
    }
  }  
});
} 
 

curateButton.addEventListener('click', function() {
  curateGallery(tags)
});
curateSportsButton.addEventListener('click', function() {
  curateGallery(tagsSports)
});
curateVacationsButton.addEventListener('click', function() {
  curateGallery(tagsVacations)
});
curateFashionButton.addEventListener('click', function() {
   curateGallery(tagsFashion)
});




/**
 Ignore for now: This code pulls Flickr images from the public feed
*/

function getFlickrImages(url, callback) {
    var callbackName = 'jsonFlickrFeed';
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
