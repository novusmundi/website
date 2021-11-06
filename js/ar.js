let _places = [
    {
        name: 'Pokemon',
        location: {
            lat: 40.4815624,
            lng: -3.6688096
        },
    }
]

window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '?';
    renderPlaces(_places);
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
        maximumAge: 0
      };
      
      
      function error(err) {
        alert('ERROR(' + err.code + '): ' + err.message);
      };
      
      navigator.geolocation.getCurrentPosition(includePlace, error, options);
      
}
function includePlace(pos){
    const crd = pos.coords;
    const place = {
        name:"Pokemon",
        location:crd
    }
    _places.push(place)
    renderPlaces(_places)

}

var models = [
    {
        url: '../assets/magnemite/scene.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: '../assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: '../assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];

var modelIndex = 0;
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

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}