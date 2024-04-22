module.exports.bookIdString = (length) => {
    const characters =
      "0123456789";
  
    let result = "";
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random(0,10)));
    }
  
    return "book" + result;
};