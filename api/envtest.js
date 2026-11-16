module.exports = (req, res) => {
  const keys = Object.keys(process.env).sort();
  const pick = keys.filter(k => /SECRET|MONGO|NIGHTSCOUT|DISPLAY|AUTH|API_/i.test(k));
  res.status(200).json({
    apiSecretPresent: !!process.env.API_SECRET,
    apiSecretLength: (process.env.API_SECRET || '').length,
    mongodbUriPresent: !!process.env.MONGODB_URI,
    totalEnvKeys: keys.length,
    pickedKeys: pick,
    vercelEnv: process.env.VERCEL_ENV || null
  });
};