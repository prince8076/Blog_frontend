import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Google AdSense slot. Renders NOTHING until the site owner has:
//  1. an approved AdSense account, and
//  2. set REACT_APP_ADSENSE_CLIENT_ID (e.g. ca-pub-XXXXXXXXXXXXXXXX) and
//     REACT_APP_ADSENSE_SLOT (an ad-unit ID from AdSense) as Netlify
//     environment variables, then redeployed.
// That is deliberate: without a real publisher ID there is no real ad to
// show, and a placeholder box would be fake inventory. When only the
// client ID is set (Auto Ads enabled in AdSense), Google places ads
// automatically and this manual slot stays empty — use one or the other,
// not both on the same page, to avoid duplicate ads.
const CLIENT_ID = process.env.REACT_APP_ADSENSE_CLIENT_ID;
const SLOT_ID = process.env.REACT_APP_ADSENSE_SLOT;

const AdSlot = ({ label = 'Advertisement' }) => {
  useEffect(() => {
    if (!CLIENT_ID || !SLOT_ID) return;
    const existing = document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');
    const push = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // AdSense blocked (ad blocker, network) — leave the slot empty.
      }
    };
    if (existing) {
      push();
      return;
    }
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT_ID}`;
    script.crossOrigin = 'anonymous';
    script.onload = push;
    document.head.appendChild(script);
  }, []);

  if (!CLIENT_ID || !SLOT_ID) return null;

  return (
    <div className="ad-slot" aria-label={label}>
      <span className="ad-label">{label}</span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={CLIENT_ID}
        data-ad-slot={SLOT_ID}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <style>{`
        .ad-slot {
          margin: 2rem 0;
          min-height: 0;
        }
        .ad-label {
          display: block;
          font-size: 0.75rem;
          color: #999999;
          text-align: center;
          margin-bottom: 0.25rem;
        }
      `}</style>
    </div>
  );
};

AdSlot.propTypes = {
  label: PropTypes.string
};

export default AdSlot;
