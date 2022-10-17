import React from 'react'
import nodejsLogo from "../svg/nodejs.svg";
import reactLogo from "../svg/react.svg";
import reduxLogo from "../svg/redux.svg";
import googleCloud from "../svg/googleCloud.svg";
import googleMap from "../svg/googleMap.svg";

function TechStack() {
  return (
    <div className="row-start-7 row-span-5">
        <img className="h-20 inline pr-5" src={nodejsLogo} alt="nodejs" />
      <img className="h-20 inline pr-5" src={reactLogo} alt="react" />
      <img className="h-20 inline pr-5" src={reduxLogo} alt="redux" />
      <img className="h-20 inline pr-5" src={googleCloud} alt="gcloud" />
      <img className="h-20 inline pr-5" src={googleMap} alt="gmap" />
    </div>
  )
}

export default TechStack
