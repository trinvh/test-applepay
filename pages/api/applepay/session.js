import * as fs from "node:fs";
import * as path from 'node:path';
import * as request from 'request'

const certPath = path.join(process.cwd(), 'merchant_id.pem')
const cert = fs.readFileSync(certPath, "utf8");

export default function handler(req, res) {
  var url = req.query.validationURL;
console.log(req.headers.host)
  console.log({ url });
  var options = {
    method: "POST",
    url: url,
    cert: cert,
    key: cert,
    body: {
      merchantIdentifier: "merchant.payengine.test3",
      displayName: "PayEngine Test",
      initiative: "web",
      initiativeContext: "test-applepay-qa15.vercel.app",
    },
    json: true,
  };

  request.post(options, function (error, response, body) {
    if (error) return res.send(error.message);
    res.send(body);
  });
}
