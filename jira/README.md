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