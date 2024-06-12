function get_Waktu(timestamp) {
  milidetik = timestamp * 1000;
  const tanggal = new Date(milidetik);
  const ket = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return tanggal.toLocaleString("id-ID", ket);
}

function get_Lokasi(latitude, longitude) {
  fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
  )
    .then((response) => response.json())
    .then((data) => {
      const namaLokasi = data.display_name;
      document.getElementById("location").innerText = `${namaLokasi}`;
    })
    .catch((error) => {
      console.error("Error saat mengambil lokasi:", error);
    });
}

function get_Data() {
  const APImgm = "https://mgm.ub.ac.id/weather.json";
  const proxyURL =
    "https://api.allorigins.win/get?url=" + encodeURIComponent(APImgm);

  fetch(proxyURL)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data cuaca:", data.contents);

      const weatherData = JSON.parse(data.contents);

      const temp = weatherData.main.temp;
      const feelsLike = weatherData.main.feels_like;
      const description = weatherData.weather[0].description;
      const coordLat = weatherData.coord.lat;
      const coordLon = weatherData.coord.lon;
      const sunrise = get_Waktu(weatherData.sys.sunrise);
      const sunset = get_Waktu(weatherData.sys.sunset);

      document.getElementById("temperature").innerText = `${temp} °C`;
      document.getElementById("feels-like").innerText = `${feelsLike} °C`;
      document.getElementById("description").innerText = description;
      document.getElementById(
        "coord"
      ).innerText = `Lat(${coordLat}), Lon(${coordLon})`;
      document.getElementById("sunrise").innerText = `${sunrise} WIB`;
      document.getElementById("sunset").innerText = `${sunset} WIB`;

      get_Lokasi(coordLat, coordLon);

      const iconElement = document.getElementById("weather-icon");
      const iconCode = weatherData.weather[0].icon;
      const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;
      iconElement.innerHTML = `<img src="${iconURL}" alt="Ikon Cuaca" width="180">`;
    })
    .catch((error) => {
      console.error("Terjadi kesalahan:", error);
    });
}

window.onload = get_Data;

// Copytright GAFISK.
// Untuk menghilangkan Copyright. Silahkan dirubah kodenya.
