$(document).ready(loadDocument);

function loadDocument(){
    

};




// input: lon, lat, searchText;
// output: array of 4 pictures;
function getFlickr(lon='-117.731803',lat='33.635682',searchText = 'dog'){
    let photoArray = [];
    let rawFlickrData;
    const apiKey = 'aafae43be950e495d55bfe4055fde6e4';
    //const searchText = 'dog'; //search for this keyword from flickr
    const perPage = '4'; //number of pictures to get from flickr
    const flickrURL = `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${apiKey}&format=json&nojsoncallback=1&text=${searchText}&min_upload_date=1514764800&safe_search=1&media=photos&lat=${lat}&lon=${lon}&per_page=${perPage}`
    let ajaxConfig = {
        dataType: 'json',
        url: flickrURL,
        success: function(result) {
            rawFlickrData = result.photos.photo;
            console.table(rawFlickrData);
            for (let index = 0; index < rawFlickrData.length; index++){
                const farmId = rawFlickrData[index].farm;
                const serverId = rawFlickrData[index].server;
                const flickrId = rawFlickrData[index].id;
                const flickrSecret = rawFlickrData[index].secret;
                const picURL = `https:\/\/farm${farmId}.staticflickr.com\/${serverId}\/${flickrId}_${flickrSecret}.jpg`;
                //this is the format of the flickr picture
                //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
                photoArray.push(picURL);
            }
            console.table(photoArray);
        }
    }
    $.ajax(ajaxConfig);
    //returns an array of photo urls
}

function initMap(){ 
    //map options
    var options = {
        zoom: 2,
        center: {lat: 40.416775, lng: -3.703790}
    }
    //creating a new map
    var gmap = new google.maps.Map(document.getElementById('theMap'), options)

    // var capitals = [
    //     {
    //       //location: 'Canberra, Aus',  
    //       coordinates:{lat: -35.2809, lng: 149.1300},
    //       iconImg:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    //       content: '<h3>Canberra, Aus</h3>'
    //     },
    //     {
    //       //location: Rome, Italy,
    //       coordinates:{lat: 41.9, lng: 12.5},
    //       iconImg: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    //       content: '<h3>Rome, ITL</h3>'
    //     },
    //     {
    //       //location: Hanoi, Vietnam,
    //       coordinates:{lat: 21.028333, lng: 105.854167},
    //       iconImg:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    //       content: '<h3>Hanoi, VT</h3>'
    //     },
    //       //location: Cape Town, South Africa
    //     {
    //       coordinates:{lat:-33.925278, lng: 18.423889},
    //       iconImg:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    //       content: '<h3>Cape Town, SA</h3>'
    //     }           
    // // ]
    
    // for(var capitalIndex = 0; capitalIndex < capitals.length; capitalIndex++){
    //     addMarkerToMap(capitals[capitalIndex])
    // }

    ;
    addMarkerToMap(threeCitites(capitalCities));

    function addMarkerToMap(capitalCityObject){
        for(var capitalIndex = 0; capitalIndex < capitalCityObject.length; capitalIndex++){
            var marker = new google.maps.Marker({
                position: {lat:capitalCityObject[capitalIndex].latitude, lng:capitalCityObject[capitalIndex].longitude},
                map: gmap,
                // icon: capitalCityObject.iconImg,
                content: `<h3>${capitalCityObject[capitalIndex].city}, ${capitalCityObject[capitalIndex].country}</h3>`, 
                })
                var nameOnFlagClick = new google.maps.InfoWindow({
                    content: `<h3>${capitalCityObject[capitalIndex].city}, ${capitalCityObject[capitalIndex].country}</h3>`
                });
                marker.addListener('click', function(){
                    nameOnFlagClick.open(gmap, marker)
                })
        }

    }
}  
var threeRandomCitiesArray = function threeCitites(capitalArray){
    var threeCitiesArray = [];
    var i = 0
    while(i < 3){ 
        var randomNum = Math.floor(capitalArray.length * Math.random()); 
        if (threeCitiesArray.indexOf(capitalArray[randomNum])==-1){
            console.log(randomNum);
            threeCitiesArray.push(capitalArray[randomNum]) 
            i++
        }
        
    }
    console.log(threeCitiesArray)
    return threeCitiesArray;
}