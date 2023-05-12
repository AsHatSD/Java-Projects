var XLSX = require('xlsx');
var Job = require('../models/Job');
var User = require('../models/User');
var ObjectId = require('mongoose').Types.ObjectId;
var fs = require('fs');
var moment = require('moment');
var xlsx = require('xlsx-populate');
var schedule = require('node-schedule');

// Scheduler
var j = schedule.scheduleJob({ hour: 13, minute: 01, dayOfWeek: 5 }, function () {

  User.find(function (err, users) {
    if (users) {

      var startDate = getStartDate(users[i]);

      for (var i = 0; i < users.length; i += 1) {
        if (users[i].type === "user") {
          generateExcelFile(users[i], startDate);
        }
      }
    }
  });
});

function getStartDate(user) {
  var date = moment("9 22:00", "DD hh:mm").hour(9).subtract(6, 'days');
  //var date = moment().hour(9).subtract(6, 'days');
  return date;
}

function sortOutJobs(jobs, startDate) {
  var sortedJobs = jobs.filter(function (elem) {
    var jobDate = moment(elem.createdAt);
    if(jobDate.isSameOrAfter(startDate)){
      return elem;
    } 
  });

  return sortedJobs;
}

function generateExcelFile(user, startDate) {
  Job.find({ 'user._id': ObjectId(user._id) }, function (err, jobs) {

    if (jobs) {
      jobs = sortOutJobs(jobs, startDate);
    }

    // Load the input workbook from file. 
    var workbook = xlsx.fromFileSync('./empty_sheet.xlsx');

    // Modify the workbook. 
    var worksheet = workbook.getSheet(0);

    // Headers
    worksheet.getCell('B1').setValue(user.name);
    worksheet.getCell('G1').setValue(`${moment().week()},${moment().year()},${user.number}`);

    var row = 4;
    // Jobs
    for (var i = 0; i < jobs.length; i++) {
      var job = jobs[i];
      var empty = 0;

      worksheet.getCell(`A${row}`).setValue(job.case.number);
      worksheet.getCell(`B${row}`).setValue(`${job.case.location} ${job.case.name}`);

      if (job.isTimeBased) {
        worksheet.getCell(`D${row}`).setValue(job.timeType.number);
        worksheet.getCell(`E${row}`).setValue(job.timeSpent);
        worksheet.getCell(`F${row}`).setValue(job.timeType.unit || empty);
        worksheet.getCell(`G${row}`).setValue(job.timeType.price || empty);

        // Second row
        row++;
        worksheet.getCell(`A${row}`).setValue(job.case.number);
        worksheet.getCell(`B${row}`).setValue(`${job.case.location} ${job.case.name}`);

        if (job.subcategory) {
          worksheet.getCell(`D${row}`).setValue(job.subcategory.number);
          worksheet.getCell(`E${row}`).setValue(job.quantity);
          worksheet.getCell(`F${row}`).setValue(job.subcategory.unit || empty);
          worksheet.getCell(`G${row}`).setValue(job.subcategory.price || empty);
        } else {
          worksheet.getCell(`D${row}`).setValue(job.category.number);
          worksheet.getCell(`E${row}`).setValue(job.quantity);
          worksheet.getCell(`F${row}`).setValue(job.category.unit || empty);
          worksheet.getCell(`G${row}`).setValue(job.category.price || empty);
        }
      } else {
        worksheet.getCell(`C${row}`).setValue(`${job.consumption}`);
        worksheet.getCell(`E${row}`).setValue(`${job.quantity}`);

        if (job.subcategory) {
          worksheet.getCell(`D${row}`).setValue(`${job.subcategory.number}`);
          worksheet.getCell(`F${row}`).setValue(`${job.subcategory.unit || empty}`);

          // Fallback to the category's price
          if (job.subcategory.price) {
            worksheet.getCell(`G${row}`).setValue(`${job.subcategory.price || empty}`);
          } else {
            worksheet.getCell(`G${row}`).setValue(`${job.category.price || empty}`);
          }
        } else {
          worksheet.getCell(`D${row}`).setValue(`${job.category.number}`);
          worksheet.getCell(`F${row}`).setValue(`${job.category.unit || empty}`);
          worksheet.getCell(`G${row}`).setValue(`${job.category.price || empty}`);
        }
      }

      row++;
    }

    // Write to file. 
    var filename = `Week ${moment().week()} - ${user.name}`;

    var dir = './public/downloads';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    workbook.toFileSync(`${dir}/${filename}.xlsx`);
  });
}

/**
 * GET /api/jobs
 */
exports.find = function (req, res) {
  Job.find({ 'user._id': ObjectId(req.user._id) }, function (err, jobs) {
    return res.send(jobs);
  });
};

/**
 * POST /api/jobs
 */
