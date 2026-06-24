import { useEffect } from 'react';

const styles = `
  #legal-page {
    --navy: #0D1B2A;
    --navy-light: #1e3148;
    --gold: #C9A84C;
    --gold-light: #e0c06e;
    --white: #ffffff;
    --gray-100: #f8f9fa;
    --gray-200: #e9ecef;
    --gray-400: #9ca3af;
    --gray-600: #6b7280;
    --gray-800: #1f2937;
    --text-body: #2d3748;
    font-family: 'Inter', sans-serif;
    color: var(--text-body);
    line-height: 1.75;
    font-size: 15px;
  }

  /* HERO */
  #legal-page .lp-hero {
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
    padding: 60px 40px 50px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  #legal-page .lp-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(201,168,76,0.03) 40px, rgba(201,168,76,0.03) 41px);
  }
  #legal-page .lp-hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: 36px;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 12px;
    position: relative;
    line-height: 1.25;
  }
  #legal-page .lp-hero h1 span { color: var(--gold); }
  #legal-page .lp-subtitle {
    font-size: 13px;
    color: var(--gray-400);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 20px;
    position: relative;
  }
  #legal-page .lp-badge {
    display: inline-block;
    background: rgba(201,168,76,0.15);
    border: 1px solid rgba(201,168,76,0.4);
    color: var(--gold-light);
    font-size: 12px;
    font-weight: 500;
    padding: 6px 18px;
    border-radius: 20px;
    letter-spacing: 0.5px;
    position: relative;
  }

  /* ATTORNEY NOTE */
  #legal-page .lp-attorney {
    background: #fff8e6;
    border-left: 4px solid var(--gold);
    margin: 36px auto;
    max-width: 900px;
    padding: 16px 22px;
    border-radius: 0 6px 6px 0;
    font-size: 13px;
    color: #7a5c0a;
    line-height: 1.6;
  }
  #legal-page .lp-attorney strong { font-weight: 600; }

  /* PAGE LAYOUT */
  #legal-page .lp-layout {
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 40px 80px;
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 60px;
    align-items: start;
  }

  /* TOC */
  #legal-page .lp-toc {
    position: sticky;
    top: 30px;
    padding-top: 40px;
  }
  #legal-page .lp-toc-label {
    font-size: 10px;
    font-weight: 600;
    color: var(--gray-400);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 14px;
  }
  #legal-page .lp-toc ul {
    list-style: none;
    padding: 0;
    border-left: 2px solid var(--gray-200);
  }
  #legal-page .lp-toc ul li a {
    display: block;
    padding: 5px 0 5px 16px;
    font-size: 12px;
    color: var(--gray-600);
    text-decoration: none;
    font-weight: 400;
    border-left: 2px solid transparent;
    margin-left: -2px;
    transition: color 0.2s, border-color 0.2s;
  }
  #legal-page .lp-toc ul li a:hover {
    color: var(--navy);
    border-left-color: var(--gold);
  }

  /* CONTENT */
  #legal-page .lp-content { padding-top: 40px; }
  #legal-page .lp-section {
    margin-bottom: 48px;
    padding-bottom: 48px;
    border-bottom: 1px solid var(--gray-200);
  }
  #legal-page .lp-section:last-child { border-bottom: none; }
  #legal-page .lp-eyebrow {
    font-size: 10px;
    font-weight: 600;
    color: var(--gold);
    letter-spacing: 2.5px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  #legal-page .lp-section h2 {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--navy);
    margin-bottom: 16px;
    line-height: 1.3;
  }
  #legal-page .lp-section h3 {
    font-size: 15px;
    font-weight: 600;
    color: var(--navy);
    margin: 22px 0 10px;
  }
  #legal-page .lp-section p {
    margin-bottom: 14px;
    font-size: 14.5px;
    color: var(--text-body);
  }
  #legal-page .lp-section ul,
  #legal-page .lp-section ol {
    margin: 10px 0 16px 20px;
    font-size: 14.5px;
    color: var(--text-body);
  }
  #legal-page .lp-section li { margin-bottom: 8px; padding-left: 4px; }
  #legal-page .lp-section a { color: var(--navy); }
  #legal-page .lp-section a:hover { color: var(--gold); }

  /* HIGHLIGHT BOX */
  #legal-page .lp-highlight {
    background: var(--gray-100);
    border: 1px solid var(--gray-200);
    border-radius: 8px;
    padding: 18px 22px;
    margin: 18px 0;
    font-size: 14px;
  }
  #legal-page .lp-highlight p { margin-bottom: 0; }

  /* CAPS BLOCK */
  #legal-page .lp-caps {
    background: var(--gray-100);
    border: 1px solid var(--gray-200);
    border-radius: 6px;
    padding: 16px 20px;
    margin: 14px 0;
    font-size: 12.5px;
    font-weight: 500;
    color: var(--gray-800);
    line-height: 1.65;
    letter-spacing: 0.2px;
  }

  /* IP GRID */
  #legal-page .lp-ip-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin: 18px 0;
  }
  #legal-page .lp-ip-item {
    background: var(--navy);
    border-radius: 6px;
    padding: 14px 16px;
  }
  #legal-page .lp-ip-mark {
    font-family: 'Playfair Display', serif;
    font-size: 13px;
    font-weight: 600;
    color: var(--gold);
    margin-bottom: 4px;
  }
  #legal-page .lp-ip-desc {
    font-size: 12px;
    color: var(--gray-400);
    line-height: 1.4;
  }

  /* CONTACT BLOCK */
  #legal-page .lp-contact {
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
    border-radius: 10px;
    padding: 30px 34px;
    margin-top: 18px;
  }
  #legal-page .lp-contact h3 {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    color: var(--gold) !important;
    margin-top: 0 !important;
    margin-bottom: 16px;
  }
  #legal-page .lp-contact a {
    color: var(--gray-400);
    font-size: 14px;
    text-decoration: none;
  }
  #legal-page .lp-contact a:hover { color: var(--gold-light); }
  #legal-page .lp-contact-line {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    color: var(--gray-400);
    font-size: 14px;
  }
  #legal-page .lp-dot {
    width: 5px;
    height: 5px;
    background: var(--gold);
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    #legal-page .lp-hero { padding: 40px 24px 36px; }
    #legal-page .lp-hero h1 { font-size: 24px; }
    #legal-page .lp-layout {
      grid-template-columns: 1fr;
      padding: 0 24px 60px;
      gap: 0;
    }
    #legal-page .lp-toc { position: static; padding-top: 20px; }
    #legal-page .lp-ip-grid { grid-template-columns: 1fr; }
    #legal-page .lp-attorney { margin: 24px; }
  }
`;

