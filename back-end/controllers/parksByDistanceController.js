const fs = require("fs");
const axios = require("axios");
const closestParksDAOS = require("./daos/closestParks.js");
const path = require("path");
const { getPagination } = require("../shared/pagination.js");
const { paginateDataClosestParks } = require("../shared/pagination");

let allParksCoords;

async function main() {
  allParksCoords = await closestParksDAOS.fetchAllParksCoordinates();
}
main();

let userLat = 0;
let userLon = 0;

const getGeoCode = async (address) => {
  try {
    const response = await axios.get(
      `https://geocode.maps.co/search?q=${address}`
    );
    const data = response.data;
    userLat = data[0].lat;
    userLon = data[0].lon;
    return [Number(data[0].lat), Number(data[0].lon)];
  } catch (error) {
    console.error(error);
  }
};

// receive city name from frontend
// check that letters
// send request to api
// get coordinates
// Loop through all parks, calculatign distance, adding < radius parks to array
// sort array by ascending distance
// get ids of first 10 parks in array
// get those parks from database
// send those parks off to the frontend

async function getClosestParks(allParksCoords, userCoords, radius) {
  let closestParks = [];
  // const allParksCoords = await closestParksDAOS.fetchAllParksCoordinates();
  for (let park of allParksCoords) {
    const { Lat, Lon, ParkID, ParkName } = park;
    let distance = calculateDistanceHelper(
      Number(Lat),
      Number(Lon),
      Number(userCoords[0]),
      Number(userCoords[1])
    );
    if (distance <= radius) {
      closestParks.push({ distance, ParkID, ParkName });
    }
  }
  closestParks = sortParksByDistanceHelper(closestParks);
  return closestParks;
}

// Sorts an array of parks according to their distance field
function sortParksByDistanceHelper(closestParks) {
  let sortedParks = closestParks.sort((p1, p2) =>
    p1.distance > p2.distance ? 1 : p1.distance < p2.distance ? -1 : 0
  );
  return sortedParks;
}

async function getParksByDistance(req, res) {
  try {
    const page = Number(req.query.page);
    const size = req.query.size;
    if (page - 1 < 0) {
      throw new Error(`Page number cannot be 0 or negative`);
    }
    if (size <= 0) {
      throw new Error(`Size cannot be 0 or negative`);
    }

    const userCity = req.query.city;
    const userState = req.query.state;
    const userRadius = req.query.radius;
    const sort = req.query.sortBy;

    // Check if city or state is not provided in the request
    if (!userCity || !userState || !userRadius) {
      return res
        .status(400)
        .json({ error: "City and State and Radius are required parameters." });
    }

    const cityAndState = userCity + ", " + userState;
    const userCoordinates = await getGeoCode(cityAndState);
    const closestParks = await getClosestParks(
      allParksCoords,
      userCoordinates,
      userRadius
    );
    let result = await closestParksDAOS.closestParksfromDB(closestParks);
    if (sort === "desc") {
      result = result.reverse();
    }
    const { offset, limit } = getPagination(page, size);
    const paginatedResult = await paginateDataClosestParks(
      result,
      page,
      limit,
      offset
    );

    res.status(201).json(paginatedResult);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal database error 3" });
  }
}

function calculateDistanceHelper(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2radHelper(lat2 - lat1); // deg2rad below
  var dLon = deg2radHelper(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2radHelper(lat1)) *
      Math.cos(deg2radHelper(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2radHelper(deg) {
  return deg * (Math.PI / 180);
}

module.exports = getParksByDistance;
