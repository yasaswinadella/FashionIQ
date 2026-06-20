import React from 'react';
import { Check, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for exploring FashionIQ.',
    color: 'border-ink-700',
    badge: null,
    features: [
      '3 brand searches/day',
      'Basic brand score',
      'Strengths & weaknesses',
      'Latest news feed',
    ],
    cta: 'Get Started Free',
    ctaStyle: 'bg-ink-800 text-white hover:bg-ink-700',
    link: '/register',
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For fashion founders and brand managers.',
    color: 'border-primary-600',
    badge: 'MOST POPULAR',
    features: [
      'Unlimited brand searches',
      'Full score breakdown',
      'Daily score updates',
      'Watchlist — track 10 brands',
      'Brand comparison tool',
      'Trend & decline tracking',
      'News & sentiment analysis',
    ],
    cta: 'Start Pro',
    ctaStyle: 'bg-primary-600 text-white hover:bg-primary-700 shadow-glow',
    link: '/register',
  },
  {
    name: 'Business',
    price: '$99',
    period: '/month',
    description: 'For agencies and retail teams.',
    color: 'border-purple-500/50',
    badge: null,
    features: [
      'Everything in Pro',
      'Watchlist — track 50 brands',
      'Competitor monitoring',
      'Downloadable PDF reports',
      'AI-generated insights',
      'Team access (5 seats)',
      'Priority support',
    ],
    cta: 'Start Business',
    ctaStyle: 'bg-purple-600 text-white hover:bg-purple-700',
    link: '/register',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'For luxury fashion houses & retailers.',
    color: 'border-amber-500/30',
    badge: null,
    features: [
      'Everything in Business',
      'Unlimited brand tracking',
      'White-label reports',
      'Custom AI models',
      'API access',
      'Dedicated account manager',
      'SLA & compliance support',
    ],
    cta: 'Contact Us',
    ctaStyle: 'bg-amber-600 text-white hover:bg-amber-700',
    link: '/register',
  },
];

export default function Pricing() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Simple, Transparent Pricing</h1>
        <p className="text-ink-400">Choose the plan that fits your brand intelligence needs.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => (
          <div key={plan.name}
            className={`bg-ink-900 rounded-2xl border ${plan.color} p-5 flex flex-col relative hover:-translate-y-1 transition`}>
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-glow">
                  {plan.badge}
                </span>
              </div>
            )}

            <div className="mb-4">
              <h3 className="font-bold text-white text-lg">{plan.name}</h3>
              <div className="flex items-end gap-1 mt-1">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-ink-400 text-sm mb-1">{plan.period}</span>
              </div>
              <p className="text-xs text-ink-400 mt-1">{plan.description}</p>
            </div>

            <ul className="space-y-2 flex-1 mb-5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-ink-100">
                  <Check size={14} className="text-primary-400 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Link to={plan.link}
              className={`w-full py-2.5 rounded-xl font-semibold text-sm text-center transition ${plan.ctaStyle} flex items-center justify-center gap-2`}>
              {plan.name === 'Pro' && <Zap size={15} />}
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="bg-ink-900 rounded-2xl border border-ink-800 p-6">
        <h2 className="text-lg font-bold text-white mb-4">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ['How often are scores updated?', 'Pro and above plans get daily score updates powered by real Google Trends, News API, and Claude AI analysis.'],
            ['What brands can I search?', 'Any fashion brand — from luxury houses like Chanel and Gucci to fast fashion brands like Zara and H&M.'],
            ['Can I cancel anytime?', 'Yes, all plans are billed monthly with no lock-in. Cancel anytime from your account settings.'],
            ['Is there an API?', 'Enterprise plans include full API access to integrate FashionIQ data into your own tools and dashboards.'],
          ].map(([q, a]) => (
            <div key={q} className="bg-ink-800 rounded-xl p-4">
              <p className="font-semibold text-white text-sm mb-1">{q}</p>
              <p className="text-ink-400 text-xs">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}