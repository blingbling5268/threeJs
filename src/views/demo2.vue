<!--
 * @Author: liubo lb@hzguode.com
 * @Date: 2024-02-20 13:48:58
 * @LastEditors: liubo lb@hzguode.com
 * @LastEditTime: 2024-05-27 15:26:36
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
// 创建相机
const camera = new THREE.PerspectiveCamera() // 透视相机
camera.position.set(0, 0, 10) 

onMounted(() => {
	// 创建渲染器
	const renderer = new THREE.WebGLRenderer()
	document.getElementById('container').appendChild(renderer.domElement)
	// 调整窗口大小
	renderer.setSize(window.innerWidth, window.innerHeight)

  const axesHelper = new THREE.AxesHelper( 10 )
  scene.add(axesHelper)

  // // 创建线条路径
  // const curve = new THREE.LineCurve3(new THREE.Vector3(-2, 0, 0), new THREE.Vector3(2, 0, 0));
  // // 创建路径几何体
  // const points = curve.getPoints(16);
  // const geometry = new THREE.BufferGeometry().setFromPoints(points);
  // // 创建白色材质
  // const material = new THREE.LineBasicMaterial({ color: 0xffffff })
  // // 创建直线对象
  // const line = new THREE.Line(geometry, material);
  // // 将直线添加到场景中
  // scene.add(line);

  // 创建直线的起点和终点
  var lineStartPoint = new THREE.Vector3(-2, 0, 0);
  var lineEndPoint = new THREE.Vector3(0, 2, 0);

  // 创建贝塞尔曲线的控制点
  var curvePoints = [
    new THREE.Vector3(0, 2, 0),
    new THREE.Vector3(1, 2, 0),
    new THREE.Vector3(2, 0, 0)
  ];

  // 创建直线的几何体
  var lineGeometry = new THREE.BufferGeometry().setFromPoints([lineStartPoint, lineEndPoint]);
  var lineMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 1.0 }
    },
    vertexShader: `
      uniform float time;
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec3 vPosition;
      void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0) * abs(sin(time * 2.0 + length(vPosition) * 0.5));
      }
    `
  });
  var line = new THREE.Line(lineGeometry, lineMaterial);

  // 创建贝塞尔曲线的几何体
  // var curve = new THREE.CatmullRomCurve3(curvePoints);
  // var curve = new THREE.CubicBezierCurve3(new THREE.Vector3(0, 2, 0), new THREE.Vector3(1, 2, 0), new THREE.Vector3(1, -2, 0), new THREE.Vector3(2, -2, 0));;
  var curve = new THREE.CubicBezierCurve3(new THREE.Vector3(-1, 1.8, 0), new THREE.Vector3(-0.75, 1.8, 0), new THREE.Vector3(-0.75, -1.8, 0), new THREE.Vector3(-0.5, -1.8, 0))
  var points = curve.getPoints(50);
  console.log('=========>points', points);
  
  var curveGeometry = new THREE.BufferGeometry().setFromPoints(points);
  var curveMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 1.0 }
    },
    vertexShader: `
      uniform float time;
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec3 vPosition;
      void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0) * abs(sin(time * 2.0 + length(vPosition) * 0.5));
      }
    `
  });
  var bezierCurve = new THREE.Line(curveGeometry, curveMaterial);

  // 将直线和贝塞尔曲线添加到场景中
  scene.add(line);
  scene.add(bezierCurve);

	// 让立方体动起来
	function animate() {
		requestAnimationFrame(animate)
		// 进行渲染
		renderer.render(scene, camera)
	}

	animate()

})
const draw = () => {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera()
        camera.position.set(0, 0, 5)

        const renderer = new THREE.WebGLRenderer({ alpha: true })
        document.getElementById('menu').appendChild(renderer.domElement)
        // 设置画布的大小
        renderer.setSize(1920, 80)

        const axesHelper = new THREE.AxesHelper( 10 )
        scene.add(axesHelper)

        // 创建直线的起点和终点
        var lineStartPoint = new THREE.Vector3(-2.4, 2, 0);
        var lineEndPoint = new THREE.Vector3(-1, 2, 0);

        // 创建贝塞尔曲线的控制点
        var curvePoints = [
          new THREE.Vector3(-1, 1.8, 0),
          new THREE.Vector3(2, 2, 0),
          new THREE.Vector3(-0.5, -1.8, 0)
        ];

        var lineCurve = new THREE.LineCurve3(lineStartPoint, lineEndPoint);
        var points = lineCurve.getPoints(50);
        var linePath = new THREE.CatmullRomCurve3(points);
        // 创建贝塞尔曲线路径
        var path = new THREE.CubicBezierCurve3(new THREE.Vector3(-1, 2, 0), new THREE.Vector3(-0.75, 2, 0), new THREE.Vector3(-0.75, -2, 0), new THREE.Vector3(-0.5, -2, 0));
        var points1 = path.getPoints(50)
        var curvePath = new THREE.CatmullRomCurve3(points1);

        // 合并路径
        var combinedCurve = new THREE.CurvePath();
        combinedCurve.add(linePath);
        combinedCurve.add(curvePath);

        let texture = new THREE.TextureLoader().load(line)
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping; //每个都重复
        texture.repeat.set(1, 1)
        texture.needsUpdate = true

        let material = new THREE.MeshBasicMaterial({
          map: texture,
          // color: '#fff',
          side: THREE.BackSide,
          transparent: true
        })

        // // 创建流光效果的着色器材质
        // var material = new THREE.ShaderMaterial({
        //   uniforms: {
        //     time: { value: 1.0 }
        //   },
        //   vertexShader: `
        //     uniform float time;
        //     varying vec3 vPosition;
        //     void main() {
        //       vPosition = position;
        //       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        //     }
        //   `,
        //   fragmentShader: `
        //     uniform float time;
        //     varying vec3 vPosition;
        //     void main() {
        //       gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0) * abs(sin(time * 2.0 + length(vPosition) * 0.5));
        //     }
        //   `
        // });

        let tubeGeometry = new THREE.TubeGeometry(combinedCurve, 100, 0.2, 100, false)

        let mesh = new THREE.Mesh(tubeGeometry, material);

        scene.add(mesh)

        // // 将直线和贝塞尔曲线添加到场景中
        // scene.add(line);
        // scene.add(bezierCurve);
        
        function animate() {
          if(texture) texture.offset.x -= 0.01
          // material.uniforms.time.value += 0.02;
          requestAnimationFrame(animate)
          renderer.render(scene, camera)
        }
        animate()
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