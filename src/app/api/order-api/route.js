import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const res = await fetch("https://amazon-node-api-a4i2.onrender.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const rawText = await res.text();

    let parsedData;
    try {
      parsedData = JSON.parse(rawText);
    } catch {
      parsedData = null;
    }

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message: parsedData?.message || "External API request failed",
          status: res.status,
          externalResponse: parsedData || rawText || "No response body",
          payload: { Orders: [] },
        },
        { status: res.status }
      );
    }

    return NextResponse.json({
      success: true,
      status: res.status,
      payload: {
        Orders: parsedData?.payload?.Orders || [],
      },
      message:
        (parsedData?.payload?.Orders || []).length > 0
          ? "Orders fetched successfully"
          : "No orders found for selected date",
    });
  } catch (error) {
    console.error("Order API Route Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong while fetching orders",
        payload: { Orders: [] },
      },
      { status: 500 }
    );
  }
}