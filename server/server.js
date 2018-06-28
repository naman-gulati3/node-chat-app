const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
var publicpath = path.join(__dirname + '/../public');
console.log(publicpath);
var app = (express);
app.use(express.static(publicpath));
app.listen(3000,()=>{
console.log(`server is up on port ${port}`);
});