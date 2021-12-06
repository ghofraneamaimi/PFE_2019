const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var { CSV } = require("../models/CSV");
const csv = require("fast-csv", "csv-validator");
const moment = require("moment");
const multer = require("multer");
//const upload = multer({ dest: 'tmp/csv/' });
const http = require("http");
const fs = require("fs");

//storage multer
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "csvuploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + file.originalname);
  }
});

var upload = multer({ storage: storage });

// get my csvs from database
router.get("/:idclient", (req, res) => {
  CSV.find({ client_id: req.params.idclient }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving csvfiles :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

// get from database
router.get("/", (req, res) => {
  CSV.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving csvfiles :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

//download file
router.get("/download/:filename", function(req, res) {
  var file = "./csvuploads/" + req.params.filename;
  res.download(file); // Set disposition and send it.
});

router.get("/toto", (req, res) => {
  CSV.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving csvfiles :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

//upload multiple files
router.post(
  "/uploadmultiple",
  upload.array("myFiles", 12),
  (req, res, next) => {
    const files = req.files;
    if (!files) {
      const error = new Error("Please choose files");
      error.httpStatusCode = 400;
      return next(error);
    }

    res.send(files);
  }
);

router.post("/uploaddata", upload.array("myFiles", 12), (req, res, next) => {
  console.log("11111111111111");
  console.log(req.body);

  const files = req.files;

  for (var index = 0; index < req.files.length; index++) {
    var csv = new CSV({
      nomdoc: req.body.nomdoc,
      taille: req.body.taille,
      dateupload: new Date(),
      client_id: req.body.client_id,
      filename:
        req.files[index].fieldname + "-" + req.files[index].originalname,
      path:
        req.files[index].destination +
        "/" +
        req.files[index].fieldname +
        "-" +
        req.files[index].originalname
    });

    csv.save((err, doc) => {
      if (!err) {
        console.log("OK");
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
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }

  res.send(files);
});



//  post to database
router.post("/", (req, res) => {
  var csv = new CSV({
    nomdoc: req.body.csv.nomdoc,
    taille: req.body.csv.taille,
    dateupload: req.body.csv.dateupload,
    client_id: req.body.csv.client_id
  });
  csv.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in csvfile Save :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});


router.delete("/delete/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  CSV.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Client Delete :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.delete("/delete/:nomdoc", (req, res) => {
  if (!ObjectId.isValid(req.params.nomdoc))
    return res.status(400).send(`No record with given id : ${req.params.nomdoc}`);

 c = CSV.find(req.params.nomdoc);
 
  CSV.findByIdAndRemove(c.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Client Delete :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});






//validate csv
router.post("/upload", upload.single("file"), function(req, res) {
  const fileRows = [];

  // open uploaded file
  
  console.log(req.file.path);
  
  csv
    .fromPath(req.file.path)
    .on("data", function(data) {
      fileRows.push(data); // push each row
    })
    .on("end", function() {
      //console.log(fileRows);
     // fs.unlinkSync(req.file.path); // remove temp file

      //const validationError = validateCsvData(fileRows);
	  const result = validateHeaders(fileRows[0]);
	  
      //if (validationError) {  
      if (!result.status) {
        return res.status(403).json({ error: "invalid csv : "+result.message });
      }
      //else process "fileRows" and respond
      return res.json({ message: "valid csv" });
    });
});


function validateHeaders(dataString) {
  var headers = [
    "reference",
    "customer",
    "ship to",
    "bu",
    "designation",
    "fournisseur",
    "categorie",
    "delai",
    "qte min",
    "multiples",
    "volume unitaire"
  ];
  
  console.log(dataString);
  console.log(typeof (dataString));
  dataRow = dataString[0].split(';');
  for (let i = 0; i < dataRow.length; i++) {
	  
	  console.log(dataRow[i]);
	  console.log(headers.indexOf(dataRow[i].trim().toLowerCase()));
	  
    if (headers.indexOf(dataRow[i].trim().toLowerCase())<0) {
      return { status : false, message : 'champs errone '+dataRow[i].trim()};
    }
  }
  return { status : true, message : 'all good'};
}

/*

function validateCsvData(dataRows) {
  for (let i = 0; i < dataRows.length + 1; i++) {
    const dataRow = dataRows[0];
    console.log(dataRows[0]);
    const rowError = validateCsvRow(dataRow);
    if (rowError) {
      return `${rowError} on row ${i + 1}`;
    }
  }
  return;
}

function validateCsvRow(row) {
  var headers = [
    "Reference",
    "Costumer",
    "Ship To",
    "BU",
    "Designation",
    "Fournisseur",
    "Categorie",
    "Delai",
    "Qte Min",
    "Multiples",
    "Volume unitaire"
  ];
  for (let i = 0; i < row.length + 1; i++) {
    if (!(row[i] in headers)) {
      return "invalid csv";
    }

    return ;
  }
}

*/
module.exports = router;
