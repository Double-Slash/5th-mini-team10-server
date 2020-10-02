const Feed = require("../models/feed");
const httpStatus = require("http-status-codes");

module.exports = {
  show: (req, res, next) => {
    Feed.find({})
      .then(feeds => {
        res.json({
            status: httpStatus.OK,
            data: feeds
        });
        next();
      })
      .catch(error => {
        console.log(`Error fetching feeds: ${error.message}`);
        next(error);
      });
  },

  upload: (req, res, next) => {
    let feedParams = {
      //file using multer
    };
    Feed.create(feedParams)
      .then(feed => {
        //upload complete
        next();
      })
      .catch(error => {
        console.log(`Error uploading feed: ${error.message}`);
        next(error);
      });
  },

  showDetail: (req, res, next) => {
    let feedId = req.params.id;
    Feed.findById(feedId)
      .then(feed => {
        res.json({
            status: httpStatus.OK,
            data: feed
        });
        next();
      })
      .catch(error => {
        console.log(`Error fetching feed by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let feedId = req.params.id;
    Feed.findByIdAndRemove(feedId)
      .then(() => {
        next();
      })
      .catch(error => {
        console.log(`Error deleting feed by ID: ${error.message}`);
        next();
      });
  },

  errorJSON: (error, req, res, next) => {
    let errorObject;
    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    } else {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Unknown Error."
      };
    }
    res.json(errorObject);
  }
};