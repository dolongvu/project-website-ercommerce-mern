const express = require("express");
const NavbarItem = require("../model/navbar")
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();




// get all events
router.get("/get-all-items", async (req, res, next) => {
  try {
    const navbar = await NavbarItem.find();
    res.status(201).json({
      success: true,
      navbar,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});



module.exports = router;
