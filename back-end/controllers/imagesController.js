const { S3 } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const DAOS = require("./daos/parks.js");
require("dotenv").config();

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.S3_BUCKET,
    secretAccessKey: process.env.SECRET_KEY,
  },
  region: "us-west-2",
});

const uploadHelper = (bucketName) =>
  multer({
    storage: multerS3({
      s3: s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `doc/${Date.now()}.jpeg`);
      },
    }),
  });

const uploadImage = async (req, res) => {
  try {
    if (!req.params.id || req.params.id === ":id") {
      return res.status(400).json({ error: "Id param must be provided." });
    }

    const uploadSingle = uploadHelper('outdoorly').single("image-upload");

    uploadSingle(req, res, async (err) => {
      if (err)
        return res.status(400).json({ success: false, message: err.message });

      const result = await DAOS.submitImages(req.params.id, req.file.location);

      res.status(200).json({ data: req.file, imageData: result });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal database error." });
  }
};

const editImage = async (req, res) => {
  try {

    if (!req.query.favouriteCount || !req.params.id) {
      return res.status(400).json({
        error: "Favourite count and imageID params must be provided.",
      });
    }

    const result = await DAOS.editImage(
      req.params.id,
      req.query.favouriteCount
    );
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal database error." });
  }
};

const deleteImage = async (req, res) => {
  try {
    if (!req.params.id || req.params.id === ":id") {
      return res.status(400).json({ error: "Id param must be provided." });
    }

    const result = await DAOS.deleteImage(req.params.id);

    return res.status(200).json({ message: "Deletion successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal database error." });
  }
};

const retrieveImages = async (req, res) => {
  try {
    if (!req.params.id || req.params.id === ":id") {
      return res.status(400).json({ error: "Id param must be provided." });
    }

    const result = await DAOS.retrieveImages(req.params.id);

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal database error." });
  }
};

module.exports = { uploadImage, editImage, deleteImage, retrieveImages };
