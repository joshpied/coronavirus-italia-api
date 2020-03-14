const axios = require('axios');
const csv = require('csvtojson');

module.exports = async (req, res) => {
  const url = `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale.csv`;
  try {
    const response = await axios.get(url);
    const statsCsvString = response.data;
    const daily_national_stats = await csv().fromString(statsCsvString);

    res.status(200).json({
      daily_national_stats,
      length: daily_national_stats.length,
      success: true
    });
  } catch (e) {
    console.log(e);
  }
};
