import { NextResponse } from "next/server";

const SHIPPING_URL =
  "https://amazon-node-api-a4i2.onrender.com/api/orderShipping/address";

export async function POST(request) {
  try {
    const body = await request.json();

    const amazonOrderId =
      body?.AmazonOrderId ||
      body?.amazonOrderId ||
      body?.orderId ||
      body?.rawOrder?.AmazonOrderId;

    const marketplaceId =
      body?.MarketplaceId ||
      body?.marketplaceId ||
      body?.rawOrder?.MarketplaceId;

    if (!amazonOrderId) {
      return NextResponse.json(
        {
          success: false,
          message: "AmazonOrderId is required",
          receivedBody: body,
        },
        { status: 400 }
      );
    }

    const payloadVariants = [
      { AmazonOrderId: amazonOrderId },
      { amazonOrderId: amazonOrderId },
      { orderId: amazonOrderId },
      { AmazonOrderId: amazonOrderId, MarketplaceId: marketplaceId },
      { amazonOrderId: amazonOrderId, marketplaceId: marketplaceId },
      { orderId: amazonOrderId, marketplaceId: marketplaceId },
    ];

    let lastFailure = null;

    for (const payload of payloadVariants) {
      const response = await fetch(SHIPPING_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      const rawText = await response.text();

      let parsed;
      try {
        parsed = rawText ? JSON.parse(rawText) : {};
      } catch {
        parsed = { raw: rawText };
      }

      if (response.ok) {
        return NextResponse.json(
          {
            success: true,
            payloadUsed: payload,
            ...parsed,
          },
          { status: 200 }
        );
      }

      lastFailure = {
        status: response.status,
        sentPayload: payload,
        apiResponse: parsed,
      };
    }

    return NextResponse.json(
      {
        success: false,
        message: `Shipping API request failed with status ${lastFailure?.status || 400}`,
        amazonOrderId,
        marketplaceId,
        triedPayloads: payloadVariants,
        lastFailure,
      },
      { status: lastFailure?.status || 400 }
    );
  } catch (error) {
    console.error("order-shipping route error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}