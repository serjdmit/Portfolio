var map;
function initMap() {
  var uluru = { lat: 59.452336, lng: 24.8836844 };
  map = new google.maps.Map(document.getElementsByClassName('google-map')[0], {
    center: uluru,
    zoom: 16,
    scrollwheel: false,
    styles: [
    {
        "featureType": "administrative",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#eae8e2"
            },
            {
                "lightness": 52
            }
        ]
    },
    {
        "stylers": [
            {
                "saturation": -17
            },
            {
                "gamma": 0.36
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#243994"
            }
        ]
    }
]

  });
  
  let icons = {
    position: {
      icon: {
        url: 'https://maxorel.github.io/assets/img/icon/map-marker.svg',
        size: new google.maps.Size(60, 60),
        scaledsize: new google.maps.Size(60, 60)
      }
    },
    logo: {
      icon: {
        url: '../assets/images/avatar.jpg',
        size: new google.maps.Size(90, 90),
        scaledsize: new google.maps.Size(90, 90)
      }
    }
  };
  
  let features = [
    {
      position: new google.maps.LatLng(49.587415, 34.556482),
      type: 'position',
      contentString: 'First',
      content: 'First market'
    },
    {
      position: new google.maps.LatLng(49.586921, 34.551794),
      type: 'position',
      contentString: 'Second',
      content: 'Second market'
    },
    {
      position: new google.maps.LatLng(59.452336, 24.8836844),
      type: 'logo',
      contentString: 'Third',
      content: 'Third market'
    }
  ];
  
  var infowindow = new google.maps.InfoWindow();
  
  features.forEach(feature => {
    let  marker = new google.maps.Marker({
      position: feature.position,
      icon: icons[feature.type].icon,
      map: map,
      title: feature.contentString
    });
    
    marker.addListener('click', function() {
      infowindow.setContent(feature.content);
      infowindow.open(map, marker);
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        marker.setAnimation(null)
      }, 1400);
      
    } );
    // marker.addListener('mouseout', function() {
    //   marker.setAnimation(null);
    // } )
    
  });
  
}

google.maps.event.addDomListener(window, 'load', initMap);