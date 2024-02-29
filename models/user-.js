import { Schema, model, models } from 'mongoose';
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
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
  },
  role: {
    type: String,
    required: false,
    default:'user'
  },

		role : {
		type : String,
		required : true,
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
    temporary : String,
	date : {
		type : Date,
		default : Date.now
	}
}
,
    {
  timestamps: true });




  UserSchema.pre('save', function(next) {




//temporarytoken = jwt.sign({ id: user._id }, 'shhhhh', { expiresIn: '24h' }); 
//user.temporary = temporarytoken ;


//console.log(" its is here =>",user);

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {

  console.log("The salt is", salt);
      if (err) return next(err);
      bcrypt.hash(user.password, salt, null, function(err, hash) {

  console.log("The hash is", hash);
          if (err) return next(err);
          user.password = hash;
          next();
      });

  return next();
  });


});


UserSchema.methods.comparePassword = function(candidatePassword, callback) {
//console.log(" its is here =>",user);
bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
  if (err) { return callback(err); }

  callback(null, isMatch);
});
};


const User = models.User || model("User", UserSchema);

export default User;