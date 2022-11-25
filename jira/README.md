decodeURIComponent('')
decodeURIComponent将转义的再赚回来

encodeURIComponent转义一部分
decodeURI转义整个

Object.assign({},obj1,obj2)
会把后面的参数对象的属性都复制到第一个对象的属性上（，只复制自身的可枚举的属性）
1、Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象，继承属性和不可枚举属性是不能拷贝的。

2、针对深拷贝，需要使用其他办法，因为 Object.assign()拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。

3、目标对象自身也会改变

4、异常会打断后续拷贝任务

env文件放上线之后的地址
env.development的文件放开发地址
npm start后webpack读的是env.development文件
npm run build读的是env文件

yarn add qs是解析参数的

hook只能再hook中运行或者再函数组件中运行
debounce函数防抖
js 大多的时候只能再runtime的时候发现错误，弱类型
强类型再编译的时候就会报错

unknown不能赋值给任何变量，也不能从上面读取任何方法
# 泛型
ts时鸭子类型：面向接口编程而不是面向对象编程，test是不是某类型，只要符合某个类型的接口的声明的变量，那么就可以


```ts

联合类型
let my: string | number
let you: string | number

类型别名type
type we = string | number
则可以写成
let my: we
let you:we

interface Person{
  name:string
}
type Person1  = {
  name:string
}
类型别名和interface在很多情况下可以互换
interface和type的区别
1. 在此种情况下无法互换，interface无法替代type
let my: string | number
let you: string | number
ts的typeof是在写的时候（静态的时候）执行的，js的typeof是在runtime的时候执行的
TS的Utility Types的用法  ：用泛型给他传入一个其他类型，然后untility type对这个类型进行某种操作
type Person = {
  name: string 
  age:number
}
partial的英语是部分的
const xiaoming:Partial<Person>={name:'xiaoming '}//此变量只用部分Person接口的变量
此时不传年龄也不会报错


Omit是删除的意思，此时xiaohua的类型就是删除第二个参数的类型
const xiaohua: Omit<Person, 'name'>此时就必须赋值一个有age的变量
const xiaohua:Omit<Person,'name'|'age'>指的就是年龄和姓名都被删掉了
type Partial<T> = {
  [P in keyof T]?: T[P];
  
  keyof的作用是把类型对象的key值全部取出来，然后把它们联合在一起成为一个联合类型，例如 "name"|'age'
};
const xiaoming:Partial<Person>={name:'xiaoming '}
  keyof的作用是把类型对象的key值全部取出来，然后把它们联合在一起成为一个联合类型，例如 "name"|'age'
type PersonKeys=keyof Person
type PersonOnlyName=Pick<Person,'name'> Pick是用在在某个类型对象，选中name剩下不要
type Age=Exclued<PersonKeys,'name'>过滤掉name//Exclued操作的是联合类型，Omit操作的是键值对
 Omit<T,K extends keyof any>=Pick<T,Exclude<keyof T,K>>


```
#  antd
Emotion 是css in js中最受欢迎的库，用js的方式x写css
css in js不是指具体的库，而是一种组织css代码方式，代表库有emotion,styled-component
## 传统css的缺陷
1. 缺乏模块化组织，传统的css和js都没有模块化的概念，后来js有了commonjs和ES 
2. 传统css只有一个全局作用域一个csss可以匹配全局任意元素，随着项目增长会变得难以维护，css in js可以通过生成独特的选择符来实现作用域的效果
3. 隐式依赖，难以追踪 css in js简单易于追踪
4. 没有变量css in js可以设置变量
5. 传统html 和css耦合度高，当一个修改的时候另外一个也要修改，css in js是HTML和CSS结合在一起易于修改



# rem 是相对于根元素的font-size
    em是相对于父元素的font-size
    浏览器默认的font-size是16px
     16*62.5%=10ox
     1rem=10px
