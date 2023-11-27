module.exports = {
//     isAlpha:
    
//     // function isLetter(str) {
//     //   str.forEach()
//     //     return str.match(/^[a-z][a-z\s]*$/);
//     // }
    
//     function lettersAndSpaceCheck(name)
// {
//   console.log(name);
//    var regEx = new RegExp('/^[a-z][a-z\s]*$/');
//    if(name.match(regEx))
//      {
//       return true;
//      }
//    else
//      {
//      return false;
//      }
// } 

//     ,

    checkInput: function check(id){
      // console.log(this.isAlpha(document.getElementById(id).value));
      // console.log(document.getElementById(id).value);
      
        if(document.getElementById(id).value === "" /*|| !this.isAlpha(document.getElementById(id).value) */ ){
          document.getElementById(id).style.border = "4px solid red";
          return false;
        }
        else{
          document.getElementById(id).style.border = "1px solid black";
          return true;
        }
      },


  reset: function resetInput(id) {
    document.getElementById(id).value="";
  },

  unique: function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}