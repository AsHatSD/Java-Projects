var XLSX = require('xlsx');
var Case = require('../models/Case');

/**
 * GET /api/cases
 */
exports.findAll = function (req, res) {
  Case.find(function (err, cases) {
    cases.sort(function (a, b) {
      a = parseFloat(a.number);
      b = parseFloat(b.number)
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    return res.send(cases);
  });
};


/**
 * POST /api/cases
 */
exports.import = function (req, res) {
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    console.log('Filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);

    file.on('data', function (data) {
      console.log('Filename: ' + filename + ' got ' + data.length + ' bytes');

      var xlsFile = XLSX.read(data);

      /* Remove existing data */
      Case.remove({}, function (err) {
        if (err) console.log(err);
        else {
          console.log('Cases removed')

          /* Get worksheet */
          var firstSheetName = xlsFile.SheetNames[1];
          console.log(`Parsing worksheet: ${firstSheetName}`);

          var worksheet = xlsFile.Sheets[firstSheetName];

          var i = 6;
          var row = 'A6';
          while (worksheet[row] !== undefined) {
            var number = worksheet[row].v;
            var location = worksheet[`B${i}`].v;
            var name = worksheet[`C${i}`].v;
            var extraInfo = worksheet[`C${i + 1}`];
            var finished = worksheet[`D${i}`];

            myCase = new Case({
              number: number,
              location: location,
              name: name,
              extraInfo: extraInfo ? extraInfo.v : undefined,
              finished: finished ? finished.v : undefined,
            });

            myCase.save(function (err, data) {
              if (err) console.log(err);
              else console.log(`Saved to db: ${data.number} --- ${data.name}`);
            });

            i += 2;
            row = `A${i}`;
          }

          return res.send({
            message: "Import finished successfully"
          });
        }
      });
    });
  });
};

/*
 *PUT api/cases/saveCase
 */
exports.saveCase = function (req, res, next) {
  Case.findOne({ number: req.body.number }, function (err, caseFound) {
    if (caseFound) {
      caseFound.finished = req.body.finished;
    }
    caseFound.save(function (err) {
      res.send({ caseFound: caseFound });
    });
  });
};