#  viewport height===vh 
    1vh等于百分之一的视口
    100vh等于整个视口 

    import styled from '@emotion/styled'和另外一个emotion/react还是什么的一起下载然后引入才能用

# grid 和flex的各自应用场景
1. 首先分辨场景是一维布局还是二维
一维布局 flex，在X轴或者是Y轴内容（也不一定，因为flex也可以多行布局align-contens）
二维布局用 grid x,y轴都有内容

2. 是从内容出发还是从布局出发
从内容出发（flex）：首先由一组内容（数量不固定），希望他们均匀的分布在容器中，由内容大小决定自己的空间
从布局出发(grid)：（数量一般较为固定）先规划网格，再把元素往里面填充








![Alt text](https://pic1.zhimg.com/v2-14dcc2c0b314b13f9540c90816a9fcdc_r.jpg)

当我们调用 identity<Number>(1) ，Number 类型就像参数 1 一样，它将在出现 T 的任何位置填充该类型。图中 <T> 内部的 T 被称为类型变量，它是我们希望传递给 identity 函数的类型占位符，同时它被分配给 value 参数用来代替它的类型：此时 T 充当的是类型
其中 T 代表 「Type」，在定义泛型时通常用作第一个类型变量名称。但实际上 T 可以用任何有效名称代替。除了 T 之外，以下是常见泛型变量代表的意思：

K（Key）：表示对象中的键类型；
V（Value）：表示对象中的值类型；
E（Element）：表示元素类型。
其实并不是只能定义一个类型变量，我们可以引入希望定义的任何数量的类型变量。比如我们引入一个新的类型变量 U，用于扩展我们定义的 identity 函数：
```js
function identity <T, U>(value: T, message: U) : T {
  console.log(message);
  return value;
}

console.log(identity<Number, string>(68, "Semlinker"));

除了为类型变量显式设定值之外，一种更常见的做法是使编译器自动选择这些类型，从而使代码更简洁。我们可以完全省略尖括号，比如：

function identity <T, U>(value: T, message: U) : T {
  console.log(message);
  return value;
}

console.log(identity(68, "Semlinker"));
```

# 基本类型可以放在依赖里，；组件状态state可以放在依赖里，非组件的对象绝对不可放在依赖里，因为会引起刷新无限循环


 # useState中传函数惰性(懒)初始化,如果想用useState保存函数的话,必须要写成useState(()=>()=>{xxxx})来初始化函数
 setState(()=>()=>)也是
 也可以用useRef来保存函数,useRef中的值发生变化的时候并不会重新渲染界面,所以想拿到最新的值还是从xxxRef.current中拿到


#  项目难点1
![Alt text](../../../../../c:/Users/xwq1981346179/Desktop/Snipaste_2022-11-22_22-16-02.png)
项目难点就是:在组件发送请求还未返回时,卸载组件,此时就会报错,那么就需要在UseEffect的return中做清楚操作,就是用useRef设置一个变量,在组件未卸载时是true,执行更新状态的时候判断一下这个状态是否true,如果为真就执行状态更新setState的操作,如果为假就不执行setState的操作
# 项目难点2
  如果时一个普通函数被放在useEffect依赖里,那么每次更新的时候都会重新创建该函数,那么就会导致重新渲染,此时就可以用useCallback把这个函数包起来,并在Usecallback的第二个参数里设置依赖,只有依赖重新变化的时候该函数才会重新创建

  #  let const 也有暂时性死区
  在声明之前对该变量的访问是不被允许的,因为该变量放在暂时性死区里,如果访问该变量,就会报错

  # useState和useReducer可以换
  useState适合定义单个的状态,useReducer适合定义许多状态

  # reducer
  要保持纯洁性,不可以再纯函数里写异步操作
  只要返回Promise就是异步函数
  

#   // 返回tuple的好处,一个好处就是在使用的时候，就可以直接重新命名，类似于useState
组件间解耦