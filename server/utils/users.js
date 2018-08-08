class users {
constructor(){
 
    this.users=[];
  
}
addUser(id,name,room){
var user = {id,name,room};
this.users.push(user);
return user;
}
removeuser(id){
    var user = this.users.filter((user)=>user.id===id)[0]
    if(user){
        this.users.filter((user)=>user.id!=id);

    }
    return user;
}
getuser(id){
var users = this.users.filter((user)=>user.id===id)[0]

}
getuserlist(room){
var users = this.users.filter((user)=>user.room===room);
var namesArray = users.map((user)=>user.name);
return namesArray;
}
}
module.exports = {users};