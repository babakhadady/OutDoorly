const { getModelForCollection } = require("../../shared/mongoose");
const {paginateData} = require('../../shared/pagination')
const util = require("util");
const fs = require("fs");


// ONLY RUN to populate local DB upon initialization of backend
const populateLocaldatabase = async () => {
  const model = await getModelForCollection("parksSchema");
  for (park of data) {
    try {
      const obj = new model(park);
      console.log(obj);
      await obj.save();
    } catch (e) {
      console.log(e);
    }
  }
};

// ONLY RUN to add fake reviews to db
const addReviewsToDB = async () => {
  const model = await getModelForCollection("parksSchema");
}

const addAmenitiesToDB = async () => {
  const model = await getModelForCollection("parksSchema");

  const { data } = JSON.parse(
    fs.readFileSync("../../data/allParksAmenities.json")
  );

  for (let amenities of data) {
    for (let amenity of amenities) {
      let amenityName = amenity.name;
      for (let p of amenity.parks) {
        let parkCode = p.parkCode;
        console.log(
          util.inspect(parkCode, {
            showHidden: false,
            depth: null,
            colors: true,
          })
        );
        const query = await model.updateMany(
          { parkCode: p.parkCode },
          { $push: { amenities: amenityName } }
        );
      }
    }
  }
};

const getParks = async (
  selectedActivities,
  selectedAmenities,
  state,
  sortBy = "", 
  offset,
  limit,
  page
) => {
  const parks = await getModelForCollection("parksSchema");

  let queryBuilder = {
    $and: [],
  };

  let queryProjection =
    "fullName parkCode states activities.name description images amenities addresses designation  ";

  let sorting = {
    fullName: "asc",
  };

  if (!selectedActivities && !selectedAmenities && !sortBy && !state) {
    queryBuilder = {};
  }

  if (selectedActivities) {
    queryBuilder["$and"].push({
      "activities.name": { $all: selectedActivities },
    });
  }

  if (selectedAmenities) {
    queryBuilder["$and"].push({ amenities: { $all: selectedAmenities } });
  }

  if (state) {
    queryBuilder["$and"].push({
      states: { $regex: `${state}`, $options: "i" },
    });
  }

  if (sortBy) {
    sorting.fullName = sortBy;
  }

  const query = parks
  .find(queryBuilder)
  .select(queryProjection)
  .sort(sorting)
  .limit(limit)
  .skip(offset)
  const data = await query.exec()

  const countQuery = parks
  .find(queryBuilder)
  .select(queryProjection)
  const result = await paginateData(parks, countQuery, data, page, limit)

  return result;
};

const getParkDetails = async (id) => {
  const parks = await getModelForCollection("parksSchema");
  let queryProjection =
    "id fullName parkCode description operatingHours weatherInfo latitude longitude images userImages userReviews entranceFees fees addresses designation topics url ammenities activities";

  const result = await parks.findById(id).select(queryProjection);
  return result;
};

const submitImages = async (id, url) => {
  const parks = await getModelForCollection("parksSchema");

  let result = await parks.findById(id).select("fullName parkCode userImages");

  if (result) {
    result.userImages.push({
      url: url,
      favouritedCount: 0,
      uploadDate: new Date(),
    });
  }

  await result.save();

  return result;
};

const editImage = async (imageID, count) => {
  const parks = await getModelForCollection("parksSchema");

  let countNumber = +count;

  let updated = await parks.updateOne(
    { "userImages._id": imageID },
    { $set: { "userImages.$.favouritedCount": countNumber } }
  );
  let result = await parks.findOne({
    userImages: { $elemMatch: { _id: imageID } },
  });

  return result.userImages;
};

const deleteImage = async (id) => {
  const parks = await getModelForCollection("parksSchema");

  const image = await parks.updateMany({ $pull: { userImages: { _id: id } } });

  if (!image) {
    throw new Error(`No image found with ID ${id}`);
  }

};

const retrieveImages = async (id) => {
  const parks = await getModelForCollection("parksSchema");

  const park = await parks.findById(id);

  if (!park) {
    throw new Error(`No image found with ID ${id}`);
  }

  if (park.userImages) {
    return park.userImages;
  }

  return {};
};

module.exports = {
  getParks,
  getParkDetails,
  submitImages,
  editImage,
  deleteImage,
  retrieveImages,
};

