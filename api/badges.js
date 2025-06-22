export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  try {
    const badgeRes = await fetch(`https://badges.roblox.com/v1/users/${userId}/badges?limit=10&sortOrder=Desc`);
    const data = await badgeRes.json();
    res.setHeader('Cache-Control', 's-maxage=60');
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch badge data' });
  }
}
