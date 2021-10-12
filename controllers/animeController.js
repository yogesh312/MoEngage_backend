const mongoose = require("mongoose");
//const user = require("../models/user");
const Anime = mongoose.model("Anime");
const User = mongoose.model("User");
const Rating = mongoose.model("Rating");
const bodyParser = require("body-parser")

var mongoosePaginate = require('mongoose-paginate');

exports.createAnime = async (req, res) => {
  const { title,description, genre, seasons, episodes} = req.body;
  const userId = req.payload.id;
  const user = await User.findById(userId)
  if(user.role=="admin"){
    const animeExist = await Anime.findOne({ title });
    if (animeExist) throw "anime with that name already exists!";
    const anime = new Anime({
      title, 
      description,
      genre,
      seasons,
      episodes
    });
    await anime.save();
    res.json({message: "anime created!",
    });
  } else{
      res.json("admin role required")
  }
  
};

exports.getAllAnime = async (req, res) => {
    try{
        const anime = await Anime.find({}).populate("rating");
        res.json(anime);
    } catch(err){
        console.log(err)
    }
    
};



exports.getAnime = async (req, res) => {
    const name = req.params.name;
    let anime = await Anime.find({title:name});
    res.json(anime);
    
};


exports.deleteAnime = async (req, res) => {
    const name = req.params.name;
    const id = req.payload.id;
    const user = await User.findById(id);
    if(user.role=="admin"){
    await Anime.deleteOne({title:name});
    res.json(`id ${id} anime has been deleted`);}
};



exports.updateAnime = async (req, res) => {
    try{
        const name = req.params.name;
        const userId = req.payload.id;
        const user = await User.findById(userId)
        if(user.id=="admin"){
            const updated= await Anime.updateOne({title:name},{new: true})
            res.json({ message: updated });
        }else{
            res.json("only admin can update")
        }
    
        
    } catch(err){
        console.log(err)
    }
    
};
//-----------------------------------------------------------------------
exports.getByFilter = async (req, res) => {
    let title= req.query.title
    let genre = req.query.genre
    if(title){
        let animeByTitle= await Anime.find({title: title})
        res.json({animeByTitle});
    } else if(genre){
        let animeByGenre= await Anime.find({genre: genre})
        res.json(animeByGenre);
    }
} 
//---------------------------------------------------------------------------


exports.addRating= async(req,res)=>{
    try{
        const animeId=req.params.id;
        const userId=req.payload.id;
        const {comment,rate}=req.body;
        const rating  = new Rating({
            userId,
            animeId, 
            comment,
            rate
        });
        await rating.save();
        let anime = await Anime.findByIdAndUpdate(animeId,{$push:{rating:rating._id}},{new:true});
        res.json(anime)
    }catch(err){
        console.log(err)}
};





exports.deleteRating = async(req,res)=>{
    const rateId=req.params.id;
    const userId=req.payload.id;
    
    const user = await User.findById(userId)
    const rate = await Rating.findById(rateId)
    if(user.role=="admin"){
        await Rating.findByIdAndDelete(rateId);
        res.json(`id ${id} rating has been deleted`);
    }
    res.json(rate)
}
