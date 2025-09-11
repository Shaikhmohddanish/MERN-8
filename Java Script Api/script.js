// DOM Elements
const restaurantContainer = document.getElementById("restaurant-container");
const loadingElement = document.getElementById("loading");
const errorElement = document.getElementById("error");
const noResultsElement = document.getElementById("no-results");
const retryButton = document.getElementById("retry-button");
const filterAllButton = document.getElementById("filter-all");
const filterRatingButton = document.getElementById("filter-rating");
const filterFastButton = document.getElementById("filter-fast");
const filterOffersButton = document.getElementById("filter-offers");

// API Constants
const BASE_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";
const API_URL = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.1672129&lng=73.0235553&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

// State variables
let allRestaurants = [];
let filteredRestaurants = [];
let activeFilter = 'all';

// Fetch restaurants from API
async function fetchRestaurants() {
  showLoading();
  
  try {
    const response = await fetch(API_URL);
    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data);
    
    allRestaurants = data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants;
    filteredRestaurants = [...allRestaurants];
    
    renderRestaurants(filteredRestaurants);
    hideLoading();
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    showError();
  }
}

// Render restaurants to the container
function renderRestaurants(restaurants) {
  // Clear the container first
  restaurantContainer.innerHTML = '';
  
  if (restaurants.length === 0) {
    showNoResults();
    return;
  }
  
  hideNoResults();
  
  restaurants.forEach(restaurant => {
    const restaurantCard = document.createElement("div");
    restaurantCard.classList.add("bg-white", "rounded-lg", "overflow-hidden", "shadow-md", "hover:shadow-xl", "transition-shadow", "duration-300");
    
    const hasOffers = restaurant.info.aggregatedDiscountInfoV3 || restaurant.info.aggregatedDiscountInfo;
    const offerText = hasOffers && restaurant.info.aggregatedDiscountInfoV3 
      ? restaurant.info.aggregatedDiscountInfoV3.header + ' ' + (restaurant.info.aggregatedDiscountInfoV3.subHeader || '')
      : '';
    
    restaurantCard.innerHTML = `
      <div class="relative">
        <img src="${BASE_URL}${restaurant.info.cloudinaryImageId}" alt="${restaurant.info.name}" 
             class="w-full h-48 object-cover" loading="lazy" />
        ${hasOffers ? `
        <div class="absolute top-0 left-0 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-xs py-1 px-2 rounded-br">
          ${offerText || 'Offers Available'}
        </div>
        ` : ''}
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div class="flex justify-between items-center">
            <span class="text-white font-medium">${restaurant.info.costForTwo}</span>
            <span class="bg-green-600 text-white text-sm px-2 py-1 rounded flex items-center">
              ${restaurant.info.avgRating} ⭐
            </span>
          </div>
        </div>
      </div>
      <div class="p-4">
        <h2 class="text-lg font-bold text-gray-800 truncate">${restaurant.info.name}</h2>
        <p class="text-sm text-gray-600 mb-2 truncate">${restaurant.info.cuisines.join(", ")}</p>
        <div class="flex justify-between items-center text-sm">
          <p class="text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ${restaurant.info.sla.slaString}
          </p>
          <p class="text-gray-700 truncate max-w-[150px]">${restaurant.info.locality}</p>
        </div>
      </div>
      <div class="px-4 py-2 border-t border-gray-100">
        <button class="w-full text-primary-500 font-medium hover:text-primary-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          ORDER NOW
        </button>
      </div>
    `;
    restaurantContainer.appendChild(restaurantCard);
  });
}

// Filter restaurants
function filterRestaurants(filterType) {
  activeFilter = filterType;
  
  // Reset all filter button styles
  [filterAllButton, filterRatingButton, filterFastButton, filterOffersButton].forEach(button => {
    button.classList.remove('bg-primary-500', 'text-white');
    button.classList.add('bg-white', 'text-gray-700');
  });
  
  // Set active filter button style
  const activeButton = document.getElementById(`filter-${filterType}`);
  activeButton.classList.remove('bg-white', 'text-gray-700');
  activeButton.classList.add('bg-primary-500', 'text-white');
  
  switch(filterType) {
    case 'all':
      filteredRestaurants = [...allRestaurants];
      break;
    case 'rating':
      filteredRestaurants = allRestaurants.filter(restaurant => parseFloat(restaurant.info.avgRating) >= 4.0);
      break;
    case 'fast':
      filteredRestaurants = allRestaurants.filter(restaurant => {
        const deliveryTime = parseInt(restaurant.info.sla.slaString.split(' ')[0]);
        return deliveryTime < 30; // Less than 30 minutes
      });
      break;
    case 'offers':
      filteredRestaurants = allRestaurants.filter(restaurant => 
        restaurant.info.aggregatedDiscountInfoV3 || restaurant.info.aggregatedDiscountInfo
      );
      break;
    default:
      filteredRestaurants = [...allRestaurants];
  }
  
  renderRestaurants(filteredRestaurants);
}

// UI State functions
function showLoading() {
  loadingElement.classList.remove('hidden');
  errorElement.classList.add('hidden');
  restaurantContainer.classList.add('hidden');
  noResultsElement.classList.add('hidden');
}

function hideLoading() {
  loadingElement.classList.add('hidden');
  restaurantContainer.classList.remove('hidden');
}

function showError() {
  loadingElement.classList.add('hidden');
  errorElement.classList.remove('hidden');
  restaurantContainer.classList.add('hidden');
  noResultsElement.classList.add('hidden');
}

function showNoResults() {
  restaurantContainer.classList.add('hidden');
  noResultsElement.classList.remove('hidden');
}

function hideNoResults() {
  restaurantContainer.classList.remove('hidden');
  noResultsElement.classList.add('hidden');
}

// Event Listeners
retryButton.addEventListener('click', fetchRestaurants);
filterAllButton.addEventListener('click', () => filterRestaurants('all'));
filterRatingButton.addEventListener('click', () => filterRestaurants('rating'));
filterFastButton.addEventListener('click', () => filterRestaurants('fast'));
filterOffersButton.addEventListener('click', () => filterRestaurants('offers'));

// Initialize app
(function init() {
  fetchRestaurants();
})();
