var expect = require("chai").expect;
var mongoose = require('mongoose');
var jobModel = require('../models/Job');
var Promise = require("bluebird");


function resetJobs(){
    return new Promise( function(resolve, reject){
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
}

describe("get jobs", function(){
   it("should never be empty since jobs are seeded", function(done){
       mongoose.connect('mongodb://localhost/jobfinder', function(){
           resetJobs()
           .then(jobModel.seedJobs())
           .then(function(){
                    mongoose.model('Job').find({}).exec(function(error, jobsList){
                        done();
                    })
           });
       });
    });
});