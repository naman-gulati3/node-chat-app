const expect = require('expect');
const{isrealstring} = require('./validation');
describe('isrealstring',()=>{
it('should reject non string values',()=>{
var res = isrealstring(98);
expect(res).toBe(false);
});
it('should reject strings with spaces only',()=>{
var res=isrealstring('      ');
expect(res).toBe(false);
});
it('should allow string with non space character',()=>{
    var res=isrealstring('      text  ');
    expect(res).toBe(true);
});
});