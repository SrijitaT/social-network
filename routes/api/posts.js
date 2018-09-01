const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

const validatePostInput = require("../../validation/post");
//@route   GET api/posts/test
//@desc    Tests post route
//@access  Public
router.get("/test", (req, res) => res.json({ msg: "Post works" }));

//@route   GET api/posts/
//@desc    Create Post
//@access  Public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404));
});

//@route   GET api/posts/:post_id
//@desc    Create Post
//@access  Public

router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      res.json(post);
    })
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with this id" })
    );
});

//@route   POST api/posts
//@desc    Create Post
//@access  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => {
        errors.couldnotsave = "Oops! Could not save the post";
        res.status(400).json(errors);
      });
  }
);

//@route   DELETE api/posts/:post_id
//@desc    Delete Post
//@access  Private

router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.post_id)
          .then(post => {
            if (post.user.toString() !== req.user.id) {
              return res
                .status(401)
                .json({ notauthorized: "User not authorized!" });
            } else {
              //Delete
              post
                .remove()
                .then(() => res.json({ success: true }))
                .catch(err => {
                  errors.couldnotdeletepost = "Oops! Could not delete post";
                  res.status(400).json(errors);
                });
            }
          })
          .catch(err => {
            errors.postnotfound = "Oops! No post to delete";
            res.status(400).json(errors);
          });
      })
      .catch(err => {
        errors.profilenotfound = "Oops! No profile found";
        res.status(400).json(errors);
      });
  }
);

//@route   POST api/posts/like/:like_id
//@desc    Like post
//@access  Private

router.post(
  "/like/:like_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.like_id)
          .then(post => {
            let likefromuser = post.likes.filter(
              like => like.user.toString() === req.user.id
            );
            if (likefromuser.length > 0) {
              //removes like from post
              const indexofuser = post.likes
                .map(like => like.user)
                .indexOf(likefromuser[0].user);
              post.likes.splice(indexofuser, 1);
            } else {
              //Add the user id to the likes array
              post.likes.unshift({ user: req.user.id });
            }
            post
              .save()
              .then(post => res.json(post))
              .catch(err => {
                res.json({ cantsave: "Could not like the post" });
              });
          })
          .catch(err => {
            errors.postnotfound = "Oops! No post to like";
            res.status(400).json(errors);
          });
      })
      .catch(err => {
        errors.profilenotfound = "Oops! No profile found";
        res.status(400).json(errors);
      });
  }
);

//@route   POST api/posts/comment/:post_id
//@desc    Create Comment
//@access  Private

router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.post_id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        //Add to comments array
        post.comments.unshift(newComment);
        post
          .save()
          .then(post => res.json(post))
          .catch(err => {
            res.json({ couldnotcomment: "Could not Comment on the post" });
          });
      })
      .catch(err => {
        errors.postnotfound = "Oops! No post to comment on";
        res.status(400).json(errors);
      });
  }
);

//@route   DELETE api/posts/comment/:post_id/:comment_id
//@desc    Delete Comment
//@access  Private

router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Post.findById(req.params.post_id)
      .then(post => {
        //Add to comments array
        const filteredComment = post.comments.filter(
          comment => comment.id.toString() === req.params.comment_id
        );
        if (filteredComment[0].user == req.user.id) {
          const removeIndex = post.comments
            .map(comment => comment.id)
            .indexOf(req.params.comment_id);
          if (removeIndex >= 0) post.comments.splice(removeIndex, 1);
          else {
            errors.commentnotfound = "Comment not found!";
            return res.status(404).json(errors);
          }
        } else {
          errors.notauthorized =
            "You are not authorized to delete this comment!!";
          return res.status(404).json(errors);
        }
        post
          .save()
          .then(post => res.json({ success: true }))
          .catch(err => {
            res
              .status(400)
              .json({ couldnotcomment: "Could not Comment on the post" });
          });
      })
      .catch(err => {
        errors.postnotfound = "Oops! No post to comment on";
        res.status(400).json(errors);
      });
  }
);

module.exports = router;
