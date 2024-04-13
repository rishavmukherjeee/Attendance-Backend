import { Router } from "express"
import multer from "multer"
import { sendEmail, updateEmail, getEmails, sendMessages, getMessages,updateMessage } from "../../controllers/accounts/message.controller"
const router = Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
const upload = multer({ storage: storage });



router.get("/", (req, res) => {
  res.send("GET /messages")
})





router.post('/send-email', upload.array('attachments'), sendEmail);
router.patch('/update-email/:id', updateEmail);
router.get('/get-emails/:id', getEmails);
router.post('/send-messages', upload.array('attachments'), sendMessages);
router.patch('/update-message/:id', updateMessage);
router.get('/get-messages/:id', getMessages);





export default router