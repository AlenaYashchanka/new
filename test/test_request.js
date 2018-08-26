var webdriverio = require('webdriverio');
var request = require ('request');
var rp = require('request-promise');
var expect = require('chai').expect;
//var should = require('chai').should();

const options = {
    uri: 'https://jsonplaceholder.typicode.com/users',
    headers: {
        contentType: {
            'Content-Type': 'application/json; charset=utf-8',
          }
    },
    json: true // Automatically parses the JSON string in the response
};

describe ('Http request', () => { 
    it('should have correct data', async done => {
        request('https://jsonplaceholder.typicode.com/users', (err, response, body) => {
            expect(response.statusCode).to.equal(200, 'Something wrong! Status code is not 200!'); 
            expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
            expect(JSON.parse(body)).to.be.an('array');
            expect(JSON.parse(body).length).to.equal(10, 'Total count of users is NOT 10'); 
        });
    });

    it('check users', async done => {
        rp(options)
        .then( users => {
            users.forEach( element => {
                expect(element).to.be.an('object');
                expect(element).to.have.property('email').that.to.match(/[A-Za-z0-9][A-Za-z0-9\.\-_]*[A-Za-z0-9]*@([A-Za-z0-9]+([A-Za-z0-9-]*[A-Za-z0-9]+)*\.)+[A-Za-z]/, 'Problems with email');
                expect(element).to.have.property('username').that.to.not.be.empty;
            })
        });
    });

    
});
