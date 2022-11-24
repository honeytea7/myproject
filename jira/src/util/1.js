// function CodingMan(val){
//   this.val = val;
//   this.queue = [];
//   this.sayHi = function(){
//     this.queue.push(()=>{
//       console.log(`Hi!this is ${this.val}`)
//       this.next();
//     })
//   }
//   this.eat = function(val){
//     this.queue.push(()=>{
//       console.log(`Eat ${val}~`);
//     })
//     return this;
//   }
//   this.sleep = function(num){
//     this.queue.push(()=>{
//       setTimeout(()=>{
//         console.log(`Wake up after ${num}`)
//         this.next();
//       },num*1000)
//     })
//     return this;
//   }
//   this.sleepFirst = function(num){
//     this.queue.unshift(()=>{
//       setTimeout(()=>{
//         console.log(`等待${num}秒`);
//         this.next();
//       },num*1000)
//     })
//     return this;
//   }
//   this.next = function(){
//     let fn = this.queue.shift();
//     fn && fn();
//     }
    
//   this.sayHi();
//   setTimeout(() => {
//     this.next();
//   });
//   return this;
// }

// CodingMan('Hank').sleep(2).sleepFirst(3).eat('supper')

// 题目描述：实现一个CodingMan，可以按照以下方式调用：
// CodingMan(‘Hank’)
// 输出：
// Hi！This is Hank!

// CodingMan(‘Hank’).sleep(10).eat(‘dinner’)
// 输出：
// Hi！This is Hank!
// //等待10秒
// Wake up after 10
// Eat dinner~

// CodingMan(‘Hank’).eat(‘dinner’).eat(‘supper’)
// 输出：
// Hi！This is Hank!
// Eat dinner~
// Eat supper~

// CodingMan(‘Hank’).sleepFirst(5).eat(‘supper’)
// 输出：
// //等待5秒
// Wake up after 5
// Hi！This is Hank!
// Eat supper~
// ———————

function CodingMan(value) {

    this.value = value
    this.queue=[]
    this.sayHi = function () {
        this.queue.push(() => setTimeout(() => {
            console.log(` Hi This is ${value}!`);
            this.next()
        }, 0))


        
       
    }
    this.eat = function (value) {

      this.queue.push(
          () => {
              console.log(` eat ${value}!`)
               this.next()
           }
     
        )


       
        return this
    }



      this.sleep = function (value) {
           this.queue.push(() => setTimeout(() => {
            console.log(` sleep ${value}!`);
            this.next()
        }, value*1000))
        return this
    }


    this.Firstsleep = function (value) {
        this.queue.unshift(() => {
             setTimeout(() => {
               console.log(`等待 ${value}秒`);
            
          this.next()
          }, value * 1000)
         })
        return this
        
    }
    this.next = function () {
        let fn = this.queue.shift();
        if(fn) fn()
    }
    this.sayHi()
    setTimeout(() => {
        this.next()
    }, 0)
    console.log('---this',this);
     return this
}
console.log('136',this);

CodingMan('Hank')
// CodingMan('Hank').sleep(2).eat('dinner').Firstsleep(5)
// CodingMan('Hank').eat('dinner').eat('supper')eat('aa')
//  
