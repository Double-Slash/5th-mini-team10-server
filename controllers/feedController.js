const Feed = require("../models/feed");
const httpStatus = require("http-status-codes");


module.exports = {
  show: (req, res, next) => {
    Feed.find({}).populate('user','nickname')
      .then(feeds => {
        res.json({
            //status: httpStatus.OK,
            success : true,
            feed: feeds
        });
      })
      .catch(error => {
        console.log(`Error fetching feeds: ${error.message}`);
        res.json({success : false})
        next(error);
      });
  },

  uploadFile: (req, res, next) => {
    let userId = res.user._id;
    const image = req.file.path;
    const fee= 
      {
        imageUrl: image,
        user : userId
      };
    let newFeed = new Feed(fee);
    Feed.create(newFeed)
        .then(feed => {
          res.json({success : true});
        })
        .catch(error => {
          console.log(`Error uploading feed: ${error.message}`);
          res.json({success : false})
          next(error);
        });
  },

  showDetail: (req, res, next) => {
    let feedId = req.params.id;
    Feed.findById(feedId)
      .then(data => {
        res.json({success :true, feed :data});
      })
      .catch(error => {
        console.log(`Error fetching feed by ID: ${error.message}`);
        next(error);
      });
  }
};