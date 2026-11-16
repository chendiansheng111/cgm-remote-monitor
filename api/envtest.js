module.exports = (req, res) => {
  const out = { apiSecretPresentBefore: !!process.env.API_SECRET };
  try {
    const envModule = require('../lib/server/env');
    const cfg = typeof envModule === 'function' ? envModule() : envModule;
    out.apiSecretPresentAfter = !!process.env.API_SECRET;
    out.isApiKeySet = cfg.enclave && cfg.enclave.isApiKeySet ? cfg.enclave.isApiKeySet() : 'no-enclave';
    out.errCount = (cfg.err || []).length;
    out.errs = (cfg.err || []).map(e => e.desc);
    out.storageUriPresent = !!cfg.storageURI;
  } catch (e) {
    out.exception = e.message;
  }
  res.status(200).json(out);
};