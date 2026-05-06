const cities = [
    {
        arabicname: "دمشق",
        enname: "Damascus"
    },
    {
        arabicname: "حمص",
        enname: "Homs"
    },
    {
        arabicname: "اللاذقية",
        enname: "Latakia"
    },
    {
        arabicname: "حلب",
        enname: "Aleppo"
    },
    {
        arabicname: "طرطوس",
        enname: "Tartus"
    },
    {
        arabicname: "درعا",
        enname: "Daraa"
    },
    {
        arabicname: "القنيطرة",
        enname: "Quneitra"
    },
    {
        arabicname: "السويداء",
        enname: "Suwayda"
    },
    {
        arabicname: "ريف دمشق",
        enname: "Damascus Countryside"
    },
    {
        arabicname: "الحسكة",
        enname: "Hasaka"
    },
    {
        arabicname: "الرقة",
        enname: "Raqqa"
    },
    {
        arabicname: "ادلب",
        enname: "Idlib"
    },
    {
        arabicname: "دير الزور",
        enname: "Deir Ezzor"
    },
    {
        arabicname: "حماة",
        enname: "Hama"
    },
    // ,","اللاذقية","حلب","طرطوس","درعا","القنيطرة","ريف دمشق","السويداء"
]

for (let city of cities) {
    const connect = `
    <option>${city.arabicname}</option>
    `
    document.getElementById("cities-select").innerHTML += connect;
}
document.getElementById("cities-select").addEventListener("change", function () {
    document.getElementById("city-name").innerHTML = this.value;
    let cityN = "";
    for (let city of cities) {
        if (city.arabicname == this.value) {
            cityN = city.enname;
        }
    }
    getprayerTimes(cityN)
});


function getprayerTimes(cityname) {

    let params = {
        country: "SY",
        city: cityname,//"Damascus",
    }
    axios.get("https://api.aladhan.com/v1/timingsByCity", {
        params: params
    })
        .then((response) => {
            const timing = response.data.data.timings;
            filltime("fajer", timing.Fajr);
            filltime("shorouq", timing.Sunrise);
            filltime("dhuhr", timing.Dhuhr);
            filltime("asr", timing.Asr);
            filltime("maghrib", timing.Maghrib);
            filltime("asha", timing.Isha);

            const readabledate = response.data.data.date.readable;
            const weekday = response.data.data.date.hijri.weekday.ar;
            const date = weekday + " " + readabledate
            document.getElementById("date").innerHTML = date;
            // console.log(readabledate + " " + weekday);
        })
        .catch((error) => {
            console.error(error);
        });
}

getprayerTimes("Damascus");
function filltime(id, time) {
    document.getElementById(id).innerHTML = time;
}