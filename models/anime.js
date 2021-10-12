const mongoose = require("mongoose");

//var mongoosePaginate = require('mongoose-paginate');

const animeSchema = new mongoose.Schema(
  {
    
    title: {
      type: String,
      required: [true, "title? keep it new"],
      trim:true,
      unique: true,
      maxlength: 15,
      
    },
    description: {
      type: String,
      required: [true, "description is required!!!"],
      trim: true,
      maxlength:100
    },
    genre: {
        type: String,   // not taking it as enum because there can be so many genre
        default: false,
    }, 
    
    rating:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Rating"
    }],
    seasons:{
      type: String,
      required:true,

    },
    episodes:{
      type:String,
      required:true
    }
  },
  {
    timestamps: true,
  }

);
//listSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Anime", animeSchema);
