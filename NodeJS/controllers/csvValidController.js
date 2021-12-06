const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var { CSV } = require("../models/CSV");
const csv = require("fast-csv", "csv-validator");
const moment = require("moment");
const multer = require("multer");
const upload = multer({ dest: "tmp/csv/" });
const fs = require("fs");
const http = require("http");

router.post("/upload", upload.single("file"), function(req, res) {
  const fileRows = [];

  // open uploaded file
  csv
    .fromPath(req.file.path)
    .on("data", function(data) {
      fileRows.push(data); // push each row
    })
    .on("end", function() {
      console.log(fileRows);
      fs.unlinkSync(req.file.path); // remove temp file

      //const validationError = validateCsvData(fileRows);
      console.log("----");
      console.log(req.body.package);
      console.log(req.body.package.trim() === "article");
      console.log(req.body.package.trim() === "vente");
      console.log(req.body.package.trim() === "fournisseur");
      console.log(req.body.package.trim() === "stock");
      //console.log(req.body);
      console.log("----");

      let validationError;
      if (req.body.package.trim() === "article") {
        console.log("okarticle");
        validationError = validateCsvArticleData(fileRows);
      }
      if (req.body.package.trim() === "vente") {
        console.log("okvente");
        validationError = validateCsvVenteData(fileRows);
      }
      if (req.body.package.trim() === "fournisseur") {
        console.log("okfournisseur");
        validationError = validateCsvFournisseurData(fileRows);
      }
      if (req.body.package.trim() === "stock") {
        console.log("okstock");
        validationError = validateCsvStockData(fileRows);
      }
      
      if (validationError) {
        return res.status(200).json({ error: validationError });
      }
      //else process "fileRows" and respond
      return res.json({ message: "valid csv" });
    });
});

function validateCsvData(rows) {
  const dataRows = rows.slice(1, rows.length); //ignore header at 0 and get rest of the rows
  for (let i = 0; i < dataRows.length; i++) {
    const rowError = validateCsvRow(dataRows[i]);
    if (rowError) {
      return `${rowError} on row ${i + 1}`;
    }
  }
  return;
}

function validateCsvRow(row) {
  if (!row[0]) {
    return "invalid name";
  } else if (!Number.isInteger(Number(row[1]))) {
    return "invalid roll number";
  } else if (!moment(row[2], "YYYY-MM-DD").isValid()) {
    return "invalid date of birth";
  }
  return;
}
//

// Contrôles pour le package des articles
function validateCsvArticleData(rows) {
  const dataRows = rows.slice(1, rows.length); //ignore header at 0 and get rest of the rows
  for (let i = 0; i < dataRows.length; i++) {
    const rowError = validateCsvArticleRow(dataRows[i]);
    if (rowError) {
      return `${rowError} on row ${i + 1}`;
    }
  }
  return;
}

function validateCsvArticleRow(row) {
 // console.log(typeof row);
  row = row.toString().split(";");
 // console.log(row[0]);
 // console.log(row[1]);
//  console.log(row.length);

  if (row.length != 11) {
    return "invalid column number";
  }

  if (!row[0]) {
    return "empty field 0";
  }
  if (!row[1]) {
    return "invalid name 1";
  }

  if (!/^[a-zA-Z]+$/.test(row[2])) {
    return "non alphabetic field 2";
  }
  if (!/^[a-zA-Z ]+$/.test(row[3])) {
    return "non alphabetic field 3";
  }

  if (!row[4]) {
    return "empty field 4";
  }
  if (!row[5]) {
    return "invalid name 5";
  }
  if (!row[6]) {
    return "invalid name 6";
  }

  if (!Number.isInteger(Number(row[7]))) {
    return "invalid roll number 7";
  }
  //if (!Number.isInteger(Number(row[8]))) {
  // console.log(parseFloat(row[8]));
 //  console.log(!row[8]);
  // console.log(isNaN(parseFloat(row[8])));

  if (row[8] && isNaN(parseFloat(row[8]))) {
    return "invalid roll number 8";
  }
  //if (!Number.isInteger(Number(row[9]))) {
  if (row[8] && isNaN(parseFloat(row[8]))) {
    return "invalid roll number 9";
  }
  if (!Number.isInteger(Number(row[10]))) {
    return "invalid roll number 10";
  }

  return;
}

