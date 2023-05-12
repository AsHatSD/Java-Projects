var XLSX = require('xlsx');
var Category = require('../models/Category');

/**
 * GET /api/categories
 */
exports.findAll = function (req, res) {
  Category.find(function (err, categories) {
    categories.sort(function (a, b) {
      a = parseFloat(a.number);
      b = parseFloat(b.number)
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    return res.send(categories);
  });
};


/**
 * POST /api/categories
 */
exports.import = function (req, res) {
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    console.log('Filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);

    file.on('data', function (data) {
      console.log('Filename: ' + filename + ' got ' + data.length + ' bytes');

      var xlsFile = XLSX.read(data);

      /* Remove existing data */
      Category.remove({}, function (err) {
        if (err) console.log(err);
        else {
          console.log('Categories removed')

          /* Get worksheet */
          var firstSheetName = xlsFile.SheetNames[2];
          console.log(`Parsing worksheet: ${firstSheetName}`);

          var worksheet = xlsFile.Sheets[firstSheetName];

          var i = 6;
          var row = 'A6';
          while (worksheet[row] !== undefined) {
            var number = worksheet[row].v;
            var name = worksheet[`B${i}`].v;
            var unitCell = worksheet[`C${i}`];
            var priceCell = worksheet[`D${i}`];
            var extraCell = worksheet[`E${i}`];

            category = new Category({
              number: number,
              name: name,
              unit: unitCell ? unitCell.v : undefined,
              price: priceCell ? priceCell.v : undefined,
              extra: extraCell ? extraCell.v : undefined
            });

            category.save(function (err, data) {
              if (err) console.log(err);
              else console.log(`Saved to db: ${data.number} --- ${data.name}`);
            });

            i++;
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



