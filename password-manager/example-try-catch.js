function doWork(){
  throw new Error('some error');
}

try{
  doWork();
}catch(ex){
    console.log(ex.message);
}finally{
    console.log('try catch finally block');
}

console.log('try catch ended');
