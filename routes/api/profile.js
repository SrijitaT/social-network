const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Profile Model
const Profile = require("../../models/Profile");
//Load User Model
const User = require("../../models/User");

//Load Validation
const validateProfileInput = require("../../validation/profile");

//@route   GET api/profile/test
//@desc    Tests profile route
//@access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

//@route   GET api/profile
//@desc    Get current user's profile
//@access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user!";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(400));
  }
);

//@route   POST api/profile/
//@desc    Create user's profile
//@access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    console.log("id----", req.user);
    //Get fields
    let profileFields = {};
    profileFields = JSON.parse(JSON.stringify(req.body));
    profileFields.user = req.user.id;
    if (profileFields.youtube) delete profileFields.youtube;
    if (profileFields.twitter) delete profileFields.twitter;
    if (profileFields.facebook) delete profileFields.facebook;
    if (profileFields.instagram) delete profileFields.instagram;
    if (typeof req.body.skills !== "undefined")
      profileFields.skills = req.body.skills.split(",");
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create
        //Check to see the handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          } else {
            //Save Profile
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile))
              .catch(err => console.log(err));
          }
        });
      }
    });
  }
);

module.exports = router;
