const axios = require('axios');

module.exports = async (req, res) => {
  const url = `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json`;
  try {
    const response = await axios.get(url);
    const daily_regional_stats = response.data;

    res.status(200).json({
      daily_regional_stats,
      length: daily_regional_stats.length,
      success: true
    });
  } catch (e) {
    console.log(e);
  }
};
