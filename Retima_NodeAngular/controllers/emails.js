var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "tt5053922@gmail.com",
        pass: "tt5053922tt5053922"
    }
});

/**
 * Send an email
 */
exports.sendEmail = function (req, res) {
    var data = req.body;

    smtpTransport.sendMail({
        from: 'tt5053922@gmail.com',
        to: 'cb@mobilepeople.com',
        subject: 'Test email',
        text: 'This is a test',
        attachments: [
            {
                filename: 'Week 13 - user1.xlsx',
                filePath: '/public/downloads/Week 13 - user1.xlsx',
                contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        ]
    }, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
    });

    smtpTransport.close();

    res.send({
        message: "Email sent"
    });
};