//controle pour le package des ventes
function validateCsvVenteData(rows) {
  const dataRows = rows.slice(1, rows.length); //ignore header at 0 and get rest of the rows
  for (let i = 0; i < dataRows.length; i++) {
    const rowError = validateCsvVenteRow(dataRows[i]);
    if (rowError) {
      return `${rowError} on row ${i + 1}`;
    }
  }
  return;
}
function validateCsvVenteRow(row) {
  // console.log(typeof row);
   row = row.toString().split(";");
  // console.log(row[0]);
  // console.log(row[1]);
 //  console.log(row.length);
 
   if (row.length != 8) {
     return "invalid column number";
   }
 
   if (!row[0]) {
     return "empty field 0";
   }
   if (!row[1]) {
    return "empty field 0";
   }
 
   if (!/^[a-zA-Z]+$/.test(row[2])) {
     return "non alphabetic field 2";
   }
   if (!/^[a-zA-Z ]+$/.test(row[3])) {
     return "non alphabetic field 3";
   }
 
   if (!/^[a-zA-Z ]+$/.test(row[4])) {
    return "non alphabetic field 4";
  }

  if (!/^[a-zA-Z ]+$/.test(row[5])) {
    return "non alphabetic field 5";
  }
  if (!moment(row[6], "YYYY/MM/DD").isValid()) {
    return "invalid date 6";
  }
   if (row[7] && isNaN(parseFloat(row[7]))) {
     return "invalid roll number 7";
   }
   return;
 }


//controle pour le package fournisseur
function validateCsvFournisseurData(rows) {
  const dataRows = rows.slice(1, rows.length); //ignore header at 0 and get rest of the rows
  for (let i = 0; i < dataRows.length; i++) {
    const rowError = validateCsvFournisseurRow(dataRows[i]);
    if (rowError) {
      return `${rowError} on row ${i + 1}`;
    }
  }
  return;
}
function validateCsvFournisseurRow(row) {
  // console.log(typeof row);
   row = row.toString().split(";");
  // console.log(row[0]);
  // console.log(row[1]);
 //  console.log(row.length);
 
   if (row.length != 5) {
     return "invalid column number";
   }
 
   if (!row[0]) {
     return "empty field 0";
   }
   if (!row[1]) {
     return "invalid name 1";
   }
 
   if (!/^[a-zA-Z]+$/.test(row[2])) {
     return "non alphabetic field 2";
   }
   if (!/^[a-zA-Z ]+$/.test(row[3])) {
     return "non alphabetic field 3";
   }
   if (!Number.isInteger(Number(row[4]))) {
     return "invalid roll number 4";
   }
   return;
 }

//controle pour le package  stock
function validateCsvStockData(rows) {
  const dataRows = rows.slice(1, rows.length); //ignore header at 0 and get rest of the rows
  for (let i = 0; i < dataRows.length; i++) {
    const rowError = validateCsvStockRow(dataRows[i]);
    if (rowError) {
      return `${rowError} on row ${i + 1}`;
    }
  }
  return;
}
function validateCsvStockRow(row) {
  // console.log(typeof row);
   row = row.toString().split(";");
  // console.log(row[0]);
  // console.log(row[1]);
 //  console.log(row.length);
 
   if (row.length != 10) {
     return "invalid column number";
   }
 
   if (!row[0]) {
     return "empty field 0";
   }
   if (!row[1]) {
     return "invalid name 1";
   }
 
   if (!/^[a-zA-Z]+$/.test(row[2])) {
     return "non alphabetic field 2";
   }
   if (!/^[a-zA-Z ]+$/.test(row[3])) {
     return "non alphabetic field 3";
   }
   if (row[4] && isNaN(parseFloat(row[4]))) {
    return "invalid roll number 4";
  }
   if (!row[5]) {
     return "invalid name 5";
   }
   if (!row[6]) {
     return "invalid name 6";
   }
   if (!moment(row[7], "YYYY/MM/DD").isValid()) {
    return "invalid date 7";
  }
   if (!row[8]) {
    return "invalid name 8";
  }
  if (!row[9]) {
    return "invalid name 9";
  }
   return;
 }
module.exports = router;
