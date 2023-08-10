const {
  addReviewDAOS,
  editReviewDAOS,
  deleteReviewDAOS,
  getReviewDAOS,
} = require("./daos/review");

const {
  getPagination,
  paginateDataClosestParks,
} = require("../shared/pagination.js");

// Get User Review
const getReview = async (req, res) => {
  const parkId = req.params.id;
  const page = Number(req.query.page);
  const size = req.query.size;

  try {
    if (page - 1 < 0) {
      throw new Error(`Page number cannot be 0 or negative`);
    }
    if (size <= 0) {
      throw new Error(`Size cannot be 0 or negative`);
    }
    const reviews = await getReviewDAOS(parkId);

    const { offset, limit } = getPagination(page, size);
    const paginatedResult = await paginateDataClosestParks(
      reviews.reverse(),
      page,
      limit,
      offset
    );


    res.status(200).json(paginatedResult);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Create/Add User Review
const addReview = async (req, res) => {
  const parkId = req.params.id;

  const reviewData = req.body;
  const { comment, userName, userID, title, experienceRating } = req.body;

  const newReview = {
    comment,
    createdAt: new Date(),
    userName,
    userID,
    title,
    experienceRating,
  };

  try {
    validateInput(reviewData);
    await addReviewDAOS(newReview, parkId);
    res.status(201).send({ message: "Review added successfully." });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Update/Edit User Review
const updateReview = async (req, res) => {
  const parkId = req.params.id;
  const reviewData = req.body;
  const { comment, userName, userID, title, experienceRating } = req.body;
  const editedReview = {
    comment,
    createdAt: new Date(),
    userName,
    userID,
    title,
    experienceRating,
  };
  try {
    validateInput(reviewData);
    await editReviewDAOS(editedReview, parkId);
    res.status(200).send({ message: "Review updated successfully." });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Delete User Review
const deleteReview = async (req, res) => {
  const parkId = req.params.id;
  const { userID } = req.body;

  if (!userID || typeof userID !== "number") {
    return res
      .status(400)
      .send({ error: "userID is required and must be a number." });
  }

  try {
    await deleteReviewDAOS(userID, parkId);
    res.status(200).send({ message: "Review deleted successfully." });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const validateInput = ({
  comment,
  userName,
  userID,
  title,
  experienceRating,
}) => {
  if (!userID || typeof userID !== "number") {
    throw new Error("userID is required and must be a number.");
  }

  if (typeof comment !== "string") {
    throw new Error("comment must be a string.");
  }

  if (typeof userName !== "string") {
    throw new Error("userName must be a string.");
  }

  if (typeof title !== "string") {
    throw new Error("title must be a string.");
  }

  if (typeof experienceRating !== "number") {
    throw new Error("experienceRating must be a number.");
  }
};

module.exports = { addReview, updateReview, deleteReview, getReview };
