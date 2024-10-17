import { NextResponse } from "next/server";
import {
  FleekSdk,
  ApplicationAccessTokenService,
} from "@fleek-platform/sdk/browser";

export const runtime = "edge";

export default async function Upload(req: Request) {
  console.log("Request body:", req.body); // Log the request body
  const headers = new Headers();
  headers.append("Access-Control-Allow-Origin", "*");
  try {
    console.log("Request body:", req.body); // Log the request body
    const body = await req.json();
    // Logics here
    const applicationService = new ApplicationAccessTokenService({
      clientId: "client_HTtzw0FEqxXyl2ic4dRU",
    });

    const fleekSdk = new FleekSdk({
      accessTokenService: applicationService,
    });

    const uploadResult = await uploadFileToIPFS(
      fleekSdk,
      body,
      new ArrayBuffer(10)
    );
    return NextResponse.json(uploadResult);
  } catch (error) {
    console.error("Error connecting to AI API:", error); // Log the error
    return NextResponse.json(
      { error: "Error communicating with AI" },
      { status: 500 }
    );
  }
}

async function uploadFileToIPFS(
  fleekSdk: FleekSdk,
  fileName: string,
  contentBuffer: ArrayBuffer
) {
  try {
    return await fleekSdk.ipfs().add({
      path: fileName,
      content: contentBuffer,
    });
  } catch (error) {
    console.error("Error uploading file to IPFS:", error); // Log the error
    return NextResponse.json(
      { error: "Error uploading file to IPFS" },
      { status: 500 }
    );
  }
}
