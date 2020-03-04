const axios = require('axios');
const cheerio = require('cheerio');

let $, data;

async function getRegionCases() {
  const ul = $(data).find('ul')[6]; // index of ul that contains region data
  const lis = $(ul).find('li');
  let regions = [];
  lis.each((i, element) => {
    let [cases, ...name] = $(element)
      .text()
      .split(' '); // everything before the first space is the case number, after is
    name = name.join(' ').trim(); // remove spaces from region name
    cases = Number(cases); // convert amount of cases to integer
    regions.push({ name, cases });
  });

  return regions;
}

module.exports = async (req, res) => {
  const url = `http://www.salute.gov.it/portale/nuovocoronavirus/dettaglioContenutiNuovoCoronavirus.jsp?lingua=italiano&id=5351&area=nuovoCoronavirus&menu=vuoto`;
  try {
    const response = await axios.get(url);
    data = response.data;
    $ = cheerio.load(data);
    const cases = await getRegionCases();
    res.status(200).json({ cases, length: cases.length, success: true });
  } catch (e) {
    console.log(e);
  }
};
