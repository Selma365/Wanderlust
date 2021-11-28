// Foursquare API Info
const clientId = 'BE0WJTTCEABQLREWGR1Q4CZAYC4HWJEROA3IAOTL5DBDVSRF';
const clientSecret = 'A5452HTIVOQOPK1HFSDOHRACRW3F01YXI3XWUDBD4EIJPC22';
const url ='https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '3513a28620c2d6644de519a016ee263c';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
  const city=$input.val();
  const urlToFetch=`${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20211128`;
  try{

    const response=await fetch(urlToFetch);
    if(response.ok){
      console.log(response);
      const jsonResponse=await response.json();
      console.log(jsonResponse);
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      console.log(venues);
      return venues;
    }else{
      throw new Error('new error');
    }

  }catch(error){
    console.log(error);
  }
};

const getForecast =async () => {
 const  urlToFetch=`${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;
 try{

    const response=await fetch(urlToFetch);
    if(response.ok){
      console.log(response);
      const jsonResponse=await response.json();
      console.log(jsonResponse);

      return jsonResponse;
     
    }
    }catch(error){
    console.log(error);
  }
}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue=venues[index];
    const venueIcon=venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name,venue.location,venue.venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (days) => {
  // Add your code here:
  $weatherDivs.forEach(($day,index)=>{

  
  const currday=days[index]
	let weatherContent = createWeatherHTML(currday);
  $day.append(weatherContent);
  });
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues=>return renderVenues(venues));
  getForecast().then(forecast=>return renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)
