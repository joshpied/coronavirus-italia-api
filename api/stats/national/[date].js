const axios = require('axios');
const csv = require('csvtojson');

module.exports = async (req, res) => {
  let { date } = req.query;
  date = date.replace(/-/g, '');

  const url = `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale-${date}.csv`;
  try {
    const response = await axios.get(url);
    const statsCsvString = response.data;
    const [national_stats] = await csv().fromString(statsCsvString);
    res.status(200).json({ national_stats, success: true });
  } catch (error) {
    const { message } = error;
    res.status(404).json({ message, success: false });
  }
};
