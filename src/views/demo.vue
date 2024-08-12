<!--
 * @Author: liubo lb@hzguode.com
 * @Date: 2024-02-20 13:48:58
 * @LastEditors: liubo lb@hzguode.com
 * @LastEditTime: 2024-05-27 10:40:58
 * @FilePath: /threeJs/src/views/demo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div id="container">
		<!-- <button @click="moveCamera">移动相机</button>
		<button @click="moveCube">移动物体</button> -->
	</div>
</template>

<script setup>
import * as THREE from 'three';
import { onMounted } from 'vue'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js"
// 创建场景
const scene = new THREE.Scene()
// 场景添加背景颜色
// scene.background = new THREE.Color(0x666666)
// 场景添加背景图片（图片必须是宽高相等的）
// scene.background = new THREE.CubeTextureLoader().setPath('/').load(['aaa1.png', 'aaa1.png', 'aaa1.png', 'aaa1.png', 'aaa1.png', 'aaa1.png'])

console.log('=========>scene.background', scene.background);

// 添加雾
// scene.fog = new THREE.Fog(0xcccccc, 10, 15)

// 创建相机
const camera = new THREE.PerspectiveCamera() // 透视相机
camera.position.set(0, 0, 10) 

// 创建纹理
// const texture = new THREE.TextureLoader().load('aaa.png')

// 创建立方体
const geometry = new THREE.BoxGeometry()
// 材质
const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
// const material = new THREE.MeshBasicMaterial({map: texture})

// 网格
const cube = new THREE.Mesh(geometry, material)
cube.position.set(0, 3, 0)
scene.add(cube)



onMounted(() => {
	// 创建渲染器
	const renderer = new THREE.WebGLRenderer()
	document.getElementById('container').appendChild(renderer.domElement)
	// 调整窗口大小
	renderer.setSize(window.innerWidth, window.innerHeight)


	// const labelRenderer = new CSS2DRenderer()
	// labelRenderer.setSize(window.innerWidth, window.innerHeight);
	// labelRenderer.domElement.style="pointer-events: auto;position: absolute;top: 0px;"  // 处理新的渲染器
	// document.getElementById("container").appendChild(labelRenderer.domElement);

	// 添加轨道控制器
	// const controls = new OrbitControls(camera, renderer.domElement)
	// // 绑定change时间
	// controls.addEventListener('change', () => {
	// })
	// // 开启阻尼
	// controls.enableDamping = true
	// controls.dampingFactor = 0.02

	// // 自动旋转镜头效果
	// controls.autoRotate = true
	// controls.autoRotateSpeed = 1 // 旋转速率


	// 添加坐标轴
	// const axesHelper = new THREE.AxesHelper( 5 )
	// axesHelper.position.y = 3
	// scene.add(axesHelper)

	// 添加网格
	// const gridHelper = new THREE.GridHelper(10, 10)
	// scene.add(gridHelper)

	// 添加文字
	// let labelDiv = document.createElement( 'div' );
  // labelDiv.className = 'label';
  // labelDiv.style.color = '#fff';
  // labelDiv.textContent = '3333';
  // let earthLabel = new CSS2DObject( labelDiv );
  // earthLabel.position.set( 0,0, 0.2 );
  // scene.add( earthLabel )


	// const geometry = new THREE.BufferGeometry();
	// // 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
	// // 因为在两个三角面片里，这两个顶点都需要被用到。
	// const vertices = new Float32Array( [
	// 	-1.0, -1.0,  1.0,
	// 	1.0, -1.0,  1.0,
	// 	1.0,  1.0,  1.0,

	// 	// 1.0,  1.0,  1.0,
	// 	-1.0,  1.0,  1.0,
	// 	// -1.0, -1.0,  1.0
	// ] );
	// // itemSize = 3 因为每个顶点都是一个三元组。
	// geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

	// const index = new Uint16Array([
	// 	0, 1, 2, 2, 3, 0
	// ])

	// geometry.index = new THREE.BufferAttribute(index, 1)
	// const material = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide, wireframe: true } );
	// const mesh = new THREE.Mesh( geometry, material );
	// scene.add(mesh)


	// 让立方体动起来
	function animate() {
		requestAnimationFrame(animate)
		// cube.rotation.x += 0.01
		// 轨道控制器更新
		// controls.update()
		// 进行渲染
		renderer.render(scene, camera)
		// labelRenderer.render(scene, camera)
	}

	animate()

})

const moveCamera = () => {
	camera.position.z = 20
	// camera.position.y = 20
	// camera.lookAt(3, 3, 0)
}

const moveCube = () => {
	cube.position.set(3, 5, 0)
	// console.log('=========>cube.position', cube.position);
	// lookAt不能和OrbitControls一起使用 否则失效
	camera.lookAt(cube.position)
}


</script>

<style lang="scss">
.label {
  position: absolute;
  color: white;
  font-size: 24px;
  pointer-events: none;
}
</style>