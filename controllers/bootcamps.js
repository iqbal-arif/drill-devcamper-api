// PATH Core Module
const path = require('path');

// Importing ErrorResponse utils
const ErrorResponse = require('../utils/errorResponse');

// Importing AsyncHandler from Controller
const asyncHandler = require('../middleware/async');
//  Importing GEOCODER UTILS
const geocoder = require('../utils/geocoder');
// Getting Bootcamp Object from Bootcamp db
const Bootcamp = require('../models/Bootcamps');

/***************************GET BOOTCAMPS************************ */
//  @desc       GET all Bootcamps
//  @route      GET /api/v1/bootcamps
//  @access     Public
/***************************GET BOOTCAMPS************************ */
// Code through AsyncHandler Middleware
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  // console.log(req.query);
  // const bootcamps = await Bootcamp.find();
  res.status(200).json(res.advancedResults);
});

/* Previous Code
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (error) {
    // res.status(400).json({ success: false });
    next(error);
  }

  // Use the bottom code with POSTMAN to check the http req,res transmission
  //   console.log(req.body);
  //   res.status(200).json({ success: true, msg: 'Show all bootcamps' });
};*/
/***************************GET A BOOTCAMP************************ */
//  @desc       GET a Single Bootcamp
//  @route      GET /api/v1/bootcamps/:id
//  @access     Public
/***************************GET A BOOTCAMP************************ */
// Code through AsyncHandler Middleware
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

/* Previous Code
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.findById(req.params.id);
    // if the id is formatted but it is not correct then do this
    if (!bootcamp) {
      // When formatted Id does not exist in db
      //   return res.status(400).json({ success: false });
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: bootcamps });
  } catch (error) {
    // When id is not formatted
    // res.status(400).json({ success: false });
    // next(
    //   new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    // );
    next(error);
  }
  // Use the bottom code with POSTMAN to check the http req,res transmission
  //   res
  //     .status(200)
  //     .json({ success: true, msg: `Show bootcamp ${req.params.id}` });
};*/

/***************************CREATE A NEW BOOTCAMP************************ */
//  @desc       Create a New Bootcamp
//  @route      POST /api/v1/bootcamps/
//  @access     Private
/***************************CREATE A NEW BOOTCAMP************************ */
// Code through AsyncHandler Middleware
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  // Add user to req,body, here req.user is the login
  req.body.user = req.user.id;

  // Check for published bootcamp
  const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });

  // If the user is not an admin, they can only add one bootcamp
  if (publishedBootcamp && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already published a bootcamp`,
        400
      )
    );
  }

  //   Creating data in Bootcamp database
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

/* Previous Code
exports.createBootcamp = async (req, res, next) => {
  try {
    //   Creating data in Bootcamp database
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    // res.status(400).json({ success: false });
    next(error);
  }

  // Use the bottom code with POSTMAN to check the http req,res transmission
  //   console.log(req.body);
  //   res.status(200).json({ success: true, msg: 'Create new bootcamp' });
};*/

/***************************UPDATE A BOOTCAMP************************ */
//  @desc       Update Bootcamp
//  @route      PUT /api/v1/bootcamps/:id
//  @access     Private
/***************************UPDATE A BOOTCAMP************************ */
// Code through AsyncHandler Middleware

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is bootcamp owner and not admin
  // since req.user.id is a string so converting bootcamp.user.toString()
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this bootcamp`,
        401
      )
    );
  }

  bootcamp = await Bootcamp.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: bootcamp });
});

/* Previous Code
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    // if the id is formatted but it is not correct then do this
    if (!bootcamp) {
      //   return res.status(400).json({ success: false });
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    // res.status(400).json({ success: false });
    next(error);
  }

  // Use the bottom code with POSTMAN to check the http req,res transmission
  //   res
  //     .status(200)
  //     .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
};*/

/***************************DELETE A BOOTCAMP************************ */
//  @desc       Delete Bootcamp
//  @route      DELTE /api/v1/bootcamps/:id
//  @access     Private
/***************************DELETE A BOOTCAMP************************ */
// Code through AsyncHandler Middleware

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  // if the id is formatted but it is not correct then do this
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this bootcamp`,
        401
      )
    );
  }

  bootcamp.remove();
  res.status(200).json({ success: true, data: {} });
});

/* Previous Code
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    // if the id is formatted but it is not correct then do this
    if (!bootcamp) {
      //   return res.status(400).json({ success: false });
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    // res.status(400).json({ success: false });
    next(error);
  }

  // Use the bottom code with POSTMAN to check the http req,res transmission
  //   res
  //     .status(200)
  //     .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
};*/
/***************************GET BOOTCAMPS WITHIN A RADIUS************************ */
//  @desc       Get Bootcamps within a RADIUS
//  @route      DELTE /api/v1/bootcamps/radius/:zipcode/:distance
//  @access     Private
/***************************DELETE A BOOTCAMP************************ */
// Code through AsyncHandler Middleware

exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  //Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3.963 mi / 6,378 km

  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: { bootcamps } });
});

// @desc      Upload photo for bootcamp
// @route     PUT /api/v1/bootcamps/:id/photo
// @access    Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this bootcamp`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
  console.log(req.files.file);

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
