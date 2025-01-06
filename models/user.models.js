const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');
const dotenv=require('dotenv')
dotenv.config();

const UserSchema = new Schema({
 userName: {
    type: String,
    required: true,
    trim:true,
    unique:true,
    lowercase:true,
    index:true
  },
 email: {
    type: String,
    required: true,
    unique:true,
    trim:true,
  },
 fullName: {
    type: String,
    required: true,
    trim:true
    
  },
 avtar: {
    type: String,
    required: true,
  },
 coverImage :{
    type: String,

  },
 password: {
    type: String,
    required:true,
  },
  refreshToken:{
    type:String,
  },
  watchHistory:{
    type:Schema.Types.ObjectId,
    ref:"VIDEO"
  }

 
  
},{timestamps:true});

UserSchema.methods.pre("save",async function (next) {
    if (this.isModified("password")) {
        this.password=  bcrypt.hash(this.password ,10)
        next()
    }
})

UserSchema.methods.isPasswordCorrect= async function (password) {
    return await bcrypt.compare(password,this.password)
}
UserSchema.methods.generateAccessToken=function(){
    jwt.sign({
        _id:this._id,
        email:this.email,
        userName:this.userName,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expireIn:process.env.ACCESS_TOKEN_EXPIRE
    }
)
}
UserSchema.methods.generateRefreshToken=function(){
    jwt.sign({
        _id:this._id,
        
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expireIn:process.env.ACCESS_TOKEN_EXPIRE
    }
)
}


const UserModel = model("USER", UserSchema);

module.exports = UserModel;

