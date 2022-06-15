const BASE_URL =
  "https://www.mapquestapi.com/geocoding/v1/reverse?key=YUutVDTnvvP2ffUcsT2AKtNR6rLaai8Q%20&location=";
const getLocation = async (lat:any, long:any) => { 
  const res = await fetch(`${BASE_URL}${lat},${long}&includeRoadMetadata=true&includeNearestIntersection=true`
  );
  const data = await res.json();
  const location = data.results[0].locations[0];
  return {
    street: location.street,
    city: location.adminArea5,
    state: location.adminArea3,
    latitude:lat,
    longitude:long,
    postalCode: location.postalCode,
  };
};

export const getData = async (lat:any,lon:any) => {
    const locationData= await getLocation(lat,lon);
    return locationData;
};
