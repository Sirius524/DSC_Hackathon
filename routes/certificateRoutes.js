const express = require("express");
const certificateController = require("../controllers/certificateController");

const router = express.Router();

router.param("id", certificateController.checkID);
router
    .route("/")
    .get(certificateController.getAllCertificates)
    .post(
        certificateController.checkBody,
        certificateController.createCertificate
    );

router
    .route("/:id")
    .get(certificateController.getCertificate)
    .patch(certificateController.updateCertificate)
    .delete(certificateController.deleteCertificate);

module.exports = router;
