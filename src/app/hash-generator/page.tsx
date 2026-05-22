'use client'
import { useState, useEffect } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

// Minimal MD5 implementation
function md5(input: string): string {
  function safeAdd(x: number, y: number) { const lsw=(x&0xFFFF)+(y&0xFFFF); return (((x>>16)+(y>>16)+(lsw>>16))<<16)|(lsw&0xFFFF) }
  function bitRotateLeft(num: number, cnt: number) { return (num<<cnt)|(num>>>(32-cnt)) }
  function md5cmn(q:number,a:number,b:number,x:number,s:number,t:number){return safeAdd(bitRotateLeft(safeAdd(safeAdd(a,q),safeAdd(x,t)),s),b)}
  function md5ff(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return md5cmn((b&c)|((~b)&d),a,b,x,s,t)}
  function md5gg(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return md5cmn((b&d)|(c&(~d)),a,b,x,s,t)}
  function md5hh(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return md5cmn(b^c^d,a,b,x,s,t)}
  function md5ii(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return md5cmn(c^(b|(~d)),a,b,x,s,t)}
  function str2binl(str:string){const bin:number[]=[]; for(let i=0;i<str.length*8;i+=8){bin[i>>5]|=(str.charCodeAt(i/8)&0xFF)<<(i%32)} return bin}
  function binl2hex(bin:number[]){const hex='0123456789abcdef';let str='';for(let i=0;i<bin.length*4;i++){str+=hex.charAt((bin[i>>2]>>((i%4)*8+4))&0xF)+hex.charAt((bin[i>>2]>>((i%4)*8))&0xF)}return str}
  function core_md5(x:number[],len:number){
    x[len>>5]|=0x80<<(len%32); x[(((len+64)>>>9)<<4)+14]=len;
    let a=1732584193,b=-271733879,c=-1732584194,d=271733878;
    for(let i=0;i<x.length;i+=16){
      let olda=a,oldb=b,oldc=c,oldd=d;
      a=md5ff(a,b,c,d,x[i],7,-680876936);d=md5ff(d,a,b,c,x[i+1],12,-389564586);c=md5ff(c,d,a,b,x[i+2],17,606105819);b=md5ff(b,c,d,a,x[i+3],22,-1044525330);
      a=md5ff(a,b,c,d,x[i+4],7,-176418897);d=md5ff(d,a,b,c,x[i+5],12,1200080426);c=md5ff(c,d,a,b,x[i+6],17,-1473231341);b=md5ff(b,c,d,a,x[i+7],22,-45705983);
      a=md5ff(a,b,c,d,x[i+8],7,1770035416);d=md5ff(d,a,b,c,x[i+9],12,-1958414417);c=md5ff(c,d,a,b,x[i+10],17,-42063);b=md5ff(b,c,d,a,x[i+11],22,-1990404162);
      a=md5ff(a,b,c,d,x[i+12],7,1804603682);d=md5ff(d,a,b,c,x[i+13],12,-40341101);c=md5ff(c,d,a,b,x[i+14],17,-1502002290);b=md5ff(b,c,d,a,x[i+15],22,1236535329);
      a=md5gg(a,b,c,d,x[i+1],5,-165796510);d=md5gg(d,a,b,c,x[i+6],9,-1069501632);c=md5gg(c,d,a,b,x[i+11],14,643717713);b=md5gg(b,c,d,a,x[i],20,-373897302);
      a=md5gg(a,b,c,d,x[i+5],5,-701558691);d=md5gg(d,a,b,c,x[i+10],9,38016083);c=md5gg(c,d,a,b,x[i+15],14,-660478335);b=md5gg(b,c,d,a,x[i+4],20,-405537848);
      a=md5gg(a,b,c,d,x[i+9],5,568446438);d=md5gg(d,a,b,c,x[i+14],9,-1019803690);c=md5gg(c,d,a,b,x[i+3],14,-187363961);b=md5gg(b,c,d,a,x[i+8],20,1163531501);
      a=md5gg(a,b,c,d,x[i+13],5,-1444681467);d=md5gg(d,a,b,c,x[i+2],9,-51403784);c=md5gg(c,d,a,b,x[i+7],14,1735328473);b=md5gg(b,c,d,a,x[i+12],20,-1926607734);
      a=md5hh(a,b,c,d,x[i+5],4,-378558);d=md5hh(d,a,b,c,x[i+8],11,-2022574463);c=md5hh(c,d,a,b,x[i+11],16,1839030562);b=md5hh(b,c,d,a,x[i+14],23,-35309556);
      a=md5hh(a,b,c,d,x[i+1],4,-1530992060);d=md5hh(d,a,b,c,x[i+4],11,1272893353);c=md5hh(c,d,a,b,x[i+7],16,-155497632);b=md5hh(b,c,d,a,x[i+10],23,-1094730640);
      a=md5hh(a,b,c,d,x[i+13],4,681279174);d=md5hh(d,a,b,c,x[i],11,-358537222);c=md5hh(c,d,a,b,x[i+3],16,-722521979);b=md5hh(b,c,d,a,x[i+6],23,76029189);
      a=md5hh(a,b,c,d,x[i+9],4,-640364487);d=md5hh(d,a,b,c,x[i+12],11,-421815835);c=md5hh(c,d,a,b,x[i+15],16,530742520);b=md5hh(b,c,d,a,x[i+2],23,-995338651);
      a=md5ii(a,b,c,d,x[i],6,-198630844);d=md5ii(d,a,b,c,x[i+7],10,1126891415);c=md5ii(c,d,a,b,x[i+14],15,-1416354905);b=md5ii(b,c,d,a,x[i+5],21,-57434055);
      a=md5ii(a,b,c,d,x[i+12],6,1700485571);d=md5ii(d,a,b,c,x[i+3],10,-1894986606);c=md5ii(c,d,a,b,x[i+10],15,-1051523);b=md5ii(b,c,d,a,x[i+1],21,-2054922799);
      a=md5ii(a,b,c,d,x[i+8],6,1873313359);d=md5ii(d,a,b,c,x[i+15],10,-30611744);c=md5ii(c,d,a,b,x[i+6],15,-1560198380);b=md5ii(b,c,d,a,x[i+13],21,1309151649);
      a=md5ii(a,b,c,d,x[i+4],6,-145523070);d=md5ii(d,a,b,c,x[i+11],10,-1120210379);c=md5ii(c,d,a,b,x[i+2],15,718787259);b=md5ii(b,c,d,a,x[i+9],21,-343485551);
      a=safeAdd(a,olda);b=safeAdd(b,oldb);c=safeAdd(c,oldc);d=safeAdd(d,oldd);
    }
    return [a,b,c,d];
  }
  const binl=str2binl(input); return binl2hex(core_md5(binl,input.length*8));
}

