var http = require('http');
var soap = require('soap');
var xml2js = require('xml2js');
var url = 'http://www.webservicex.net/globalweather.asmx?WSDL';

exports.getAll = function (req, res, next) {

    var args = { CountryName: 'Denmark' };
    soap.createClient(url, function (err, client) {
        client.GetCitiesByCountry(args, function (err, result) {

            var soapResult = result.GetCitiesByCountryResult;

            var extractedData = "";
            var parser = new xml2js.Parser();
            parser.parseString(soapResult, function (err, result) {
                //Extract the value from the data element
                extractedData = result['NewDataSet']['Table'];
                res.send({ list: extractedData });
            });
        });
    });


};
