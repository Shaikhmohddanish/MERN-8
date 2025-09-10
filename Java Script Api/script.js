async function getAllPosts(){
    const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.1672129&lng=73.0235553&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
    const data = await response.json();
    const restaurants = data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants;
    return restaurants;
}

const BASE_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

(async function() {
  const allRestaurants = await getAllPosts();
  console.log(allRestaurants); // This will log the actual data, not a Promise

  const restaurantContainer = document.getElementById("restaurant-container");
  
  allRestaurants.forEach(restaurant => {
    const restaurantCard = document.createElement("div");
    restaurantCard.classList.add("restaurant-card");
    restaurantCard.innerHTML = `
      <img src="${BASE_URL}${restaurant.info.cloudinaryImageId}" alt="${restaurant.info.name}" class="restaurant-image" />
      <h2 class="restaurant-name">${restaurant.info.name}</h2>
      <p class="restaurant-cuisines">${restaurant.info.cuisines.join(", ")}</p>
      <p class="restaurant-rating">Rating: ${restaurant.info.avgRating} ⭐</p>
      <p class="restaurant-delivery-time">Delivery Time: ${restaurant.info.sla.slaString}</p>
      <p class="restaurant-locality">${restaurant.info.locality}, ${restaurant.info.areaName}</p>
      <p class="restaurant-cost">${restaurant.info.costForTwo}</p>
    `;
    restaurantContainer.appendChild(restaurantCard);
  });
})();