async function sha(algo: string, text: string): Promise<string> {
  const enc = new TextEncoder()
  const buffer = await crypto.subtle.digest(algo, enc.encode(text))
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export default function HashGeneratorPage() {
  const [input, setInput] = useState('Hello, World!')
  const [hashes, setHashes] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    if (!input) { setHashes({}); return }
    const md5hash = md5(input)
    setHashes({ MD5: md5hash, 'SHA-1': '...', 'SHA-256': '...', 'SHA-512': '...' })
    Promise.all([
      sha('SHA-1', input),
      sha('SHA-256', input),
      sha('SHA-512', input),
    ]).then(([s1, s256, s512]) => {
      setHashes({ MD5: md5hash, 'SHA-1': s1, 'SHA-256': s256, 'SHA-512': s512 })
    }).catch(() => {})
  }, [input])

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>#️⃣</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Hash Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 700, color: '#0F2A4A' }}>Input Text</div>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={4}
          placeholder="Enter text to hash..."
          style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'monospace', resize: 'vertical', outline: 'none', boxSizing: 'border-box' as const, marginBottom: '24px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {Object.entries(hashes).map(([algo, hash]) => (
            <div key={algo} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A' }}>{algo}</div>
                <button onClick={() => copy(hash, algo)}
                  style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', background: copied === algo ? '#16A34A' : 'white', color: copied === algo ? 'white' : '#64748b', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
                  {copied === algo ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '13px', color: '#374151', wordBreak: 'break-all', background: 'white', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                {hash}
              </div>
            </div>
          ))}
        </div>

        {!input && (
          <div style={{ textAlign: 'center', padding: '48px', color: '#94a3b8' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>#</div>
            <p>Enter text above to generate hashes</p>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  )
}
