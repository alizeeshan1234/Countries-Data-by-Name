const countriesContainer = document.querySelector('#countriesData');
const neighbourCountry = document.querySelector('#neighbourCountry');
class FetchData {
    #inputValue;

    constructor() {
        this._initialize();
    }

    _initialize() {
        const button = document.querySelector('button');
        button.addEventListener('click', this._handleButtonClick.bind(this));
    }

    _handleButtonClick() {
        this._getInputValue();
        console.log(this.#inputValue);
    }

    _getInputValue() {
        this.#inputValue = document.querySelector('#searchBar').value;
        this._getCountryData(this.#inputValue);
        this.#inputValue = ' ';
    }
    async _getCountryData(country){
        try {

        const data = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        const [response] = await data.json();

        const neigbourCountry = response.borders[0];
        console.log(neigbourCountry);
        const fetchData = await fetch(`https://restcountries.com/v3.1/alpha/${neigbourCountry}`);
        const [responseToJson] = await fetchData.json();

        setTimeout(() => {
        console.log(responseToJson);

        const neighbourLanguage = responseToJson.languages;
        console.log(neighbourLanguage);

        const neighbourCurrency = responseToJson.currencies;
        console.log(neighbourCurrency)

        Object.values(neighbourLanguage).forEach(element => {
            const neighbourlanguage = element;
            console.log(neighbourlanguage);

            Object.values(neighbourCurrency).forEach(element => {
                const neighbourcurrency = element.name;
                const neighbourcurrencySymbol = element.symbol;
                console.log(neighbourcurrency);
                console.log(neighbourcurrencySymbol);

        const html = `
        <h1 id='neighbour'>Neighbouring Country</h1>
        <div id="neighbourCountryBox">
        <img src=${responseToJson.flags.png}>
        <div id="neighbourCountryDetails">
        <h1>${responseToJson.name.common}</h1>
        <h2 class="CountryText">${responseToJson.region}</h2>
        <h2 class="CountryText">Capital : ${responseToJson.capital}</h2>
        <h3 class="CountryText">👫 ${(+responseToJson.population / 1000000).toFixed(1)} Million</h3>
        <h3 class="CountryText">🗣️ ${neighbourlanguage}</h3>
        <h3 class="CountryText">💰 ${neighbourcurrency} ${neighbourcurrencySymbol}</h3>
        </div>
        </div>
        `;

        neighbourCountry.insertAdjacentHTML('afterend' , html);
    })
    })
    }, 3000)

        setTimeout(() => {
        console.log(response);
        console.log(response.name.common);
        console.log(response.region);

        const countriesContainer = document.querySelector('#countriesData');

        const language = response.languages;
        console.log(language);

        Object.values(language).forEach(element => {
            const language = element;

            const currencies = response.currencies;
            console.log(currencies);

            Object.values(currencies).forEach(currency => {
                const Currency = currency.name;
                console.log(Currency)
                const symbol = currency.symbol;
                console.log(symbol);

        const html = `
        <div id="CountryBox">
        <img src=${response.flags.png}>
        <div id="CountryDetails">
        <h1>${response.name.common}</h1>
        <h2 class="CountryText">${response.region}</h2>
        <h2 class="CountryText">Capital : ${response.capital}</h2>
        <h3 class="CountryText">👫 ${(+response.population / 1000000).toFixed(1)} Million</h3>
        <h3 class="CountryText">🗣️ ${language}</h3>
        <h3 class="CountryText">💰 ${Currency} ${symbol}</h3>
        </div>
        </div>
        `;

        countriesContainer.insertAdjacentHTML('afterend' , html);

    })
    })
    }, 2000)
} catch (error){
    this._renderErrorMessage(country ,error);
}
}
_renderErrorMessage(country ,errorMessage){
    const h6 = document.createElement('h6');
    h6.innerHTML = `<center>Can't fetch the data for <span id='spanData'>${country}</span> "${errorMessage}" 🔥 🔥. <br> Please try Again... 😔</center>`;
    const parent = document.querySelector('#container');
    parent.appendChild(h6);
}
}

const fetchDataInstance = new FetchData();
