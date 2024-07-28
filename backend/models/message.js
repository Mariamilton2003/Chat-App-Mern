import mongoose from "mongoose";
// user Schema
const messageSchema = mongoose.Schema(
  {
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    revicerId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    data:{
        type:String,
        require:true
    }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
