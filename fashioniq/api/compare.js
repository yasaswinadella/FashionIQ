export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { brand1, brand2 } = req.body;
  if (!brand1 || !brand2) return res.status(400).json({ error: 'Two brand names required' });

  try {
    const [res1, res2] = await Promise.all([
      fetch(`${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/api/brand`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand: brand1 })
      }),
      fetch(`${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/api/brand`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand: brand2 })
      })
    ]);

    const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

    res.status(200).json({ brand1: data1, brand2: data2 });
  } catch (err) {
    res.status(500).json({ error: 'Comparison failed. Please try again.' });
  }
}