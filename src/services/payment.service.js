import axios from "axios";
import db from "../models";
import env from "dotenv";
env.config();

const create = async (data) => {
  const fee = await db.Fees.findOne({
    where: {
      id: data.fee_id,
    },
    raw: true,
    nest: true,
  });

  if (fee && +fee.status != 1) {
    var accessKey = process.env.accessKey;
    var secretKey = process.env.secretKey;
    var orderInfo = fee.name;
    var partnerCode = "MOMO";
    var redirectUrl = process.env.redirectUrl;
    var ipnUrl = process.env.ipnUrl;
    var requestType = "payWithMethod";
    var amount = fee.price;
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = btoa(data.id);
    var orderGroupId = "";
    var autoCapture = true;
    var lang = "vi";

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------");
    console.log(rawSignature);
    //signature
    const crypto = require("crypto");
    var signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");
    console.log("--------------------SIGNATURE----------------");
    console.log(signature);

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature,
    });

    const options = {
      method: "POST",
      url: "https://test-payment.momo.vn/v2/gateway/api/create",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
      data: requestBody,
    };
    try {
      const result = await axios(options);
      return { status: 200, message: "success", code: 0, data: result.data };
    } catch (error) {
      return { status: 500, message: "success", code: -1, data: error };
    }
  }
  return { status: 404, code: 1, message: "Fee not found", data: "" };
};
const callback = async (data) => {
  try {
    console.log(data);
    if (data.resultCode == 0) {
      let time = new Date(data.responseTime);
      console.log(
        time,
        data.extraData,
        data.orderInfo,
        data.orderType,
        data.payType
      );
      const update = await db.Paymenthistories.update(
        {
          paymentstatus_id: 1,
          time: time,
          orderInfo: data.orderInfo,
          orderType: data.orderType,
          payType: data.payType,
        },
        {
          where: {
            id: atob(data.extraData),
          },
        }
      );
      if (update) {
        return { status: 200, message: "success", code: 0, data: data };
      }
    }
    return { status: 200, message: "success", code: 1, data: data };
  } catch (error) {
    return { status: 500, message: "success", code: -1, data: error };
  }
};
module.exports = { create, callback };
