'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { DownloadButton } from '@/components/feedback/DownloadButton';
import { Wifi, Link as LinkIcon, Type, Mail, Phone, UserCheck } from 'lucide-react';

type QRType = 'url' | 'text' | 'wifi' | 'email' | 'phone' | 'vcard';

export const QrCodeGeneratorTool: React.FC = () => {
  const [type, setType] = useState<QRType>('url');
  const [url, setUrl] = useState<string>('https://toolmeow.com');
  const [text, setText] = useState<string>('Hello from ToolMeow!');
  const [wifiSsid, setWifiSsid] = useState<string>('HomeNetwork');
  const [wifiPass, setWifiPass] = useState<string>('SecretPassword123');
  const [wifiType, setWifiType] = useState<string>('WPA');
  const [email, setEmail] = useState<string>('hello@example.com');
  const [emailSubject, setEmailSubject] = useState<string>('Inquiry');
  const [phone, setPhone] = useState<string>('+919876543210');
  const [vcardName, setVcardName] = useState<string>('John Doe');
  const [vcardPhone, setVcardPhone] = useState<string>('+919876543210');
  const [vcardEmail, setVcardEmail] = useState<string>('john@example.com');

  const [size, setSize] = useState<number>(300);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [fgColor, setFgColor] = useState<string>('#0B0B0F');
  const [bgColor, setBgColor] = useState<string>('#FFFFFF');
  const [dataUrl, setDataUrl] = useState<string>('');
  const [svgString, setSvgString] = useState<string>('');

  // Assemble QR payload
  let payload = '';
  switch (type) {
    case 'url':
      payload = url.trim();
      break;
    case 'text':
      payload = text;
      break;
    case 'wifi': {
      // Escape special characters in SSID & Password: \ ; , : "
      const esc = (s: string) => s.replace(/([\\;,:"'])/g, '\\$1');
      payload = `WIFI:T:${wifiType};S:${esc(wifiSsid)};P:${esc(wifiPass)};;`;
      break;
    }
    case 'email':
      payload = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}`;
      break;
    case 'phone':
      payload = `tel:${phone}`;
      break;
    case 'vcard':
      payload = `BEGIN:VCARD\nVERSION:3.0\nFN:${vcardName}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nEND:VCARD`;
      break;
  }

  // Generate QR Code dynamically
  useEffect(() => {
    if (!payload.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDataUrl('');
      setSvgString('');
      return;
    }

    const opts = {
      errorCorrectionLevel: errorLevel,
      margin: 2,
      width: size,
      color: {
        dark: fgColor,
        light: bgColor,
      },
    };

    QRCode.toDataURL(payload, opts)
      .then((url) => setDataUrl(url))
      .catch((err) => console.error(err));

    QRCode.toString(payload, { ...opts, type: 'svg' })
      .then((svg) => setSvgString(svg))
      .catch((err) => console.error(err));
  }, [payload, errorLevel, fgColor, bgColor, size]);

  const handleDownloadPNG = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `qrcode-${type}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadSVG = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qrcode-${type}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Type Selector Tabs */}
      <div>
        <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-2">
          QR Code Content Type
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'url', label: 'Website URL', icon: LinkIcon },
            { id: 'text', label: 'Plain Text', icon: Type },
            { id: 'wifi', label: 'Wi-Fi Network', icon: Wifi },
            { id: 'email', label: 'Email', icon: Mail },
            { id: 'phone', label: 'Phone Call', icon: Phone },
            { id: 'vcard', label: 'Contact Card', icon: UserCheck },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setType(t.id as QRType)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  type === t.id
                    ? 'bg-[#0B0B0F] text-white border-[#0B0B0F] shadow-sm'
                    : 'bg-white text-[#5B5B66] border-[#E7E7E4] hover:bg-[#F4F4F2]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Input Config */}
        <div className="space-y-4">
          {type === 'url' && (
            <div>
              <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
                Target URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-sm text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>
          )}

          {type === 'text' && (
            <div>
              <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
                Text Content
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                placeholder="Enter text..."
                className="w-full p-3 rounded-xl border border-[#E7E7E4] bg-white text-sm text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>
          )}

          {type === 'wifi' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
                  Network SSID (Name)
                </label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-sm text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  type="text"
                  value={wifiPass}
                  onChange={(e) => setWifiPass(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-sm text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
                  Security Encryption
                </label>
                <select
                  value={wifiType}
                  onChange={(e) => setWifiType(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-[#E7E7E4] bg-white text-sm text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                >
                  <option value="WPA">WPA/WPA2/WPA3 (Standard)</option>
                  <option value="WEP">WEP (Legacy)</option>
                  <option value="nopass">None (Open Network)</option>
                </select>
              </div>
            </div>
          )}

          {type === 'email' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
                  Recipient Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-sm text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-sm text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>
            </div>
          )}

          {type === 'phone' && (
            <div>
              <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91..."
                className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-sm text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>
          )}

          {type === 'vcard' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={vcardName}
                  onChange={(e) => setVcardName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-sm text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  value={vcardPhone}
                  onChange={(e) => setVcardPhone(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-sm text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={vcardEmail}
                  onChange={(e) => setVcardEmail(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-sm text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>
            </div>
          )}

          {/* Visual Customization */}
          <div className="pt-2 border-t border-[#E7E7E4] space-y-3">
            <h4 className="text-xs font-bold text-[#0B0B0F] uppercase tracking-wider">
              Styling & Redundancy
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#5B5B66] mb-1">Foreground Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-8 h-8 rounded border border-[#E7E7E4] cursor-pointer"
                  />
                  <span className="text-xs font-mono">{fgColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#5B5B66] mb-1">Background Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-8 h-8 rounded border border-[#E7E7E4] cursor-pointer"
                  />
                  <span className="text-xs font-mono">{bgColor}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs text-[#5B5B66] mb-1">Error Correction</label>
                <select
                  value={errorLevel}
                  onChange={(e) => setErrorLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                  className="w-full h-9 px-2.5 rounded-lg border border-[#E7E7E4] bg-white text-xs font-semibold"
                >
                  <option value="L">Level L (7% recovery)</option>
                  <option value="M">Level M (15% recovery)</option>
                  <option value="Q">Level Q (25% recovery)</option>
                  <option value="H">Level H (30% recovery)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#5B5B66] mb-1">Resolution (px)</label>
                <select
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value, 10))}
                  className="w-full h-9 px-2.5 rounded-lg border border-[#E7E7E4] bg-white text-xs font-semibold"
                >
                  <option value={200}>200 × 200 px</option>
                  <option value={300}>300 × 300 px</option>
                  <option value={500}>500 × 500 px</option>
                  <option value={1000}>1000 × 1000 px</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Preview & Download Card */}
        <div className="bg-[#FAFAF9] border border-[#E7E7E4] rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-5">
          <div className="p-4 bg-white rounded-2xl border border-[#E7E7E4] shadow-sm max-w-[260px] aspect-square flex items-center justify-center">
            {dataUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={dataUrl}
                alt="Generated QR code preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-xs text-[#5B5B66]">Enter content to render QR</span>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <DownloadButton label="Download PNG" onClick={handleDownloadPNG} disabled={!dataUrl} />
            <button
              type="button"
              onClick={handleDownloadSVG}
              disabled={!svgString}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-[#E7E7E4] bg-white text-xs font-bold text-[#0B0B0F] hover:bg-[#F4F4F2] transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
            >
              Download SVG
            </button>
          </div>

          <p className="text-[11px] text-[#5B5B66]">
            High-resolution vector output suitable for print, billboards, and websites.
          </p>
        </div>
      </div>
    </div>
  );
};

