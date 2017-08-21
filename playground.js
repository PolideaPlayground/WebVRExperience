<Entity raycaster="far: 30; objects: .intersectable; showLine: true"
          line="color: orange; opacity: 0.5" />
        <Entity primitive="a-camera" look-controls wasd-controls>
          <Entity
            primitive="a-cursor"
            cursor="fuse: true"
          raycaster="far: 30; objects: .intersectable; showLine: true"
          line="color: orange; opacity: 0.5"  
            position="0 0 -0.75"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            events={{intersected: this.interYey.bind(this)}}
            material="color: yellow; shader: flat"
            animation__fusing={{
              startEvents: "fusing",
              fill: "forwards",
              property: "scale",
              easing: "easeInSine",
              dur: 2000,
              from: "1 1 1",
              to: "0.1 0.1 0.1"
            }}
            animation__click={{
              startEvents: "click",
              fill: "backwards",
              property: "scale",
              easing: "easeInSine",
              dur: 200,

              from: "0.1 0.1 0.1",
              to: "1 1 1"
            }}
          >
          </Entity>
            <Entity
          
          />
        </Entity>