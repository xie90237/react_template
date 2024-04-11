import { useNavigate, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import { useEffect, useRef } from 'react'

import grass from 'assets/minecraft/grass.png'
import grass_dirt from 'assets/minecraft/grass_dirt.png'
import dirt from 'assets/minecraft/dirt.png'

import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js'
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { s } from 'vitest/dist/reporters-5f784f42.js'

const Example1Page = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const sceneRef = useRef<THREE.Scene>()
  const exampleRef = useRef<HTMLDivElement>(null)

  const createBaseMaterials = () => {
    const createTexture = (img: string) => {
      const texture = new THREE.TextureLoader().load(img)
      texture.colorSpace = THREE.SRGBColorSpace
      texture.magFilter = THREE.NearestFilter
      return texture
    }

    const grassTexture = createTexture(grass)
    const dirtTexture = createTexture(dirt)
    const grass_dirtTexture = createTexture(grass_dirt)

    // 创建顶部材质
    const materialTop = new THREE.MeshBasicMaterial({
      map: grassTexture,
      side: THREE.FrontSide
    })
    // 创建底部材质
    const materialBottom = new THREE.MeshBasicMaterial({
      map: dirtTexture,
      side: THREE.FrontSide
    })
    // 创建侧面材质
    const materialSide = new THREE.MeshBasicMaterial({
      map: grass_dirtTexture,
      side: THREE.FrontSide
    })

    // 为正方体的各个面应用不同的材质
    const materials = [
      materialSide, // 右侧面
      materialSide, // 左侧面
      materialTop, // 顶面
      materialBottom, // 底面
      materialSide, // 前面
      materialSide // 后面
    ]
    return materials
  }
  const addBox: (
    position: { x: number; y: number; z: number },
    box: THREE.BoxGeometry,
    materials: THREE.Material[]
  ) => THREE.Mesh = ({ x, y, z }, box, materials) => {
    const mesh = new THREE.Mesh(box, materials)
    mesh.position.x = x
    mesh.position.y = y
    mesh.position.z = z
    mesh.userData = { msg: `${x}_${z}: woc 我被点了` }
    // mesh.addEventListener('click', function () {
    //   console.log('Box clicked at position:', this.userData.position)
    // })
    sceneRef.current?.add(mesh)
    return mesh
  }
  useEffect(() => {
    sceneRef.current = new THREE.Scene()
    sceneRef.current.background = new THREE.Color(0xbfd1e5)
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(
      exampleRef.current?.offsetWidth || 500,
      exampleRef.current?.offsetHeight || 500
    )
    exampleRef.current?.appendChild(renderer.domElement)

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 10
    camera.position.y = 10
    sceneRef.current.add(camera)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()

    const box = new THREE.BoxGeometry(1, 1, 1)
    const materials = createBaseMaterials()
    const meshHash: any = {}
    for (let x = 0; x < 10; x++) {
      for (let z = 0; z < 10; z++) {
        const mesh = addBox({ x: x * 1.3, y: 0, z: z * 1.3 }, box, materials)
        meshHash[x + '_' + z] = mesh
      }
    }

    const ambientLight = new THREE.AmbientLight(0xeeeeee, 3)
    sceneRef.current.add(ambientLight)

    // batchedMesh.setMatrixAt(boxId1, new THREE.Matrix4())

    const animate = function () {
      requestAnimationFrame(animate)

      controls.update()

      sceneRef.current && renderer.render(sceneRef.current, camera)
    }

    animate()

    return () => {
      exampleRef.current?.removeChild(renderer.domElement)
      // 在组件销毁时释放资源
      renderer.dispose()
    }
  }, [])

  return <div className="h-[500px] w-[900px]" ref={exampleRef}></div>
}

export default Example1Page
