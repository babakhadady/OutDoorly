const mongoose = require("mongoose");
const { Schema } = mongoose;

const ActivitySchema = {
  id: String,
  name: String,
};

const TopicSchema = {
  id: String,
  name: String,
};

const PhoneNumberSchema = {
  phoneNumber: String,
  description: String,
  extension: String,
  type: String,
};

const EmailAddressSchema = {
  description: String,
  emailAddress: String,
};

const ContactSchema = new Schema(
  {
    phoneNumbers: [PhoneNumberSchema],
    emailAddresses: [EmailAddressSchema],
  },
  { typeKey: "$type" }
);

const ExceptionHoursSchema = {
  wednesday: String,
  monday: String,
  thursday: String,
  sunday: String,
  tuesday: String,
  friday: String,
  saturday: String,
};

const ExceptionSchema = {
  exceptionHours: ExceptionHoursSchema,
  startDate: String,
  name: String,
  endDate: String,
};

const StandardHoursSchema = {
  wednesday: String,
  monday: String,
  thursday: String,
  sunday: String,
  tuesday: String,
  friday: String,
  saturday: String,
};

const OperatingHoursSchema = {
  exceptions: [ExceptionSchema],
  description: String,
  standardHours: StandardHoursSchema,
  name: String,
};

const AddressSchema = new Schema(
  {
    postalCode: String,
    city: String,
    stateCode: String,
    countryCode: String,
    provinceTerritoryCode: String,
    line1: String,
    type: String,
    line3: String,
    line2: String,
  },
  { typeKey: "$type" }
);

const ImageSchema = {
  credit: String,
  title: String,
  altText: String,
  caption: String,
  url: String,
};

const EntranceFeeSchema = {
  cost: String,
  description: String,
  title: String,
};

const EntrancePassSchema = {
  cost: String,
  description: String,
  title: String,
};

// Can't find this field populated in dataset so just assumed it will be same as EntraceFeeSchema. If issues, look here:
const FeeSchema = {
  cost: String,
  description: String,
  title: String,
};

// Dates and numbers have so far been set to type String. Need to discuss with team whether to change.
const UserImagesSchema = {
  url: String,
  caption: String,
  uploadDate: Date,
  alt: String,
  favouritedCount: Number,
};

const UserReviewSchema = {
  comment: String,
  createdAt: Date,
  userName: String,
  userID: Number,
  title: String,
  experienceRating: String,
};

//testing
const objectSchema = {
  id: String,
  url: String,
  fullName: String,
  parkCode: String,
  description: String,
  latitude: String,
  longitude: String,
  latLong: String,
  activities: [ActivitySchema],
  topics: [TopicSchema],
  states: String,
  contacts: ContactSchema,
  entranceFees: [EntranceFeeSchema],
  entrancePasses: [EntrancePassSchema],
  fees: [FeeSchema],
  directionsInfo: String,
  directionsUrl: String,
  operatingHours: [OperatingHoursSchema],
  addresses: [AddressSchema],
  images: [ImageSchema],
  weatherInfo: String,
  name: String,
  designation: String,
  amenities: [String],
  userImages: [UserImagesSchema],
  userReviews: [UserReviewSchema],
};

module.exports = objectSchema;

