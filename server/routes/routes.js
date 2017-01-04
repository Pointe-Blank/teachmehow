const express = require('express');
const router = express.Router();

const bookingController = require('../db/booking/BookingController.js');
const categoryController = require('../db/category/CategoryController.js');
const lessonController = require('../db/lesson/LessonController.js');
const ratingController = require('../db/rating/RatingController.js');
const requestController = require('../db/request/RequestController.js');
const userController = require('../db/user/UserController.js');
const lessByController = require('../db/lessonBy/lessonByController.js');
const chatroomController = require('../db/chatroom/ChatroomController.js');

router
  .route('/users')
  .get(userController.getAllUsers)
  .post(userController.addOneUser);

router
  .route('/users/:userId')
  .get(userController.getUserDetails);

router
  .route('/users/:userId/bio')
  .put(userController.updateUserBio);

router
  .route('/users/:userId/teach')
  .put(userController.updateUserTeachFlag);

router
  .route('/users/:userId/name')
  .put(userController.updateUserName);

router
  .route('/login')
  .post(userController.findUser);

router
  .route('/lessons')
  /**
   * userId may be passed as params attached to the
   * request object on a get request. If so, it will be used to get
   * avilable lessons filtered by the userId so that they
   * may be presented on the teacher dashboard.
   */
  .get(lessonController.getLesson)
  .post(lessonController.addLesson)
  .put(lessonController.updateLesson);

router
  .route('/ratings/:lessonId')
  .get(ratingController.getRating)
  .post(ratingController.addRating);

router
  .route('/requests')
  /**
   * userId may be passed as params attached to the
   * request object on a get request. If so, it will be used to get
   * lessons requested by students and filtered by the teacher's
   * category so that they may be presented on the teacher dashboard.
   */
  .get(requestController.getAllRequests)
  .post(requestController.addOneRequest);

router
  .route('/requests/:requestId')
  .put(requestController.updateOneRequest);

router
  .route('/category')
  .get(categoryController.getCat);

router
  .route('/lessByCat')
  .get(lessByController.lessByCat);

router
  .route('/lessByUser')
  .get(lessByController.lessByUser);

router
  .route('/bookings')
  .get(bookingController.getBooking)
  .post(bookingController.addBooking);

router
  .route('/chatrooms')
  .get(chatroomController.getChatroom)
  .post(chatroomController.addChatroom);

// router
  //   .route('/chatrooms/:chatroomId')
  //   .put(chatroomController.updateChatroom)

module.exports = router;
