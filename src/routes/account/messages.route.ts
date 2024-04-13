import { Router } from "express"
import multer from "multer"
import { sendEmail, updateEmail, getEmails, sendMessages, getMessages,updateMessage } from "../../controllers/accounts/message.controller"
const router = Router()

const emailStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'email/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const messageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'message/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
const emailUpload = multer({ storage: emailStorage });
const messageUpload = multer({ storage: messageStorage });


router.get("/", (req, res) => {
  res.send("GET /messages")
})





router.post('/send-email', emailStorage.array('attachments'), sendEmail);
router.put('/update-email/:id', updateEmail);
router.get('/get-emails/:id', getEmails);
router.post('/send-messages', messageStorage.array('attachments'), sendMessages);
router.put('/update-message/:id', updateMessage);
router.get('/get-messages/:id', getMessages);





export default router