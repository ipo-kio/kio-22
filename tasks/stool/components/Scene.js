import React, { Component } from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Physics from "./Physics"
import Plane from "./Plane"
import Controller from  "./Controller"
import "../styles/stool.css"
import "../styles/Button.css"

class Scene extends Component {
    constructor(props) {
        super(props);

        this.controller = React.createRef()

        this.prevPosition = new THREE.Vector3()

        this.sceneHeight = 15;
        this.sceneWidth = 15;
        this.init();

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true
        this.controls.maxPolarAngle = 1.2
        this.controls.minPolarAngle = 0
        this.controls.update()

        this.state = {x: 0, z: 0, angle: 0}


        this.startAnimation()
    }

    startAnimation = () =>{

        if(this.animationID){
            window.cancelAnimationFrame(this.animationID)
        }

        let scene = this.scene
        let camera = this.camera
        let renderer = this.renderer
        let chair = this.chair
        let controls = this.controls

        function tick() {
            chair.animate()
            renderer.render( scene, camera );
            controls.update()
            window.requestAnimationFrame(tick)
        }

        this.animationID = window.requestAnimationFrame(tick)
    }

    initLights = () => {
        const skyColor = 0xB1E1FF;  // light blue
        const intensity = 0.5;
        let light = new THREE.HemisphereLight(skyColor, 0xffffff, intensity);
        this.scene.add(light);
        let pointLight = new THREE.PointLight(0xffffff, 0.8)
        pointLight.position.x = 2
        pointLight.position.y = 7
        pointLight.position.z = 4
        this.scene.add(pointLight)
    }

    init = () => {
        //Scene
        this.scene = new THREE.Scene();

        //Size
        const sizes = {
            width: window.innerWidth-window.innerWidth*0.017,
            height: window.innerHeight-window.innerHeight * 0.28
        }
        //Camera
        this.camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        this.camera.position.x = 10
        this.camera.position.y = 7
        this.camera.position.z = 0

        this.camera.lookAt(0,100,0)

        this.scene.add(this.camera)

        // Renderer
        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setSize(sizes.width, sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.outputEncoding = THREE.sRGBEncoding
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping
        this.renderer.toneMappingExposure = 0.5;


        let plane = new Plane(this.scene, this.renderer)
        this.plane = plane
        plane.initSky();
        plane.initPlane(this.sceneWidth, this.sceneHeight)
        this.initLights()

        this.chair = new Physics(plane, this.scene, this.sceneWidth, this.sceneHeight, this.props.KioApi, this.view, 2, this.restartGame)
        this.chair.init(new THREE.Vector3(0, 0, 0), 0)

        window.addEventListener('resize', () => {
            // Update sizes
            sizes.width = window.innerWidth-window.innerWidth*0.017
            sizes.height = window.innerHeight-window.innerHeight * 0.28

            // Update camera
            this.camera.aspect = sizes.width / sizes.height
            this.camera.updateProjectionMatrix()

            // Update renderer
            this.renderer.setSize(sizes.width, sizes.height)
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

    }

    view = (x, z, angle) => {
        this.setState({
            x: Math.round(x*5.0),
            z: Math.round(z*5.0),
            angle: angle.toFixed(1)
        })
    }

    getParams = () =>{
        return {
                    pos: this.prevPosition,
                    angle: this.chair.angle
               }
    }

    loadSolution = (params) =>{
        let angle = params.angle
        let lastPosition = params.pos

        this.view(params.pos.x, params.pos.z, params.angle)

        this.chair.deleteFromScene()

        this.chair = new Physics(this.plane, this.scene, this.sceneWidth, this.sceneHeight, this.props.KioApi, this.view, this.controller.current.hR, this.restartGame)
        this.chair.init(lastPosition, angle)

        this.forceUpdate()
        this.startAnimation()
    }

    restartGame= () => {
        let angle = this.chair.angle
        let lastPosition = this.prevPosition

        this.chair.deleteFromScene()

        this.chair = new Physics(this.plane, this.scene, this.sceneWidth, this.sceneHeight, this.props.KioApi, this.view, this.controller.current.hR, this.restartGame)
        this.chair.init(lastPosition, angle)

        this.forceUpdate()
        this.startAnimation()
    }

    savePositionAndDrop = () =>{
        if(!this.chair.canMove()) return
        let angle = this.chair.angle
        this.chair.chair.rightRotation(angle)
        this.prevPosition = this.chair.chair.group.position.clone()
        this.chair.chair.leftRotation(angle)
        this.chair.dropButton()
    }

    componentDidMount() {
        this.mount.appendChild(this.renderer.domElement); // mount a scene inside of React using a ref
    }

    render() {
        return(
         <div className="stoolWrapper" ref={ref => (this.mount = ref)}>
             <Controller ref = {this.controller}
                         onDrop = {this.savePositionAndDrop}
                         onDropAndShow = {this.chair.dropAndShow}
                         onLeftMoveButton = {this.chair.leftButton}
                         onRightMoveButton = {this.chair.rightButton}
                         onBackMoveButton = {this.chair.backButton}
                         onForwardMoveButton = {this.chair.forwardButton}
                         onRestartButton = {this.restartGame}
                         onTransparentButtonOn = {this.chair.transparentButtonOn}
                         onTransparentButtonOff = {this.chair.transparentButtonOff}
                         onRightRotationButton = {this.chair.rightRotationButton}
                         onLeftRotationButton = {this.chair.leftRotationButton}

                         RotateOn01Degree = {this.chair.RotateOn01Degree}
                         RotateOn05Degree = {this.chair.RotateOn05Degree}
                         RotateOn1Degree = {this.chair.RotateOn1Degree}
                         RotateOn2Degree = {this.chair.RotateOn2Degree}
                         RotateOn5Degree = {this.chair.RotateOn5Degree}
                         RotateOn10Degree = {this.chair.RotateOn10Degree}
                         />
             <div className="info">
                <button className='X'>X = {this.state.x}</button>
                <button className='Z'>Y = {this.state.z}</button>
                <button className='Angle'>Angle = {this.state.angle}</button>
            </div>
        </div>

        );
    }
}

export default Scene

