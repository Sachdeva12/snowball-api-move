// pages/api/move-segmentation.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { affiliate_id, segmentation_id } = req.body;

    if (!affiliate_id || !segmentation_id) {
      return res.status(400).json({ error: "Missing affiliate_id or segmentation_id" });
    }

    const response = await fetch("https://api.socialsnowball.io/api/affiliates/segmentation/move", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.API_KEY}`, // 👈 keep secret in .env.local
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        affiliate_id,
        segmentation_id
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    res.status(200).json(data);

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
