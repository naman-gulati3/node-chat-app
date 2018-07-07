var expect = require('expect');
var generatemessage = require('./message');
describe('generatemessage',()=>{
it('should generate correct message object',()=>{
    var from='naman';
    var text='some text';
    var message = generatemessage(from,text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
});
});