const axios = require('axios');
const cheerio = require('cheerio');

let $, data;

function getStatistics() {
  const divs = $(data).find(
    'div[style="clear:both;font-weight:bold;text-align: center;font-size: 40px;"]'
  ); // statistics are divs with this style
  const statList = [];
  divs.each((i, element) => {
    statList.push($(element).text());
  });
  const [positive, deceased, recovered] = statList;

  return { positive, deceased, recovered, date: new Date };
}

module.exports = async (req, res) => {
  const url = `http://www.salute.gov.it/portale/nuovocoronavirus/dettaglioContenutiNuovoCoronavirus.jsp?lingua=italiano&id=5351&area=nuovoCoronavirus&menu=vuoto`;
  try {
    const response = await axios.get(url);
    data = response.data;
    $ = cheerio.load(data);
    const stats = await getStatistics();
    res.status(200).json({ stats, success: true });
  } catch (e) {
    console.log(e);
  }
};
