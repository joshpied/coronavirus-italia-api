const axios = require('axios');

module.exports = async (req, res) => {
  const url = `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json`;
  try {
    const response = await axios.get(url);
    const daily_national_stats = response.data;

    res
      .status(200)
      .json({
        daily_national_stats,
        length: daily_national_stats.length,
        success: true
      });
  } catch (e) {
    console.log(e);
  }
};
