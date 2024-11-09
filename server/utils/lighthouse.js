const fs = require('fs');

module.exports = async (url, filePath) => {
  const chromeLauncher = await import('chrome-launcher');
  const lighthouse = await import('lighthouse');

  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu']
  });

  const options = {
    port: chrome.port,
    output: 'html',
    onlyCategories: ['seo']
  };

  console.log(url);
  const result = await lighthouse.default(url, options);

  // The Lighthouse report as HTML (or JSON)
  const reportHtml = result.report;
  if (filePath) fs.writeFileSync(filePath, reportHtml);

  console.log('Lighthouse audit complete! Report saved as report.html.');

  await chrome.kill();

  return reportHtml;
};
