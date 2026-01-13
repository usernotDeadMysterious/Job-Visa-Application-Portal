import mongoose from 'mongoose';

const { Schema } = mongoose;

const supportMessageSchema = new Schema(
  {
    ticketId: {
      type: Schema.Types.ObjectId,
      ref: 'SupportTicket',
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SupportMessage = mongoose.model('SupportMessage', supportMessageSchema);

export default SupportMessage;
