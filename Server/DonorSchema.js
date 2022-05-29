const mongoose=require("mongoose")
const bcrypt=require('bcryptJs')
const jwt=require('jsonwebtoken')

const donorSchema=new mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
    gender:{type:String,required:true},
    age:{type:Number,required:true},
    email_id:{type:String,required:true},
    mob_no:{type:String,required:true},
    tokens:[
        {   
            token:{
                type:String,required:true
            }
        }
    ]
})

donorSchema.pre('save',async function(next){
    if(this.isModified('password'))
    {
        this.password= await bcrypt.hash(this.password,12);
    }
    next();
});

donorSchema.methods.generateToken=async function(){
    try {
        let Key="Mynameiskushayandiamgoingtousethisasakey"
        let temptoken=jwt.sign({_id:this._id},Key)
        this.tokens=this.tokens.concat({token:temptoken})
        await this.save()
        return temptoken;

    } catch (error) {
        console.log(error);
    }
}

const Donor=mongoose.model('Donors',donorSchema)
module.exports=Donor