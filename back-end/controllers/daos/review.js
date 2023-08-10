const { getModelForCollection } = require("../../shared/mongoose");

async function getReviewDAOS(parkId) {
  const parks = await getModelForCollection("parksSchema");
  const park = await parks.findOne({ id: parkId });

  // If no park was found, throw an error.
  if (!park) {
    throw new Error(`No park found with ID ${parkId}`);
  }

  const result = park.userReviews;
  return result;
}

async function addReviewDAOS(newReview, parkId) {
  const parks = await getModelForCollection("parksSchema");
  const park = await parks.findOne({ id: parkId });

  // If no park was found, throw an error.
  if (!park) {
    throw new Error(`No park found with ID ${parkId}`);
  }

  // check if a review by the same user already exists.
  const existingReviewIndex = park.userReviews.findIndex(
    (review) => review.userID === newReview.userID
  );

  if (existingReviewIndex !== -1) {
    throw new Error(`A review by user ${newReview.userID} already exists.`);
  }

  const result = await parks.findOneAndUpdate(
    { id: parkId },
    { $push: { userReviews: newReview } }
  );
}

async function editReviewDAOS(editedReview, parkId) {
  const parks = await getModelForCollection("parksSchema");
  const park = await parks.findOne({ id: parkId });

  if (!park) {
    throw new Error(`No park found with ID ${parkId}`);
  }

  const reviewIndex = park.userReviews.findIndex(
    (review) => review.userID === editedReview.userID
  );

  if (reviewIndex === -1) {
    throw new Error(`No review found with userID ${editedReview.userID}`);
  }

  park.userReviews[reviewIndex] = editedReview;
  await park.save();
}

async function deleteReviewDAOS(userId, parkId) {
  const parks = await getModelForCollection("parksSchema");
  const park = await parks.findOne({ id: parkId });

  if (!park) {
    throw new Error(`No park found with ID ${parkId}`);
  }

  const reviewIndex = park.userReviews.findIndex(
    (review) => review.userID === userId
  );

  if (reviewIndex === -1) {
    throw new Error(
      `No review found with userID ${userId} for Park with ID ${parkId}`
    );
  }

  park.userReviews.splice(reviewIndex, 1);
  await park.save();
}

module.exports = {
  addReviewDAOS,
  editReviewDAOS,
  deleteReviewDAOS,
  getReviewDAOS,
};

