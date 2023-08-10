import axios from "axios";
import {
  getActivitiesRoute,
  getActivitiesSearchRoute,
  getAmenitiesRoute,
  getSearchByPreferencesSearchRoute,
  getAppParkDetailsRoute,
  getProximitySearchRoute,
  getReviewRoute,
  getImageRoute,
  PAGE_SIZE,
} from "../routes";

export function getActivities() {
  return axios.get(getActivitiesRoute());
}

export function getAmenities() {
  return axios.get(getAmenitiesRoute());
}

export function getParksByActivity(activites) {
  const url = getActivitiesSearchRoute(activites.map((a) => a.value).join(","));
  return axios.get(url);
}

export function getParksByProximity(city, state, radius, sortDir, page) {
  return axios.get(getProximitySearchRoute(city, state, radius, sortDir, page));
}

export function getParksByPreferences(
  activities,
  usStates,
  amenities,
  sort,
  page
) {
  return axios.get(
    getSearchByPreferencesSearchRoute(
      usStates,
      activities,
      amenities,
      sort,
      page
    )
  );
}

export function getParkDetails(id) {
  return axios.get(getAppParkDetailsRoute(id));
}

export function getReview(id, page) {
  return axios.get(
    getReviewRoute(id, page) + `?page=${page}&size=${PAGE_SIZE}`
  );
}

export function postReview(id, review) {
  return axios({
    method: "post",
    url: getReviewRoute(id),
    data: review,
  });
}

export function putReview(id, review) {
  return axios({
    method: "put",
    url: getReviewRoute(id),
    data: review,
  });
}

export function deleteReview(id, userID) {
  return axios({
    method: "delete",
    url: getReviewRoute(id),
    data: {
      userID: userID,
    },
  });
}

export function getImage(id) {
  return axios.get(getImageRoute(id));
}

export function postImage(id, image) {
  var imageData = new FormData();
  imageData.append("image-upload", image);
  return axios({
    method: "post",
    url: getImageRoute(id),
    data: imageData,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function hashToken(token) {
  let arr = token.split("");
  return arr.reduce(
    (hash, curr) =>
      (hash = curr.charCodeAt(0) + (hash << 6) + (hash << 16) - hash),
    0
  );
}
