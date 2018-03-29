// var person = {
//   firstname  : "Dai",
//   lastname   : "Binh",
//   showinfo  : function() {
//     console.log("Hello " + this.firstname + " " + this.lastname);
//   }
// }
//
// person.showinfo();
/* ClassName.prototype.methodName = function () {};*/

function KhoaHoc(ten, hocPhi) {
  this.Ten = ten;
  this.HocPhi = hocPhi;
}

KhoaHoc.prototype.description = function () {
  console.log("Hello " + this.Ten + " " + this.HocPhi);
};

var student = new KhoaHoc("Lap Trinh Node JS", 12000000);
student.description();
