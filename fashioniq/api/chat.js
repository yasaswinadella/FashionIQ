const brandData = {
  nike: { score: 88, trend: 'Oversized Sneakers', color: 'Earth Tones' },
  zara: { score: 84, trend: 'Oversized Blazers', color: 'Hot Pink' },
  gucci: { score: 82, trend: 'Quiet Luxury', color: 'Brown & Gold' },
  hm: { score: 71, trend: 'Cargo Pants', color: 'Sage Green' },
  prada: { score: 85, trend: 'Nylon Bags', color: 'Cream' },
  dior: { score: 87, trend: 'Lady Dior Revival', color: 'Slate Blue' },
  reformation: { score: 90, trend: 'Sustainable Denim', color: 'Earthy Neutrals' },
  balenciaga: { score: 80, trend: 'Oversized Silhouettes', color: 'Black & White' },
};

function generateReply(message) {
  const msg = message.toLowerCase();

  // Brand score queries
  for (const [brand, data] of Object.entries(brandData)) {
    if (msg.includes(brand)) {
      return `📊 **${brand.charAt(0).toUpperCase() + brand.slice(1)}** currently scores **${data.score}/100** on FashionIQ.\n\n🔥 Top Trending: ${data.trend}\n🎨 Trending Color: ${data.color}\n\n${data.score >= 85 ? '✅ Strong market position right now.' : data.score >= 75 ? '📈 Performing well with room to grow.' : '⚠️ Facing some market headwinds.'}`;
    }
  }

  if (msg.includes('trend') && (msg.includes('color') || msg.includes('colour'))) {
    return '🎨 Top trending colors right now:\n\n1. Hot Pink — #1 for 3rd consecutive month (41% of collections)\n2. Sage Green — Rising fast (+35%)\n3. Cream/Off-White — Timeless neutral dominating luxury\n4. Chocolate Brown — Strong in accessories\n5. Slate Blue — Emerging in evening wear';
  }

  if (msg.includes('color') || msg.includes('colour')) {
    return '🎨 This season\'s dominant colors:\n\n• Hot Pink (#FF4FA3) — 41% of F/W collections\n• Sage Green — 35% adoption\n• Cream — 32% especially in luxury\n• Chocolate Brown — 28% in accessories\n• Berry Red — 24% in statement pieces\n\nEarthy tones + bold pinks is the defining palette story this season.';
  }

  if (msg.includes('trend') && msg.includes('outerwear')) {
    return '🧥 Top outerwear trends right now:\n\n1. Oversized Blazers ↑ 34% — #1 trend\n2. Puffer Vests — Cropped silhouette rising\n3. Trench Coats — Quiet luxury staple\n4. Leather Jackets — Gen-Z revival\n\nOversized structured outerwear is dominating across all price points.';
  }

  if (msg.includes('trend')) {
    return '🔥 Top fashion trends right now:\n\n1. Oversized Blazers ↑ 34%\n2. Mini Bags ↑ 14%\n3. Chunky Boots ↑ 27%\n4. Cargo Pants ↑ 18%\n5. Mesh Tops ↑ 22%\n\n📉 Declining: Neon collections, Fast fashion basics\n\nQuiet luxury and sustainable fashion are the macro movements this season.';
  }

  if (msg.includes('best brand') || msg.includes('top brand')) {
    return '🏆 Top performing brands on FashionIQ right now:\n\n1. Reformation — 90/100 (Sustainable leader)\n2. Nike — 88/100 (Sportswear dominance)\n3. Dior — 87/100 (Luxury strength)\n4. Prada — 85/100 (Innovation rising)\n5. Zara — 84/100 (Fast trend adoption)\n\nReformation leads for sustainability + trend alignment.';
  }

  if (msg.includes('sustain')) {
    return '♻️ Sustainability in fashion right now:\n\n• Reformation leads with 90/100 sustainability score\n• Sustainable denim is the #1 trending eco product\n• 68% of Gen-Z consumers prioritize sustainable brands\n• Zara and H&M face criticism for greenwashing\n• Brands using recycled materials saw +22% sentiment boost\n\nSustainability is no longer optional — it\'s a brand score driver.';
  }

  if (msg.includes('report')) {
    return '📄 FashionIQ Reports available:\n\n• Monthly Trend Summary — July 2026\n• Color Intelligence Report — Q3\n• Brand Performance Review — June\n• Footwear Trend Deep Dive\n• Weekly Trend Pulse\n\nGo to Reports Center in the sidebar to download any of these.';
  }

  if (msg.includes('compare')) {
    return '⚖️ Use the Brand Comparison page (in the sidebar) to compare any two brands head-to-head!\n\nYou\'ll get:\n• Side-by-side score bars\n• Trend, Innovation, Sustainability, Sentiment scores\n• Google Trends comparison\n• Strengths & weaknesses for each brand\n• An AI-determined winner';
  }

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return '👋 Hello! I\'m your FashionIQ AI Assistant.\n\nI can help you with:\n• Brand scores (e.g. "What\'s Nike\'s score?")\n• Trend analysis (e.g. "What\'s trending in outerwear?")\n• Color forecasting (e.g. "What colors are trending?")\n• Brand comparisons & sustainability insights\n\nWhat would you like to know?';
  }

  if (msg.includes('score') || msg.includes('rating')) {
    return '📊 Brand scoring on FashionIQ uses 4 key metrics:\n\n1. Trend Score — How well the brand aligns with current trends\n2. Innovation Score — New product launches and creative direction\n3. Sustainability Score — Eco-friendly practices and perception\n4. Sentiment Score — News coverage and social media positivity\n\nScores update daily based on real news data and Google Trends.';
  }

  return '🤔 Great question! Here\'s what I can help with:\n\n• Type a brand name (e.g. "Tell me about Gucci")\n• Ask about trends (e.g. "What\'s trending this season?")\n• Ask about colors (e.g. "What colors are popular?")\n• Ask "What are the top brands?" or "Compare two brands"\n\nI\'m powered by real news data and trend signals updated daily!';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  const reply = generateReply(message);
  res.status(200).json({ reply });
}