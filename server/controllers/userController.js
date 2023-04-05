const userModel =require("../models/userModel")
const jwt = require ('jsonwebtoken');
// const {jwtSecret} = require ('../config/keys');
const passwordHash = require ('password-hash');


exports.signup = (req, res) => {
    userModel.findOne ({email: req.body.email}).exec ((error, user) => {
      if (error) return res.json (error);
      if (user) {
        return res.status(400).json ({status:true, message: 'User already exist'});
      }
  
      if (!user) {
        const {name, email, password, phone, role} = req.body;
        const hashedPassword = passwordHash.generate (password);
        const jwtSecret=process.env.JWTSecret
        const _user = new userModel ({
          name,
          email,
          isLogedin: true,
          password: hashedPassword,
          phone,
          role,
        });
  
        _user.save ((error, user) => {
          if (error)
            return res.status(500).json ({
                status:false,
              message: 'Something went wrong',
            });
          if (user) {
            const token = jwt.sign (
              {
                data: user._id,
              },
              jwtSecret,
              {expiresIn: '1d'}
            );
            return res.status(201).json ({
              user,
              token,
              msg: 'Registration complete successfully!',
            });
          }
        });
      }
    });
  };

  exports.signin = (req, res) => {
    userModel.findOne ({email: req.body.email}).exec ((error, user) => {
      if (error) return res.json ({message: error.message});
      if (!user)
        return res.status(400).json ({
          message: 'invalid Email',
        });
      if (user) {
        let isMatch = passwordHash.verify (req.body.password, user.password); // true
        const jwtSecret=process.env.JWTSecret
        if (isMatch) {
          let token = jwt.sign (
            {
              data: user._id,
            },
            jwtSecret,
            {expiresIn: '1d'}
          );
          return res.status(200).json ({
            token,
            user,
            msg: 'Successfully login!',
          });
        }
        if (!isMatch) {
          return res.status(400).json ({
            message: 'Invalid Password',
          });
        }
      }
    });
  };


exports.authUser = (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.json ({msg: 'You Need To Login'});
  }
  // verify token
  if (token) {
    const decode = jwt.verify (token, process.env.JWTSecret);
    req.user = decode.data;
    userModel.findById ({_id: req.user}).exec ((error, user) => {
      if (error) return res.json (error.message.TokenExpiredError);
      if (user) return res.json ({user});
    });
  }
};