exports.add = function (req, res) {
  // req.assert('isTimeBased', 'Some went wrong').notEmpty();
  // req.assert('case', 'Case cannot be blank').notEmpty();
  // req.assert('category', 'Category cannot be blank').notEmpty();
  // req.assert('quantity', 'Quantity cannot be blank').notEmpty();

  // var errors = req.validationErrors();

  // if (errors) {
  //   return res.status(400).send(errors);
  // }

  job = new Job({
    user: req.user,
    case: req.body.case,
    type: req.body.type,
    place: req.body.place,
    category: req.body.category,
    usedMaterials: req.body.usedMaterials,
    usedExtraMaterials: req.body.usedExtraMaterials,
    timeType: req.body.timeType,
    hours: req.body.hours,
    price:req.body.price,
    salary: req.body.salary,
    consumptionType: req.body.consumptionType,
    consumption: req.body.consumption,
    note: req.body.note,
    lift:req.body.lift,
    car: req.body.car,
    distance: req.body.distance,
    qualityCheck: req.body.qualityCheck
  });

  job.save(function (err, data) {
    if (err) {
      return res.status(500).send(err);
    }

    return res.send({
      message: "Registreringen er blevet gemt"
    });
  });

};

/**
 * GET /api/exports
 */
exports.listExports = function (req, res) {
  fs.readdir('./public/downloads/', (err, files) => {
    return res.send(files ? files.reverse() : []);
  });
};

/**
 * POST /api/exports
 */
exports.createExport = function (req, res) {

  Job.find({ 'user._id': ObjectId(req.body._id) }, function (err, jobs) {
    // Load the input workbook from file. 
    var workbook = xlsx.fromFileSync('./empty_sheet.xlsx');

    // Modify the workbook. 
    var worksheet = workbook.getSheet(0);

    // Headers
    worksheet.getCell('B1').setValue(req.body.name);
    worksheet.getCell('G1').setValue(`${moment().week()},${moment().year()},${req.body.number}`);

    var row = 4;
    // Jobs
    for (var i = 0; i < jobs.length; i++) {
      var job = jobs[i];
      var empty = 0;

      worksheet.getCell(`A${row}`).setValue(job.case.number);
      worksheet.getCell(`B${row}`).setValue(`${job.case.location} ${job.case.name}`);

      if (job.isTimeBased) {
        worksheet.getCell(`D${row}`).setValue(job.timeType.number);
        worksheet.getCell(`E${row}`).setValue(job.timeSpent);
        worksheet.getCell(`F${row}`).setValue(job.timeType.unit || empty);
        worksheet.getCell(`G${row}`).setValue(job.timeType.price || empty);

        // Second row
        row++;
        worksheet.getCell(`A${row}`).setValue(job.case.number);
        worksheet.getCell(`B${row}`).setValue(`${job.case.location} ${job.case.name}`);

        if (job.subcategory) {
          worksheet.getCell(`D${row}`).setValue(job.subcategory.number);
          worksheet.getCell(`E${row}`).setValue(job.quantity);
          worksheet.getCell(`F${row}`).setValue(job.subcategory.unit || empty);
          worksheet.getCell(`G${row}`).setValue(job.subcategory.price || empty);
        } else {
          worksheet.getCell(`D${row}`).setValue(job.category.number);
          worksheet.getCell(`E${row}`).setValue(job.quantity);
          worksheet.getCell(`F${row}`).setValue(job.category.unit || empty);
          worksheet.getCell(`G${row}`).setValue(job.category.price || empty);
        }
      } else {
        worksheet.getCell(`C${row}`).setValue(`${job.consumption}`);
        worksheet.getCell(`E${row}`).setValue(`${job.quantity}`);

        if (job.subcategory) {
          worksheet.getCell(`D${row}`).setValue(`${job.subcategory.number}`);
          worksheet.getCell(`F${row}`).setValue(`${job.subcategory.unit || empty}`);

          // Fallback to the category's price
          if (job.subcategory.price) {
            worksheet.getCell(`G${row}`).setValue(`${job.subcategory.price || empty}`);
          } else {
            worksheet.getCell(`G${row}`).setValue(`${job.category.price || empty}`);
          }
        } else {
          worksheet.getCell(`D${row}`).setValue(`${job.category.number}`);
          worksheet.getCell(`F${row}`).setValue(`${job.category.unit || empty}`);
          worksheet.getCell(`G${row}`).setValue(`${job.category.price || empty}`);
        }
      }

      row++;
    }

    // Write to file. 
    var filename = `Week ${moment().week()} - ${req.body.name}`;

    var dir = './public/downloads';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    workbook.toFileSync(`${dir}/${filename}.xlsx`);

    return res.send({
      message: "Exported successfully"
    });
  });
};