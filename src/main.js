// get HTML elements
const $body = document.getElementById('body')
const $title = document.getElementById('title')
const $footer = document.getElementById('footer')
const $landscape = document.getElementById('landscape')
const $redInput = document.getElementById('red') 
const $greenInput = document.getElementById('green') 
const $blueInput = document.getElementById('blue')
const $hexInput = document.getElementById('hex')
const $btnRgb = document.getElementById('btnRgb')
const $btnHex = document.getElementById('btnHex')
const $copyRgb = document.getElementById('copyRgb')
const $copyHex = document.getElementById('copyHex')
const $messageRgb = document.getElementById('messageRgb')
const $messageHex = document.getElementById('messageHex')
const $textarea = document.getElementById('rgbColorToCopy')
const $year = document.getElementById('year')
// add listeners
$btnRgb.addEventListener('click', convertHexToRgb)
$btnHex.addEventListener('click', convertRgbToHex)
copyRgb.addEventListener('click', copyRgbColor)
copyHex.addEventListener('click', copyHexColor)
// add the year
const date = new Date()
const year = date.getFullYear()
$year.innerHTML = year

//event handlers
function copyRgbColor() {
  const red = $redInput.value
  const green = $greenInput.value
  const blue = $blueInput.value
  $textarea.value = `rgb(${red}, ${green}, ${blue})`
  $textarea.focus()
  $textarea.select()
  document.execCommand('copy')
  showCopyMessage($textarea.value, $messageRgb)
}
function copyHexColor() {
  $hexInput.select()
  document.execCommand('copy')
  showCopyMessage($hexInput.value, $messageHex)
}
function convertRgbToHex() {
  let redHex = decimalToHex($redInput.value)
  let greenHex = decimalToHex($greenInput.value)
  let blueHex = decimalToHex($blueInput.value)
  let newHex = `#${redHex}${greenHex}${blueHex}`
  paintBody(newHex)
  paintText(colorComplement(newHex))
  $hexInput.value = newHex
  checkStatusBtnRgb()
  $copyHex.style.display = 'block'
  $copyRgb.style.display = 'none'
}
function convertHexToRgb() {
  let hex = $hexInput.value
  paintBody(hex)
  paintText(colorComplement(hex))
  $redInput.value = hexToDecimal(`${hex[1]}${hex[2]}`)
  $greenInput.value = hexToDecimal(`${hex[3]}${hex[4]}`)
  $blueInput.value = hexToDecimal(`${hex[5]}${hex[6]}`)
  checkStatusBtnHex()
  $copyRgb.style.display = 'block'
  $copyHex.style.display = 'none'
}
function validateNumbers(event) {
  let charCode = (event.which) ? event.which : event.keyCode
  let currentValue = event.target.value
  if ((charCode > 31 && charCode < 48) || charCode > 57)
    return false
  else if (currentValue.length > 3)
    return false
  return true
}
function validateHexa(event) {
  let charCode = (event.which) ? event.which : event.keyCode
  let currentValue = event.target.value
  if(currentValue.length == 0)
    event.target.value = `#${currentValue}`
  if ((charCode > 31 && charCode < 48) || (charCode > 57 && charCode < 97) || charCode > 102)
    return false
  else if (currentValue.length > 6)
    return false
  return true
}
// Utils
function showCopyMessage(text, container) {
  container.innerText = `${text} copied to clipboard`
  container.style.opacity = 1
  setTimeout(() => {container.style.opacity = 0}, 3500)
}
function checkStatusBtnHex() {
  let redValue = $redInput.value
  let greenValue = $greenInput.value
  let blueValue = $blueInput.value
  $btnHex.disabled = !(checkRGBValue(redValue) && checkRGBValue(greenValue) && checkRGBValue(blueValue))
}
function checkRGBValue(value) {
  return !(value == '' || (value < 0 || value > 255))
}
function checkStatusBtnRgb() {
  let hexValue = $hexInput.value
  $btnRgb.disabled = !(hexValue.length == 7)
}
function paintBody(color) {
  $body.style.backgroundColor = color
}
function paintText(color) {
  $title.style.color = color
  $footer.style.color = color
  $landscape.style.color = color
  $messageHex.style.color = color
  $messageRgb.style.color = color
}
function decimalToHex(decimal) {
  let hex = parseInt(decimal).toString(16).toUpperCase()
  if(hex.length == 1) hex = `0${hex}`
  return hex
}
function hexToDecimal(hex) {
  return parseInt(hex, 16)
}
function colorComplement(hex) {
  let r = hexToDecimal(`${hex[1]}${hex[2]}`)
  let g = hexToDecimal(`${hex[3]}${hex[4]}`)
  let b = hexToDecimal(`${hex[5]}${hex[6]}`)
  if (
    (r > 117 && r < 128) &&
    (g > 117 && g < 128) &&
    (b > 117 && b < 128) 
  ){
    return '#000000'
  } else if (
    (r > 127 && r < 139) &&
    (g > 127 && g < 139) &&
    (b > 127 && b < 139) 
  ){
    return '#FFFFFF'
  }
  let nr = decimalToHex(Math.abs(255 - r))
  let ng = decimalToHex(Math.abs(255 - g))
  let nb = decimalToHex(Math.abs(255 - b))
  return `#${nr}${ng}${nb}`
}
