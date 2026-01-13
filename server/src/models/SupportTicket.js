import mongoose from 'mongoose';

const { Schema } = mongoose;

const TICKET_STATUS = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];

const supportTicketSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: TICKET_STATUS,
      default: 'OPEN',
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User', // admin handling the ticket
      default: null,
    },
  },
  { timestamps: true }
);

const SupportTicket = mongoose.model('SupportTicket', supportTicketSchema);

export default SupportTicket;
