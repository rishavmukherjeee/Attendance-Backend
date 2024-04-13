import { Router } from "express"
import multer from "multer"
import { sendEmail } from "../../controllers/accounts/message.controller"
const router = Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'emails/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
const upload = multer({ storage: storage });

router.post('/send-email', upload.array('attachments'), sendEmail);

router.get("/", (req, res) => {
  res.send("GET /messages")
})



export default router