import * as fs from "node:fs";

const cert = fs.readFileSync("../../../merchant_id.cer", "utf8");

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
    if (error) throw new Error(error);
    res.send(body);
  });
}
