import Taro from '@tarojs/taro'

export function renderCubes(canvas, THREE) {
  var camera, scene, renderer, geometry, material;
  var mesh;
  init();
  animate();
  function init() {

    camera = new THREE.PerspectiveCamera(70, canvas.width / canvas.height, 0.01, 10);
    camera.position.z = 2;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    material = new THREE.MeshNormalMaterial({ color: 0x645d50 });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 创建平行光-照亮几何体
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-4, 8, 12);
    scene.add(directionalLight);

    // 创建环境光
    var ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setPixelRatio(Taro.getSystemInfoSync().pixelRatio);
    renderer.setSize(canvas.width, canvas.height);

    // const controls = new THREE.OrbitControls(camera, canvas);
    // controls.addEventListener("change", () => {
    //   renderer.render(scene, camera);
    // });
    // controls.minDistance = 1;
    // controls.maxDistance = 2000;
    // controls.enablePan = false;
    // controls.autoRotate = true;
    // controls.update();
    animate();
    // renderer.setPixelRatio(Taro.getSystemInfoSync().pixelRatio);
    // renderer.setSize(canvas.width, canvas.height);
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.width, canvas.height);
  }
  function animate() {
    canvas.requestAnimationFrame(animate);
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
}
