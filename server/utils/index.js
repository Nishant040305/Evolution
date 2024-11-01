//generate 6digit OTP code
const generateOTP=()=> {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}
const UserNameParse = (email) => {
    if (typeof email !== 'string' || !email.includes('@')) {
      return email;
    }
    // Extract the username (everything before the '@' symbol)
    const username = email.split('@')[0];
    return username.charAt(0).toUpperCase() + username.slice(1);
  };
module.exports ={generateOTP,UserNameParse};