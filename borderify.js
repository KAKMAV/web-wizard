// document.body.style.border = "200px solid red";
// var colorPicker = new iro.ColorPicker("#picker", {
//   // Set the size of the color picker
//   width: 320,
//   // Set the initial color to pure red
//   color: "#f00"
// });

let colorInput = document.querySelector('#color');
let hexInput = document.querySelector('#hex');

colorInput.addEventListener('input', () => {
  let color = colorInput.value;
  hexInput.value = color;

  document.body.style.backgroundColor = color;

  // document.querySelector('h1').style.color = color;
});