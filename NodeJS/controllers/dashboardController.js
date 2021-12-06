const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { dashboard } = require("../models/Dashboard");

const multer = require("multer");


var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "dashboarduploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + file.originalname);
  }
});

var upload = multer({ storage: storage });

//get file from database
router.get("/", (req, res) => {
  dashboard.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving dashboardfiles :" +
          JSON.stringify(err, undefined, 2)
      );
    }
  });
});


// get my csvs from database
router.get("/:idclient", (req, res) => {
  dashboard.find({'client_id':req.params.idclient},(err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving csvfiles :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

//post data of specific client to database
/*router.post("/:idclient", (req, res) => {
  var dash = new dashboard({
    nomdash: req.body.nomdash,
    taille: req.body.taille,
    extension: req.body.extension,
    dateSend: req.body.dateSend,
    client_id: req.body.client_id
  });
  dash.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in dashboardfiles Save :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});
*/
//download file
router.get("/download/:filename", function(req, res) {
  var file = "./dashboarduploads/" + req.params.filename;
  res.download(file); // Set disposition and send it.
});

//upload multiple files
/*router.post("/uploadmultiple",upload.array("myFiles", 12),(req, res, next) => {
    const files = req.files;
    if (!files) {
      const error = new Error("Please choose files");
      error.httpStatusCode = 400;
      return next(error);
    }

    res.send(files);
  }
);


    const files = req.files
    if (!files) {
      const error = new Error('Please choose files')
      error.httpStatusCode = 400
      return next(error)
    }
  
      res.send(files)
   
  })*/
  
  router.post('/uploaddata', upload.array('myFiles', 12), (req, res, next) => {
	  
	  console.log("11111111111111");
	  console.log(req.body);

    const files = req.files
	
	for (var index=0; index<req.files.length;index++)
	{
		var dash = new dashboard({
			nomdash: req.body.nomdash,
			taille: req.body.taille,
			extension: req.body.extension,
			dateSend: new Date(),
			client_id: req.body.client_id,
			filename :  req.files[index].fieldname + "-" + req.files[index].originalname,
			path : req.files[index].destination+"/"+req.files[index].fieldname + "-" + req.files[index].originalname
		});
		
		  dash.save((err, doc) => {
			if (!err) {
			  console.log('OK');
			} else {
			  console.log(
				"Error in csvfile Save :" + JSON.stringify(err, undefined, 2)
			  );
			}
		  });
		
	}
	
	console.log("2222222222222222");
	
	console.log(req.files);
	
	console.log("33333333333333");
	
    if (!files) {
      const error = new Error('Please choose files')
      error.httpStatusCode = 400
      return next(error)
    }
  
      res.send(files)
   
  });
  
  router.delete("/delete/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  dashboard.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Client Delete :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});




module.exports = router;

