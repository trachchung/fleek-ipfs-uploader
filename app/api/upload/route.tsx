import {
  FleekSdk,
  PersonalAccessTokenService,
  UploadProgress,
} from "@fleek-platform/sdk/node";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Logics here
    const staticProps = await getStaticProps();

    if (!staticProps.props.pat || !staticProps.props.projectId) {
      return NextResponse.json(
        { error: "No PAT or Project ID provided" },
        { status: 400 }
      );
    }

    // Logics here
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: staticProps.props.pat,
      projectId: staticProps.props.projectId,
    });

    const fleekSdk = new FleekSdk({
      accessTokenService: accessTokenService,
    });

    const uploadResult = await fleekSdk.storage().uploadFile({
      file: file,
      onUploadProgress: onUploadProgress,
    });

    console.log("uploadResult", uploadResult);
    console.log("File uploaded successfully!");
    return NextResponse.json({ message: "File uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading file to IPFS:", error); // Log the error
    return NextResponse.json(
      { error: "Error uploading file to IPFS" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const cid = searchParams.get("cid");

    if (!cid) {
      return NextResponse.json({ error: "No CID provided" }, { status: 400 });
    }

    const staticProps = await getStaticProps();

    if (!staticProps.props.pat || !staticProps.props.projectId) {
      return NextResponse.json(
        { error: "No PAT or Project ID provided" },
        { status: 400 }
      );
    }

    // Logics here
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: staticProps.props.pat,
      projectId: staticProps.props.projectId,
    });

    const fleekSdk = new FleekSdk({
      accessTokenService: accessTokenService,
    });

    const storagePin = await fleekSdk.storage().get({
      cid: cid,
    });
    return NextResponse.json({
      message: "File get successfully!",
      data: storagePin,
    });
  } catch (error) {
    console.error("Error uploading file to IPFS:", error); // Log the error
    return NextResponse.json(
      { error: "Error uploading file to IPFS" },
      { status: 500 }
    );
  }
}

const onUploadProgress = ({ loadedSize, totalSize }: UploadProgress) => {
  if (loadedSize > 0) {
    console.log("loaded size:", loadedSize);
    console.log("total size:", totalSize);
  }
};

async function getStaticProps() {
  try {
    return {
      props: {
        pat: process.env.FLEEK_TOKEN,
        projectId: process.env.PROJECT_ID,
      },
    };
  } catch (error) {
    console.error("Error getting static props:", error); // Log the error
    return {
      props: {
        pat: "",
        projectId: "",
      },
    };
  }
}
