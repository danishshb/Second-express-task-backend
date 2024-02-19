const express = require('express')
const userController = require("../controllers/user");
const { protect } =require("../utils/protect");
const upload = require("../utils/multer");
const router = express.Router()

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/info', protect, userController.getUserInfo);
router.get("/users",protect,userController.getAllUsers);
router.put(
  "/update",
  protect,
  upload.single("attachments"),
  userController.updateUser
);
router.put(
  "/attachments",
  protect,
  upload.array("attachments"),
  userController.attachments
);
router.get(
  "/download/:attachmentsType/:filename",
  protect,
  userController.downloadAttachment
);
// router.delete("/:userId", protect, userController.deleteUserById);
router.delete(
  '/attachments/:filename',
  protect,
  userController.deleteAttachment
  );
router.post(
  '/rename/:fileId',
  protect,
  userController.renameFile
  );
router.post(
  '/folders/create', 
  protect,
  userController.createFolder);
  router.post(
    '/forgot-password', 
    userController.forgetPassword);

module.exports = router