export default function LegalPage() {
  useEffect(() => {
    const id = 'pg-legal-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div id="legal-page">
      <style>{styles}</style>

      {/* ── HERO ── */}
      <div className="lp-hero">
        <p className="lp-subtitle">Rise to Purpose LLC — Official Website Policy</p>
        <h1>Terms of Service, Legal Notice <span>&amp; Privacy Policy</span></h1>
        <span className="lp-badge">Effective Date: July 15, 2026</span>
      </div>

      {/* ── ATTORNEY NOTE ── */}
      <div className="lp-attorney">
        <strong>&#9878; Attorney Review Recommended:</strong> This document integrates Shopify platform terms with Poised Gentlemen's organizational policies. Because Poised Gentlemen serves minors and collects user data, we strongly recommend review by a licensed Louisiana attorney prior to publishing — especially Sections 6 (Children's Privacy / COPPA), 14 (Returns &amp; Refunds), and 19 (Indemnification).
      </div>

      {/* ── LAYOUT ── */}
      <div className="lp-layout">

        {/* ── TOC ── */}
        <aside className="lp-toc">
          <p className="lp-toc-label">On This Page</p>
          <ul>
            <li><a href="#s1">1. Who We Are</a></li>
            <li><a href="#s2">2. Access &amp; Account</a></li>
            <li><a href="#s3">3. Intellectual Property</a></li>
            <li><a href="#s4">4. Permitted Use &amp; Prohibited Conduct</a></li>
            <li><a href="#s5">5. Programs &amp; Services</a></li>
            <li><a href="#s6">6. Orders</a></li>
            <li><a href="#s7">7. Products, Prices &amp; Billing</a></li>
            <li><a href="#s8">8. Shipping &amp; Delivery</a></li>
            <li><a href="#s9">9. Third-Party Links &amp; Tools</a></li>
            <li><a href="#s10">10. Relationship with Shopify</a></li>
            <li><a href="#s11">11. Privacy &amp; Children</a></li>
            <li><a href="#s12">12. Data We Collect</a></li>
            <li><a href="#s13">13. Analytics &amp; Cookies</a></li>
            <li><a href="#s14">14. Returns &amp; Refunds</a></li>
            <li><a href="#s15">15. Feedback &amp; User Content</a></li>
            <li><a href="#s16">16. Errors &amp; Omissions</a></li>
            <li><a href="#s17">17. Disclaimer of Warranties</a></li>
            <li><a href="#s18">18. Limitation of Liability</a></li>
            <li><a href="#s19">19. Indemnification</a></li>
            <li><a href="#s20">20. Severability, Waiver &amp; Assignment</a></li>
            <li><a href="#s21">21. Governing Law</a></li>
            <li><a href="#s22">22. Policy Changes</a></li>
            <li><a href="#s23">23. Contact Us</a></li>
          </ul>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="lp-content">

          {/* S1 */}
          <section className="lp-section" id="s1">
            <p className="lp-eyebrow">Section 01</p>
            <h2>Who We Are</h2>
            <p>Poised Gentlemen is a registered trade name operated by <strong>Rise to Purpose LLC</strong>, a Delaware limited liability company authorized to conduct business in the State of Louisiana, with principal operations in New Orleans, Louisiana. We are a youth character development social enterprise dedicated to building men and building communities.</p>
            <p>Throughout these Terms of Service, the terms "we," "us," and "our" refer to Rise to Purpose LLC, operating as Poised Gentlemen. We operate this website — poisedgentlemen.com — and all related information, content, features, tools, products, and services (the "Services").</p>
            <p>Poised Gentlemen Institute (PGI) is a separate nonprofit entity in formation under Louisiana law. References to "Poised Gentlemen" or "we" on this Site refer to Rise to Purpose LLC unless otherwise explicitly stated.</p>
            <p>Our online store is powered by Shopify. Any sales and purchases made through our store are made directly with Rise to Purpose LLC d/b/a Poised Gentlemen — not with Shopify.</p>
            <div className="lp-highlight">
              <p><strong>Rise to Purpose LLC</strong> &nbsp;|&nbsp; New Orleans, Louisiana &nbsp;|&nbsp; <a href="mailto:david@risetopurpose.org">david@risetopurpose.org</a> &nbsp;|&nbsp; <a href="tel:5044849037">504-484-9037</a> &nbsp;|&nbsp; <a href="https://poisedgentlemen.com">poisedgentlemen.com</a></p>
            </div>
          </section>

          {/* S2 */}
          <section className="lp-section" id="s2">
            <p className="lp-eyebrow">Section 02</p>
            <h2>Access &amp; Account</h2>
            <p>By visiting, interacting with, or using our Services — including accessing or browsing this Site or purchasing any products or services we offer — you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, you should not use or access our Services.</p>
            <h3>Age Requirement</h3>
            <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. If you are the parent or legal guardian of a minor, you accept these Terms on your minor's behalf and take full responsibility for their compliance. You represent that you have given us consent to allow any of your minor dependents to use the Services on devices you own, purchase, or manage.</p>
            <h3>Account Information</h3>
            <p>To use certain Services — including accessing our online store or purchasing products — you may be required to provide information such as your email address, billing, payment, and shipping details. You represent and warrant that all information you provide is correct, current, and complete, and that you have all rights necessary to provide it.</p>
            <h3>Account Security</h3>
            <p>You are solely responsible for maintaining the security of your account credentials and for all activity that occurs under your account. You may not transfer, sell, assign, or license your account to any other person. Notify us immediately at <a href="mailto:david@risetopurpose.org">david@risetopurpose.org</a> if you suspect any unauthorized use of your account.</p>
          </section>

          {/* S3 */}
          <section className="lp-section" id="s3">
            <p className="lp-eyebrow">Section 03</p>
            <h2>Intellectual Property Rights</h2>
            <p>Our Services — including all trademarks, brands, text, displays, images, graphics, product reviews, video, audio, curriculum frameworks, program models, and the design, selection, and arrangement thereof — are owned by Rise to Purpose LLC or its licensors and are protected by U.S. and foreign patent, copyright, and other intellectual property laws.</p>
            <p>These Terms permit you to use the Services for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, republish, download, store, or transmit any material from the Services without our prior written consent. All rights not expressly granted herein are reserved by Rise to Purpose LLC.</p>
            <h3>Protected Marks &amp; Assets</h3>
            <p>The following names, marks, and systems are proprietary to Rise to Purpose LLC:</p>
            <div className="lp-ip-grid">
              <div className="lp-ip-item"><div className="lp-ip-mark">The Poised Method&#8482;</div><div className="lp-ip-desc">Proprietary character development framework &amp; delivery system</div></div>
              <div className="lp-ip-item"><div className="lp-ip-mark">Poised Relational Index&#8482; (PRI&#8482;)</div><div className="lp-ip-desc">Proprietary self-report assessment instrument</div></div>
              <div className="lp-ip-item"><div className="lp-ip-mark">Poised Young Gentlemen&#8482; (PYG&#8482;)</div><div className="lp-ip-desc">Flagship 12-week character development cohort program</div></div>
              <div className="lp-ip-item"><div className="lp-ip-mark">Poised Pathfinders&#8482;</div><div className="lp-ip-desc">Youth entrepreneurship and earner development program</div></div>
              <div className="lp-ip-item"><div className="lp-ip-mark">Young-G&#8482; Collection</div><div className="lp-ip-desc">Grooming &amp; fragrance line for young men, ages 10&#8211;17</div></div>
              <div className="lp-ip-item"><div className="lp-ip-mark">Essence Collection&#8482;</div><div className="lp-ip-desc">12-fragrance adult grooming product line</div></div>
              <div className="lp-ip-item"><div className="lp-ip-mark">Let's Geaux&#8482; &nbsp;|&nbsp; Champion's Crest&#8482;</div><div className="lp-ip-desc">Fragrance names, Young-G Collection</div></div>
              <div className="lp-ip-item"><div className="lp-ip-mark">Legacy Drive&#8482; &nbsp;|&nbsp; Common Ground&#8482;</div><div className="lp-ip-desc">Fragrance names, Young-G Collection</div></div>
              <div className="lp-ip-item"><div className="lp-ip-mark">Game Changer&#8482; Acne Treatment Wash</div><div className="lp-ip-desc">Proprietary grooming product</div></div>
              <div className="lp-ip-item"><div className="lp-ip-mark">The Poised Gentlemen Codex</div><div className="lp-ip-desc">Published work, LCCN 2026934416, Library of Congress</div></div>
            </div>
            <h3>Third-Party Trademarks</h3>
            <p>Shopify's name, logo, and related product and service names, designs, and slogans are trademarks of Shopify Inc. All other marks appearing on the Services not listed above are the trademarks of their respective owners. Requests for licensing of any Poised Gentlemen intellectual property must be directed to <a href="mailto:david@risetopurpose.org">david@risetopurpose.org</a>.</p>
          </section>

          {/* S4 */}
          <section className="lp-section" id="s4">
            <p className="lp-eyebrow">Section 04</p>
            <h2>Permitted Use &amp; Prohibited Conduct</h2>
            <p>You may access and use this Site and Services for lawful, non-commercial personal or legitimate organizational inquiry purposes only. You agree not to use the Services, directly or indirectly, for any of the following:</p>
            <ul>
              <li>Any unlawful, malicious, or fraudulent purpose;</li>
              <li>Violating any international, federal, state, or local regulations, rules, or laws;</li>
              <li>Infringing upon or violating our intellectual property rights or the intellectual property rights of others;</li>
              <li>Harassing, abusing, insulting, harming, defaming, slandering, disparaging, or intimidating any person;</li>
              <li>Transmitting false, misleading, or deceptive information;</li>
              <li>Impersonating Poised Gentlemen, Rise to Purpose LLC, any representative, or any other person or entity;</li>
              <li>Sending or transmitting any junk mail, chain letters, spam, or unsolicited promotional material;</li>
              <li>Uploading or transmitting viruses, malware, or any other malicious code;</li>
              <li>Reproducing, duplicating, copying, selling, reselling, or exploiting any portion of the Services without written permission;</li>
              <li>Collecting or tracking the personal information of others without authorization;</li>
              <li>Spamming, phishing, pharming, pretexting, spidering, crawling, or scraping the Site;</li>
              <li>Interfering with or circumventing security features of the Services or the internet;</li>
              <li>Using Site content for competitive intelligence, product replication, or commercial resale without authorization;</li>
              <li>Any other conduct that restricts or inhibits anyone's use or enjoyment of the Services or may harm Poised Gentlemen, Shopify, or other users.</li>
            </ul>
            <p>We reserve the right to suspend, disable, or terminate your account at any time without notice if we determine you have violated any part of these Terms.</p>
          </section>

          {/* S5 */}
          <section className="lp-section" id="s5">
            <p className="lp-eyebrow">Section 05</p>
            <h2>Programs &amp; Services</h2>
            <p>Information about Poised Gentlemen programs — including PYG, Project Power, mentorship offerings, mentor certification, and related services — is provided for general informational and inquiry purposes only. Program availability, pricing, and structure are subject to change without notice.</p>
            <p>All program proposals and partnership agreements require execution of a formal written agreement between the requesting organization and Rise to Purpose LLC prior to delivery. Submission of an inquiry or proposal form on this Site does not constitute a binding contract or guarantee of service delivery.</p>
            <p>Poised Gentlemen program delivery involving minors requires a signed participant consent and release form from a parent or legal guardian. Delivery within school or organizational settings is governed by the applicable Memorandum of Understanding or Service Agreement between Rise to Purpose LLC and the host organization.</p>
            <p>Nothing on this Site constitutes clinical, therapeutic, or mental health services. Program facilitation provided by Poised Gentlemen is educational and developmental in nature and does not substitute for licensed counseling, therapy, or mental health intervention.</p>
          </section>

          {/* S6 */}
          <section className="lp-section" id="s6">
            <p className="lp-eyebrow">Section 06</p>
            <h2>Orders</h2>
            <p>When you place an order through our store, you are making an <strong>offer to purchase</strong>. Rise to Purpose LLC reserves the right to accept or decline your order for any reason at its discretion. Your order is not accepted until we confirm acceptance. We must receive and process your payment before your order is accepted.</p>
            <p>Please review your order carefully before submitting, as we may be unable to accommodate cancellation requests after an order is accepted. In the event that we do not accept, modify, or cancel an order, we will attempt to notify you using the contact information provided at the time the order was placed.</p>
            <p>Your purchases are subject to return or exchange solely in accordance with our Return &amp; Refund Policy set forth in Section 14 of these Terms.</p>
            <p>You represent and warrant that your purchases are for your own personal or household use and not for commercial resale or export unless you have a separate written licensing or distribution agreement with Rise to Purpose LLC.</p>
          </section>

          {/* S7 */}
          <section className="lp-section" id="s7">
            <p className="lp-eyebrow">Section 07</p>
            <h2>Products, Prices &amp; Billing</h2>
            <h3>Product Representations</h3>
            <p>We have made every effort to accurately represent our products and services in our online store. However, colors or product appearance may differ from how they appear on your screen due to your device type, settings, and display configuration. We do not warrant that the appearance or quality of any products purchased will meet your expectations or be identical to how they are depicted in our store. All product descriptions are subject to change at our sole discretion. We reserve the right to discontinue any product at any time and may limit quantities available to any person, geographic region, or jurisdiction.</p>
            <h3>Pricing</h3>
            <p>All prices are listed in U.S. dollars and are subject to change without notice. The price charged for a product will be the price in effect at the time the order is placed, as confirmed in your order confirmation. Unless otherwise expressly stated, posted prices do not include taxes, shipping, handling, customs, or import charges. Prices offered through our online store may differ from prices offered through third-party retailers or in-person engagements.</p>
            <p>We may offer promotions from time to time that affect pricing, governed by separate terms. Where a conflict exists between promotion terms and these Terms, promotion terms will govern for the applicable transaction.</p>
            <h3>Payment Representations</h3>
            <p>By completing a purchase, you represent and warrant that: (i) the payment information you provide is true, correct, and complete; (ii) you are duly authorized to use the payment method provided; (iii) charges incurred will be honored by your payment provider; and (iv) you will pay all charges incurred at posted prices, including applicable taxes, shipping, and handling.</p>
            <p>You agree to keep your account and payment information current. Rise to Purpose LLC does not store payment card information on its servers. All transactions are processed securely through Stripe.</p>
            <h3>Sales Tax</h3>
            <p>Applicable Louisiana sales tax will be collected on physical product purchases shipped to Louisiana addresses, in accordance with state law. Tax rates are calculated at checkout based on your delivery address.</p>
            <h3>Subscriptions</h3>
            <p>When you purchase a subscription, you will receive repeat deliveries based on the subscription duration and frequency you select at sign-up. Your payment details will be stored securely and you will be charged for each delivery, unless you choose to pay in advance. Some subscriptions may auto-renew at the end of their duration.</p>
            <p>You may cancel or change your subscription at any time. Your order confirmation emails include links to manage your subscription directly. Cancellations take effect at the end of the current billing period. No partial refunds are issued for unused subscription periods. See Section 14 for more details on returns and refunds applicable to subscription orders.</p>
            <h3>Pre-Orders</h3>
            <p>Some items in our store may be available for pre-order — meaning you are purchasing an out-of-stock or soon-to-be-available product not yet in inventory. When you place a pre-order, we may collect no payment or only a partial deposit at checkout. Your payment method will be stored securely and the full or remaining balance will be charged when the order is fulfilled at a future date.</p>
            <p>You may cancel a pre-order that has not yet been fulfilled, provided only a partial deposit has been collected. If your pre-order has already been fulfilled and shipped, the order cannot be cancelled; however, you may request a full or partial refund in accordance with Section 14. We will notify you in advance of any fulfillment charge to the payment method on file.</p>
          </section>

          {/* S8 */}
          <section className="lp-section" id="s8">
            <p className="lp-eyebrow">Section 08</p>
            <h2>Shipping &amp; Delivery</h2>
            <p>Physical products are shipped to the address provided at checkout. All delivery times are estimates only and are not guaranteed. Rise to Purpose LLC is not liable for shipping and delivery delays caused by carrier issues, customs processing, incorrect shipping addresses provided by the customer, or events outside our control.</p>
            <p><strong>Once we transfer products to the shipping carrier, title and risk of loss passes to you.</strong> Any claims for loss or damage during transit should be directed to the carrier. We will assist in facilitating claims where possible but are not liable for carrier-caused loss or damage once the product has left our custody.</p>
          </section>

          {/* S9 */}
          <section className="lp-section" id="s9">
            <p className="lp-eyebrow">Section 09</p>
            <h2>Third-Party Links &amp; Optional Tools</h2>
            <h3>Third-Party Links</h3>
            <p>This Site may contain links to third-party websites, partner organizations, social media platforms, or external resources for your convenience. Rise to Purpose LLC does not endorse, control, or assume responsibility for the content, privacy practices, or accuracy of any third-party websites. Complaints, claims, or concerns regarding third-party products and services should be directed to the relevant third party.</p>
            <p>Your use of any linked third-party site is at your own risk and subject to that site's own terms and privacy policy. Third-party platforms integrated with or linked from this Site may include:</p>
            <ul>
              <li>Shopify (e-commerce platform)</li>
              <li>Stripe (payment processing)</li>
              <li>Google Analytics (site analytics)</li>
              <li>Cal.com (appointment scheduling)</li>
              <li>Social media platforms (Instagram, Facebook, LinkedIn)</li>
            </ul>
            <h3>Optional Third-Party Tools</h3>
            <p>You may be provided with access to optional tools offered by third parties as part of our Services. We neither monitor nor have control over or input into these tools. Access to such tools is provided "as is" and "as available," without any warranty, representation, or endorsement of any kind. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools. Any use of optional tools is entirely at your own risk, and you are responsible for reviewing the applicable third-party terms before use.</p>
            <p>We may offer access to new tools and features in the future; such additions will also be subject to these Terms of Service.</p>
          </section>

          {/* S10 */}
          <section className="lp-section" id="s10">
            <p className="lp-eyebrow">Section 10</p>
            <h2>Relationship with Shopify</h2>
            <p>Poised Gentlemen's online store is powered by Shopify, which enables us to provide e-commerce services to you. However, any sales and purchases you make through our store are made <strong>directly with Rise to Purpose LLC d/b/a Poised Gentlemen</strong>.</p>
            <p>By using the Services, you acknowledge and agree that <strong>Shopify is not responsible for any aspect of any sales between you and Poised Gentlemen</strong>, including any injury, damage, or loss resulting from purchased products or services. You hereby expressly release Shopify and its affiliates from all claims, damages, and liabilities arising from or related to your purchases and transactions with Poised Gentlemen.</p>
            <p>Certain personal information you submit through the Services will be transmitted to and processed by Shopify in order to provide the Services to you. Please review <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noopener noreferrer">Shopify's Privacy Policy</a> for more details.</p>
          </section>

          {/* S11 */}
          <section className="lp-section" id="s11">
            <p className="lp-eyebrow">Section 11</p>
            <h2>Privacy Policy &amp; Children's Privacy</h2>
            <h3>Our Commitment to Privacy</h3>
            <p>All personal information we collect through the Services is subject to our Privacy Policy as set forth in Sections 12 and 13 of these Terms. Rise to Purpose LLC does not sell, rent, or share personal data with third parties for marketing purposes.</p>
            <p>Because our Services are hosted by Shopify, Shopify also collects and processes personal information about your access to and use of the Services. Information you submit may be transmitted to Shopify as well as third parties that may be located in countries other than where you reside. Please review <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noopener noreferrer">Shopify's Privacy Policy</a> for full details.</p>
            <h3>Children Under 13 — COPPA Compliance</h3>
            <p>Poised Gentlemen programs serve participants as young as age five (5). This Site, however, is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13 without verifiable parental or guardian consent, in compliance with the Children's Online Privacy Protection Act (COPPA), 15 U.S.C. § 6501 et seq.</p>
            <p>All participant data collected in the context of program delivery — including health surveys, behavioral assessments, and progress reports — is collected through the host organization under appropriate consent protocols and is not collected directly through this Site.</p>
            <p>If you believe a child under 13 has submitted personal information to this Site without parental consent, please contact us immediately at <a href="mailto:david@risetopurpose.org">david@risetopurpose.org</a> so we can remove it promptly.</p>
            <h3>Users Ages 13&#8211;17</h3>
            <p>Individuals between the ages of 13 and 17 may browse this Site but should not submit forms, make purchases, or provide personal information without the knowledge and consent of a parent or legal guardian.</p>
          </section>

          {/* S12 */}
          <section className="lp-section" id="s12">
            <p className="lp-eyebrow">Section 12</p>
            <h2>Information We Collect</h2>
            <h3>Information You Provide Directly</h3>
            <p>We collect information you voluntarily submit through Site forms, including:</p>
            <ul>
              <li>Name and contact information (email, phone number, organization);</li>
              <li>Program or partnership inquiry details;</li>
              <li>Purchase and billing information processed through Stripe;</li>
              <li>Referral source information (e.g., "How Did You Hear About Us?" responses).</li>
            </ul>
            <h3>Information Collected Automatically</h3>
            <p>When you visit the Site, we may automatically collect:</p>
            <ul>
              <li>Device type, browser, and operating system;</li>
              <li>IP address and general geographic location;</li>
              <li>Pages visited, time on site, and navigation behavior;</li>
              <li>Referring URL or search query that brought you to the Site.</li>
            </ul>
            <h3>How We Use Your Information</h3>
            <p>We use collected information to:</p>
            <ul>
              <li>Respond to program inquiries and proposal requests;</li>
              <li>Process purchases and fulfill product orders;</li>
              <li>Improve Site functionality and user experience;</li>
              <li>Track partnership pipeline and referral attribution;</li>
              <li>Send relevant organizational updates (only with your consent);</li>
              <li>Meet legal, compliance, and reporting obligations.</li>
            </ul>
            <h3>Data Retention</h3>
            <p>We retain personal data only as long as necessary to fulfill the purposes described in this policy or as required by applicable law. You may request deletion of your data at any time by contacting us at <a href="mailto:david@risetopurpose.org">david@risetopurpose.org</a>.</p>
          </section>

          {/* S13 */}
          <section className="lp-section" id="s13">
            <p className="lp-eyebrow">Section 13</p>
            <h2>Analytics &amp; Cookies</h2>
            <p>This Site uses <strong>Google Analytics 4 (GA4)</strong> to collect anonymized data about Site traffic and user behavior. GA4 may use cookies and similar tracking technologies. Data collected via Google Analytics is used solely to understand how visitors interact with this Site and to improve our content and user experience.</p>
            <p>We do not use advertising cookies, retargeting pixels, or tracking technology designed to follow users across unaffiliated websites. We do not share analytics data with advertising networks.</p>
            <p>You may opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a> or by adjusting your browser's cookie settings. Opting out will not affect your ability to access any part of this Site.</p>
            <p>Our e-commerce platform (powered by Shopify) may set functional cookies necessary for cart and checkout operations. These cookies do not collect personal information beyond what is required for transaction processing. Shopify's cookie practices are governed by <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noopener noreferrer">Shopify's Privacy Policy</a>.</p>
          </section>

          {/* S14 */}
          <section className="lp-section" id="s14">
            <p className="lp-eyebrow">Section 14</p>
            <h2>Returns &amp; Refunds</h2>
            <h3>Returns</h3>
            <p>We have a <strong>30-day return policy</strong>, which means you have 30 days after receiving your item to request a return. To be eligible, your item must be in the same condition in which you received it — unworn or unused, with tags attached, and in its original packaging. You will also need your receipt or proof of purchase.</p>
            <p>To initiate a return, contact us at <a href="mailto:david@risetopurpose.org">david@risetopurpose.org</a>. If your return is accepted, we will provide a return shipping label along with instructions on how and where to send your package. <strong>Items sent back without first requesting a return will not be accepted.</strong></p>
            <p>Approved returns should be sent to: <strong>Rise to Purpose LLC, 2339 Almonaster Ave., New Orleans, LA 70117</strong></p>
            <h3>Damages &amp; Issues</h3>
            <p>Please inspect your order upon receipt and contact us <strong>immediately</strong> if your item is defective, damaged, or if you received the wrong item, so we can evaluate the issue and make it right.</p>
            <h3>Non-Returnable Items</h3>
            <p>Certain items are not eligible for return, including:</p>
            <ul>
              <li><strong>Personal care and grooming products</strong> — all items in the Young-G&#8482; Collection, Essence Collection&#8482;, Game Changer&#8482; Acne Treatment Wash, and any other grooming or beauty products;</li>
              <li><strong>The PYG&#8482; Starter Kit</strong> — as a bundled, personalized kit containing personal care items, this product is non-returnable once shipped;</li>
              <li><strong>Custom or personalized items</strong>, including special orders;</li>
              <li><strong>Digital products</strong> — curriculum materials, downloadable resources, and e-books are non-refundable once accessed or downloaded;</li>
              <li><strong>Perishable goods</strong> (food, flowers, or plants);</li>
              <li><strong>Hazardous materials</strong>, flammable liquids, or gases;</li>
              <li><strong>Sale items</strong> and <strong>gift cards</strong>.</li>
            </ul>
            <p>If you are unsure whether your item qualifies for a return, contact us before shipping anything back.</p>
            <h3>Exchanges</h3>
            <p>The fastest way to get the item you want is to return your eligible item first. Once the return is accepted, make a separate purchase for the new item.</p>
            <h3>European Union — 14-Day Cooling Off Period</h3>
            <p>If merchandise is being shipped into the European Union, you have the right to cancel or return your order within 14 days of receipt, for any reason and without justification. Your item must still be in its original condition, unworn or unused, with tags and original packaging. Proof of purchase is required. Non-returnable item categories still apply as permitted under applicable EU consumer protection law.</p>
            <h3>Refunds</h3>
            <p>We will notify you once we have received and inspected your return and will inform you whether your refund has been approved. If approved, your refund will be processed automatically to your original payment method within <strong>10 business days</strong>. Please allow additional time for your bank or credit card company to post the refund.</p>
            <p>If more than <strong>15 business days</strong> have passed since we approved your return and you have not received your refund, contact us at <a href="mailto:david@risetopurpose.org">david@risetopurpose.org</a>.</p>
            <p>Digital products, curriculum materials, and downloadable resources are non-refundable once accessed or downloaded.</p>
          </section>

          {/* S15 */}
          <section className="lp-section" id="s15">
            <p className="lp-eyebrow">Section 15</p>
            <h2>Feedback &amp; User Content</h2>
            <p>If you submit, upload, post, email, or otherwise transmit any ideas, suggestions, feedback, reviews, proposals, or other content (collectively, "Feedback") to Rise to Purpose LLC, you grant us a <strong>perpetual, worldwide, sublicensable, royalty-free license</strong> to use, reproduce, modify, publish, distribute, and display such Feedback in any medium for any purpose — including to operate, provide, evaluate, enhance, improve, and promote our Services.</p>
            <p>You also represent and warrant that: (i) you own or have all necessary rights to all Feedback you submit; (ii) you have disclosed any compensation or incentives received in connection with your submission; and (iii) your Feedback complies with these Terms.</p>
            <p>We are under no obligation to (a) maintain your Feedback in confidence, (b) pay compensation for your Feedback, or (c) respond to your Feedback. We may — but are not obligated to — monitor, edit, or remove Feedback that we determine in our sole discretion to be unlawful, offensive, threatening, defamatory, or otherwise objectionable, or that violates any party's intellectual property or these Terms.</p>
            <p>You are solely responsible for any Feedback you submit and its accuracy.</p>
          </section>

          {/* S16 */}
          <section className="lp-section" id="s16">
            <p className="lp-eyebrow">Section 16</p>
            <h2>Errors, Inaccuracies &amp; Omissions</h2>
            <p>Occasionally there may be information on or in the Services that contains typographical errors, inaccuracies, or omissions relating to product descriptions, pricing, promotions, offers, shipping charges, transit times, or availability. We reserve the right to correct any such errors, inaccuracies, or omissions and to change or update information or cancel orders if any information is inaccurate at any time without prior notice — including after you have submitted your order.</p>
            <p>We undertake no obligation to update, amend, or clarify information in the Services except as required by law.</p>
          </section>

          {/* S17 */}
          <section className="lp-section" id="s17">
            <p className="lp-eyebrow">Section 17</p>
            <h2>Disclaimer of Warranties</h2>
            <p>The information presented on or through the Services is made available solely for general information purposes. We disclaim all liability and responsibility arising from any reliance placed on such materials by you or any other visitor to the Services.</p>
            <div className="lp-caps">EXCEPT AS EXPRESSLY STATED BY RISE TO PURPOSE LLC, THE SERVICES AND ALL PRODUCTS OFFERED THROUGH THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" FOR YOUR USE, WITHOUT ANY REPRESENTATION, WARRANTIES, OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, MERCHANTABLE QUALITY, FITNESS FOR A PARTICULAR PURPOSE, DURABILITY, TITLE, AND NON-INFRINGEMENT. WE DO NOT GUARANTEE, REPRESENT, OR WARRANT THAT YOUR USE OF THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE. SOME JURISDICTIONS LIMIT OR DO NOT ALLOW THE DISCLAIMER OF IMPLIED OR OTHER WARRANTIES, SO THE ABOVE DISCLAIMER MAY NOT APPLY TO YOU IN FULL.</div>
            <p>Program outcomes described on this Site reflect individual and organizational experiences and do not constitute guarantees of specific results. Youth development work involves complex variables; results may differ based on participant engagement, organizational context, and program fidelity.</p>
          </section>

          {/* S18 */}
          <section className="lp-section" id="s18">
            <p className="lp-eyebrow">Section 18</p>
            <h2>Limitation of Liability</h2>
            <div className="lp-caps">TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO CASE SHALL RISE TO PURPOSE LLC, OUR PARTNERS, DIRECTORS, OFFICERS, EMPLOYEES, AFFILIATES, AGENTS, CONTRACTORS, SERVICE PROVIDERS, OR LICENSORS — OR THOSE OF SHOPIFY AND ITS AFFILIATES — BE LIABLE FOR ANY INJURY, LOSS, CLAIM, OR ANY DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, SPECIAL, OR CONSEQUENTIAL DAMAGES OF ANY KIND, INCLUDING, WITHOUT LIMITATION, LOST PROFITS, LOST REVENUE, LOST SAVINGS, LOSS OF DATA, REPLACEMENT COSTS, OR ANY SIMILAR DAMAGES, WHETHER BASED IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR OTHERWISE, ARISING FROM YOUR USE OF ANY OF THE SERVICES OR ANY PRODUCTS PROCURED USING THE SERVICES — EVEN IF ADVISED OF THEIR POSSIBILITY.</div>
            <p>In no event shall Rise to Purpose LLC's total cumulative liability to you for all claims arising from your use of the Site exceed the greater of (a) the amount you paid to us in the twelve (12) months preceding the claim, or (b) one hundred dollars ($100.00 USD).</p>
          </section>

          {/* S19 */}
          <section className="lp-section" id="s19">
            <p className="lp-eyebrow">Section 19</p>
            <h2>Indemnification</h2>
            <p>You agree to <strong>indemnify, defend, and hold harmless</strong> Rise to Purpose LLC, Shopify, and our respective affiliates, partners, officers, directors, employees, agents, contractors, licensors, and service providers from any losses, damages, liabilities, or claims — including reasonable attorneys' fees — payable to any third party due to or arising out of:</p>
            <ol>
              <li>Your breach of these Terms of Service or any documents incorporated herein by reference;</li>
              <li>Your violation of any law or the rights of a third party; or</li>
              <li>Your access to and use of the Services.</li>
            </ol>
            <p>We will notify you of any indemnifiable claim; a failure to promptly notify will not relieve you of your obligations unless you are materially prejudiced by such failure. We may control the defense and settlement of such a claim at your expense, including the choice of counsel, but will not settle any claim requiring non-monetary obligations from you without your consent (not to be unreasonably withheld).</p>
          </section>

          {/* S20 */}
          <section className="lp-section" id="s20">
            <p className="lp-eyebrow">Section 20</p>
            <h2>Severability, Waiver &amp; Assignment</h2>
            <h3>Severability</h3>
            <p>If any provision of these Terms is determined to be unlawful, void, or unenforceable, that provision shall be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed severed from these Terms without affecting the validity and enforceability of any remaining provisions.</p>
            <h3>Waiver &amp; Entire Agreement</h3>
            <p>The failure of Rise to Purpose LLC to exercise or enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. These Terms of Service, together with any policies or operating rules posted by us on this Site, constitute the entire agreement and understanding between you and us and govern your use of the Services, superseding any prior or contemporaneous agreements, communications, or proposals — whether oral or written — between you and us.</p>
            <h3>Assignment</h3>
            <p>You may not delegate, transfer, or assign these Terms or any of your rights or obligations under them without our prior written consent; any such attempt will be null and void. Rise to Purpose LLC may transfer, assign, or delegate these Terms and our rights and obligations without consent or prior notice to you.</p>
            <h3>Termination</h3>
            <p>We may terminate this agreement or your access to the Services in our sole discretion at any time and without notice. You will remain liable for all amounts due up to and including the date of termination. Provisions that by their nature should survive termination — including Intellectual Property, Feedback, Disclaimers, Limitation of Liability, Indemnification, Severability, Waiver, and Governing Law — shall survive any termination of these Terms.</p>
          </section>

          {/* S21 */}
          <section className="lp-section" id="s21">
            <p className="lp-eyebrow">Section 21</p>
            <h2>Governing Law &amp; Dispute Resolution</h2>
            <p>These Terms of Service are governed by and construed in accordance with the laws of the State of Louisiana, without regard to its conflict of law provisions. Rise to Purpose LLC is incorporated in Delaware; however, all principal operations are conducted in Louisiana, and Louisiana law governs all matters arising from your use of the Services.</p>
            <p>Any dispute arising from or relating to these Terms or your use of the Services shall first be addressed through good-faith negotiation between the parties. If resolution cannot be reached within thirty (30) days, the dispute shall be submitted to binding arbitration in Orleans Parish, Louisiana, in accordance with the rules of the American Arbitration Association. You waive the right to participate in any class-action lawsuit or class-wide arbitration against Rise to Purpose LLC.</p>
          </section>

          {/* S22 */}
          <section className="lp-section" id="s22">
            <p className="lp-eyebrow">Section 22</p>
            <h2>Policy Changes</h2>
            <p>Rise to Purpose LLC reserves the right to update, change, or replace any part of these Terms of Service at any time by posting updates to this page. You are responsible for checking this page periodically for changes. For material changes — particularly those affecting how we collect or use personal data — we will provide additional notice through Site banners or direct email communication where applicable.</p>
            <p>Your continued use of or access to the Services following any changes to these Terms constitutes acceptance of those changes. The most current version of these Terms will always be available at poisedgentlemen.com/legal.</p>
          </section>

          {/* S23 */}
          <section className="lp-section" id="s23">
            <p className="lp-eyebrow">Section 23</p>
            <h2>Contact Us</h2>
            <p>For questions, concerns, or requests related to these Terms of Service, our Privacy Policy, or any of the matters described herein, please contact:</p>
            <div className="lp-contact">
              <h3>Rise to Purpose LLC — Poised Gentlemen</h3>
              <div className="lp-contact-line"><div className="lp-dot"></div><span>Founder &amp; CEO|G: David Rachal III (DR3)</span></div>
              <div className="lp-contact-line"><div className="lp-dot"></div><a href="mailto:david@risetopurpose.org">david@risetopurpose.org</a></div>
              <div className="lp-contact-line"><div className="lp-dot"></div><a href="tel:5044849037">504-484-9037</a></div>
              <div className="lp-contact-line"><div className="lp-dot"></div><a href="https://poisedgentlemen.com">poisedgentlemen.com</a></div>
              <div className="lp-contact-line"><div className="lp-dot"></div><span>2339 Almonaster Ave., New Orleans, LA 70117</span></div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}