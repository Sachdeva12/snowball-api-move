// pages/api/move-segmentation.js
export default async function handler(req, res) {
  const url = "https://api.socialsnowball.io/api/affiliates/segmentation/move";

  try {
    if (req.method === "POST") {
      // Forward POST request
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      if (!response.ok) return res.status(response.status).json({ error: data });

      return res.status(200).json(data);
    }

    if (req.method === "GET") {
      // Forward GET request
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) return res.status(response.status).json({ error: data });

      return res.status(200).json(data);
    }

    // Method not allowed
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
