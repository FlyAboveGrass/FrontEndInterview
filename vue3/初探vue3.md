Vue3的优势
	1. diff算法优化

		* Vue2 中对于虚拟DOM会进行全量的对比。
		* Vue3 对于不同的元素，会添加不同的静态标记。对于静态的不会变化的元素不添加标记。在发生更新的时候会只更新有静态标记的节点，并且通过标记得知节点需要对比的具体内容。
	2. 静态提升

		* Vue2中无论元素是否参加更新，每次都会重新创建，然后再渲染。
		* Vue3 中对于不参与更新的元素会做静态提升，以全局变量的形式只创建一次，再渲染的时候可以直接复用。（空间换时间）
	3. 事件侦听器缓存

		* 方法被存入 cache。在使用的时候，如果能在缓存中找到这个方法，那么它将直接被使用。如果找不到，那么将这个方法注入缓存。
	4. ssr渲染


组合API
	1. setup

		* Composition API（组合API）。
		* setup是一个接受props和context的函数。从setup中返回的所有内容都将暴露给组件的其他部分（数据，计算属性，方法，生命周期钩子等）以及组件的模板，都允许响应式的使用
		* setup的作用在于将功能分割成一块一块的暴露出来使用，同一功能的内容可以聚集在一起。Vue2中新增逻辑则是通过在所有的地方都要添加功能（data， methods， computed等），维护的时候同一功能的实现很分散。
		* setup中不存在this（this的值为undefind）。setup是在解析其他组件选项的之前被调用的，执行的时候尚未创建组件实例，所以我们在这时候不能访问到组件中的任何属性（本地状态，计算属性和方法等）。
		* setup不允许存在异步。因为setup的内容会立即执行，并且return给组件使用。
	2. ref

		* 它有个key为symbol的属性做类型标识，有个属性value用来存储数据。这个数据可以是任意的类型，唯独不能是被嵌套了Ref类型的类型
		* Ref的类型是响应式的类型，但是只能监听简单数据类型。
		* 也可以用Ref来封装对象，只不过在访问上多一层  .value，写法麻烦一点。
		* 修改ref定义的数据时，实际上要操作ref数据的 value属性。但是在页面里面则不需要用 .value属性读取，Vue3会自动给我们添加.value 。
		* ref 的本质： ref（val） => reactive（{ value ： val }）
	3. reactive

		* reactive是Vue3 中提供的实现响应式数据的方法。与Vue2中使用object.definedProperty不同，Vue3中采用Proxy实现的。
		* reacitive可以用来监听对象或者数组等复杂类型的。
		* 可以用reactive去封装简单数据类型，但是要把参数从基本类型转换成对象。
		* reactive包装对象的源数据obj 改变时，会改变包装对象里面的值，因为包装对象里的值实际上是对obj的引用。但是改变元对象不可以触发视图的更新，因此当我们想要改变包装对象但是又不想触发更新的时候可以改变源对象的值。
		* 如果给reactive传递了其他对象（如 reactive（{ date： new Date（） }））

			* 默认情况下，修改对象无法实现数据绑定更新
			* 如果需要更新，需要重新赋值。（即不能直接操作数据，要重新提供一个新数据去替代原数据，这样才可以更改掉存储数据的引用）。（如 xx.date = new Date() , 而不是 xx.date.SetDate() ）
	4. shallow（浅） ——  Vue提供的一种非递归监听的方案

		* 递归监听： 对于ref 和 reactive 包装的对象，都是改变一层的属性就会递归的检查每一层的所有属性进行更新检查的。这样虽然保证了每一层的值的改变都可以监听到，但是也带来了性能的消耗。
		* shallowRef

			* ref在对对象转换reactive化的过程中，会判断是否是shallow 的，如果是，那么只会对最外层的数据执行数据监听；如果不是，那么会对整个数据都进行监听。
		* triggerRef

			* 对于shallow过的ref对象，我们修改了内层的数据是不会更新视图的，如果想进行更新的话可以使用reiggerRef 手动触发视图的更新。
		* shallowReactive

			* 类似于shallowRef, 改变对象的值的时候直接给属性赋值。
		* 
注意：

			* Vue没有给reactive提供手动触发视图更新的方法，没有triggerReactive。
			* shallowRef是特殊的shallowReactive， 就像ref是特殊的reactive一样
	5. Raw

		* 当我们想改变数据但是不影响视图的时候，可以通过修改源数据的方式来进行。如果源数据的引用没有保存或者没有暴露出来无法获取到的情况下，可以用toRaw来获得源数据的引用。
		* reactive的toRaw： 是一个用来优化资源加载的方案，可以重新获得源数据的引用。
		* ref 的 toRaw： 如果要获取ref的源数据，要明确的告诉toRaw要获取的是 .value 的值 toRaw（xx.value）。直接获取只会返回自身（ref 的本质是 reative（{ value ： obj}））。ref中的   .value 保存的才是当初传入的原始数据。
		* markRaw : 标识一个对象永远不被跟踪。再对它进行reactive的时候即使数据更新，也不会再更新视图了。




ref和reactive的区别
ref用于简单数据类型，ref实际上是把reactive多包了一层。
reactive用于对象，
组合API中还存在着对响应式数据的定制方法：

toRef和toRefs

生命周期的变化
	1. 首先是setup的组合API，这个也可以算是生命周期的一种，推荐用来代替原来的beforeCreate和created钩子。setup的执行在所有的生命周期之前。
	2. 所有的生命周期钩子，在vue2的基础上在钩子名的前面加上了一个on。
	3. beforeDestroy 和 destroyed 钩子改名。
	4. 新增了两个生命周期钩子： onRenderTracked 和 onRenderTriggered 这两个生命周期钩子，是Vue3 专门用来进行调试的生命周期钩子。