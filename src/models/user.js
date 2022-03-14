const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema= new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 25
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 25 
    },
    username:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        index: true,
        lowercase: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    hash_password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    contactNumber:{
        type: String,
    },
    profilePicture:{
        type: String
    }
}, {timestamps:true})
// password hashing 
userSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password,10)
})
userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password)
    }
}
// merging the firstname with lastname to make full name (logic )
userSchema.virtual('fullName')
.get(function(){
    return `${this.firstName} ${this.lastName}`
})
module.exports = mongoose.model('User',userSchema)