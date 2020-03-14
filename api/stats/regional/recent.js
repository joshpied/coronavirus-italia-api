const axios = require('axios');
const csv = require('csvtojson');
const dayjs = require('dayjs');

module.exports = async (req, res) => {
  const currentTime = new Date().getHours();
  let date;
  if (currentTime >= 19) {
    date = dayjs().format('YYYYMMDD');
  } else {
    date = dayjs()
      .subtract(1, 'day')
      .format('YYYYMMDD');
  }

  const url = `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni-${date}.csv`;
  try {
    const response = await axios.get(url);
    const statsCsvString = response.data;
    const regional_stats = await csv().fromString(statsCsvString);
    res
      .status(200)
      .json({ regional_stats, length: regional_stats.length, success: true });
  } catch (error) {
    const { message } = error;
    res.status(404).json({ message, success: false });
  }
};
