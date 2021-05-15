const fs = require("fs");

// const certificates = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/certificates-simple.json`)
// );

exports.checkID = (req, res, next, val) => {
    console.log(`Certificate id is: ${val}`);

    if (req.params.id * 1 > certificates.length) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID",
        });
    }
    next();
};

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: "fail",
            message: "Missing name",
        });
    }
    next();
};

exports.getAllCertificates = (req, res) => {
    console.log(req.requestTime);

    res.status(200).json({
        status: "success",
        requestedAT: req.requestTime,
        results: certificates.length,
        data: {
            certificates: certificates,
        },
    });
};

exports.getCertificate = (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1;
    const tour = certificates.find((el) => el.id === id);

    res.status(200).json({
        status: "success",
        data: {
            tour,
        },
    });
};

exports.createCertificate = (req, res) => {
    //console.log(req.body);
    const newId = certificates[certificates.length - 1].id + 1;
    const newCertificate = Object.assign({ id: newId }, req.body);

    certificates.push(newCertificate);
    fs.writeFile(
        `${__dirname}/dev-data/data/certificates-simple.json`,
        JSON.stringify(certificates),
        (err) => {
            res.status(201).json({
                status: "success",
                data: {
                    certificate: newCertificate,
                },
            });
        }
    );
};

exports.updateCertificate = (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            tour: "<Updated tour here...>",
        },
    });
};

exports.deleteCertificate = (req, res) => {
    res.status(204).json({
        status: "success",
        data: null,
    });
};
