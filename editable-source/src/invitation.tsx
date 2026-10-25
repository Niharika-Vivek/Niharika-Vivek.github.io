'use client';
import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {Ganesh,Rangoli,Toran} from './wedding-ornaments';
import './wedding.css';
import './version-one-temple.css';
import './version-three.css';
import './red-invitation.css';
import './simple-invitation.css';
import InvitationRsvpForm from './components/invitation-rsvp-form';
import './invitation-rsvp.css';
import './reference-palette.css';
const maps='https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent('11391 State Highway 121, Trenton, TX 75490')+'&travelmode=driving';
const calendar='https://calendar.google.com/calendar/render?'+new URLSearchParams({action:'TEMPLATE',text:'Vivekvardhan & Niharika — Wedding',dates:'20261115T073000/20261115T073000',ctz:'America/Chicago',location:'One Trenton Events & Retreats, 11391 State Highway 121, Trenton, TX 75490',details:'Join us for our wedding ceremony at 7:30 AM, followed by wedding lunch at 12:00 PM. All times are Central Time.'}).toString();
function InviteIcon({kind}:{kind:'pin'|'heart'|'calendar'}){return <svg className={'v3-icon '+kind} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{kind==='pin'?<><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>:kind==='heart'?<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>:<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18m-13 5h1m6 0h1"/></>}</svg>}
function WeddingCountdown(){
 const [days,setDays]=useState<number|null>(null);
 useEffect(()=>{const update=()=>{const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(new Date());const part=(type:string)=>Number(parts.find(p=>p.type===type)?.value);setDays(Math.max(0,Math.round((Date.UTC(2026,10,15)-Date.UTC(part('year'),part('month')-1,part('day')))/86400000)))};update();const timer=setInterval(update,60000);return()=>clearInterval(timer)},[]);
 return <p className="v3-countdown">{days===null?'Counting down to our forever':days===0?'Our forever begins today':<><strong>{days}</strong> {days===1?'day':'days'} until we say “I do”</>}</p>;
}

function LivingText({text,letters=false}:{text:string;letters?:boolean}){
 return <span className="v1-live"><span className="v1-reader">{text}</span><span aria-hidden="true">{(letters?Array.from(text):text.split(' ')).map((word,i)=><span key={i} className={letters?'v1-letter':'v1-word'} style={{'--delay':`${i*(letters?.055:.10)}s`,'--side':i%2===0?'-18px':'18px','--turn':i%2===0?'-6deg':'6deg'} as CSSProperties}>{word===' '?'\u00a0':word}</span>)}</span></span>;
}
function ThoranamBorders(){
 const borders=useRef<HTMLDivElement>(null),[counts,setCounts]=useState({primary:0,companion:0});
 useEffect(()=>{
  const root=borders.current;if(!root)return;
  const scenery=Array.from(root.parentElement?.querySelectorAll<HTMLElement>('.v1-mandap,.v1-venue-scenery,.v1-lotus-lake')||[]);
  let frame=0;
  const update=()=>{
   frame=0;
   const box=root.getBoundingClientRect(),height=box.height;
   const count=(kind:string)=>{const width=root.querySelector<HTMLElement>('.v3-thoranam-'+kind)?.getBoundingClientRect().width||1;return Math.max(1,Math.round(height/(width*2171/724)))};
   const primary=count('primary'),companion=count('companion');
   setCounts(previous=>previous.primary===primary&&previous.companion===companion?previous:{primary,companion});
   // Let the strands pass behind the illustrated scenes, including the elephant finale.
   const clear=scenery.map(el=>{const image=el.getBoundingClientRect();return [Math.max(0,image.top-box.top-8),Math.min(height,image.bottom-box.top+8)]})
    .filter(([start,end])=>end>start&&end>0&&start<height).sort((a,b)=>a[0]-b[0]);
   const joined:number[][]=[];
   for(const [start,end] of clear){const previous=joined.at(-1);if(previous&&start<=previous[1]+60)previous[1]=Math.max(previous[1],end);else joined.push([start,end])}
   const stops=['#000 0px'];
   for(const [start,end] of joined){stops.push(`#000 ${Math.max(0,start-36)}px`,`transparent ${start}px`,`transparent ${end}px`,`#000 ${Math.min(height,end+36)}px`)}
   stops.push(`#000 ${height}px`);
   const mask=`linear-gradient(to bottom,${stops.join(',')})`;
   if(root.style.maskImage!==mask){root.style.maskImage=mask;root.style.setProperty('-webkit-mask-image',mask)}
  };
  const queue=()=>{if(!frame)frame=requestAnimationFrame(update)};
  update();document.fonts?.ready.then(queue);
  const observer=new ResizeObserver(queue);observer.observe(root);
  const strand=root.querySelector<HTMLElement>('.v3-thoranam-primary');if(strand)observer.observe(strand);
  scenery.forEach(image=>observer.observe(image));
  addEventListener('resize',queue);addEventListener('scroll',queue,{passive:true});
  return()=>{observer.disconnect();removeEventListener('resize',queue);removeEventListener('scroll',queue);cancelAnimationFrame(frame)};
 },[]);
 return <div className="v3-thoranam-borders" aria-hidden="true" ref={borders}>{(['left','right'] as const).map(side=><div className={'v3-thoranam-rail '+side} key={side}>{(['primary','companion'] as const).map(kind=><div key={kind} className={'v3-thoranam-strand v3-thoranam-'+kind}>{Array.from({length:counts[kind]},(_,i)=><img key={i} src="./version-three/celebration/continuous-thoranam.webp" alt="" width="724" height="2171"/>)}</div>)}</div>)}</div>;
}
export default function VersionThree({rsvpPage=false}:{rsvpPage?:boolean}){
 const [view,setView]=useState(rsvpPage?'rsvp':'invitation');
 function navigate(e:React.MouseEvent<HTMLAnchorElement>,next:string){if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();history.pushState({},'',next==='rsvp'?'?page=rsvp':'./');setView(next);setShowScrollCue(false);window.scrollTo({top:0,behavior:'instant'})}
 useEffect(()=>{const back=()=>{setView(new URLSearchParams(location.search).get('page')==='rsvp'?'rsvp':'invitation');window.scrollTo({top:0,behavior:'instant'})};addEventListener('popstate',back);return()=>removeEventListener('popstate',back)},[]);
 const [entered,setEntered]=useState(rsvpPage),[entering,setEntering]=useState(false),[opened,setOpened]=useState(rsvpPage),[music,setMusic]=useState(false),[motion,setMotion]=useState(true),[showScrollCue,setShowScrollCue]=useState(true);
 const audio=useRef<HTMLAudioElement>(null),interior=useRef<HTMLDivElement>(null),entranceTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>{document.title=view==='rsvp'?'RSVP | Vivekvardhan & Niharika':'Vivekvardhan weds Niharika | 15 November 2026';if(entered)interior.current?.querySelector<HTMLElement>('h1')?.focus({preventScroll:true})},[view,entered]);
 useEffect(()=>()=>{if(entranceTimer.current)clearTimeout(entranceTimer.current)},[]);
 useEffect(()=>{document.body.style.overflow=entered?'':'hidden';return()=>{document.body.style.overflow=''}},[entered]);
 useEffect(()=>{if(entered)interior.current?.querySelector<HTMLElement>('.garden-title')?.focus({preventScroll:true})},[entered]);
 useEffect(()=>{if(!entered||!showScrollCue)return;const hide=()=>{if(window.scrollY>8)setShowScrollCue(false)};addEventListener('scroll',hide,{passive:true});return()=>removeEventListener('scroll',hide)},[entered,showScrollCue]);
 useEffect(()=>{const q=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setMotion(!q.matches);update();q.addEventListener('change',update);return()=>q.removeEventListener('change',update)},[]);
 useEffect(()=>{if(!entered)return;const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.05});interior.current?.querySelectorAll('.reveal,.v1-live').forEach(el=>observer.observe(el));return()=>observer.disconnect()},[entered,view]);
 async function toggleMusic(){if(!audio.current)return;if(!audio.current.paused){audio.current.pause();return}try{audio.current.volume=.7;await audio.current.play()}catch{setMusic(false)}}
 function enter(withMusic:boolean){if(entering)return;setEntering(true);setOpened(true);window.scrollTo({top:0,behavior:'instant'});if(withMusic)void toggleMusic();if(!motion){setEntered(true);return}entranceTimer.current=setTimeout(()=>{setEntered(true)},2400)}
 return <div className="wedding-experience version-three v3-short-invite v3-red-invite" data-entered={entered}>
 <audio ref={audio} src="./wedding-celebration.mp3" loop preload="none" onPlay={()=>setMusic(true)} onPause={()=>setMusic(false)}/>
 {!entered&&<div className={'simple-invite si-opening '+(entering?'si-opening-out':'')} role="dialog" aria-modal="true" aria-labelledby="welcome-title"><div className="si-curtain si-left"><Rangoli/></div><div className="si-curtain si-right"><Rangoli/></div><Toran/><div className="si-opening-copy"><Ganesh/><p className="si-eyebrow">WITH LOVE, YOU’RE INVITED</p><h1 id="welcome-title">Vivekvardhan<em>weds</em>Niharika</h1><p className="si-opening-date">15 NOVEMBER 2026 · TRENTON, TEXAS</p><button className="si-primary" disabled={entering} onClick={()=>enter(true)}>{entering?'Opening your invitation…':'Open invitation'}</button><p className="si-opening-note">With the blessings of our families.</p></div></div>}
 <div className="v1-temple-interior v3-classic-interior" data-motion={motion?'on':'off'} ref={interior} inert={!entered}>
 {entered&&view==='invitation'&&<div className="v3-gold-sparkles" aria-hidden="true">{Array.from({length:14},(_,i)=><svg key={i} viewBox="0 0 12 12" style={{'--spark-x':`${(i*37+7)%100}%`,'--spark-size':`${3+(i%3)*1.5}px`,'--spark-time':`${9+(i%5)}s`,'--spark-delay':`${i*.75}s`,'--spark-drift':`${i%2===0?16:-16}px`} as CSSProperties}><path d="M6 0 7.5 4.5 12 6 7.5 7.5 6 12 4.5 7.5 0 6 4.5 4.5Z"/></svg>)}</div>}
 <header className="garden-nav"><a href="./" onClick={e=>navigate(e,'invitation')} aria-label="Vivekvardhan and Niharika home">V<em>&</em>N</a><nav aria-label="Main navigation"><a href="./" onClick={e=>navigate(e,'invitation')} aria-current={view==='invitation'?'page':undefined}>Invitation</a><a href="?page=rsvp" onClick={e=>navigate(e,'rsvp')} aria-current={view==='rsvp'?'page':undefined} className="rsvp-shortcut">RSVP</a></nav></header>
 <main className={view==='rsvp'?'v3-rsvp-main':undefined}>{view==='rsvp'?<div className="v3-rsvp-page"><a className="v3-back-invitation" href="./" onClick={e=>navigate(e,'invitation')}><span aria-hidden="true">←</span> Back to invitation</a><section className="v3-rsvp-card" aria-labelledby="rsvp-title"><p className="v3-rsvp-kicker">VIVEKVARDHAN &amp; NIHARIKA · 15 NOVEMBER 2026</p><h1 id="rsvp-title" tabIndex={-1}>R.S.V.P.</h1><p className="v3-rsvp-welcome">We would love to celebrate with you.</p><InvitationRsvpForm/><div className="v3-rsvp-event"><InviteIcon kind="calendar"/><div><p>November 15, 2026 · 7:30 AM · Central Time</p><h2>The Wedding</h2><p>One Trenton Events &amp; Retreats</p><p>11391 State Highway 121, Trenton, TX 75490</p><p>Wedding lunch · 12:00 PM</p></div></div></section></div>:<><section className="garden-hero" id="home"><div className="v3-welcome-stage"><ThoranamBorders/><div className="v3-banana-garlands" aria-hidden="true"><img className="left" src="./version-three/banana-jasmine-corner.webp" alt="" width="1024" height="1536"/><img className="right" src="./version-three/banana-jasmine-corner.webp" alt="" width="1024" height="1536"/></div><div className="v3-welcome-layout"><div className="garden-hero-copy reveal"><Ganesh/><p className="opening-telugu"><LivingText text="శుభ వివాహ ఆహ్వానం"/></p><p className="hero-kicker"><LivingText text="With the blessings of our families"/></p><div className="v3-family-grid"><article><h1 className="garden-title" tabIndex={-1}><LivingText text="Vivekvardhan" letters/></h1><p className="v3-family-line"><span>Son of</span><LivingText text="Koluguri Lava Kumar"/><br/><LivingText text="&amp; Koluguri Srujana"/></p></article><p className="v3-weds"><LivingText text="weds"/></p><article><h2 className="v3-bride-name"><LivingText text="Niharika" letters/></h2><p className="v3-family-line"><span>Daughter of</span><LivingText text="Dyavanapally Venkatrao"/><br/><LivingText text="&amp; Dyavanapally Manjula"/></p></article></div><p className="v3-short-invitation"><LivingText text="Together with our families, we invite you to celebrate our wedding."/></p></div><div className="v3-telugu-art"><img src="./version-three/temple-kalyanam-sketch.webp" width="1536" height="1024" alt="Hand-drawn devotional illustration of a South Indian temple and the divine wedding of Srinivasa and Padmavati" fetchPriority="high"/></div></div></div></section>
 <div className="v3-bordered-invitation"><ThoranamBorders/>
 <section className="chapter day-chapter reveal" id="celebration"><p className="chapter-label v3-wedding-date"><span><LivingText text="Sunday"/></span><time dateTime="2026-11-15"><LivingText text="15 November 2026"/></time></p><details className="v3-calendar"><summary><InviteIcon kind="calendar"/>Add to calendar</summary><div><a href={calendar} target="_blank" rel="noreferrer">Google Calendar</a><a href="./vivekvardhan-niharika-wedding.ics" download>Apple / Outlook Calendar</a></div></details><h2><LivingText text="The wedding celebration"/></h2><div className="event-tickets"><article className="event-ticket"><p className="telugu"><LivingText text="సుముహూర్తం"/></p><h3><LivingText text="Wedding ceremony"/></h3><strong><LivingText text="7:30"/> <span>AM</span></strong></article><article className="event-ticket"><p className="telugu"><LivingText text="వివాహ విందు"/></p><h3><LivingText text="Wedding lunch"/></h3><strong><LivingText text="12:00"/> <span>PM</span></strong></article></div><p className="timezone"><LivingText text="All times are Central Time."/></p><div className="v3-short-venue"><h2><LivingText text="One Trenton"/><br/><LivingText text="Events &amp; Retreats"/></h2><p><LivingText text="11391 State Highway 121"/><br/><LivingText text="Trenton, TX 75490"/></p><a href={maps} target="_blank" rel="noreferrer" className="garden-button light"><InviteIcon kind="pin"/>Get directions</a><a className="garden-button light v3-rsvp-cta" href="?page=rsvp" onClick={e=>navigate(e,'rsvp')}>Send your RSVP <InviteIcon kind="heart"/></a><WeddingCountdown/></div></section>
 <footer className="garden-footer reveal"><div className="v3-footer-signature"><p>With love, <span>Vivekvardhan &amp; Niharika</span></p><span className="v3-footer-star" aria-hidden="true">✦</span><time dateTime="2026-11-15">November 15, 2026</time></div></footer>
 </div></>}</main><button className="v1-motion-toggle" onClick={()=>setMotion(v=>!v)} aria-pressed={!motion}>{motion?'Pause motion':'Resume motion'}</button><button className="music-toggle" onClick={toggleMusic} aria-label={music?'Pause wedding music':'Play wedding music'}>{music?'Ⅱ Music on':'♫ Music off'}</button></div>
 {entered&&view==='invitation'&&showScrollCue&&<a className="v3-scroll-cue" href="#celebration" aria-label="Scroll down to the celebration" onClick={e=>{e.preventDefault();setShowScrollCue(false);interior.current?.querySelector('#celebration')?.scrollIntoView({behavior:motion?'smooth':'auto'})}}><svg viewBox="0 0 40 48" aria-hidden="true"><path d="M20 5v30m-13-12 13 13 13-13"/></svg></a>}
 </div>
}
