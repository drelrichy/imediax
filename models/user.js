import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    default:'fname',
  }, 
  name: {
    type: String,
    default:'fname',
  }, 
  lastname: {
    default:'lname',
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
   password: {
    type: String,
    required: [true, 'Password is required!'],
  },
  username: {
    type: String,
    required: [false, 'Username is not required!'],
    default:'noname',
    match: [/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 4-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
    default:'"/assets/images/profiles.png',
  },
  role: {
    type: String,
    required: false,
    default:'user'
  },
	hostname : [{
		type : [String],
		required : true,
	}],
	adminchannel : {
		type : [Object]
	}
	,
	adminindex: {
		type : String
	
	},
	file : {
		type : String,
		required : false,
		max : 500,
		min : 6
	},
	password2 : {
		type : String,
		required : false,
		max : 200,
		min : 6
	},
resetPasswordToken: String,
resetPasswordExpires: Date,
    active : { type : Boolean,required:true , default:false},
    Subscribed : { type : Boolean,required:true , default:false},
    blocked: { type : Boolean,required:true , default:false},
    temporary : {type: String},
	date : {
		type : Date,
		default : Date.now,
	}
,

});


const User = models.User || model("User", UserSchema);

export default User;