var Rates = require('../models/Rates');
var ObjectId = require('mongoose').Types.ObjectId;
var fs = require('fs');
var moment = require('moment');

/**
 * GET /api/rates
 */
exports.find = function (req, res, next) {
    var id;
    if (req.user.type === 'admin') {
        id = req.user._id;
    }
    else {
        id = req.user.createdBy;
    }

    Rates.findOne({ 'saved_by': ObjectId(id) }, function (err, rates) {
        return res.send(rates);
    });
};

/**
 * POST /api/rates
 */
exports.add = function (req, res, next) {
    Rates.findOne({ 'saved_by': ObjectId(req.user._id) }, function (err, rates) {
        if (rates) {
            rates.text = req.body.text;
        }
        else {
            rates = new Rates({
                text: req.body.text,
                saved_by: req.user._id
            });
        }
        rates.save(function (err) {
            res.send({ msg: "Gemt", rates: rates });
        });
    });
};