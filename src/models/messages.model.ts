import { Schema,model } from "mongoose";

export interface IMessage extends Document {
    sender: Schema.Types.ObjectId;
    receiver: Schema.Types.ObjectId;
    message: Schema.Types.ObjectId;
    attachments: Schema.Types.ObjectId;
    isDelivered: boolean;
    isRead: boolean;
    isSent: boolean;
}
export interface IEmail extends Document {
    sender: Schema.Types.ObjectId;
    receiver: Schema.Types.ObjectId;
    message: string;
    isDelivered: boolean;
    isRead: boolean;
    isSent: boolean;
    cc: Schema.Types.ObjectId;
    bcc: Schema.Types.ObjectId;
    attachments: Schema.Types.ObjectId;
}

export interface IAttachment extends Document {
    filename: string;
    path: string;
    size: number;
    uploadDate: Date;
}
const messageSchema = new Schema<IMessage>(
    {
        sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
        message: { type: Schema.Types.ObjectId },
        attachments: { type: Schema.Types.ObjectId, ref: 'Attachment' },
        isDelivered: { type: Boolean, default: false },
        isRead: { type: Boolean, default: false },
        isSent: { type: Boolean, default: true },
    },
    {
        timestamps: true
    }
);

const emailSchema = new Schema<IEmail>(
    {
        sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        message: { type: String, required: true },
        isDelivered: { type: Boolean, default: false },
        isRead: { type: Boolean, default: false },
        isSent: { type: Boolean, default: true },
        cc: { type: Schema.Types.ObjectId, ref: 'User' },
        bcc: { type: Schema.Types.ObjectId, ref: 'User' },
        attachments: { type: Schema.Types.ObjectId, ref: 'Attachment' },
    },
    {
        timestamps: true
    }
);

const attachment = new Schema<IAttachment>({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    uploadDate: { type: Date, default: Date.now }
});

const Message = model("Message", messageSchema);
const Email = model("Email", emailSchema);
const Attachment = model("Attachment", attachment);

export {
    Message,
    Email,
    Attachment
}