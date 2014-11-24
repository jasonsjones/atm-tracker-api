/* jshint expr: true */

var dm = require('../util/datamanager');
var should = require('should');
var fs = require('fs');

var data, json;
var outputFile = './app/data/specOutput.json';
before(function () {
    data = dm.getDataFromFile('./app/data/data.json');
    json = JSON.parse(data);
    console.log('BEFORE: json data read and parsed');
});

after(function () {
    dm.removeFile(outputFile);
    console.log('AFTER: test file removed');
});

describe('The datamanager module', function () {

    describe('read functionality', function () {

        it('should read in a file', function () {
            data.should.be.ok;
        });

        it('and the contents of the file should be an array with length 3',
            function () {
                json.should.be.an.Array;
                json.should.have.length(3);
        });

        it('the first element of array should have a cashAmount property',
            function () {
                json[0].should.have.property('cashAmount');
        });

        it('and a serviceFee property', function () {
            json[0].should.have.property('serviceFee');
        });
    });

    describe('write functionality', function () {

        it('should write to a file', function (done) {
            var testObj = {
                "msg": "this is to test the write functionality"
            };
            dm.writeDataToFile(outputFile, testObj);
            fs.exists(outputFile, function (exists) {
                exists.should.be.ok;
                done();
            });
        });

        it('and read the file it just wrote', function () {
            var contents = dm.getDataFromFile(outputFile);
            var outputJSON = JSON.parse(contents);

            contents.should.be.ok;
            outputJSON.should.have.property('msg');
        });
    });
});