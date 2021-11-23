let _places = [
    {
        name: 'Pokemon1',
        location: {
            "lat": 40.4816981, 
            "lng": -3.6685833
          }

    }
]




console.log("New version")


window.onload = function () {
    document
      .querySelector(".customButton")
      .addEventListener("click", function () {
        // here you can change also a-scene or a-entity properties, like
        // changing your 3D model source, size, position and so on
        // or you can just open links, trigger actions...
       //getCurrentLocation()
      });
      renderPlaces()

  };


function staticLoadPlaces() {
    return [
        {
            name: 'Pokemon',
            location: {
                lat: 40.4815624,
                lng: -3.6688096
            },
        },
    ];
}
function getCurrentLocation(){
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 100
      };
      
      
      function error(err) {
        alert('ERROR(' + err.code + '): ' + err.message);
      };
      console.log("Click")
      navigator.geolocation.getCurrentPosition(includePlace, error, options);
      
}
function includePlace(pos){
    console.log(pos)
    const crd = pos.coords;
    const place = {
        name:"Pokemon",
        location:{
            lat:crd.latitude,
            lng:crd.longitude
        }
    }
    _places.push(place)
    renderPlaces()

}

var     models = [
    {
        url: '/assets/nomulogo.gltf',
        scale: '0.5 0.5 0.5',
        info: 'nomu',
        rotation: '0 0 0',
    },
    {
        url: '/assets/magnemite/scene.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: '/assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: '/assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 0 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];

var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces() {
    let scene = document.querySelector('a-scene');

    _places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;
        console.log(place.location)

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        const modelIndex = 0
        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');
        scene.appendChild(model);
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  