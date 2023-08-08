const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const validator =require('validator')

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type:String,
        required:true
    }
})

//static signuo methof
userSchema.statics.signup = async function(email,password) {

    //validation
    if(!email || !password){
        throw Error('All field must be filled')
        
    }
    if(!validator.isEmail(email)){
        throw Error('email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('password not strong')
    }
const exists= await this.findOne({email})
if(exists){
    throw Error('email already in use')
}
//encrypt
const salt = await bcrypt.genSalt(10)
const hash = await bcrypt.hash(password, salt)
const user = await this.create({email,password:hash})
return user
}
//static login method
userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error('all field required')
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error('incorrect email')
    }
    const match = await bcrypt.compare(password , user.password)
    if(!match){
        throw Error('incorrect password')
    }
    return user
}


module.exports = mongoose.model('User', userSchema)