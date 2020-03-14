const axios = require('axios');
const csv = require('csvtojson');

module.exports = async (req, res) => {
  const url = `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni.csv`;
  try {
    const response = await axios.get(url);
    const statsCsvString = response.data;
    const daily_regional_stats = await csv().fromString(statsCsvString);

    res.status(200).json({
      daily_regional_stats,
      length: daily_regional_stats.length,
      success: true
    });
  } catch (e) {
    console.log(e);
  }
};
