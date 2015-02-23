//run server before test

var superagent = require('superagent')
var expect = require('expect.js')

describe('express rest api server', function(){
  it('POST object test', function(done){
    superagent.post('http://localhost:3000/api/articles')
      .send({ 
        title: 'boom boom',
        text: 'go go go go',
        slug: 'book-slug',
        published: false
      })
      .end(function(e,res){
        console.log(e);
        expect(e).to.eql(null)
        done()
      })
    })  
})

