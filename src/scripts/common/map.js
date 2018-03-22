var map;
function initMap() {
  var uluru = { lat: 59.452336, lng: 24.8836844 };
  map = new google.maps.Map(document.getElementsByClassName('google-map')[0], {
    center: uluru,
    zoom: 16,
    scrollwheel: false,
    styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#929292"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#4369aa"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
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
        url: '../assets/images/svg/map_n.svg',
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