import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import fetch from 'node-fetch';
import AEMHeadless from '@adobe/aem-headless-client-js';
import './locationMap.scss';

const MAP_DATA_URL_PUBLISH='https://publish-p55117-e571178.adobeaemcloud.com';
const GOOGLE_MAP_KEY='AIzaSyB4er8NcF-CGHY4ELZbqMlqzAkgsyt798g';

let aemHeadlessClient = new AEMHeadless({
  serviceURL: MAP_DATA_URL_PUBLISH,
  endpoint: '/content/_cq_graphql/frescopa/endpoint.json'
})

var url = (window.location != window.parent.location)
            ? document.referrer
            : document.location.href;

const AnyReactComponent = ({ text,key }) => <div key={key} style={{ transform: 'translate(-50%, -50%)' }} className="popup" onClick={(event) => { 
    if(event.target.tagName.toLowerCase() != 'p') {
      const popups = document.getElementsByClassName('popup'); 
      for (let popup of popups) {
        popup.children[0].classList.remove("show");
        popup.children[1].classList.remove("selected");
        popup.children[1].classList.add("default");
        popup.children[1].classList.add("icon");
      };
      event.target.children[0]?.classList.toggle("show");
      event.target.children[1]?.classList.remove("default");
      event.target.children[1]?.classList.remove("icon");
      event.target.children[1]?.classList.add("selected");
    }
  }}>
  <span className="popuptext" id="myPopup" dangerouslySetInnerHTML={{ __html: text }} onClick={() => {
    const popups = document.getElementsByClassName('popup'); 
    for (let popup of popups) {
      popup.children[0].classList.remove("show");
      popup.children[1].classList.remove("selected");
      popup.children[1].classList.add("default");
      popup.children[1].classList.add("icon");
    };
  }}></span>
  <div className="icon default"></div>

</div>;

class LocationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPOI: [],
      center: {
        lat: -33.8714378,
        lng: 151.2036327
      },
      zoom: 15,
      poi: []
    };
  }

  componentDidMount() {
    this.fetchPOIList()
      .then((data) => {
        this.setState({ allPOI: data, center: {lat: data[0].lat, lng: data[0].long}, poi: data });
      })
      .catch(error => {
        
      });
  }

  async fetchPOIList() {
    const query = `
      {
        locationList {
          items { 
            locationName
            phoneNumber
            streetAddress
            city
            postzipCode
            lat
            long
            locationPhoto {
              ... on ImageRef {
                  _path
              }
            }
          }
        }
      }
    `;
    const data = await aemHeadlessClient.runQuery(query);
    return data.data.locationList.items;
  }

  searchPOI(postcode) {
    const popups = document.getElementsByClassName('popup'); 
    for (let popup of popups) {
      popup.children[0].classList.remove("show");
      popup.children[1].classList.remove("selected");
      popup.children[1].classList.add("default");
      popup.children[1].classList.add("icon");
    };
    if(postcode) {
      const results = this.state.allPOI.filter(function (poi) {
        return poi.postzipCode === parseInt(postcode);
      });
      this.setState({center: {lat: results[0].lat, lng: results[0].long}});
      this.setState({poi: results});
    } else {
      this.setState({center: {lat: this.state.allPOI[0].lat, lng: this.state.allPOI[0].long}});
      this.setState({poi: this.state.allPOI});
    }
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="shopfinder">
        <div className="sidepanel">
          <h1 className="sidepanel__title">There's a Frèscopa boutique near you!</h1>
          <div className="search">
            <p className="search__title">Find another location</p>
            <div className="search__box">
               <input className="search__input" type="text" placeholder="Post Code" name="search"></input>
               <button className="search__button" onClick={() => {const postcode = document.getElementsByClassName("search__input")[0].value;this.searchPOI(postcode);}}>Search</button>
            </div>
          </div>
        </div>
        <div className="map">
          <GoogleMapReact
            options={{
              disableDefaultUI: true,
              keyboardShortcuts: false,
              styles: [{
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 65
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": "50"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "30"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "40"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#ffff00"
                    },
                    {
                        "lightness": -25
                    },
                    {
                        "saturation": -97
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [
                    {
                        "lightness": -25
                    },
                    {
                        "saturation": -100
                    }
                ]
            }]
          }}
            bootstrapURLKeys={{ key: GOOGLE_MAP_KEY }}
            center={this.state.center}
            defaultZoom={this.state.zoom}
          >
            {this.state.poi.map(function(poi, index){
              const text = `<strong>Frèscopa</strong><br/><br/><p>${poi.streetAddress}</p><p>${poi.city}</p><p>Open 8AM-8PM</p>`;
              return <AnyReactComponent
                lat={poi.lat}
                lng={poi.long}
                text={text}
                key={index}
              />
            })}

          </GoogleMapReact>
        </div>
        </div>
    );
  }
}

export default LocationMap;