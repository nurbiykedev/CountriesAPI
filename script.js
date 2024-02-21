// https://restcountries.com/v3.1/all

const main = document.querySelector(".main");
const mainInput = document.querySelector(".main-input");
const mainBtn = document.querySelector(".main-btn");
const selectRegion = document.querySelector(".select-region");
const selectSort = document.querySelector(".select-sort")

let all = null;

function getCountries(data) {
  main.innerHTML = "";
  data.map((el) => {
    main.innerHTML += `<div class='main-card'>
  <img src='${el.flags.png} '
  <h1>${el.name.common}</h1>
  <h3>Сity: ${el.capital}</h3>
  <h3>Region: ${el.region}</h3>
  <h4>Population: ${el.population}</h4>
  <h4>Area: ${el.area}кв<sup>2</sup></h4>

  </div>`;
  });
}

function task(API) {
  axios(`https://restcountries.com/v3.1/${API}`).then((res) => {
    all = res.data;
    getCountries(res.data);
  });
}

task("all");

mainInput.addEventListener("input", () => {
  task(`name/${mainInput.value}`);
});

selectRegion.addEventListener("change", (e) => {
  let val = e.target.value;
  if (val === "europe") {
    let res = all.filter((el) => el.region === "Europe");
    getCountries(res);
  }else if(val === "asia"){
    let res = all.filter((el) => el.region === "Asia");
    getCountries(res);
  }else if(val === "oceania"){
    let res = all.filter((el) => el.region === "Oceania");
    getCountries(res);
  }
  else if(val === "africa"){
    let res = all.filter((el) => el.region === "Africa");
    getCountries(res);
  }
});


selectSort.addEventListener("change", (e) => {
  let sort = e.target.value;

  if (sort === "populary") {
      let sortCount = all.slice().sort((a, b) => b.population - a.population);
      getCountries(sortCount);
  } else if (sort === "area") {
      let sortCount = all.slice().sort((a, b) => b.area - a.area);
      getCountries(sortCount);
  } else if (sort === "a-z") {
      let sortCount = all.slice().sort((a, b) => a.name.common.localeCompare(b.name.common));
      getCountries(sortCount);
  } else if (sort === "z-a") {
      let sortCount = all.slice().sort((a, b) => b.name.common.localeCompare(a.name.common));
      getCountries(sortCount);
  }
});
