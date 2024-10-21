import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const BE_SERVER_URL = "https://75c5-104-28-254-75.ngrok-free.app";
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // POST request to BE server
    const response = await fetch(`${BE_SERVER_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    // Return the response from the BE server
    if (response.ok) {
      return NextResponse.json({
        message: "File uploaded successfully!",
        data: (await response.json()).data,
      });
    } else {
      return NextResponse.json(
        {
          message: "Error uploading file to BE server",
          status: response.status,
          statusText: response.statusText,
        },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: JSON.stringify(error), status: 500 },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const BE_SERVER_URL = "https://75c5-104-28-254-75.ngrok-free.app";

    const response = await fetch(`${BE_SERVER_URL}`, {
      method: "GET",
    });
    return NextResponse.json({
      message: "GET nothing",
      data: await response.json(),
    });
  } catch (error) {
    console.error("Error GET upload", error); // Log the error
    return NextResponse.json({ error: "Error GET upload" }, { status: 500 });
  }
}

// async function getStaticProps() {
//   // if (!process.env.BE_SERVER_URL) {
//   //   console.error("No BE_SERVER_URL provided"); // Log the error

//   //   throw new Error("No BE_SERVER_URL provided");
//   // }

//   return {
//     props: {
//       BE_SERVER_URL: "https://75c5-104-28-254-75.ngrok-free.app",
//     },
//   };
// }
