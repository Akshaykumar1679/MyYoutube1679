const { Schema, model } = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const VideoSchema= new Schema({
 videoFile : {
    type: String,
    required: true,
  },
 thumbnail:{
  type: String,
    required: true,
 },
 owner:{
  type:Schema.Types.ObjectId,
  ref:"USER"
 },
 title:{
  type: String,
    required: true,
 },
 description:{
  type: String,
    required: true,
 },
 duration:{
  type: Number,
  
 },
 views:{
  type: Number,
  default:0
  
 },
 isPublished:{
  type:Boolean,
  default:true
 }

 

  
},{timestamps:true});

VideoSchema.plugin(aggregatePaginate)

const VideoModel = model("VIDEO", VideoSchema);

module.exports = VideoModel;