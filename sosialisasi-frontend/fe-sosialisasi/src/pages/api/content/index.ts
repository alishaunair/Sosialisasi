import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import formidable from "formidable";
import fs from "fs";
import { JWTExtended } from "@/types/Auth";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const token: JWTExtended | null = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  if (!token || !token.user || !token.user.accessToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token tidak valid atau tidak lengkap." });
  }

  try {
    const form = formidable({});
    console.log("[API ROUTE] Cekpoint 2: Formidable siap mem-parse.");

    const [fields, files] = await form.parse(req);
    console.log("[API ROUTE] Cekpoint 3: Form berhasil di-parse.", {
      fields,
      files,
    });

    const backendFormData = new FormData();

    for (const key in fields) {
      if (fields[key]) {
        backendFormData.append(key, fields[key][0]);
      }
    }

    if (files.file && files.file[0]) {
      const file = files.file[0];
      console.log(
        "[API ROUTE] Cekpoint 4: File ditemukan, sedang diproses.",
        file.originalFilename,
      );
      const blob = new Blob([fs.readFileSync(file.filepath)], {
        type: file.mimetype || undefined,
      });
      backendFormData.append(
        "file",
        blob,
        file.originalFilename || "upload.jpg",
      );
    }

    const backendResponse = await fetch(
      "http://localhost:3001/api/upload/content",
      {
        method: "POST",
        body: backendFormData,
        headers: {
          Authorization: `Bearer ${token.user.accessToken}`,
        },
      },
    );

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      throw new Error(data.message || "Backend Express menolak permintaan.");
    }

    return res.status(201).json(data);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
