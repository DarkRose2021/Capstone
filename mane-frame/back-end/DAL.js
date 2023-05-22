const { mongoose, Schema } = require("mongoose");
var mongodb = require("mongodb");
var ObjectID = require('mongodb').ObjectID;
require("dotenv").config()

console.log(process.env.STATUS)