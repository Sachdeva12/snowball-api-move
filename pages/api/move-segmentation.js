// pages/api/move-segmentation.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST is allowed" });
  }

  try {
    const response = await fetch(
      "https://api.socialsnowball.io/api/affiliates/segmentation/move",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    const text = await response.text(); // Get raw body
    let data;
    try {
      data = JSON.parse(text); // Try parse JSON
    } catch {
      data = { raw: text }; // If not JSON, return raw
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
